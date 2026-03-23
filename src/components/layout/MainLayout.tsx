import {
  DarkThemeToggle,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  Footer,
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
          <div className="flex items-center gap-3">
            <Link to="/">
              <NavbarBrand as="div" className="gap-2">
                <HiHome className="text-accent h-6 w-6" />
                <span className="self-center text-xl font-black tracking-tighter whitespace-nowrap">
                  r11n.io
                </span>
              </NavbarBrand>
            </Link>
            <DarkThemeToggle />
            <div className="hidden lg:block">
              <SearchInput />
            </div>
          </div>

          {/* 우측 액션 영역 */}
          <div className="flex items-center gap-2 md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <HiUserCircle className="text-primary-text h-7 w-7 transition-transform hover:scale-110" />
              }
            >
              <div className="bg-main text-primary-text border-secondary-text/10 w-48 border shadow-2xl">
                {/* 인증 드롭다운 */}
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

            {/* 모바일 토글 버튼: 디자인 커스텀이 필요할 수 있음 */}
            <NavbarToggle className="hover:bg-main/50" />
          </div>

          {/* 메뉴 리스트 영역 */}
          <NavbarCollapse className="bg-surface border-secondary-text/10 absolute top-full left-0 w-full border-b md:static md:ml-auto md:w-auto md:border-none md:bg-transparent">
            <div className="mr-6 flex flex-col p-4 md:flex-row md:items-center md:justify-end md:gap-8 md:p-0">
              <Link to="/posts" className="group">
                <NavbarLink
                  as="div"
                  className="!text-primary-text hover:bg-accent/10 flex items-center justify-between rounded-lg px-4 py-3 font-bold md:px-0 md:py-0 md:hover:bg-transparent"
                >
                  <span>게시판</span>
                  <span className="text-accent block text-xs md:hidden">
                    Posts →
                  </span>
                </NavbarLink>
              </Link>
              <div className="bg-secondary-text/10 h-[1px] w-full md:hidden" />
              {/* 모바일 구분선 */}
              <Link to="/about" className="group">
                <NavbarLink
                  as="div"
                  className="!text-primary-text hover:bg-accent/10 flex items-center justify-between rounded-lg px-4 py-3 font-bold md:px-0 md:py-0 md:hover:bg-transparent"
                >
                  <span>소개</span>
                  <span className="text-accent block text-xs md:hidden">
                    About →
                  </span>
                </NavbarLink>
              </Link>
            </div>
          </NavbarCollapse>
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
          <div className="flex w-full flex-row items-center justify-between">
            {/* 1. 왼쪽 그룹: 카피라이트 문구 전체 */}
            <div className="text-secondary-text flex items-center gap-1 text-xs sm:text-sm">
              <span>© 2025</span>
              {/* PC에서만 보이는 문구 */}
              <span className="hidden sm:inline">Learning & Writing BY</span>
              {/* 항상 보이는 이름 */}
              <span className="font-bold">r11n</span>
            </div>

            <div className="flex space-x-5">
              <FooterIcon
                href="mailto:thearch90@gmail.com"
                icon={FaEnvelope}
                className="text-secondary-text hover:text-accent !m-0"
              />
              <FooterIcon
                href="https://github.com/r11n-io"
                icon={FaGithub}
                className="text-secondary-text hover:text-accent !m-0"
              />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default MainLayout;
