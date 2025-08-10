# BMAD-CS 확장팩 제작 체크리스트 (분할 컨텍스트)

## 컨텍스트 A (1/2)

1. 목표/스코프 정의: 핵심 결과물 정의(답변, 이관 패키지, 외부 요청서)
2. 목표/스코프 정의: 케이스 유형 정의(일반/복잡/협업/이관/에스컬레이션)
3. 목표/스코프 정의: SLA·우선순위·라우팅·컴플라이언스 기준 확정
4. 리소스 스캐폴딩: `web-bundles/expansion-packs/bmad-cs-operations/` 생성
5. 리소스 스캐폴딩: 하위 폴더(agents/tasks/workflows/templates/checklists/teams/data) 준비
6. 리소스 스캐폴딩: IDE용 `.bmad-cs-operations/` 동형 리소스(선택)
7. 에이전트 정의: `cs-intake`(접수/분류/라우팅/에스컬레이션)
8. 에이전트 정의: `cs-collaboration-coordinator`(협업 요청/추적/통합)
9. 에이전트 정의: `cs-handoff-processor`(완전 이관 평가/패키지/전환/추적)
10. 에이전트 정의: `cs-processor`(내부 원칙 기반 처리/초안 작성)
11. 에이전트 정의: `cs-quality`(품질/컴플라이언스 리뷰)
12. 에이전트 정의: `cs-manager`(용량/우선순위/리포트, 옵션)
13. 에이전트 정의: `cs-experience`(톤/템플릿 품질, 옵션)
14. 작업 정의(접수): `intake-new-inquiry`
15. 작업 정의(접수): `classify-and-route`
16. 작업 정의(접수): `escalate-urgent`
17. 작업 정의(협업): `delegate-to-department`
18. 작업 정의(협업): `track-external-work`
19. 작업 정의(협업): `verify-completion`
20. 작업 정의(협업): `integrate-responses`
21. 작업 정의(처리): `process-inquiry`
22. 작업 정의(처리): `draft-response`
23. 작업 정의(처리): `finalize-response`
24. 작업 정의(품질): `review-response`
25. 작업 정의(품질): `compliance-check`
26. 작업 정의(이관): `assess-handoff-eligibility`
27. 작업 정의(이관): `create-handoff-package`
28. 작업 정의(이관): `coordinate-transfer`
29. 작업 정의(이관): `notify-customer`
30. 작업 정의(이관): `track-post-handoff`
31. 작업 정의(운영): `close-case`
32. 작업 정의(운영): `collect-csat`
33. 작업 정의(운영): `generate-weekly-report`
34. 워크플로우: `cs-general-inquiry`(접수→처리→품질→답변) — `finalize-response` 전 `review-response(사람 Sign-off)` 필수, `finalize-response`에서 pre‑send preview 생성 및 `content_hash` 저장/대조
35. 워크플로우: `cs-collaboration-workflow`(요청→추적→완료검증→통합답변) — 동일 기준으로 리뷰/사인오프 및 프리뷰 대조
36. 워크플로우: `cs-handoff-workflow`(적격성→패키지→전환→추적)
37. 워크플로우: `cs-escalation`(SLA 위반 시 경로)
38. 워크플로우: `cs-complex-case`(정책 해석/다부서 조정)

## 컨텍스트 B (1/2)

39. 템플릿: `inquiry-record-tmpl.yaml`(접수 기록)
40. 템플릿: `response-template-tmpl.yaml`(답변/톤 가이드) + pre-send preview 필드 포함(수신자/채널/제목/본문 렌더링/첨부·링크/발송 시각/타임존/`content_hash`)
41. 템플릿: `external-work-request-tmpl.yaml`(타 부서 요청서)
42. 템플릿: `handoff-package-tmpl.yaml`(이관 패키지)
43. 템플릿: `quality-review-tmpl.yaml`
44. 템플릿: `customer-satisfaction-tmpl.yaml`
45. 템플릿: `case-closure-tmpl.yaml`
46. 체크리스트: `cs-intake-checklist.md`(분류/라우팅/PII)
47. 체크리스트: `cs-quality-checklist.md`(정확성/완전성/톤/컴플라이언스 + 사람 리뷰/Sign-off 필수, pre-send preview 일치 확인)
48. 체크리스트: `cs-handoff-checklist.md`(컨텍스트/첨부/수신확인/고객공지)
49. 체크리스트: `cs-escalation-checklist.md`(조건/레벨/알림/해제)
49-1. 체크리스트(권장 신규): `cs-pre-send-checklist.md`(발송 직전) — 수신자/제목/본문/첨부·링크 권한/발송 시각/타임존/`content_hash` 일치 확인
50. 데이터: `policies.md`(내부 처리원칙/규제)
51. 데이터: `routing-rules.yaml`(유형→담당/부서/우선순위)
52. 데이터: `sla-matrix.md`
53. 데이터: `tone-guide.md`
54. 데이터: `departments.yaml`(부서/역할/연락/가용시간)
55. 데이터: `macro-library.md`(FAQ/매크로)
56. 팀/웹 번들: `cs-team-basic.txt` 구성
57. 팀/웹 번들: `cs-team-enterprise.txt` 구성
58. 팀/웹 번들: 웹 번들에 리소스 포함 태그(START/END) 삽입
59. 팀/웹 번들: 설치 매니페스트에 `bmad-cs-operations` 등록
60. 거버넌스/보안: PII 처리·마스킹·보존정책
61. 거버넌스/보안: 감사 로그·이관 승인흐름
62. 거버넌스/보안: 역할/권한 매트릭스(RBAC)
63. 품질/검증: 시나리오 테스트(일반/협업/이관/에스컬레이션)
64. 품질/검증: SLA 시뮬레이션·지연 알림·해결 루프
65. 품질/검증: 톤·컴플라이언스 샘플 리뷰
66. 파일럿/모니터링: 파일럿 케이스 운영(주차별)
67. 파일럿/모니터링: KPI(FCR/TTR/CSAT/재오픈/SLA)
68. 파일럿/모니터링: 개선 백로그 운영
69. 배포/교육: 운영 가이드·런북·FAQ
70. 배포/교육: 역할별 교육(접수/협업/이관/품질)
71. 배포/교육: 롤아웃 단계·피드백 루프
72. Definition of Done: 문서-체크리스트-템플릿 연결 완비
73. Definition of Done: 협업/이관 경로 상태 추적·알림 동작
74. Definition of Done: 샘플 케이스 E2E 10건 이상 통과
75. Definition of Done: 파일럿 KPI 달성(SLA 95%+, CSAT 4.5+)
76. 차기 반복: KB 자동화(매크로 추천)
77. 차기 반복: 옴니채널 컨텍스트 통합
78. 차기 반복: 리포팅 대시보드/운영지표 자동 생성
45-1. 템플릿: `product-feedback-brief-tmpl.yaml`(제품 피드백 브리프)

49-2. 체크리스트: `cs-product-handoff-checklist.md`(제품 경로 최소 요건)
49-3. 체크리스트: `pm-product-intake-checklist.md`(PM 인테이크)

38-1. 워크플로우: `cs-product-feedback`(제품 경로: 분류→브리프→PM 핸드오프→PRD/에픽/스토리→Dev→QA→고객 안내)
