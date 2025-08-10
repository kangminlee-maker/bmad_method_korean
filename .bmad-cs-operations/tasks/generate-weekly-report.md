# generate-weekly-report

## 목적
- 주간 운영 성과/리스크를 요약해 공유하고, 개선 액션을 추적합니다.

## 메타데이터 헤더(공통)
- 반드시 기록: `report_id`, `generated_at(ISO/타임존)`, `author`, `period`, `links[]`

## RBAC
- 수행: `cs-analytics` | `cs-manager`
- 승인/배포: `cs-manager`

## 입력
- 케이스 로그/산출물: closure, csat, escalation, tracking, review/compliance 등
- KPI 기준: FCR/TTR/SLA/재오픈율/CSAT/에스컬레이션/리드타임
- 정책/목표: 팀 목표치/경보 임계값

## 산출물
- 주간 리포트: `reports/weekly-{YYYY-WW}.md`
- 액션 아이템 목록: 소유자/기한 지정

## 상태 전이
- 없음(리포트 산출물)

## 메트릭(예시)
- Volume: 생성/종결/잔여 케이스 수
- FCR: First Contact Resolution 비율
- TTR: 평균 해결 시간, P1/P2/P3 분리
- SLA: 목표 대비 준수율, 위반/경계 건수
- Escalations: L1/L2 건수 및 사유
- CSAT: 평균/분포/부정 코멘트 Top N
- Handoff/Collab: 리드타임/지연율/재작업률
- Promise Breaches: 고객 약속 미이행 건수
 - Handoff Signed Rate: handoff 결정 중 사람 Sign-off 완료 비율(목표 100%)
 - Handoff Without Signoff: 서명 없이 이관된 건수(목표 0)
 - Time to Signoff: handoff 평가 시작→서명까지 평균 소요

## 단계별 지침
1) 데이터 수집/정규화: 기간 필터(월~일), 누락/오류 보정
2) 메트릭 계산 및 추세 그래프(선택): 전주 대비 증감/경고
3) 인사이트/리스크/근본 원인 요약
4) 액션 아이템 도출: 소유자/기한/측정 기준 정의
5) 리포트 저장 및 배포(메일/대시보드), 추적 티켓 생성

## KPI RAG 임계값(개별 강화 — 예시)
- SLA 준수율: Green ≥ 90%, Amber 80~89%, Red < 80%
- CSAT 평균: Green ≥ 4.6, Amber 4.2~4.59, Red < 4.2
- P1 평균 대응시간: Green ≤ 0.3h, Amber 0.31~0.5h, Red > 0.5h

## 액션 아이템 완료 기준(개별 강화)
- 정의: 명확한 측정 방법, 기한, 소유자 포함
- 완료: 측정 결과로 효과 검증(지표 변화/파일 변경/커밋 등) 증빙 첨부

## 리포트 템플릿(붙여넣기)
```markdown
# Weekly Report — {{year}} W{{week}}

## Summary
- Volume: {{created}}/{{closed}}/{{backlog}}
- SLA: {{sla_rate}}% (violations={{violations}})
- TTR: P1 {{ttr_p1}}h / P2 {{ttr_p2}}h / P3 {{ttr_p3}}h
- CSAT: {{csat_avg}} (n={{csat_n}})
- Escalations: L1 {{l1}} / L2 {{l2}}

## Insights
- {{insight_1}}
- {{insight_2}}

## Risks
- {{risk_1}}
- {{risk_2}}

## Actions
- [ ] {{action_1}} — Owner: {{owner}} — Due: {{due}} — Measure: {{metric}}
```

## 연계/핸드오프
- 개선 항목은 백로그로 생성, 차주 리포트에서 추적
