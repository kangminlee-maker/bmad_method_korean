# classify-and-route

## 목적
- 접수된 케이스를 분류(category/subcategory)하고, 라우팅 규칙에 따라 담당 에이전트/부서와 우선순위·SLA를 확정합니다.
- 일반 처리/협업 필요/완전 이관 후보 중 적절한 경로를 결정합니다.

## 메타데이터 헤더(공통)
- 반드시 기록: `case_id`, `updated_at(ISO/타임존)`, `author`, `owner`, `status_before`, `status_after`, `links[]`, `content_hash(해당 시)`

## 입력
- `cases/{case_id}-inquiry.md` (14번 산출물)
- 고객 메타데이터(등급/채널/언어 등), 과거 유사 케이스 이력(선택)
- 우선순위 휴리스틱: `.bmad-cs-operations/data/priority-keywords.yaml`
- 라우팅 규칙(있으면): `routing-rules.yaml`(추후 데이터로 생성)

## 산출물
- 분류 결과(category/subcategory) 및 근거
- 라우팅 결정(담당 에이전트/부서, 큐)
- 최종 우선순위(P1/P2/P3) 및 SLA 타깃
- 결정 로그: `cases/{case_id}-route-decision.md`
- 케이스 상태: `assigned` | `waiting-external` | `handoff-candidate`

## RBAC
- 수행: `cs-triage` 또는 `cs-processor`
- 승인/분쟁 조정: `cs-manager`

## 우선순위 결정 규칙
1) 14번에서 이미 P1 지정된 경우: 유지
2) `.bmad-cs-operations/data/priority-keywords.yaml` 매칭 시: P1 지정
3) 라벨/규칙/휴리스틱으로 P2/P3 산정(데이터 확보 후 보강)

## 분류 로직(초안)
- 키워드/의도 기반으로 category/subcategory 추론(데이터 도입 전 임시 휴리스틱)
- 예: 결제/환불 → `billing/refund`, 로그인/비밀번호 → `technical/auth`

## 라우팅 로직(초안)
- 규칙 매칭 우선: `routing-rules.yaml.rules[*]`
  - match(all/any) 충족 시: 해당 `route`, `priority`, `sla_target_minutes` 적용
- 규칙 없음/미매칭: 기본 매핑
  - `billing/*` → finance-dept
  - `technical/*` → engineering-dept
  - `account/*` → cs-processor
  - 그 외 → cs-processor(임시)

### 라우팅 실패 시 Fallback 테이블(개별)
| 조건 | 기본 담당 | 비고 |
|---|---|---|
| category 미결정 | cs-triage | 상태 `needs-triage` |
| billing/* | finance-dept | 규칙 미매칭 시 |
| technical/* | engineering-dept | 규칙 미매칭 시 |
| account/* | cs-processor | 규칙 미매칭 시 |
| 기타 | cs-processor | 임시, 관리자 주기 리뷰 |

## 경로 결정(브랜치)
- 협업 필요 신호: 외부 승인/데이터/조치 필요 → `cs-collaboration-coordinator`로 전달(다음 작업 `delegate-to-department`)
- 완전 이관 후보: 전문성/권한/장기 프로젝트 → `cs-handoff-processor`로 전달(다음 작업 `assess-handoff-eligibility`)
- 일반 처리: `cs-processor`로 전달(다음 작업 `process-inquiry`)

## 상태 전이
- before: `new` → after: `assigned` | `waiting-external` | `handoff-candidate`
- guard: category/subcategory 확정, 우선순위 확정, route 확정, `rule_id` 기록

## 단계별 지침
1) 기존 P1 플래그/키워드 규칙으로 우선순위 재평가 및 확정
2) category/subcategory 추론, 근거 키워드 기록
3) 규칙 파일이 있으면 규칙 매칭 → route/priority/SLA 설정, `rule_id` 기록
4) 규칙 없거나 미매칭이면 기본 매핑 적용, `rule_id=fallback`
5) 경로(일반/협업/이관) 판단 후 다음 작업 지정, 케이스 상태 업데이트
6) `cases/{case_id}-route-decision.md`에 결정·근거·타임스탬프·담당자 기록

## 유도 질문(정보 부족 시)
- 이번 요청은 기술/청구/계정 중 어디에 더 가깝습니까?
- 외부 부서의 승인/작업이 필요한 상황인가요?
- 긴급 사유나 고객 영향 범위를 한 줄로 알려주세요.

## 검증 체크리스트
- [ ] P1 조건 재평가 및 기록
- [ ] category/subcategory와 근거가 명확히 남음
- [ ] route/SLA/priority가 일관성 있게 설정됨
- [ ] `rule_id`/결정 사유/타임스탬프가 로그에 기록됨

## 분기 로깅 강화(개별)
- `cases/{case_id}-route-decision.md`에 `branch` 필드 추가: `to_pm` | `general` | `collaboration` | `handoff`
- 제품 경로 조건: category in {`product-bug`, `feature-request`} → `branch=to_pm`, 다음 작업은 `create-product-brief`
- 제품 경로에서도 P1 보존 원칙 유지(고객 영향 큼)

## 에지 케이스
- 데이터/권한 접근 불가(참조 링크 권한 오류): 임시 `reason=insufficient-access` 기록 후 관리자 요청 발송
- 중복 케이스 의심: 유사 `case_id` 2건 이상 매칭 시 병합 후보로 표시, 오판 시 분리 복원
- 언어 미스매치: 고객 언어와 에이전트 언어 불일치 시 번역 지원 태스크 생성

## 예시
- 입력: category=`billing/refund`, priority=P1(14번 지정 유지), 규칙 미매칭
- 처리: Fallback 테이블 적용 → `route=finance-dept`, `rule_id=fallback`
- 산출: 상태 `assigned`, `branch=general`, `cases/CASE-1234-route-decision.md` 기록

## 실패/에스컬레이션
- 분류/라우팅 불가: 상태 `needs-triage`, CS 매니저에게 L1 에스컬레이션, 기본 SLA 적용(P2 60m)
- 규칙 충돌: 보수적 선택(고우선/짧은 SLA) 후 관리자 검토 태스크 생성

## 감사/로그
- 기록 위치: `cases/{case_id}-route-decision.md`
- 필수 필드: rule_id, priority, sla_target, route, reason, decided_at, decided_by

## 연계/핸드오프
- 일반 처리 → `process-inquiry`
- 협업 필요 → `delegate-to-department`
- 완전 이관 후보 → `assess-handoff-eligibility`
