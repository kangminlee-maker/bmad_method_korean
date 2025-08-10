# CS Operations Policies and Processes (scope: tasks 14–33)

본 문서는 CS 확장팩의 운영 원칙, 우선순위·SLA, 협업/이관, 제품 경로, 발송 품질 보증, 로깅/감사 및 작업 간 연결 규칙을 정의합니다. 정책 변경 시 이 문서를 반드시 갱신합니다.

## 1) 범위(해당 작업)
- 접수/분류/에스컬레이션: 14 intake-new-inquiry, 15 classify-and-route, 16 escalate-urgent
- 협업: 17 delegate-to-department, 18 track-external-work, 19 verify-completion, 20 integrate-responses
- 처리/답변: 21 process-inquiry, 22 draft-response, 23 finalize-response, 24 review-response, 25 compliance-check
- 이관: 26 assess-handoff-eligibility, 27 create-handoff-package, 28 coordinate-transfer, 29 notify-customer, 30 track-post-handoff
- 운영: 31 close-case, 32 collect-csat, 33 generate-weekly-report

## 2) 우선순위·SLA 정책
- P1 즉시 지정(다음 중 하나라도 충족): VIP 고객 / 결제·환불 관련 불만 / 공정위·소보원 등 신고 의사 / 욕설·격앙 톤
- 목표: P1 15m, P2 60m, P3 4h(초기 접수 기준). 에스컬레이션 L1/L2 규칙은 16번 문서 준수.

## 3) 협업(타 부서) 프로세스
- 요청서(17) → 추적(18) → 완료 검증(19) → 통합 답변(20)
- 상태: waiting-external → external-in-progress → external-delayed → external-complete
- 지연 기준: 계획 대비 ≥20% 지연 또는 주기 미준수 시 경보, 기한 초과/지속 지연 시 L1/L2

## 4) 완전 이관(Handoff) 프로세스
- 적격성(26) → 패키지(27) → 전환 조정(28) → 고객 안내(29) → 사후 추적(30)
- 전환 확인서에 일정/담당/채널/Done/에스컬레이션/서명(content_hash) 기록 필수
- 이관 결정은 사람 리뷰/Sign-off(reviewer, signed_at) 완료 후에만 확정됩니다.

## 5) 제품 경로(서비스 기능 문제/개선 제안)
- 분류 시 `product-bug`/`feature-request`면 PM 경로(`to_pm`) 분기(15)
- 브리프 작성(새 〈product-feedback-brief〉 템플릿) → PM 핸드오프(핵심 SLA: 48h 내 1차 판단)
- PM 실행 예: `@pm *create-prd`(또는 `@pm *create-brownfield-prd`), 이후 에픽/스토리 생성 → Dev/QA 진행
- 고객 안내 시 제품팀 접수/기획 착수 스니펫 사용(29)

## 6) 고객 발송 품질 보증(필수)
- 발송 전 사람 리뷰/Sign-off(24): reviewer, signed_at, content_hash 기록
- pre-send preview(23): 수신자/채널/제목/본문 렌더링/첨부·링크/발송 시각·타임존 포함, content_hash 계산·보관
- 발송 가능 조건: preview의 content_hash == review Sign-off 기록 값
- 승인 후 내용 변경 시: 프리뷰 재생성·재승인 필수
- 발송 직전 프리체크: `cs-pre-send-checklist` 준수

## 7) 컴플라이언스(25)
- PII/민감정보 마스킹, 법·규정·약관 준수, 내부정보 비공개, 감사 로그 보관
- `fail/needs-legal-review` 시 L1(법무/컴플라이언스 포함)

## 8) 로깅/감사 공통 필드(권장)
- decided_at/by, rule_id, priority, sla_target, status, reasons, actions, owners, notified, due/next_check, content_hash(해당 시)

## 9) 보고·개선(31~33)
- 종결 보고(31) → CSAT 수집(32) → 주간 리포트(33). 부정 피드백은 개선 백로그로 자동 티켓화.

## 10) 커서(CURSOR) 작업 원칙(한글 인용 이슈 대응)
- 파일 수정은 터미널보다 에디트 도구 우선(예: apply_patch). 셸 인용 문제 근본 차단
- 불가피한 셸 쓰기 시: 단일 heredoc만 사용하고 구분자는 반드시 단일 인용
  - 형식: << '__EOF__' … 내용 … __EOF__ (1열 시작, 뒤 공백 금지)
  - 한 명령에 heredoc 하나만, 여러 파일은 명령 분리 실행
  - UTF-8 가정, 특수문자/한글 포함 안전
- 작성 후 즉시 tail/grep로 EOF 잔재·깨짐 검증

## 11) 문서·파일 맵(주요)
- 정책/프로세스(본 문서): `docs/cs-expansion/CS-Operations-Policies-and-Processes.md`
- 체크리스트 총괄: `docs/cs-expansion/bmad-cs-checklist.md`
- 품질/프리뷰 체크: `.bmad-cs-operations/checklists/cs-quality-checklist.md`, `.bmad-cs-operations/checklists/cs-pre-send-checklist.md`
- 제품 경로 워크플로우: `.bmad-cs-operations/workflows/cs-product-feedback.yaml`
- 협업/이관/발송 관련 작업: `.bmad-cs-operations/tasks/*.md`

---
정책 변경 시 PR에 본 문서 변경을 포함하고, 변경 이력(요약/시행일/영향 범위)을 상단에 추가하세요.

