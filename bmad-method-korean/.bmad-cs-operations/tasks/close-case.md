# close-case

## 목적
- 모든 조치가 완료된 케이스를 표준에 따라 종결하고, 지식/지표/감사를 위해 필요한 자료를 보관합니다.

## 메타데이터 헤더(공통)
- 반드시 기록: `case_id`, `updated_at(ISO/타임존)`, `author`, `owner`, `status_before`, `status_after`, `links[]`

## RBAC
- 수행: `cs-processor`
- 승인: `cs-manager`(정책상 필요한 경우)

## 입력
- 최종 상태: `response-final.md` 발송 및 고객 응답, 또는 수신 부서 종료(`closed-by-receiving-dept`)
- 검증/보고서: `review-notes.md`, `compliance-report.md`, `post-handoff-tracking.md`
- 정책/보존: `.bmad-cs-operations/data/policies.md`(보존 기간/PII 규칙)

## 산출물
- 종결 보고: `cases/{case_id}-closure.md`
- 케이스 상태: `closed`
- 지식 업데이트: FAQ/매크로/문서 개정 티켓

## 상태 전이
- before: `awaiting-customer` | `closed-by-receiving-dept` → after: `closed`
- guard: 약속 이행 확인, 보고서 저장, 지식 업데이트 티켓 생성

## 종료 사유(기록 값)
- resolved | handed-off-closed | no-response | withdrawn | duplicate | out-of-scope

## 단계별 지침
1) 종료 사유 확정 및 고객 약속 이행 여부 점검(ETA/재공지)
2) 지식 전이: 반복/학습 가치가 있는 내용은 KB/매크로/문서 업데이트 요청 생성
3) 지표 집계: FCR/TTR/SLA/재오픈/에스컬레이트 등 핵심 지표 계산
4) 보존/보안: PII 정리/마스킹 재확인, 보존 기간·접근 권한 태그 설정
5) 종결 보고서 작성: 타임라인/결정/조치/지표/교훈/향후 개선
6) 상태 `closed`로 전환, 후속 설문(`collect-csat`) 필요 시 예약

## 표준 안내 문구(개별 강화)
- resolved: “요청하신 건이 완료되어 케이스를 종결합니다. 추가 문의가 있으시면 언제든지 연락 주세요.”
- handed-off-closed: “해당 건은 전담 부서에서 최종 완료되어 종결합니다. 이후 문의는 {{dept}}로 부탁드립니다.”
- no-response: “추가 정보 요청 후 답변을 받지 못해 케이스를 종결합니다. 필요 시 언제든지 재개 가능합니다.”

## 검증 체크리스트
- [ ] 고객 약속 이행(ETA/재공지)
- [ ] KB/매크로/문서 업데이트 요청 생성
- [ ] 지표 계산/대시보드 반영
- [ ] PII/보존/권한 태그 설정
- [ ] 종결 보고서 저장 및 링크 공유

## 실패/에스컬레이션
- 고객 불만 지속/재오픈 요청: 케이스 재개 또는 신규 케이스로 분기, 매니저 통지

## 보고서 템플릿(붙여넣기)
```markdown
# Case Closure Report ({{case_id}})
- Reason: {{reason}}
- Timeline: {{key_events}}
- Actions Taken: {{actions}}
- Metrics: FCR={{fcr}}, TTR={{ttr}}, SLA_met={{sla}}, Escalations={{escalations}}
- Customer Commitments: {{commitments_status}}
- Knowledge Updates: {{kb_items}}
- Lessons Learned / Improvements: {{lessons}}
```

## Lessons Learned 분류(개별 강화)
- 프로세스 / 정책 / 제품 / 훈련

## 연계/핸드오프
- 만족도 조사: `collect-csat`
- 주간 리포트 집계: `generate-weekly-report`
