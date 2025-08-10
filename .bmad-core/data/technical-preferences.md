# 기술적 선호도

이 파일은 BMAD 에이전트들이 사용할 기술적 선호도와 표준을 정의합니다. 프로젝트별로 커스터마이징하세요.

## 프런트엔드

### 프레임워크
- **선호**: React 18+ with TypeScript
- **대안**: Vue 3, Next.js 14+
- **피하기**: 오래된 프레임워크 버전

### 상태 관리
- **선호**: Zustand, TanStack Query
- **대안**: Redux Toolkit, Jotai
- **피하기**: 레거시 Redux 패턴

### 스타일링
- **선호**: Tailwind CSS
- **대안**: CSS Modules, Styled Components
- **피하기**: 인라인 스타일, 전역 CSS

### 빌드 도구
- **선호**: Vite
- **대안**: Next.js (풀스택인 경우)
- **피하기**: Create React App

## 백엔드

### 언어 & 런타임
- **선호**: Node.js 20+ with TypeScript
- **대안**: Python 3.11+, Go 1.21+
- **피하기**: 구버전 런타임

### 프레임워크
- **Node.js**: Express + TypeScript, Fastify
- **Python**: FastAPI, Django REST
- **Go**: Gin, Echo

### 데이터베이스
- **관계형**: PostgreSQL 15+
- **NoSQL**: MongoDB 6+, Redis 7+
- **피하기**: 프로덕션에서 SQLite

### API 스타일
- **선호**: REST with OpenAPI
- **대안**: GraphQL (복잡한 쿼리가 필요한 경우)
- **피하기**: SOAP, 문서화되지 않은 API

## 인프라 & DevOps

### 클라우드 제공자
- **선호**: AWS
- **대안**: GCP, Azure
- **고려사항**: 비용 최적화, 리전 요구사항

### 컨테이너화
- **선호**: Docker with multi-stage builds
- **오케스트레이션**: Kubernetes (대규모), Docker Compose (소규모)
- **피하기**: 컨테이너 없는 배포

### CI/CD
- **선호**: GitHub Actions
- **대안**: GitLab CI, CircleCI
- **요구사항**: 자동화된 테스트, 보안 스캔

### 모니터링
- **로깅**: ELK Stack, CloudWatch
- **APM**: DataDog, New Relic
- **에러 추적**: Sentry

## 개발 표준

### 코드 품질
- **린터**: ESLint, Prettier
- **타입 체크**: TypeScript strict mode
- **커밋**: Conventional Commits

### 테스트
- **단위 테스트**: Jest, Vitest
- **통합 테스트**: Supertest
- **E2E**: Playwright, Cypress
- **커버리지 목표**: 80%+

### 보안
- **인증**: JWT with refresh tokens
- **암호화**: bcrypt for passwords
- **HTTPS**: 항상 사용
- **보안 헤더**: Helmet.js

### 문서화
- **API**: OpenAPI/Swagger
- **코드**: JSDoc/TSDoc
- **아키텍처**: ADR (Architecture Decision Records)

## 프로젝트별 커스터마이징

### 스타트업/MVP
- 빠른 개발 우선
- 검증된 기술 스택 사용
- 모놀리스 아키텍처 시작

### 엔터프라이즈
- 확장성과 유지보수성 우선
- 마이크로서비스 고려
- 엄격한 보안 요구사항

### 성능 중심
- 캐싱 전략 필수
- CDN 활용
- 데이터베이스 최적화

## 피해야 할 안티패턴

1. **과도한 엔지니어링**: MVP에 불필요한 복잡성 추가
2. **문서화 부족**: 코드만 있고 문서가 없음
3. **테스트 부재**: 테스트 없는 코드 배포
4. **보안 무시**: 기본 보안 조치 미적용
5. **기술 부채 축적**: 리팩토링 없는 지속적 기능 추가

## 업데이트 가이드

이 파일을 프로젝트 시작 시 검토하고 업데이트하세요:
1. 팀의 기술 스택 경험 고려
2. 프로젝트 요구사항에 맞게 조정
3. 클라이언트/이해관계자 제약사항 반영
4. 정기적으로 검토하고 업데이트

---
*이 문서는 살아있는 문서입니다. 프로젝트 진행에 따라 업데이트하세요.*
