# assess-handoff-eligibility

## 목적
- 케이스가 "타 부서 완전 이관" 대상인지 체계적으로 판단합니다.
- 이관이 더 빠르고 안전하며 규정상 적합한지(전문성/권한/리스크/지속 기간 관점) 평가합니다.

## 메타데이터 헤더(공통)
- 반드시 기록: `case_id`, `updated_at(ISO/타임존)`, `author`, `owner`, `status_before`, `status_after`, `links[]`

## RBAC
- 수행: `cs-handoff-processor`
- 승인: `cs-manager`, 필요 시 수신 부서 리드 사전 확인
- 사람 Sign-off(필수): 이관 적격성 판단은 사람이 최종 확인하고 서명해야 함

## 입력
- 접수/분류 산출물: `cases/{case_id}-inquiry.md`, `cases/{case_id}-route-decision.md`
- 처리 시도/제약: 현 팀 권한/접근/도구 제약, 위험 평가, 예상 소요
- 조직 매핑: `.bmad-cs-operations/data/departments.yaml`(수신 부서/연락/가용시간)
- 정책/규정: `.bmad-cs-operations/data/policies.md`(전담 부서 규정, 승인 흐름)

## 산출물
- 이관 적격성 보고서: `cases/{case_id}-handoff-assessment.md`
- 판단 결과: `handoff: yes|no` + 근거, 권장 수신 부서, 예상 리드타임/리스크
- 후속 경로: `create-handoff-package`(27번) 실행 여부
- 상태 갱신: `handoff-candidate`(yes) | 기존 경로 유지(no)

## 상태 전이
- before: `handoff-candidate` | `assigned` → after: `handoff-candidate` | `assigned`
- guard: 기준표 평가 완료, 고객 기대관리 메모 작성, 사람 Sign-off 기록(reviewer, signed_at)

## 판단 기준(예시)
1) 전문성/권한: 현 팀 권한 밖(결제 정산/법무 검토/인프라 루트 권한 등)
2) 규정/정책: 전담 부서 필수(법무/컴플라이언스/재무 통제 등)
3) 리스크: 법적/재정/보안 리스크가 높아 전담 통제가 안전
4) 지속 기간/범위: 장기 프로젝트화 또는 다수 시스템/팀 연계 필요
5) 고객 경험: 이관 시 더 일관되고 신속한 처리 기대(전담 플레이북/도구 보유)

### 가중치/점수화(개별 강화)
| 항목 | 점수(0~3) |
|---|---|
| 전문성/권한 | 0 1 2 3 |
| 규정/정책 | 0 1 2 3 |
| 리스크 | 0 1 2 3 |
| 지속 기간/범위 | 0 1 2 3 |
- 합계 ≥ 6 → `handoff=yes` 권고(관리자 재량 1점 범위)

## 제외 조건(예시)
- 단순 질의/소규모 수정으로 1~2시간 내 해결 가능
- 현 팀이 권한/도구를 보유하고 있으며 리스크가 낮음
- 이관으로 오히려 지연/혼선이 예상됨

## 단계별 지침
1) 현재 제약/필요 권한/리스크/예상 소요를 표로 정리
2) 부서 매핑 확인: 적합한 수신 부서 후보와 담당/연락 채널 가용성
3) 기준 적용: 상기 판단/제외 조건에 따라 `yes|no` 결정, 근거 명기
4) `yes`일 때: 상태 `handoff-candidate`로 갱신, 27번 `create-handoff-package` 착수
5) `no`일 때: 일반 경로 유지(`process-inquiry` 또는 협업 경로로 전환 고려)
6) 고객 기대 관리 메모: 이관 시 안내 필요 포인트(새 담당/ETA/연락 채널)

## 고객 기대치 관리 템플릿(개별 강화)
```markdown
고객 안내 요지(이관):
- 새 담당 부서/담당자: {{dept}} / {{owner}}
- 예상 일정(중간/최종): {{milestones}} / {{eta}}
- 연락 채널/업데이트 주기: {{channel}} / {{cadence}}
- 추가로 필요한 정보(있으면): {{info}}
```

## 검증 체크리스트
- [ ] 판단 기준/제외 조건을 모두 검토했는가
- [ ] 수신 부서 후보/연락 채널/가용시간 확인됐는가
- [ ] 예상 리드타임/리스크/고객 영향이 기록됐는가
- [ ] 정책/규정상 전담 부서 요건을 확인했는가
- [ ] 사람 Sign-off(reviewer, signed_at)가 보고서에 기록됐는가

## 실패/에스컬레이션
- 수신 부서 미정/부재: cs-manager에 L1 에스컬레이션, 임시 협업 경로로 처리
- 규정 해석 필요: 법무/컴플라이언스 동시 소견 요청(L1), 결정 보류 시 임시 안내 문안 준비

## 로그/메트릭(선택)
- handoff_yes_rate, avg_time_to_handoff_decision, post_handoff_resolution_time

## 보고서 템플릿(붙여넣기)
```markdown
# Handoff Eligibility Assessment
- Case: {{case_id}}
- Decision: handoff — yes | no
- Receiving Dept (if yes): {{dept}} / Contact: {{contact}}
- Rationale:
  - Expertise/Authority: {{text}}
  - Policy/Regulatory: {{text}}
  - Risk: {{risk_summary}}
  - Scope/Duration: {{estimate}}
- Customer Impact: {{cx_notes}}
- Next Steps:
  - If yes: create-handoff-package by {{eta}}
  - If no: continue via {{path}}

## Sign-off
- Reviewer: {{reviewer}}
- Signed at: {{signed_at}}
```

## 연계/핸드오프
- yes → `create-handoff-package` → `coordinate-transfer` → `notify-customer` → `track-post-handoff`
- no → `process-inquiry` 또는 협업 경로(`delegate-to-department`)
