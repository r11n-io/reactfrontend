import {
  DarkThemeToggle,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  Footer,
  FooterCopyright,
  FooterIcon,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import React from "react";
import { FaEnvelope, FaGithub } from "react-icons/fa";
import { HiHome, HiUserCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { handleSuccess } from "../../utils/notifier";
import SearchInput from "../ui/SearchInput";

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * 메인 레이아웃 컴포넌트
 * - 상단에 고정된 헤더와 하단 푸터를 포함
 * - 헤더에는 로고, 검색, 메뉴, 인증 드롭다운이 포함
 * - 페이지 콘텐츠는 헤더 아래에 위치하며, 스크롤이 가능하도록 설정
 *
 * @param props.children 페이지 콘텐츠로 렌더링될 자식 요소
 * @returns Main layout JSX
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    handleSuccess("로그아웃되었습니다.", () => navigate("/login"));
  };

  return (
    <div className="bg-main text-primary-text flex min-h-screen flex-col">
      {/* 상단 헤더 */}
      <header className="border-secondary-text/10 fixed top-0 z-10 w-full border-b">
        <Navbar fluid className="!bg-surface">
          <div className="flex items-center gap-4">
            {/* 제목/로고 영역 */}
            <Link to="/">
              <NavbarBrand as="div" className="gap-2">
                <HiHome className="text-accent h-6 w-6" />
                <span className="self-center text-xl font-semibold whitespace-nowrap">
                  r11n.io
                </span>
              </NavbarBrand>
            </Link>
            {/* 다크모드 토글 */}
            <DarkThemeToggle />
            {/* 검색 */}
            <div className="hidden md:block">
              <SearchInput />
            </div>
          </div>

          <div className="flex items-center gap-8 md:order-2">
            {/* 메뉴 */}
            <NavbarCollapse>
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-4">
                <Link
                  to="/posts"
                  className="border-secondary-text/20 pr-4 md:border-r"
                >
                  <NavbarLink as="div" className="!text-primary-text font-bold">
                    게시판
                  </NavbarLink>
                </Link>
                <Link to="/about">
                  <NavbarLink as="div" className="!text-primary-text font-bold">
                    소개
                  </NavbarLink>
                </Link>
              </div>
            </NavbarCollapse>

            {/* 인증 드롭다운 */}
            <Dropdown
              className="bg-main"
              label={<HiUserCircle className="text-primary-text h-6 w-6" />}
              arrowIcon={false}
              inline
            >
              <div className="bg-main text-primary-text border-secondary-text/10 border shadow-xl">
                {isAuthenticated ? (
                  <>
                    <DropdownHeader className="border-secondary-text/10 border-b">
                      <span className="block truncate text-sm font-medium">
                        로그인되었습니다
                      </span>
                    </DropdownHeader>
                    <DropdownItem
                      className="hover:!bg-main"
                      onClick={handleLogout}
                    >
                      로그아웃
                    </DropdownItem>
                  </>
                ) : (
                  <>
                    <DropdownHeader className="border-secondary-text/10 border-b">
                      <span className="text-secondary-text block text-sm">
                        게스트
                      </span>
                      <span className="block truncate text-sm font-medium">
                        로그인이 필요합니다
                      </span>
                    </DropdownHeader>
                    <DropdownItem className="hover:!bg-main">
                      <Link to="/login" className="block w-full text-left">
                        로그인
                      </Link>
                    </DropdownItem>
                  </>
                )}
                <DropdownItem className="hover:!bg-main">
                  <Link to="setting" className="block w-full text-left">
                    설정
                  </Link>
                </DropdownItem>
              </div>
            </Dropdown>
            {/* 모바일 메뉴 토글 */}
            <NavbarToggle />
          </div>
        </Navbar>
      </header>

      {/* 페이지 콘텐츠 영역 */}
      <main className="flex flex-grow pt-16">
        <div className="bg-main flex-grow p-4">{children}</div>
      </main>

      {/* 하단 푸터 */}
      <Footer
        container
        className="!bg-surface border-secondary-text/10 w-full rounded-none border-t !shadow-none"
      >
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <FooterCopyright
              href="#"
              by="Learning & Writing BY r11n"
              year={2025}
              className="text-secondary-text"
            />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterIcon
                href="mailto:thearch90@gmail.com"
                icon={FaEnvelope}
                className="text-secondary-text hover:text-accent"
              />
              <FooterIcon
                href="https://github.com/r11n-io"
                icon={FaGithub}
                className="text-secondary-text hover:text-accent"
              />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default MainLayout;
