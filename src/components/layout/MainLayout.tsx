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
    <div className="flex min-h-screen flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* 상단 헤더 */}
      <header className="fixed top-0 z-10 w-full bg-white shadow-md">
        <Navbar fluid>
          <div className="flex items-center gap-4">
            {/* 제목/로고 영역 */}
            <Link to="/">
              <NavbarBrand as="div" className="gap-2">
                <HiHome className="h-6 w-6" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
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
                  className="border-r border-gray-300 pr-4 dark:border-gray-600"
                >
                  <NavbarLink as="div">게시판</NavbarLink>
                </Link>
                <Link to="/about">
                  <NavbarLink as="div">소개</NavbarLink>
                </Link>
              </div>
            </NavbarCollapse>
            {/* 인증 드롭다운 */}
            <Dropdown
              label={<HiUserCircle className="h-6 w-6" />}
              arrowIcon={false}
              inline
            >
              {isAuthenticated ? (
                <>
                  <DropdownHeader>
                    <span className="block truncate text-sm font-medium">
                      로그인되었습니다
                    </span>
                  </DropdownHeader>
                  <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
                </>
              ) : (
                <>
                  <DropdownHeader>
                    <span className="block text-sm">게스트</span>
                    <span className="block truncate text-sm font-medium">
                      로그인이 필요합니다
                    </span>
                  </DropdownHeader>
                  <DropdownItem>
                    <Link to="/login" className="block w-full text-left">
                      로그인
                    </Link>
                  </DropdownItem>
                </>
              )}
              <DropdownItem>
                <Link to="setting" className="block w-full text-left">
                  설정
                </Link>
              </DropdownItem>
            </Dropdown>
            {/* 모바일 메뉴 토글 */}
            <NavbarToggle />
          </div>
        </Navbar>
      </header>

      {/* 페이지 콘텐츠 영역 */}
      <main className="flex flex-grow pt-16">
        <div className="flex-grow bg-white p-4 dark:bg-gray-900">
          {children}
        </div>
      </main>

      {/* 하단 푸터 */}
      <Footer container className="w-full rounded-none">
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <FooterCopyright href="#" by="SW" year={2025} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterIcon href="mailto:thearch90@gmail.com" icon={FaEnvelope} />
              <FooterIcon href="https://github.com/r11n-io" icon={FaGithub} />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default MainLayout;
