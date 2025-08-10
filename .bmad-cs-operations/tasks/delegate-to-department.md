# delegate-to-department

## 목적
- 타 부서(사람)에게 필요한 작업을 공식적으로 위임하고, 명확한 결과물/기한/책임/업데이트 주기를 합의합니다.
- 협업의 시작 조건, 추적 방식, 완료 검증 기준을 표준화합니다.

## 메타데이터 헤더(공통)
- 반드시 기록: `case_id`, `updated_at(ISO/타임존)`, `author`, `owner`, `status_before`, `status_after`, `links[]`, `content_hash(해당 시)`

## RBAC
- 수행: `cs-collaboration-coordinator`
- 승인: 수신 부서 담당/리드, `cs-manager`

## 입력
- 접수/분류 결과: `cases/{case_id}-inquiry.md`, `cases/{case_id}-route-decision.md`
- 요청할 작업의 범위/배경/제약, 필요한 데이터/권한
- 템플릿: `external-work-request-tmpl.yaml`

## 선행조건
- 개인정보/민감데이터 취급 시 권한·마스킹 규칙 확인
- 수신 부서·담당자 라우팅 가능(부재 시 팀 큐 지정)

## 산출물
- 작업 요청서: `cases/{case_id}-delegation-request.md` (템플릿 기반)
- 알림 로그(슬랙/이메일 등)
- 케이스 상태: `waiting-external`

## SLA/업데이트 규약(초안)
- 기본 상태 업데이트 주기: 매 영업일 1회(또는 합의 주기)
- 지연 임계치: 예정 대비 20% 이상 지연 시 사전 경고, 48h 초과 시 L1 에스컬레이션

## 반드시 포함할 항목(요청서)
- 작업 목적/배경(고객 영향 포함)
- 구체적 요청 사항(체크리스트 형식 권장)
- 필요한 결과물 정의(파일/승인/티켓 상태 등)
- 마감(기한)과 중간 마일스톤
- 수신 부서/담당자, 연락 채널
- 상태 업데이트 주기/방식
- 의존성/차단 요인/필요 권한
- 보안/컴플라이언스 주의사항

### 결과물 정의의 이중 표기(개별 강화)
- 체크박스 + 수행 증빙(파일/티켓 상태/서명)로 이중 표기하여 완료 판단 명확화

## 단계별 지침
1) 요청 범위 확정: 목적, 결과물, 마감/마일스톤, 업데이트 주기 정의
2) 템플릿 `external-work-request-tmpl.yaml`로 요청서 초안 작성
3) 수신 부서/담당자 지정, 채널 합의(슬랙 채널/메일링 리스트)
4) 요청서 발송 및 수신 확인 기록, 케이스 상태 `waiting-external`
5) 추적 규칙 공유: 업데이트 주기, 지연 시 에스컬레이션 경로, 리스크 보고 양식
6) 필요 권한/데이터 접근 승인 절차 안내(접근 요청 티켓 링크 등)

## 상태 전이
- before: `assigned` | `handoff-candidate` → after: `waiting-external`
- guard: 수신 확인, 담당/채널/업데이트 주기 합의, 완료 기준 명시

## 유도 질문(요청 범위 명료화)
- 이번 작업의 완료 상태는 무엇으로 판단하나요? (Done 정의)
- 중간 산출물·검토 포인트가 필요한가요?
- 차단 요인이 예상되나요? 사전 제거 가능한가요?

## 검증 체크리스트
- [ ] 결과물/기한/담당/업데이트 주기 명시됨
- [ ] 보안/컴플라이언스 요구 반영됨
- [ ] 수신 확인 및 연락 채널 합의 완료

## 자동 리마인드/지연 처리(개별 강화)
- 수신 확인 없음: 발송 후 24h 리마인드, 48h 초과 시 L1 에스컬레이션
- 합의 업데이트 주기 미준수: 1회 경고 → 2회 누적 시 L1, 3회 누적 시 L2 검토

## 실패/에스컬레이션
- 24h 내 수신 확인 없음: 리마인드 → L1 에스컬레이션(팀 리드 알림)
- 합의 위반(업데이트 미이행/반복 지연): 지연 경고 → L1/L2 단계적 승급

## 감사/로그
- 로그 파일: `cases/{case_id}-delegation-request.md` 상단 메타에 `sent_at`, `to_dept`, `owner`, `due_at`, `update_every`, `escalation_path`
- 알림 전송 결과(성공/실패)와 재시도 기록

## 연계/핸드오프
- 진행 추적: `track-external-work`
- 완료 검증: `verify-completion`
- 통합 답변: `integrate-responses`

## 요청서 템플릿 사용 예(요약)
```yaml
use: external-work-request-tmpl.yaml
fields:
  target_department: finance-dept
  request_date: 2025-08-10
  expected_completion: 2025-08-12 18:00 KST
  priority_level: P2
  detailed_requirements: |
    - [ ] 청구 조정 내역 산출
    - [ ] 재발행 가능 여부 확인
  customer_expectations: 재청구 방지 및 명확한 설명
  constraints: 영업일 기준, 개인정보 마스킹 유지
  deliverable_1: 조정 결과 보고
  delivery_method: 댓글/첨부 파일
  cs_contact: cs-intake@company
  update_frequency: daily
  progress_sharing_method: thread
  completion_verification: checklist+증빙
```

## 에지 케이스
- 권한 부족/접근 거절: 접근 요청 티켓 생성, 대체 증빙 방식 합의, 일정 재조정
- 담당 부서 변경/휴가: 대체 담당 지정 및 요청서 메타 업데이트
- 보안 상 제한으로 일부 항목 비공개: 공개 가능한 범위로 재정의하고 별도 안전 저장소 링크 활용

## 예시
- 입력: finance-dept에 결제 조정 요청, due=+2 영업일, daily 업데이트
- 처리: 요청서 발송, 수신 확인, 상태 `waiting-external`
- 산출: `cases/CASE-1234-delegation-request.md` 생성, 로그에 합의 항목 기록
