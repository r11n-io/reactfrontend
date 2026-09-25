# 작업 규칙

혼자 진행하는 프로젝트지만, main을 항상 배포 가능한 상태로 유지하고 Vercel 프리뷰를 활용하기 위한 최소한의 규칙.

## 브랜치 네이밍

`<타입>/<영어-kebab-case-설명>` 형식.

- `feat/` — 새 기능
- `fix/` — 버그 수정
- `style/` — CSS/스타일 전용 변경
- `chore/` — 설정, 의존성, 문서 등
- `refactor/` — 동작 변화 없는 내부 정리

설명 부분은 영어 kebab-case로 작성 (한글 브랜치명은 Vercel 프리뷰 URL이 깨질 수 있음).

예: `feat/token-refresh`, `fix/loading-flash`, `style/mobile-responsive`

## 작업 흐름

1. 작업 단위별로 브랜치 생성
2. 로컬에서 자유롭게 커밋 (커밋 메시지는 기존처럼 한글 유지)
3. 어느 정도 진행되면 push → GitHub Actions CI(lint/build/test)와 Vercel 프리뷰 URL로 확인
4. 문제 없으면 main으로 squash merge (merge 시 원격 브랜치는 자동 삭제됨)
5. 로컬 브랜치도 `git checkout main && git pull && git branch -d <브랜치명>`으로 정리

## CI

`.github/workflows/ci.yml`에서 push/PR마다 `lint` → `build`(typecheck 포함) → `test`를 자동 실행한다.

## Merge 방식

Squash merge. main 히스토리는 항상 의미 단위로 1커밋씩 남긴다.

## 예외

오타나 사소한 문구 수정처럼 프리뷰 확인이 필요 없는 초경량 변경은 브랜치 없이 main에 바로 커밋해도 된다.
