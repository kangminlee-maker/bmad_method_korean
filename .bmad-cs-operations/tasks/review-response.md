# review-response

## 목적
- 고객 답변 초안의 정확성/완전성/톤/컴플라이언스를 리뷰하여 발송 적합 여부를 판단합니다.
- 필요 시 수정 피드백을 구조화해 빠르게 반영 가능하도록 합니다.

## 메타데이터 헤더(공통)
- 반드시 기록: `case_id`, `updated_at(ISO/타임존)`, `author`, `owner`, `status_before`, `status_after`, `links[]`, `content_hash(미리보기 기준)`

## RBAC
- 수행: `cs-quality`
- 승인: 사람 검토자(실명), 최종 확인 시 `cs-manager`(선택)

## 입력
- 답변 초안: `cases/{case_id}-response-draft.md`
- 참고 자료: `cases/{case_id}-processing-notes.md` 또는 `cases/{case_id}-integrated-response.md`
- 정책/가이드: `.bmad-cs-operations/data/policies.md`, `.bmad-cs-operations/data/tone-guide.md`
- (선택) 규정 점검 결과: `compliance-check` 산출물

 - 발송 미리보기 패킷(pre-send preview) — 반드시 사람 검토용으로 생성:
   - 수신자/참조/숨은참조(To/Cc/Bcc)
   - 채널(이메일/챗/전화), 타임존, 발송 예정 시각
   - 제목/요약(이메일의 경우)
   - 본문 렌더링 결과(템플릿 적용 후 최종 표시 형태)
   - 첨부/링크 목록(권한·마스킹 반영 상태)

## 산출물
- 리뷰 결과 기록: `cases/{case_id}-review-notes.md`
- 결정 상태: `approved` | `changes-requested`
- 수정 요청 목록(블로킹/권고 구분), 마감시간, 담당자

## 상태 전이
- before: `ready-for-review` → after: `approved` | `changes-requested`
- guard: 프리뷰 렌더링 확인, 체크리스트 합격, 사람 Sign-off 또는 수정 요청 기록

## 리뷰 범주(체크포인트)
1) 정확성: 사실/수치/링크가 최신이고 출처와 일치
2) 완전성: 고객 질문 전부 응답, 다음 단계/ETA/연락 채널 포함
3) 일관성/명확성: 용어/서술 구조/길이 적정(요약 2~3문장, 본문 3~7문장)
4) 톤/브랜드: 공손/책임감/비비난, 금칙어/불필요 전문용어 제거
5) 보안/컴플라이언스: PII/민감정보 비노출, 공개 범위 적절, 약관·법규 준수
6) 위험 표시: 남은 리스크·한계 투명성, 고객 기대관리 적절성

## 단계별 지침
0) 발송 미리보기(pre-send preview) 생성: 실제 발송될 형식과 100% 동일한 내용으로 렌더링
1) 초안과 출처 대조: 핵심 사실/수치/링크 검증, 불일치 표시
2) 체크리스트 기반 평가: 각 범주 합/불합 판정(근거 메모)
3) 수정 요청 작성: 블로킹/권고 태그, 제안 문구 포함, 마감/담당 지정
4) 컴플라이언스 의심 항목은 `compliance-check` 병행 요청
5) 결과 결정: `approved` 또는 `changes-requested` 저장 및 통보
6) 승인 시 사람 서명(Sign-off) 기록: reviewer, 서명 시각, 승인한 미리보기의 콘텐츠 해시(content_hash)

## 검증 체크리스트
- [ ] 모든 범주 평가 및 근거 기록
- [ ] 블로킹 이슈 0건일 때만 `approved`
- [ ] 링크/첨부 접근성 확인
- [ ] 톤/금칙어 점검 완료
 - [ ] 발송 미리보기(pre-send preview)가 생성되었으며 실제 발송 내용과 일치
 - [ ] 사람 검토자 서명(Sign-off) 기록(reviewer, signed_at, content_hash)

## 결정 규칙
- Pass: 블로킹 0, 권고만 존재 → `approved` + 사람 Sign-off 필수
- Conditional Pass: 경미한 수정(5분 내 반영 가능) → 수정 반영 후 동일 프리뷰를 재생성·재확인하고 사람 Sign-off 필수
- Fail: 블로킹 ≥ 1 → 수정 후 재검토

## 사람 리뷰 & Sign-off(필수)
- 어떤 방식(이메일/챗/전화 스크립트)이든 고객 발송 전에 반드시 사람이 검토·승인해야 합니다.
- 검토 대상은 발송 미리보기(pre-send preview)로, `finalize-response` 단계에서 발송될 내용과 100% 동일해야 합니다.
- Sign-off에 포함할 필드: `reviewer`, `signed_at`, `content_hash`(미리보기 본문+메타의 해시)
- 승인 이후 본문/수신자/첨부/시간 등 어떤 요소라도 변경되면 프리뷰를 재생성하고 재승인 절차를 거쳐야 합니다.

## 에지 케이스
- 프리뷰-서명 해시 불일치: 승인 무효 처리, 프리뷰 재생성 및 재서명 요구
- 링크 권한 이슈 발생: 링크 교체/요약 제공, 권한 검토 후 재검토
- 언어/문화권 민감 표현: 톤 가이드 재검토, 민감어 리스트 점검

## 예시
- 입력: `response-draft.md`, 프리뷰 생성 패킷, 톤/정책 가이드
- 처리: 체크리스트로 평가, 권고 1건/블로킹 0건 → `approved`, 서명 기록
- 산출: `cases/CASE-1234-review-notes.md`, 상태 `approved`

## 실패/에스컬레이션
- 반복적 품질 저하(동일 항목 2회 이상): L1 에스컬레이션(팀 리드 리뷰 회수 강화)
- 규제/법무 리스크 감지: 즉시 L1 에스컬레이션(법무/컴플라이언스 포함)

## 피드백 템플릿(붙여넣기)
```markdown
# Review Notes (Case {{case_id}})
- Decision: approved | changes-requested
- Blocking Issues:
  - [ ] {{issue_1}} — reason: {{why}} — suggestion: {{how}}
- Recommendations:
  - [ ] {{rec_1}} — rationale: {{why}}
- Due: {{due_at}} — Owner: {{owner}}
```

## 로그/메트릭(선택)
- review_time_minutes, blocking_count, recommendations_count, rework_cycles, signed_off_by, signed_off_at

## 연계/핸드오프
- 승인 시: `finalize-response`
- 수정 필요 시: 작성자에게 반환 → 수정 후 재요청
- 규정 점검 필요: `compliance-check` 실행 후 결과 반영
