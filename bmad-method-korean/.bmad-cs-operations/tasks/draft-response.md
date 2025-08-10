# draft-response

## 목적
- 고객에게 전달할 답변 초안을 생성합니다. 사실/근거에 기반하고, 톤 가이드와 컴플라이언스를 준수합니다.

## 메타데이터 헤더(공통)
- 반드시 기록: `case_id`, `updated_at(ISO/타임존)`, `author`, `owner`, `status_before`, `status_after`, `links[]`, `content_hash(해당 시)`

## RBAC
- 수행: `cs-processor`
- 검토 보조: `cs-quality`

## 입력
- 처리 기록: `cases/{case_id}-processing-notes.md` (일반 경로)
- 통합 결과: `cases/{case_id}-integrated-response.md` (협업 경로)
- 톤/정책: `.bmad-cs-operations/data/tone-guide.md`, `.bmad-cs-operations/data/policies.md`
- 답변 템플릿: `response-template-tmpl.yaml`

## 산출물
- 답변 초안: `cases/{case_id}-response-draft.md` (템플릿 기반)
- 인용/출처 목록(선택): `cases/{case_id}-sources.md`

## 상태 전이
- before: `processed` | `ready-for-review` → after: `ready-for-review`
- guard: 사실·근거 대조, 고객 액션·ETA 포함, 금칙어/민감정보 점검

## 구성 원칙
1) 사실 우선: 검증된 사실과 완료/진행 상태만 기재
2) 고객 관점: 고객이 알아야 할 핵심만 간결히, 전문용어는 쉽게
3) 투명성: 한계/제약/ETA 명시, 내부정보는 비공개 처리
4) 톤: 공손·명확·책임감, 책임 회피 표현과 탓 돌리기 금지

## 단계별 지침
1) 핵심 요약 2~3문장 작성(무엇이 발생/무엇을 했는지/현재 상태)
2) 본문에 사실·조치·근거 링크(공개 가능한 범위) 정리
3) 고객 다음 단계/ETA/재연락 시점 명시, 연락 채널 포함
4) 템플릿 `response-template-tmpl.yaml`로 저장(greeting/body/footer 채움)
5) 금칙어/민감정보 노출 점검 후 `review-response`로 전달

## 검증 체크리스트
- [ ] 사실/수치가 최신이며 출처 일치
- [ ] 고객의 다음 단계/ETA 명확
- [ ] 내부 링크/민감정보 비공개 처리
- [ ] 톤 가이드·금칙어 준수
- [ ] 길이 적정(요약 2~3문장, 본문 3~7문장 권장)

## 에지 케이스
- 출처 상충/불확실: 임시 안내 문구 사용, 다음 업데이트 시간 명시
- 채널 제약(문자 수/미리보기): 핵심 요약 우선, 링크는 권한 확인 후 단축
- 다국어 고객: 고객 언어로 초안 작성, 내부 참고는 원문 유지

## 예시
- 입력: `processing-notes`에 조치/검증 요약 존재
- 처리: 템플릿 맞춰 요약/본문/다음 단계 작성, 금칙어 점검
- 산출: `cases/CASE-1234-response-draft.md`, 상태 `ready-for-review`

## 실패/에스컬레이션
- 불확실/상충 정보 존재: 사실 확인 요청 후 임시 안내(다음 업데이트 시간 약속)
- 규제/법무 리스크 감지: 즉시 L1 에스컬레이션(법무/컴플라이언스 포함)

## 로그(선택)
- 필드: `drafted_at`, `drafted_by`, `sources[]`, `redactions[]`

## 답변 초안 예시(템플릿 적용)
```markdown
안녕하세요, {{customer_name}} 님.
요청하신 건은 내부 확인을 마쳤으며, 아래와 같이 안내드립니다.

- 현재 상태: {{current_status}}
- 진행/조치: {{what_was_done}}
- 다음 단계/예상 일정: {{next_steps}} / {{eta}}

불편을 드려 죄송하며, 추가 문의는 본 메일 회신 또는 {{support_channel}}로 부탁드립니다.
```

## 연계/핸드오프
- 다음 작업: `review-response` → `finalize-response`
- 협업 경로 추가 조치 필요 시: `delegate-to-department` 재호출
