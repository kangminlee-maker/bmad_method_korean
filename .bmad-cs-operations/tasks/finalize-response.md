# finalize-response

## 목적
- 리뷰/컴플라이언스 피드백을 반영하여 고객에게 발송할 최종 답변을 확정합니다.
- 채널별 포맷/시간/수신자 검증 후 발송(또는 전달)을 준비합니다.

## 메타데이터 헤더(공통)
- 반드시 기록: `case_id`, `updated_at(ISO/타임존)`, `author`, `owner`, `status_before`, `status_after`, `links[]`, `content_hash`

## RBAC
- 수행: `cs-processor`
- 승인 확인: `cs-quality`(사람 Sign-off 검증)

## 입력
- 답변 초안: `cases/{case_id}-response-draft.md`
- 리뷰 결과: `review-response` 피드백, `compliance-check` 결과
- 템플릿/가이드: `response-template-tmpl.yaml`, `tone-guide.md`, `policies.md`
- 채널 정보: email | chat | phone (필요 시 스크립트)

## 산출물
- 최종 답변: `cases/{case_id}-response-final.md`
- 변경 로그: 반영한 피드백/수정 근거(`cases/{case_id}-response-changelog.md`)
- 발송 계획: 수신자/채널/시간/제목/첨부/후속 일정
- 상태 전환: `ready-to-send` → (전달 후) `awaiting-customer`

## 상태 전이
- before: `ready-for-review` → after: `ready-to-send`
- guard: 프리뷰 생성, content_hash 저장, 사람 Sign-off와 해시 일치 확인

## 단계별 지침
1) 피드백 반영: 모든 코멘트 처리/반영 여부 체크, 불수용 사유 기록
2) 사실/링크/첨부 점검: 링크 유효성, 권한, 파일 무결성, PII 마스킹 재확인
3) 채널 포맷팅:
   - Email: 제목(한 줄 요약), 서명, 본문 마크다운→HTML 변환 가능 여부
   - Chat: 5~8줄 내 핵심 요약, 링크는 미리보기/권한 확인
   - Phone: 통화 스크립트 요약 별도 생성(선택)
4) 발송 미리보기(pre-send preview) 생성: 수신자/채널/제목/본문 렌더링/첨부·링크 목록/발송 예정 시각 포함
5) 콘텐츠 해시(content_hash) 계산: 미리보기 본문+메타(수신자/제목/채널/시간/첨부)를 포함한 해시 값 저장
6) 사람 Sign-off 확인: `review-response` 단계의 승인 레코드와 content_hash가 일치해야 함(불일치 시 재검토 요청)
7) 발송 타이밍: 업무시간/고객 타임존 고려, SLA 내 안내 약속 포함
8) 저장 및 상태 업데이트: `response-final.md` 저장, 상태 `ready-to-send`, 후속 리마인더 예약

## 검증 체크리스트
- [ ] 수신자/참조/숨은참조 확인(오발송 방지)
- [ ] 제목/요약이 명확하고 고객 관점임
- [ ] 링크/첨부 접근 가능, PII/민감정보 노출 없음
- [ ] 톤/컴플라이언스/정책 준수
- [ ] 다음 단계/ETA/연락 채널 명시됨
- [ ] 발송 시간대/타임존/SLA 적합
 - [ ] 발송 미리보기 생성 및 content_hash 저장
 - [ ] 사람 Sign-off(content_hash 일치) 확인

## content_hash 규칙(개별 강화)
- 해시 대상: 미리보기 본문 렌더링 결과 + 수신자/채널/제목/발송 시각(타임존 포함)/첨부·링크 URL 목록
- 알고리즘: SHA-256, 저장 위치: `cases/{case_id}-response-final.md` 메타 또는 별도 JSON
- 변경 발생 시: 프리뷰 재생성·재승인 필수

## 실패/에스컬레이션
- 발송 채널 장애/반송: 대체 채널 시도, 고객 연락처 재확인, L1 알림
- 규제·법무 리스크 감지: 즉시 L1 에스컬레이션(법무/컴플라이언스 포함)

## 템플릿 스니펫(이메일 예시)
```text
Subject: [케이스 {{case_id}}] {{one_line_summary}}
To: {{to}}
Cc: {{cc}}

{{greeting}}
{{body}}

{{footer_signature}}
```

## 로그/메트릭(선택)
- sent_channel, scheduled_at/sent_at, retries, bounces, followup_due_at

## 연계/핸드오프
- 발송/전달: `cs-intake` → `deliver-final-response`
- 후속: 고객 응답 수신 시 케이스 업데이트, 필요 시 추가 작업 생성
