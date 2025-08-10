# 🤖 BMAD 메소드 한글 버전 (완전판)

<div align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/bmad-4.35.3-green.svg" alt="BMAD Base">
  <img src="https://img.shields.io/badge/번역-100%25-success.svg" alt="Translation">
  <img src="https://img.shields.io/badge/license-MIT-yellow.svg" alt="License">
</div>

## 📌 소개

**BMAD 메소드 한글 버전**은 원본 [BMAD Method v4.35.3](https://github.com/bmadcode/bmad-method)의 **100% 완전한 한글화 버전**입니다. 모든 에이전트, 작업, 템플릿, 체크리스트, 워크플로우가 빠짐없이 번역되어 한국어 사용자가 편리하게 사용할 수 있습니다.

### 🌟 주요 특징

- ✅ **100% 완전 번역**: 모든 파일과 내용이 한글로 번역됨
- ✅ **원본 기능 완벽 보존**: BMAD v4.35.3의 모든 기능 유지
- ✅ **17개 전문 에이전트**: PM, 아키텍트, 개발자, QA 등 모든 역할 포함
- ✅ **확장팩 포함**: 게임 개발, DevOps 등 전문 분야 확장팩도 번역
- ✅ **즉시 사용 가능**: 설치 후 바로 한글로 사용 가능

## 🚀 빠른 시작

### 설치

```bash
# npm을 통한 설치
npm install -g bmad-method-korean

# 또는 npx로 직접 실행
npx bmad-method-korean install

# 프로젝트에 설치
cd your-project
bmad-korean init
```

### 기본 사용법

```bash
# 웹 UI 또는 강력한 IDE에서
@제품관리자 새로운 프로젝트의 PRD를 작성해줘
@아키텍트 마이크로서비스 아키텍처를 설계해줘
@개발자 사용자 인증 기능을 구현해줘
@품질보증 작성된 코드를 리뷰하고 개선사항을 제안해줘
```

## 📋 전체 에이전트 목록

### 핵심 에이전트 (10개)
| 에이전트 | ID | 역할 | 주요 기능 |
|---------|-----|------|----------|
| 📋 제품관리자 | pm | Product Manager | PRD 작성, 제품 전략, 기능 우선순위 |
| 🏗️ 아키텍트 | architect | System Architect | 시스템 설계, 기술 스택 선택 |
| 💻 개발자 | dev | Full-Stack Developer | 코드 구현, 디버깅, 테스트 작성 |
| 🔍 품질보증 | qa | Quality Assurance | 코드 리뷰, 품질 검증, 리팩토링 |
| 🏃 스크럼마스터 | sm | Scrum Master | 스토리 작성, 스프린트 관리 |
| 👤 제품소유자 | po | Product Owner | 요구사항 검증, 백로그 관리 |
| 🎨 UX전문가 | ux-expert | UX Expert | UI/UX 설계, 사용자 경험 최적화 |
| 📊 분석가 | analyst | Business Analyst | 시장 조사, 경쟁 분석, 데이터 분석 |
| 🧙 BMAD마스터 | bmad-master | BMAD Master | 종합 업무 처리, 모든 역할 수행 가능 |
| 🎭 BMAD오케스트레이터 | bmad-orchestrator | Orchestrator | 워크플로우 조정, 에이전트 전환 |

### 확장팩 에이전트 (7개)
| 확장팩 | 에이전트 | 역할 |
|--------|---------|------|
| 🎮 2D Phaser 게임 개발 | 게임디자이너, 게임개발자, 게임SM | 2D 웹 게임 개발 전문 |
| 🎯 2D Unity 게임 개발 | 게임아키텍트, 게임디자이너, 게임개발자, 게임SM | Unity 2D 게임 개발 전문 |
| ⚙️ 인프라/DevOps | 인프라DevOps플랫폼 | 클라우드 인프라 및 DevOps |

## 📁 프로젝트 구조

```
bmad-한글버전/
├── 📄 package.json              # 패키지 메타데이터
├── 📄 README.md                 # 이 문서
├── 📁 .bmad-core/               # 핵심 BMAD 시스템
│   ├── 📁 agents/               # 17개 에이전트 정의
│   ├── 📁 tasks/                # 17개 작업 파일
│   ├── 📁 templates/            # 12개 문서 템플릿
│   ├── 📁 checklists/           # 6개 체크리스트
│   ├── 📁 workflows/            # 6개 워크플로우
│   ├── 📁 data/                 # 지식베이스 및 데이터
│   ├── 📁 utils/                # 유틸리티 파일
│   ├── 📁 agent-teams/          # 팀 구성 파일
│   ├── 📄 사용자가이드.md       # 상세 사용법
│   ├── 📄 브라운필드작업.md     # 기존 프로젝트 가이드
│   └── 📄 core-config.yaml      # 핵심 설정
├── 📁 web-bundles/              # 웹 플랫폼용 번들
│   ├── 📁 agents/               # 웹용 에이전트 파일
│   ├── 📁 teams/                # 팀 구성 번들
│   └── 📁 expansion-packs/      # 확장팩 번들
└── 📁 scripts/                  # 설치 및 유틸리티 스크립트
```

## 🎯 주요 기능

### 1. 완전한 프로젝트 라이프사이클 지원

```mermaid
graph LR
    A[아이디어] --> B[시장조사]
    B --> C[PRD 작성]
    C --> D[아키텍처 설계]
    D --> E[스토리 작성]
    E --> F[개발]
    F --> G[QA/테스트]
    G --> H[배포]
```

### 2. 체계적인 문서 생성
- 📋 제품 요구사항 문서 (PRD)
- 🏗️ 시스템 아키텍처 문서
- 📱 프런트엔드 스펙
- 📊 시장 조사 보고서
- 🎯 경쟁사 분석
- 📝 사용자 스토리

### 3. 품질 보증 체계
- ✅ 자동화된 체크리스트
- 🔍 코드 리뷰 프로세스
- 🧪 테스트 전략 수립
- 📈 품질 메트릭 추적

## 💡 사용 예시

### 새 프로젝트 시작
```bash
# 1. 프로젝트 아이디어 분석
@분석가 온라인 교육 플랫폼에 대한 시장 조사를 수행해줘

# 2. PRD 작성
@제품관리자 온라인 교육 플랫폼의 PRD를 작성해줘

# 3. 아키텍처 설계
@아키텍트 마이크로서비스 기반의 풀스택 아키텍처를 설계해줘

# 4. 개발 시작
@스크럼마스터 첫 번째 스프린트의 스토리를 작성해줘
@개발자 사용자 등록 기능을 구현해줘
```

### 기존 프로젝트 개선
```bash
# 브라운필드 프로젝트 분석
@분석가 현재 시스템의 문제점을 분석해줘
@제품관리자 개선을 위한 브라운필드 PRD를 작성해줘
@아키텍트 점진적 마이그레이션 전략을 수립해줘
```

## 🛠️ 고급 기능

### 기술 선호도 설정
`.bmad-core/data/기술-선호도.md` 파일을 편집하여 프로젝트별 기술 스택을 설정할 수 있습니다.

### 워크플로우 커스터마이징
`.bmad-core/workflows/` 디렉토리의 YAML 파일들을 수정하여 프로젝트에 맞는 워크플로우를 구성할 수 있습니다.

### 확장팩 추가
새로운 도메인이나 기술 스택을 위한 확장팩을 추가할 수 있습니다.

## 📚 문서 및 리소스

- 📖 **[사용자 가이드](./.bmad-core/사용자가이드.md)** - 상세한 사용법
- 🏗️ **[브라운필드 가이드](./.bmad-core/브라운필드에서작업하기.md)** - 기존 프로젝트 작업
- 🚀 **[IDE 워크플로우](./.bmad-core/향상된IDE개발워크플로우.md)** - IDE 통합 가이드
- 🤖 **[에이전트 생성 가이드](./docs/새에이전트만들기.md)** - 커스텀 에이전트 생성

## 🤝 기여하기

이 프로젝트는 오픈소스입니다. 다음과 같은 방법으로 기여할 수 있습니다:

1. 🐛 버그 리포트 및 기능 제안
2. 📝 번역 개선 및 오타 수정
3. 🤖 새로운 에이전트 및 템플릿 추가
4. 📚 문서 개선 및 예제 추가

### 기여 방법
```bash
# 1. 포크
git clone https://github.com/your-username/bmad-method-korean.git

# 2. 브랜치 생성
git checkout -b feature/amazing-feature

# 3. 변경사항 커밋
git commit -m '놀라운 기능 추가'

# 4. 푸시
git push origin feature/amazing-feature

# 5. Pull Request 생성
```

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포할 수 있습니다.

## 🔗 관련 링크

- 🌐 **원본 BMAD Method**: [github.com/bmadcode/bmad-method](https://github.com/bmadcode/bmad-method)
- 💬 **Discord 커뮤니티**: [discord.gg/gk8jAdXWmj](https://discord.gg/gk8jAdXWmj)
- 📺 **YouTube 채널**: [youtube.com/@BMadCode](https://www.youtube.com/@BMadCode)
- 📧 **이메일**: bmad.korean@gmail.com

## 🙏 감사의 말

- 원본 BMAD Method 개발팀
- 한글 번역에 참여한 모든 기여자들
- 피드백을 주신 한국 개발자 커뮤니티

---

<div align="center">
  <strong>🚀 BMAD 메소드 한글 버전으로 더 효율적이고 체계적인 개발을 시작하세요!</strong>
  
  Made with ❤️ by BMAD Korean Community
</div>
