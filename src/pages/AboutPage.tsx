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

// TechBadge 전용 타입 선언
interface TechBadgeProps {
  icon: React.ReactNode; // 또는 IconType (react-icons 사용 시)
  label: string;
}

const TechBadge: React.FC<TechBadgeProps> = ({ icon, label }) => (
  <Badge
    color="gray"
    className="border-secondary-text/5 bg-main/50 hover:border-accent/30 hover:bg-surface dark:bg-main/30 rounded-lg border px-2.5 py-1.5 transition-all"
  >
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      <span className="text-secondary-text group-hover:text-accent flex items-center justify-center transition-colors">
        {icon}
      </span>
      <span className="text-primary-text text-xs leading-none font-semibold">
        {label}
      </span>
    </div>
  </Badge>
);

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
            <div className="to-accent absolute -inset-1 rounded-full bg-gradient-to-r from-0% opacity-25 blur transition duration-1000 group-hover:opacity-50"></div>
            <img
              src={ProfileIcon}
              alt="Profile"
              className="relative h-48 w-48 rounded-full object-cover shadow-2xl"
            />
          </section>

          {/* 텍스트 섹션 */}
          <section className="mb-10 space-y-3 text-center">
            <p className="text-accent font-mono text-xs font-black tracking-[0.3em] uppercase">
              reencarnacion AKA{" "}
              <b className="text-accent decoration-accent/30 underline underline-offset-4">
                r11n
              </b>
            </p>
            <h1 className="text-primary-text text-3xl font-black tracking-tighter">
              김성웅
            </h1>
            <div className="bg-accent shadow-accent/20 mx-auto h-1.5 w-10 rounded-full shadow-sm"></div>
            <p className="text-secondary-text/80 text-sm font-medium italic">
              "배우는 것을 즐기는 사람"
            </p>
          </section>

          {/* 이름 하단 경력 섹션 */}
          <div className="mt-2 flex flex-col items-center gap-2">
            <div className="text-primary-text flex items-center gap-2 text-sm">
              <FaBriefcase className="text-accent/80 shrink-0 text-[10px]" />
              <span className="font-bold tracking-tight">(주) 위OOOO</span>
              <span className="text-secondary-text opacity-20">|</span>
              <span className="text-secondary-text text-xs font-semibold">
                Software Engineer (SI & SM)
              </span>
              <span className="text-secondary-text hidden opacity-30 md:inline">
                ·
              </span>
              <span className="text-secondary-text/60 hidden text-[11px] font-medium tracking-tighter md:inline">
                2017 - 2025
              </span>
            </div>

            <div className="bg-secondary-text/10 dark:bg-secondary-text/5 h-[1px] w-6"></div>
          </div>

          {/* 소셜 링크 섹션 */}
          <section className="flex items-center justify-center gap-4 py-4">
            <a
              href="https://github.com/r11n-io"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-surface border-secondary-text/5 hover:shadow-accent/10 hover:border-accent/30 rounded-2xl border p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <FaGithub className="text-secondary-text group-hover:text-accent text-2xl transition-colors duration-300" />
            </a>
            <a
              href="mailto:thearch90@gmail.com"
              className="group bg-surface border-secondary-text/5 hover:shadow-accent/10 hover:border-accent/30 rounded-2xl border p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <FaEnvelope className="text-secondary-text group-hover:text-accent text-2xl transition-colors duration-300" />
            </a>
          </section>
        </div>
      </div>

      {/* 중앙 영역 */}
      <div className="h-full overflow-y-auto pr-2 lg:col-span-1 xl:col-span-1">
        <header className="mb-6 flex flex-col items-start gap-1">
          <span className="text-accent/60 text-[10px] font-black tracking-[0.2em] uppercase">
            Detailed Info
          </span>
          <h2 className="text-primary-text text-xl font-black tracking-tighter">
            상세 정보
          </h2>
          <div className="bg-accent shadow-accent/30 mt-1 h-1.5 w-8 rounded-full shadow-sm"></div>
        </header>

        <section className="w-full space-y-3">
          {/* 다루어본 기술 카드 */}
          <Card
            className="!bg-surface !border-secondary-text/10 top-6 shadow-sm"
            theme={{ root: { children: "p-4" } }}
          >
            <div className="group/section">
              <div className="mb-3 flex items-center gap-2">
                <div className="bg-accent h-1 w-1 rounded-full"></div>{" "}
                {/* 작은 포인트 점 */}
                <h4 className="text-secondary-text/70 group-hover/section:text-accent text-sm font-black tracking-widest uppercase transition-colors">
                  Frontend
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <TechBadge icon={<FaHtml5 />} label="HTML" />
                <TechBadge icon={<FaCss3 />} label="CSS" />
                <TechBadge icon={<FaJs />} label="JavaScript" />
                <TechBadge icon={<FaPaperclip />} label="JSP" />
                <TechBadge icon={<FaVuejs />} label="Vue.js" />
                <TechBadge icon={<FaReact />} label="React" />
              </div>
            </div>

            {/* 백엔드 섹션 */}
            <div className="group/section">
              <div className="mb-3 flex items-center gap-2">
                <div className="bg-accent h-1 w-1 rounded-full"></div>
                <h4 className="text-secondary-text/70 group-hover/section:text-accent text-sm font-black tracking-widest uppercase transition-colors">
                  Backend
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <TechBadge icon={<FaJava />} label="Java" />
                <TechBadge icon={<FaLeaf />} label="Spring(Boot)" />
                <TechBadge icon={<FaPython />} label="Python" />
              </div>
            </div>

            {/* 데이터베이스 섹션 */}
            <div className="group/section">
              <div className="mb-3 flex items-center gap-2">
                <div className="bg-accent h-1 w-1 rounded-full"></div>
                <h4 className="text-secondary-text/70 group-hover/section:text-accent text-sm font-black tracking-widest uppercase transition-colors">
                  Database
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <TechBadge icon={<FaDatabase />} label="Oracle" />
                <TechBadge icon={<FaDatabase />} label="MariaDB" />
                <TechBadge icon={<FaDatabase />} label="PostgreSQL" />
                {/* ... 나머지 생략 */}
              </div>
            </div>
          </Card>
        </section>

        {/* 관심사 섹션 */}
        <section className="mt-3 w-full space-y-3">
          <Card
            className="!bg-surface !border-secondary-text/10 shadow-sm"
            theme={{ root: { children: "p-4 space-y-3" } }}
          >
            <div className="mb-1 flex items-center gap-2">
              <div className="bg-accent h-1 w-1 rounded-full"></div>
              <h3 className="text-secondary-text/70 text-sm font-black tracking-widest uppercase">
                관심
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {["컴퓨터과학", "CI/CD", "개발방법론", "클린코드"].map(
                  (tag) => (
                    <Badge
                      key={tag}
                      color="gray"
                      className="border-secondary-text/5 bg-main/50 text-primary-text hover:border-accent/30 dark:bg-main/30 rounded-lg border px-3 py-1 text-xs font-bold transition-colors"
                    >
                      {tag}
                    </Badge>
                  ),
                )}
              </div>

              <div className="bg-secondary-text/10 h-[1px] w-full"></div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-end justify-between">
                    <span className="text-primary-text text-xs font-bold">
                      日本語{" "}
                      <span className="text-secondary-text ml-1 text-[10px] font-medium">
                        (現 : N3)
                      </span>
                    </span>
                    <span className="text-accent text-[11px] font-black tracking-tighter uppercase">
                      目標 : N1
                    </span>
                  </div>
                  <div className="bg-secondary-text/10 h-1.5 w-full overflow-hidden rounded-full">
                    <div className="bg-accent/60 h-full w-[60%] shadow-[0_0_8px_rgba(var(--color-accent-rgb),0.4)]"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="border-secondary-text/10 flex flex-col gap-1 border-l-2 pl-3">
                    <span className="text-secondary-text/50 text-[10px] font-black tracking-wider uppercase">
                      中文 目标
                    </span>
                    <span className="text-primary-text text-xs font-bold">
                      HSK 4级 取得
                    </span>
                  </div>
                  <div className="border-secondary-text/10 flex flex-col gap-1 border-l-2 pl-3">
                    <span className="text-secondary-text/50 text-[10px] font-black tracking-wider uppercase">
                      English Goal
                    </span>
                    <span className="text-primary-text text-xs font-bold">
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
          <Card
            className="!bg-surface !border-secondary-text/10 top-6 shadow-sm"
            theme={{ root: { children: "p-4" } }}
          >
            <div className="mb-1 flex items-center gap-2">
              <div className="bg-accent h-1 w-1 rounded-full"></div>
              <h3 className="text-secondary-text/70 text-sm font-black tracking-widest uppercase">
                TMI
              </h3>
            </div>
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
          <header className="mb-6 flex flex-col items-start gap-1">
            <span className="text-accent/60 text-[10px] font-black tracking-[0.2em] uppercase">
              Project Experience
            </span>
            <h2 className="text-primary-text text-xl font-black tracking-tighter">
              프로젝트 경험
            </h2>
            <div className="bg-accent shadow-accent/30 mt-1 h-1.5 w-8 rounded-full shadow-sm transition-all duration-300"></div>
          </header>

          {/* 개별 프로젝트 그리드 영역 */}
          <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 xl:grid-cols-2">
            <Card
              theme={{ root: { children: "p-4 space-y-1" } }}
              className="!bg-surface !border-secondary-text/10 hover:border-accent/30 group h-fit shadow-sm transition-all"
            >
              <div className="mb-0.5 flex items-center justify-between leading-none">
                <span className="text-accent/90 text-xs font-black tracking-wider">
                  2017 — 2019
                </span>
                <span className="text-secondary-text/30 text-[10px] font-bold tracking-widest uppercase">
                  SI
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h5 className="text-primary-text group-hover:text-accent text-[19px] leading-tight font-black tracking-tighter transition-colors">
                  KN체계 성능개량
                </h5>
                <p className="text-secondary-text/90 text-sm leading-snug font-medium">
                  응용SW 개발 및 시험평가 지원
                </p>
              </div>

              <div className="border-secondary-text/5 mt-1 flex flex-wrap gap-x-2.5 gap-y-1 border-t pt-2.5">
                {["Spring", "Oracle", "Javascript"].map((tech) => (
                  <span
                    key={tech}
                    className="text-secondary-text/50 hover:text-accent/80 text-[11px] font-bold transition-colors"
                  >
                    #{tech}
                  </span>
                ))}
              </div>
            </Card>
            <Card
              theme={{ root: { children: "p-4 space-y-1" } }}
              className="!bg-surface !border-secondary-text/10 hover:border-accent/30 group h-fit shadow-sm transition-all"
            >
              <div className="mb-0.5 flex items-center justify-between leading-none">
                <span className="text-accent/90 text-xs font-black tracking-wider">
                  2020 — 2021
                </span>
                <span className="text-secondary-text/30 text-[10px] font-bold tracking-widest uppercase">
                  SM
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h5 className="text-primary-text group-hover:text-accent text-[19px] leading-tight font-black tracking-tighter transition-colors">
                  경찰청 정보시스템 유지보수
                </h5>
                <p className="text-secondary-text/90 text-sm leading-snug font-medium">
                  응용 유지보수 개발 및 고객지원
                </p>
              </div>

              <div className="border-secondary-text/5 mt-1 flex flex-wrap gap-x-2.5 gap-y-1 border-t pt-2.5">
                {["Spring", "Tibero", "Altibase", "JSP"].map((tech) => (
                  <span
                    key={tech}
                    className="text-secondary-text/50 hover:text-accent/80 text-[11px] font-bold transition-colors"
                  >
                    #{tech}
                  </span>
                ))}
              </div>
            </Card>
            <Card
              theme={{ root: { children: "p-4 space-y-1" } }}
              className="!bg-surface !border-secondary-text/10 hover:border-accent/30 group h-fit shadow-sm transition-all"
            >
              <div className="mb-0.5 flex items-center justify-between leading-none">
                <span className="text-accent/90 text-xs font-black tracking-wider">
                  2021 — 2023
                </span>
                <span className="text-secondary-text/30 text-[10px] font-bold tracking-widest uppercase">
                  SI
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h5 className="text-primary-text group-hover:text-accent text-[19px] leading-tight font-black tracking-tighter transition-colors">
                  J체계 성능개량
                </h5>
                <p className="text-secondary-text/90 text-sm leading-snug font-medium">
                  응용 개발 및 평가지원
                </p>
              </div>

              <div className="border-secondary-text/5 mt-1 flex flex-wrap gap-x-2.5 gap-y-1 border-t pt-2.5">
                {["Spring", "Oracle", "Vue.js"].map((tech) => (
                  <span
                    key={tech}
                    className="text-secondary-text/50 hover:text-accent/80 text-[11px] font-bold transition-colors"
                  >
                    #{tech}
                  </span>
                ))}
              </div>
            </Card>
            <Card
              theme={{ root: { children: "p-4 space-y-1" } }}
              className="!bg-surface !border-secondary-text/10 hover:border-accent/30 group h-fit shadow-sm transition-all"
            >
              <div className="mb-0.5 flex items-center justify-between leading-none">
                <span className="text-accent/90 text-xs font-black tracking-wider">
                  2024 — 2025
                </span>
                <span className="text-secondary-text/30 text-[10px] font-bold tracking-widest uppercase">
                  SI
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h5 className="text-primary-text group-hover:text-accent text-[19px] leading-tight font-black tracking-tighter transition-colors">
                  CY체계 탐색개발
                </h5>
                <p className="text-secondary-text/90 text-sm leading-snug font-medium">
                  개발환경 구성, 응용SW 개발 및 시험평가 지원
                </p>
              </div>

              <div className="border-secondary-text/5 mt-1 flex flex-wrap gap-x-2.5 gap-y-1 border-t pt-2.5">
                {["Spring", "Oracle", "Javascript"].map((tech) => (
                  <span
                    key={tech}
                    className="text-secondary-text/50 hover:text-accent/80 text-[11px] font-bold transition-colors"
                  >
                    #{tech}
                  </span>
                ))}
              </div>
            </Card>
            <Card
              theme={{ root: { children: "p-4 space-y-1" } }}
              className="!bg-surface !border-secondary-text/10 hover:border-accent/30 group h-fit shadow-sm transition-all"
            >
              <div className="mb-0.5 flex items-center justify-between leading-none">
                <span className="text-accent/90 text-xs font-black tracking-wider">
                  *
                </span>
                <span className="text-secondary-text/30 text-[10px] font-bold tracking-widest uppercase">
                  ETC
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h5 className="text-primary-text group-hover:text-accent text-[19px] leading-tight font-black tracking-tighter transition-colors">
                  그 외 사내 개발 지원
                </h5>
                <p className="text-secondary-text/90 text-sm leading-snug font-medium">
                  자사 제품 유지보수, 사업 지원 등
                </p>
              </div>

              <div className="border-secondary-text/5 mt-1 flex flex-wrap gap-x-2.5 gap-y-1 border-t pt-2.5">
                {["Spring Boot", "Python"].map((tech) => (
                  <span
                    key={tech}
                    className="text-secondary-text/50 hover:text-accent/80 text-[11px] font-bold transition-colors"
                  >
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
