# track-post-handoff

## 목적
- 완전 이관 후 합의된 기간(예: 30일) 동안 수신 부서의 진행을 모니터링하고 약속 이행을 보증합니다.
- 지연/리스크를 조기 감지하여 에스컬레이션하고, 필요 시 고객 커뮤니케이션을 조정합니다.

## 메타데이터 헤더(공통)
- 반드시 기록: `case_id`, `updated_at(ISO/타임존)`, `author`, `owner`, `status_before`, `status_after`, `links[]`

## RBAC
- 수행: `cs-handoff-processor`
- 개입/승인: `cs-manager`

## 입력
- 전환 확인서: `cases/{case_id}-transfer-confirmation.md`(일정/담당/업데이트 주기/에스컬레이션/Done 기준)
- 이관 패키지 색인: `cases/{case_id}-handoff-index.md`
- 고객 공지(있으면): `cases/{case_id}-customer-notification.md`
- SLA/정책: `.bmad-cs-operations/data/policies.md`, `sla-matrix.md`

## 산출물
- 사후 추적 로그: `cases/{case_id}-post-handoff-tracking.md`
- 상태 전환: `transferred` → `in-receiving` → `receiving-delayed`(선택) → `closed-by-receiving-dept`
- 필요 시: 재개입 기록/에스컬레이션 로그/추가 고객 공지 초안

## 상태 전이
- before: `transferred` → after: `in-receiving` | `receiving-delayed` | `closed-by-receiving-dept`
- guard: 최신 업데이트 확인, 편차/리스크 평가, 고객 약속 영향 점검

## 기본 규약
- CS는 실행 소유권 없이 관찰·보증 역할(상태 확인, 리스크 통지, 경로 정리)
- 고객 커뮤니케이션이 필요한 경우: `review-response` Sign-off → `finalize-response` 프리뷰 대조 후 발송

## 단계별 지침
1) 합의 로드: 업데이트 주기/채널/담당/마일스톤/Done 기준을 확인
2) 점검 스케줄링: 합의 주기(예: daily/weekly)로 캘린더/리마인더 등록
3) 상태 수집: 수신 부서 채널에서 최신 진행/차단요인/다음 일정 확보(형식화 요청)
4) 편차 평가: 합의 일정 대비 편차(%)와 리스크(RAG) 산정
5) 조치:
   - 정상: 로그 기록, 다음 점검 예약
   - 지연(≥20% 또는 주기 미준수): 리마인드/차단 제거 요청, CS 매니저 통지
   - 중대한 지연(기한 초과/고객 약속 미준수): `escalate-urgent` 트리거(L1 기준)
6) 고객 약속 연쇄 영향 점검: 약속한 ETA/안내 일정 영향 시, 승인 절차를 거쳐 고객 재공지 준비
7) 종료 판단: 수신 부서 Done 기준 충족 + 전환 확인서의 검증 방법 통과 시 `closed-by-receiving-dept`

## Promise Breach 대응 체크리스트(개별 강화)
- [ ] 고객 재공지(사유/새 ETA) — 승인 경로 준수
- [ ] 내부 원인 분석 태스크 생성 — 소유자/기한 지정
- [ ] 보상 정책 검토(해당 시) — 정책 문서 참조
- [ ] 재발 방지 액션 정의 — 주간 리포트에 추적

## 검증 체크리스트
- [ ] 최신 업데이트가 합의 주기 내 존재
- [ ] 계획 대비 편차와 리스크 평가가 기록됨
- [ ] 필요 시 에스컬레이션/리마인드 실행 기록
- [ ] 고객 약속(ETA/재공지) 이행 여부 점검
- [ ] 종료 요건 충족(검증/증빙/기록 보관)

## 실패/에스컬레이션
- 무응답/미준수 지속: L1 에스컬레이션(부서 리드), 필요 시 L2(대규모 영향)
- 규제/법무 리스크: L1 에스컬레이션 시 법무/컴플라이언스 포함

## 지표(로그 누적)
- update_compliance_rate, days_in_receiving, days_delayed, reminders, escalations, promise_breaches, handoff_signed_off_by, handoff_signed_at

## 로그 엔트리 템플릿
```markdown
# Post-Handoff Tracking Entry
- at: {{timestamp}}
- status: in-receiving | receiving-delayed | closed-by-receiving-dept
- milestone: {{name}} — progress: {{percent}}%
- risks: {{risks}} — blockers: {{blockers}}
- actions: {{actions}}
- next_check_at: {{next_check_at}}
```

## 종료 체크리스트(붙여넣기)
```markdown
# Post-Handoff Closure
- Done criteria met: [ ] docs [ ] code [ ] ops
- Verification passed by: {{verifier}} at {{time}}
- Evidence links: {{links[]}}
- Customer commitments satisfied: [ ] ETA met [ ] re-notice sent (if promised)
- Archive package/index updated: [ ] yes
```

## 연계/핸드오프
- 고객 재공지 필요 시: `review-response` → `finalize-response` → `notify-customer`
- 케이스 종결 준비: `close-case`
