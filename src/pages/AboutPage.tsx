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
    <div className="grid gap-6 overflow-hidden px-10 py-6 lg:grid-cols-3 xl:grid-cols-4">
      {/* 좌측 영역 */}
      <div className="flex h-full flex-col items-center justify-between overflow-y-auto pr-2 lg:col-span-1 xl:col-span-1">
        <div className="flex w-full flex-col items-center space-y-4">
          {/* 프로필 이미지 섹션 */}
          <section className="group relative mb-8">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-25 blur transition duration-1000 group-hover:opacity-50"></div>
            <img
              src={ProfileIcon}
              alt="Profile"
              className="relative h-48 w-48 rounded-full object-cover shadow-2xl ring-4 ring-white md:h-56 md:w-56 dark:ring-slate-900"
            />
          </section>

          {/* 텍스트 섹션 */}
          <section className="mb-10 space-y-3 text-center">
            <p className="font-mono text-sm tracking-widest text-blue-500 uppercase dark:text-blue-400">
              reencarnacion AKA <b>r11n</b>
            </p>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
              김성웅
            </h1>
            <div className="mx-auto h-1 w-12 rounded-full bg-blue-500"></div>{" "}
            <p className="font-medium text-gray-500 italic dark:text-gray-400">
              배우는 것을 즐기는 사람
            </p>
          </section>

          {/* 이름 하단 경력 섹션 */}
          <div className="mt-2 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <FaBriefcase className="shrink-0 text-xs text-blue-500" />
              <span className="font-bold">(주) 위OOOO</span>

              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-xs font-medium">
                Software Engineer(SI & SM)
              </span>

              <span className="hidden text-gray-300 md:inline dark:text-gray-600">
                ·
              </span>
              <span className="hidden text-xs text-gray-400 md:inline">
                2017 - 2025
              </span>
            </div>
            <div className="h-[1px] w-8 bg-gray-200 dark:bg-gray-700"></div>
          </div>

          {/* 소셜 링크 섹션 */}
          <section className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/r11n-io"
              className="rounded-2xl bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:bg-gray-800"
            >
              <FaGithub className="text-2xl text-gray-700 dark:text-gray-300" />
            </a>
            <a
              href="mailto:thearch90@gmail.com"
              className="rounded-2xl bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:bg-gray-800"
            >
              <FaEnvelope className="text-2xl text-gray-700 dark:text-gray-300" />
            </a>
          </section>
        </div>
      </div>

      {/* 중앙 영역 */}
      <div className="h-full overflow-y-auto pr-2 lg:col-span-1 xl:col-span-1">
        <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
          상세 정보
        </h2>
        <div className="mb-3 h-1 w-6 rounded-full bg-blue-500"></div>

        <section className="w-full space-y-3">
          {/* 다루어본 기술 카드 */}
          <Card theme={{ root: { children: "p-4" } }}>
            <div>
              <h4 className="mb-2 text-lg font-semibold">프론트엔드</h4>
              <div className="flex flex-wrap gap-2">
                <Badge
                  color="gray"
                  className="rounded-lg px-3 py-1 font-medium"
                >
                  <FaHtml5 className="mr-1.5 mb-[2px] inline-block align-middle" />
                  HTML
                </Badge>
                <Badge
                  color="gray"
                  className="rounded-lg px-3 py-1 font-medium"
                >
                  <FaCss3 className="mr-1.5 mb-[2px] inline-block align-middle" />
                  CSS
                </Badge>
                <Badge
                  color="gray"
                  className="rounded-lg px-3 py-1 font-medium"
                >
                  <FaJs className="mr-1.5 mb-[2px] inline-block align-middle" />
                  JavaScript
                </Badge>
                <Badge
                  color="gray"
                  className="rounded-lg px-3 py-1 font-medium"
                >
                  <FaPaperclip className="mr-1.5 mb-[2px] inline-block align-middle" />
                  JSP
                </Badge>
                <Badge
                  color="gray"
                  className="rounded-lg px-3 py-1 font-medium"
                >
                  <FaVuejs className="mr-1.5 mb-[2px] inline-block align-middle" />
                  Vue.js
                </Badge>
                <Badge
                  color="gray"
                  className="rounded-lg px-3 py-1 font-medium"
                >
                  <FaReact className="mr-1.5 mb-[2px] inline-block align-middle" />
                  React
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-lg font-semibold">백엔드</h4>
              <div className="flex flex-wrap gap-2">
                <Badge
                  color="gray"
                  className="rounded-lg px-3 py-1 font-medium"
                >
                  <FaJava className="mr-1.5 mb-[2px] inline-block align-middle" />
                  Java
                </Badge>
                <Badge
                  color="gray"
                  className="rounded-lg px-3 py-1 font-medium"
                >
                  <FaLeaf className="mr-1.5 mb-[2px] inline-block align-middle" />
                  Spring(Boot)
                </Badge>
                <Badge
                  color="gray"
                  className="rounded-lg px-3 py-1 font-medium"
                >
                  <FaPython className="mr-1.5 mb-[2px] inline-block align-middle" />
                  Python
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-lg font-semibold">데이터베이스</h4>
              <div className="flex flex-wrap gap-2">
                <Badge
                  color="gray"
                  className="rounded-lg px-3 py-1 font-medium"
                >
                  <FaDatabase className="mr-1.5 mb-[2px] inline-block align-middle" />
                  Oracle
                </Badge>
                <Badge
                  color="gray"
                  className="rounded-lg px-3 py-1 font-medium"
                >
                  <FaDatabase className="mr-1.5 mb-[2px] inline-block align-middle" />
                  MariaDB
                </Badge>
                <Badge
                  color="gray"
                  className="rounded-lg px-3 py-1 font-medium"
                >
                  <FaDatabase className="mr-1.5 mb-[2px] inline-block align-middle" />
                  Tibero
                </Badge>
                <Badge
                  color="gray"
                  className="rounded-lg px-3 py-1 font-medium"
                >
                  <FaDatabase className="mr-1.5 mb-[2px] inline-block align-middle" />
                  Altibase
                </Badge>
                <Badge
                  color="gray"
                  className="rounded-lg px-3 py-1 font-medium"
                >
                  <FaDatabase className="mr-1.5 mb-[2px] inline-block align-middle" />
                  PostgreSQL
                </Badge>
              </div>
            </div>
          </Card>
        </section>

        {/* 관심사 섹션 */}
        <section className="mt-3 w-full space-y-3">
          <Card theme={{ root: { children: "p-4" } }}>
            <h3 className="text-lg font-semibold">관심사</h3>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {["컴퓨터과학", "CI/CD", "개발방법론", "클린코드"].map(
                  (tag) => (
                    <Badge
                      key={tag}
                      color="gray"
                      className="rounded-lg px-3 py-1 font-medium"
                    >
                      {tag}
                    </Badge>
                  ),
                )}
              </div>

              <div className="my-2 h-[1px] w-full bg-gray-100 dark:bg-gray-700/50"></div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold dark:text-gray-300">
                      日本語 (現 : N3)
                    </span>
                    <span className="text-sm font-bold text-blue-500">
                      目標: N1
                    </span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                    <div className="h-full w-[60%] bg-blue-400/50"></div>{" "}
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
        <section className="mt-3 w-full space-y-3">
          <Card theme={{ root: { children: "p-4" } }}>
            <h3 className="text-lg font-semibold">TMI</h3>
            <div className="flex flex-wrap gap-2">
              {["책읽기", "커피", "조깅", "생존요리"].map((tag) => (
                <Badge
                  key={tag}
                  className="bg-accent hover:!bg-accent/80 text-tag-text rounded-md px-2 py-1 text-xs font-medium"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </Card>
        </section>
      </div>

      {/* 우측 영역 */}
      <div className="h-full overflow-y-auto pr-2 lg:col-span-1 xl:col-span-2">
        <section className="w-full">
          <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
            프로젝트 경험
          </h2>

          <div className="mb-3 h-1 w-6 rounded-full bg-blue-500"></div>

          {/* 개별 프로젝트 그리드 영역 */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-2">
            <Card
              theme={{ root: { children: "p-3 md:p-3.5" } }}
              className="h-full shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                  2017 ~ 2019
                </span>
                <span className="text-sm font-bold text-gray-400 opacity-70">
                  DEV
                </span>
              </div>
              <h5 className="text-xl leading-tight font-black tracking-tighter text-gray-900 dark:text-white">
                KN체계 성능개량
              </h5>
              <p className="text-sm leading-snug font-medium text-gray-600 dark:text-gray-400">
                응용SW 개발 및 시험평가 지원
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 border-t border-gray-100 pt-1.5 dark:border-gray-700/60">
                {["Spring", "Oracle", "Javascript"].map((tech) => (
                  <span key={tech} className="text-xs text-gray-400/80">
                    #{tech}
                  </span>
                ))}
              </div>
            </Card>
            <Card
              theme={{ root: { children: "p-3 md:p-3.5" } }}
              className="h-full shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                  2020 ~ 2021
                </span>
                <span className="text-sm font-bold text-gray-400 opacity-70">
                  SM
                </span>
              </div>
              <h5 className="text-xl leading-tight font-black tracking-tighter text-gray-900 dark:text-white">
                경찰청 정보시스템 유지보수
              </h5>
              <p className="text-sm leading-snug font-medium text-gray-600 dark:text-gray-400">
                응용 유지보수 개발 및 고객지원
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 border-t border-gray-100 pt-1.5 dark:border-gray-700/60">
                {["Spring", "Tibero", "Altibase", "JSP"].map((tech) => (
                  <span key={tech} className="text-xs text-gray-400/80">
                    #{tech}
                  </span>
                ))}
              </div>
            </Card>
            <Card
              theme={{ root: { children: "p-3 md:p-3.5" } }}
              className="h-full shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                  2021 ~ 2023
                </span>
                <span className="text-sm font-bold text-gray-400 opacity-70">
                  DEV
                </span>
              </div>
              <h5 className="text-xl leading-tight font-black tracking-tighter text-gray-900 dark:text-white">
                J체계 성능개량
              </h5>
              <p className="text-sm leading-snug font-medium text-gray-600 dark:text-gray-400">
                응용 개발 및 평가지원
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 border-t border-gray-100 pt-1.5 dark:border-gray-700/60">
                {["Spring", "Oracle", "Vue.js"].map((tech) => (
                  <span key={tech} className="text-xs text-gray-400/80">
                    #{tech}
                  </span>
                ))}
              </div>
            </Card>
            <Card
              theme={{ root: { children: "p-3 md:p-3.5" } }}
              className="h-full shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                  2024 ~ 2025
                </span>
                <span className="text-sm font-bold text-gray-400 opacity-70">
                  DEV
                </span>
              </div>
              <h5 className="text-xl leading-tight font-black tracking-tighter text-gray-900 dark:text-white">
                CY체계 탐색개발
              </h5>
              <p className="text-sm leading-snug font-medium text-gray-600 dark:text-gray-400">
                개발환경 구성, 응용SW 개발 및 시험평가 지원
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 border-t border-gray-100 pt-1.5 dark:border-gray-700/60">
                {["Spring", "Oracle", "Javascript"].map((tech) => (
                  <span key={tech} className="text-xs text-gray-400/80">
                    #{tech}
                  </span>
                ))}
              </div>
            </Card>
            <Card
              theme={{ root: { children: "p-3 md:p-3.5" } }}
              className="h-full shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                  *
                </span>
                <span className="text-sm font-bold text-gray-400 opacity-70">
                  DEV
                </span>
              </div>
              <h5 className="text-xl leading-tight font-black tracking-tighter text-gray-900 dark:text-white">
                그 외 사내 개발 지원
              </h5>
              <p className="text-sm leading-snug font-medium text-gray-600 dark:text-gray-400">
                자사 제품 유지보수, 사업 지원 등
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 border-t border-gray-100 pt-1.5 dark:border-gray-700/60">
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
