# create-handoff-package

## 목적
- 수신 부서가 즉시 이어받아 처리할 수 있도록 컨텍스트 풀패키지를 구성합니다.
- 고객/시스템/정책/증빙을 한 번에 전달하여 재질문·지연을 최소화합니다.

## 메타데이터 헤더(공통)
- 반드시 기록: `case_id`, `updated_at(ISO/타임존)`, `author`, `owner`, `status_before`, `status_after`, `links[]`

## RBAC
- 수행: `cs-handoff-processor`
- 승인: 수신 부서 리드, `cs-manager`

## 입력
- 적격성 보고서: `cases/{case_id}-handoff-assessment.md`
- 접수/분류/처리 자료: `inquiry.md`, `route-decision.md`, `processing-notes.md`
- 정책·보안: `.bmad-cs-operations/data/policies.md`, `departments.yaml`
- 템플릿: `handoff-package-tmpl.yaml`

## 산출물
- 이관 패키지 디렉토리: `cases/{case_id}-handoff-package/`
  - `customer-context.md`(요약/히스토리/선호 채널)
  - `case-history.md`(타임라인/결정/조치/상태)
  - `requirements-summary.md`(요구·Done 기준·제약·리스크)
  - `evidence-links.md`(티켓/PR/로그/스크린샷 링크)
  - `contact-information.md`(발신/수신 담당/연락 채널/업데이트 주기)
  - `privacy-notes.md`(PII/민감정보 마스킹 정책 및 주의)
  - `handoff-readme.md`(빠른 시작, 다음 액션, ETA 제안)
- 패키지 색인: `cases/{case_id}-handoff-index.md`
- 상태: `transferring`

## 상태 전이
- before: `handoff-candidate` → after: `transferring`
- guard: 필수 포함 항목 충족, PII·권한 점검 완료, 색인 작성

## 필수 포함 항목(요약)
- 배경/목적/현상 요약(3~5문장)
- 고객 영향/우선순위/SLA/타임존
- Done 정의(수신 부서 관점, 체크리스트)
- 제약/의존성/차단요인, 위험도(RAG)
- 필요한 권한/접근/승인 절차
- 업데이트 주기/채널/소유자, 에스컬레이션 경로

## 개인정보/보안
- PII·결제/계정 식별자는 반드시 마스킹 또는 토큰화
- 내부 링크 권한 점검(사내 SSO/프로젝트 권한), 외부 공유 금지
- privacy-notes에 마스킹 규칙과 금지 목록 명시

### 마스킹 규칙 예시(개별 강화)
- 이메일: `john.doe@example.com` → `j***@example.com`
- 전화번호: `010-1234-5678` → `010-****-5678`
- 카드번호: `1111-2222-3333-4444` → `****-****-****-4444`

## 단계별 지침
1) 템플릿 `handoff-package-tmpl.yaml` 기준으로 섹션 구조 확정
2) 컨텐츠 수집: 접수/처리/증빙에서 핵심만 요약, 중복·내부 상세는 링크로 대체
3) Done 기준·마일스톤·ETA 제안 작성(수신 부서가 바로 실행 가능하도록)
4) 연락·업데이트 규약 명시: 담당자/채널/주기/지연 시 에스컬레이션 경로
5) PII/권한 점검 후 패키지 디렉토리에 파일 생성
6) 색인(`handoff-index.md`)에 파일 맵/링크/최종 점검 체크리스트 기입
7) 상태 `transferring`으로 전환하고 28번 `coordinate-transfer` 호출

## 색인 최종 검토 체크리스트(개별 강화)
- [ ] Done 기준/마일스톤/ETA 기입
- [ ] 권한/보안 점검 완료 표시
- [ ] 연락/업데이트/에스컬레이션 경로 기입
- [ ] PII 마스킹 규칙 링크

## 검증 체크리스트
- [ ] Done 기준/마일스톤/ETA가 명확
- [ ] 증빙 링크가 유효하고 권한 적절
- [ ] PII/민감정보 마스킹 및 정책 노트 포함
- [ ] 연락·업데이트·에스컬레이션 경로 명시
- [ ] 수신 부서가 추가 질문 없이 시작 가능

## 실패/에스컬레이션
- 필수 정보 부재: 원 소스에서 보강 후 재시도, 긴급 시 수신 부서와 동시 조율
- 권한 문제: 접근 권한 요청 티켓 생성, 임시 스크린샷/요약으로 대체 안내

## 색인 템플릿(붙여넣기)
```markdown
# Handoff Index (Case {{case_id}})
- Package Path: cases/{{case_id}}-handoff-package/
- Contents:
  - customer-context.md
  - case-history.md
  - requirements-summary.md
  - evidence-links.md
  - contact-information.md
  - privacy-notes.md
  - handoff-readme.md
- Owners: sender {{sender}}, receiver {{receiver}}
- Update Cadence: {{cadence}}
- Escalation Path: {{path}}
- Final Checklist: {{checked_items}}
```

## 연계/핸드오프
- 다음 단계: `coordinate-transfer` → `notify-customer` → `track-post-handoff`
