import { Badge, Card } from "flowbite-react";
import {
  FaBriefcase,
  FaCss3,
  FaDatabase,
  FaEnvelope,
  FaGithub,
  FaHtml5,
  FaJava,
  FaJs,
  FaLeaf,
  FaPaperclip,
  FaPython,
  FaReact,
  FaVuejs,
} from "react-icons/fa";
import ProfileIcon from "../assets/me.jpg";

/**
 * 자기소개 페이지 컴포넌트
 *
 * @returns 자기소개 페이지 JSX
 */
const AboutPage: React.FC = () => {
  return (
    <div
      className="grid lg:grid-cols-3 xl:grid-cols-4 
        gap-6 py-6 px-10 overflow-hidden"
    >
      {/* 좌측 영역 */}
      <div
        className="
          lg:col-span-1 xl:col-span-1 
          flex flex-col items-center justify-between
          h-full overflow-y-auto pr-2"
      >
        <div className="flex flex-col items-center w-full space-y-4">
          {/* 프로필 이미지 섹션 */}
          <section className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img
              src={ProfileIcon}
              alt="Profile"
              className="relative rounded-full w-48 h-48 md:w-56 md:h-56 object-cover ring-4 ring-white dark:ring-slate-900 shadow-2xl"
            />
          </section>

          {/* 텍스트 섹션 */}
          <section className="text-center space-y-3 mb-10">
            <p className="text-sm font-mono text-blue-500 dark:text-blue-400 tracking-widest uppercase">
              reencarnacion AKA <b>r11n</b>
            </p>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              김성웅
            </h1>
            <div className="h-1 w-12 bg-blue-500 mx-auto rounded-full"></div>{" "}
            <p className="text-gray-500 dark:text-gray-400 font-medium italic">
              배우는 것을 즐기는 사람
            </p>
          </section>

          {/* 이름 하단 경력 섹션 */}
          <div className="flex flex-col items-center gap-2 mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <FaBriefcase className="text-blue-500 text-xs shrink-0" />
              <span className="font-bold">(주) 위OOOO</span>

              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-xs font-medium">
                Software Engineer(SI & SM)
              </span>

              <span className="hidden md:inline text-gray-300 dark:text-gray-600">
                ·
              </span>
              <span className="hidden md:inline text-xs text-gray-400">
                2017 - 2025
              </span>
            </div>
            <div className="h-[1px] w-8 bg-gray-200 dark:bg-gray-700"></div>
          </div>

          {/* 소셜 링크 섹션 */}
          <section className="flex justify-center items-center gap-4">
            <a
              href="https://github.com/r11n-io"
              className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <FaGithub className="text-2xl text-gray-700 dark:text-gray-300" />
            </a>
            <a
              href="mailto:thearch90@gmail.com"
              className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <FaEnvelope className="text-2xl text-gray-700 dark:text-gray-300" />
            </a>
          </section>
        </div>
      </div>

      {/* 중앙 영역 */}
      <div className="lg:col-span-1 xl:col-span-1 h-full overflow-y-auto pr-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          상세 정보
        </h2>
        <div className="h-1 w-6 bg-blue-500 rounded-full mb-3"></div>

        <section className="w-full space-y-3">
          {/* 다루어본 기술 카드 */}
          <Card theme={{ root: { children: "p-4" } }}>
            <div>
              <h4 className="text-lg font-semibold mb-2">프론트엔드</h4>
              <div className="flex flex-wrap gap-2">
                <Badge
                  color="gray"
                  className="px-3 py-1 font-medium rounded-lg"
                >
                  <FaHtml5 className="inline-block align-middle mr-1.5 mb-[2px]" />
                  HTML
                </Badge>
                <Badge
                  color="gray"
                  className="px-3 py-1 font-medium rounded-lg"
                >
                  <FaCss3 className="inline-block align-middle mr-1.5 mb-[2px]" />
                  CSS
                </Badge>
                <Badge
                  color="gray"
                  className="px-3 py-1 font-medium rounded-lg"
                >
                  <FaJs className="inline-block align-middle mr-1.5 mb-[2px]" />
                  JavaScript
                </Badge>
                <Badge
                  color="gray"
                  className="px-3 py-1 font-medium rounded-lg"
                >
                  <FaPaperclip className="inline-block align-middle mr-1.5 mb-[2px]" />
                  JSP
                </Badge>
                <Badge
                  color="gray"
                  className="px-3 py-1 font-medium rounded-lg"
                >
                  <FaVuejs className="inline-block align-middle mr-1.5 mb-[2px]" />
                  Vue.js
                </Badge>
                <Badge
                  color="gray"
                  className="px-3 py-1 font-medium rounded-lg"
                >
                  <FaReact className="inline-block align-middle mr-1.5 mb-[2px]" />
                  React
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">백엔드</h4>
              <div className="flex flex-wrap gap-2">
                <Badge
                  color="gray"
                  className="px-3 py-1 font-medium rounded-lg"
                >
                  <FaJava className="inline-block align-middle mr-1.5 mb-[2px]" />
                  Java
                </Badge>
                <Badge
                  color="gray"
                  className="px-3 py-1 font-medium rounded-lg"
                >
                  <FaLeaf className="inline-block align-middle mr-1.5 mb-[2px]" />
                  Spring(Boot)
                </Badge>
                <Badge
                  color="gray"
                  className="px-3 py-1 font-medium rounded-lg"
                >
                  <FaPython className="inline-block align-middle mr-1.5 mb-[2px]" />
                  Python
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">데이터베이스</h4>
              <div className="flex flex-wrap gap-2">
                <Badge
                  color="gray"
                  className="px-3 py-1 font-medium rounded-lg"
                >
                  <FaDatabase className="inline-block align-middle mr-1.5 mb-[2px]" />
                  Oracle
                </Badge>
                <Badge
                  color="gray"
                  className="px-3 py-1 font-medium rounded-lg"
                >
                  <FaDatabase className="inline-block align-middle mr-1.5 mb-[2px]" />
                  MariaDB
                </Badge>
                <Badge
                  color="gray"
                  className="px-3 py-1 font-medium rounded-lg"
                >
                  <FaDatabase className="inline-block align-middle mr-1.5 mb-[2px]" />
                  Tibero
                </Badge>
                <Badge
                  color="gray"
                  className="px-3 py-1 font-medium rounded-lg"
                >
                  <FaDatabase className="inline-block align-middle mr-1.5 mb-[2px]" />
                  Altibase
                </Badge>
                <Badge
                  color="gray"
                  className="px-3 py-1 font-medium rounded-lg"
                >
                  <FaDatabase className="inline-block align-middle mr-1.5 mb-[2px]" />
                  PostgreSQL
                </Badge>
              </div>
            </div>
          </Card>
        </section>

        {/* 관심사 섹션 */}
        <section className="w-full space-y-3 mt-3">
          <Card theme={{ root: { children: "p-4" } }}>
            <h3 className="text-lg font-semibold">관심사</h3>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {["컴퓨터과학", "CI/CD", "개발방법론", "클린코드"].map(
                  (tag) => (
                    <Badge
                      key={tag}
                      color="gray"
                      className="px-3 py-1 font-medium rounded-lg"
                    >
                      {tag}
                    </Badge>
                  ),
                )}
              </div>

              <div className="h-[1px] w-full bg-gray-100 dark:bg-gray-700/50 my-2"></div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold dark:text-gray-300">
                      日本語 (現：N3)
                    </span>
                    <span className="text-blue-500 text-sm font-bold">
                      目標: N1
                    </span>
                  </div>
                  <div className="w-full h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="w-[60%] h-full bg-blue-400/50"></div>{" "}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-gray-400 uppercase">
                      中文 目标
                    </span>
                    <span className="text-xs font-bold dark:text-gray-200">
                      HSK 4级 取得
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-gray-400 uppercase">
                      English Goal
                    </span>
                    <span className="text-xs font-bold dark:text-gray-200">
                      Aiming for CEFR B2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* TMI 섹션 */}
        <section className="w-full space-y-3 mt-3">
          <Card theme={{ root: { children: "p-4" } }}>
            <h3 className="text-lg font-semibold">TMI</h3>
            <div className="flex flex-wrap gap-2">
              {["책읽기", "커피", "조깅", "생존요리"].map((tag) => (
                <Badge
                  key={tag}
                  color="blue"
                  className="px-3 py-1 font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </Card>
        </section>
      </div>

      {/* 우측 영역 */}
      <div className="lg:col-span-1 xl:col-span-2 h-full overflow-y-auto pr-2">
        <section className="w-full">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            프로젝트 경험
          </h2>

          <div className="h-1 w-6 bg-blue-500 rounded-full mb-3"></div>

          {/* 개별 프로젝트 그리드 영역 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-3">
            <Card
              theme={{ root: { children: "p-3 md:p-3.5" } }}
              className="shadow-sm h-full"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                  2017 ~ 2019
                </span>
                <span className="text-sm text-gray-400 font-bold opacity-70">
                  DEV
                </span>
              </div>
              <h5 className="text-xl font-black tracking-tighter text-gray-900 dark:text-white leading-tight">
                KN체계 성능개량
              </h5>
              <p className="text-sm font-medium leading-snug text-gray-600 dark:text-gray-400">
                응용SW 개발 및 시험평가 지원
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 pt-1.5 border-t border-gray-100 dark:border-gray-700/60">
                {["Spring", "Oracle", "Javascript"].map((tech) => (
                  <span key={tech} className="text-xs text-gray-400/80">
                    #{tech}
                  </span>
                ))}
              </div>
            </Card>
            <Card
              theme={{ root: { children: "p-3 md:p-3.5" } }}
              className="shadow-sm h-full"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                  2020 ~ 2021
                </span>
                <span className="text-sm text-gray-400 font-bold opacity-70">
                  SM
                </span>
              </div>
              <h5 className="text-xl font-black tracking-tighter text-gray-900 dark:text-white leading-tight">
                경찰청 정보시스템 유지보수
              </h5>
              <p className="text-sm font-medium leading-snug text-gray-600 dark:text-gray-400">
                응용 유지보수 개발 및 고객지원
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 pt-1.5 border-t border-gray-100 dark:border-gray-700/60">
                {["Spring", "Tibero", "Altibase", "JSP"].map((tech) => (
                  <span key={tech} className="text-xs text-gray-400/80">
                    #{tech}
                  </span>
                ))}
              </div>
            </Card>
            <Card
              theme={{ root: { children: "p-3 md:p-3.5" } }}
              className="shadow-sm h-full"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                  2021 ~ 2023
                </span>
                <span className="text-sm text-gray-400 font-bold opacity-70">
                  DEV
                </span>
              </div>
              <h5 className="text-xl font-black tracking-tighter text-gray-900 dark:text-white leading-tight">
                J체계 성능개량
              </h5>
              <p className="text-sm font-medium leading-snug text-gray-600 dark:text-gray-400">
                응용 개발 및 평가지원
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 pt-1.5 border-t border-gray-100 dark:border-gray-700/60">
                {["Spring", "Oracle", "Vue.js"].map((tech) => (
                  <span key={tech} className="text-xs text-gray-400/80">
                    #{tech}
                  </span>
                ))}
              </div>
            </Card>
            <Card
              theme={{ root: { children: "p-3 md:p-3.5" } }}
              className="shadow-sm h-full"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                  2024 ~ 2025
                </span>
                <span className="text-sm text-gray-400 font-bold opacity-70">
                  DEV
                </span>
              </div>
              <h5 className="text-xl font-black tracking-tighter text-gray-900 dark:text-white leading-tight">
                CY체계 탐색개발
              </h5>
              <p className="text-sm font-medium leading-snug text-gray-600 dark:text-gray-400">
                개발환경 구성, 응용SW 개발 및 시험평가 지원
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 pt-1.5 border-t border-gray-100 dark:border-gray-700/60">
                {["Spring", "Oracle", "Javascript"].map((tech) => (
                  <span key={tech} className="text-xs text-gray-400/80">
                    #{tech}
                  </span>
                ))}
              </div>
            </Card>
            <Card
              theme={{ root: { children: "p-3 md:p-3.5" } }}
              className="shadow-sm h-full"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                  *
                </span>
                <span className="text-sm text-gray-400 font-bold opacity-70">
                  DEV
                </span>
              </div>
              <h5 className="text-xl font-black tracking-tighter text-gray-900 dark:text-white leading-tight">
                그 외 사내 개발 지원
              </h5>
              <p className="text-sm font-medium leading-snug text-gray-600 dark:text-gray-400">
                자사 제품 유지보수, 사업 지원 등
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 pt-1.5 border-t border-gray-100 dark:border-gray-700/60">
                {["Spring Boot", "Python"].map((tech) => (
                  <span key={tech} className="text-xs text-gray-400/80">
                    #{tech}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
