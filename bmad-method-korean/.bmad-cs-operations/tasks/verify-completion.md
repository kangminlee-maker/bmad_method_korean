# verify-completion

## 목적
- 타 부서(외부) 작업이 요청서의 완료 기준(Definition of Done)을 충족했는지 검증합니다.
- 증빙(첨부/링크/티켓 상태)으로 사실 확인 후 pass/fail을 결정하고 후속 조치를 정의합니다.

## 메타데이터 헤더(공통)
- 반드시 기록: `case_id`, `updated_at(ISO/타임존)`, `author`, `owner`, `status_before`, `status_after`, `links[]`, `content_hash(해당 시)`

## RBAC
- 수행: `cs-collaboration-coordinator`, `cs-processor`
- 승인/리스크 판단: `cs-manager`, 필요 시 `legal`, `compliance`

## 입력
- 요청서: `cases/{case_id}-delegation-request.md` (결과물/기한/검증 기준 포함)
- 추적 로그: `cases/{case_id}-tracking-log.md`
- 제출된 결과물: 파일/링크/티켓(예: JIRA 상태, 커밋/PR 링크)
- 관련 정책: 보안/컴플라이언스 체크리스트, 톤/공개 가능 범위

## 산출물
- 검증 보고서: `cases/{case_id}-completion-verification.md`
- 결과 상태: `external-complete` | `external-rework-needed`
- (fail 시) 재작업 요청 목록, 새로운 마감 제안, 알림/에스컬레이션 기록

## 상태 전이
- before: `external-in-progress` | `external-complete` → after: `external-complete` | `external-rework-needed`
- guard: 증빙 확인, 컴플라이언스 점검, 고객 커뮤니케이션 가능 품질 확인

## 완료 기준(예시)
- 결과물이 요청서의 체크리스트를 100% 충족
- 수치 기준(예: 정확도/오차/커버리지) 만족
- 증빙 존재(커밋/PR/스크린샷/시스템 로그)
- 보안·컴플라이언스(PII, 접근권한, 공개 범위) 준수
- 고객 커뮤니케이션에 사용 가능한 품질/톤

## 단계별 지침
1) 요청서의 결과물 목록과 검증 기준을 나열
2) 제출된 산출물을 항목별로 대조(완료/부분/미완)
3) 증빙 확인(링크 유효성, 접근 가능성, 내용 일치)
4) 보안·컴플라이언스 점검(민감정보, 권한, 기록 보관)
5) 평가 결과 요약: pass/fail 및 근거, 리스크/주의사항
6) fail 또는 부분 충족 시: 재작업 요청 목록, 새 기한 제안, 담당/채널 명시
7) 결과 상태 업데이트 및 알림 발송(수신 부서/CS 담당/매니저)
8) pass 시 다음 단계(`integrate-responses`)로 핸드오프 스케줄

## 검증 체크리스트
- [ ] 요청서의 모든 결과물이 검증되었는가
- [ ] 증빙(링크/파일/티켓)이 유효하고 접근 가능한가
- [ ] 수치/정책 기준을 만족하는가
- [ ] 보안/컴플라이언스 위반이 없는가
- [ ] 고객 커뮤니케이션에 사용할 수 있는가

## 경계/예외 상황 처리
- 부분 완료: 완료/미완 항목 분리, 고객 영향 평가 후 단계적 롤아웃/부분 안내 고려
- 모호한 결과물: 정의 재확인 요청, 기준 명문화 후 재검증
- 링크 무효/접근 불가: 즉시 요청 부서에 수정/재공유 요청

## 조건부 패스(Conditional Pass)
- 고객 영향이 낮고 리스크가 경미한 경우, 부분 충족 상태에서 조건부 패스 승인 가능
- 조건: 보완 항목/기한/담당 명시, 고객 안내 시 한계와 후속 일정 명확화, 72h 내 재검증 예약

## 실패/에스컬레이션
- 반복 실패(2회 이상) 또는 기한 초과: L1 에스컬레이션, 필요 시 L2(대규모 장애 등)
- 규제·법무 리스크 감지: 즉시 L1 에스컬레이션하며 법무·컴플라이언스 라인을 포함

## 로그/메트릭
- 검증 소요시간, 실패 사유 유형 분포, 재작업 회수, 최종 리드타임
- 로그 필수 필드: `checked_at`, `checked_by`, `result`, `reasons[]`, `evidence[]`, `next_due_at`

## 검증 보고서 템플릿(붙여넣기)
```markdown
# Completion Verification
- Case: {{case_id}}
- Result: pass | fail | partial
- Summary: {{one_line}}

## Checklist Match
- Deliverables:
  - [ ] {{deliverable_1}} — evidence: {{link_1}}
  - [ ] {{deliverable_2}} — evidence: {{link_2}}

## Compliance
- PII/Access/Disclosure: {{ok|issues}}
- Notes: {{notes}}

## Decision & Next Steps
- If pass: handoff to integrate-responses at {{eta}}
- If fail/partial: rework list, new due {{new_due}}, owners {{owners}}, notify {{recipients}}
```

## 연계/핸드오프
- pass → `integrate-responses`
- fail/partial → 수신 부서로 재작업 요청 후 `track-external-work` 재개 및 새 마일스톤 반영

## 에지 케이스
- 규제/법무 리스크 의심이나 불확실: 보수적으로 fail 처리 후 즉시 L1(법무/컴플 포함) 검토 요청
- 증빙이 비공개 저장소에만 존재: 접근 권한 검토 후 요약만 공개 기록, 링크는 제한 저장소에 보관
- 제출물 포맷 상이: 변환/정규화 절차 정의 후 재제출 요청

## 예시
- 입력: deliverables 3/3 제출, 증빙 링크 유효, PII 무이슈
- 처리: pass 결정, 다음 단계 `integrate-responses` 예약, 알림 발송
- 산출: `cases/CASE-1234-completion-verification.md` 생성, 상태 `external-complete`
