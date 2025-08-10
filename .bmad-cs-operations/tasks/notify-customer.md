# notify-customer

## 목적
- 고객에게 진행 상황/최종 결과/이관 사실을 정확하고 일관된 톤으로 안내합니다.
- 채널별(이메일/챗/전화) 커뮤니케이션을 표준화하고, 발송 전 품질·컴플라이언스를 보장합니다.

## 메타데이터 헤더(공통)
- 반드시 기록: `case_id`, `updated_at(ISO/타임존)`, `author`, `owner`, `status_before`, `status_after`, `links[]`, `content_hash(해당 시)`

## RBAC
- 수행: `cs-processor`
- 승인 확인: `cs-quality`(프리뷰/서명 대조), 필요 시 `cs-manager`

## 입력
- 커뮤니케이션 내용 소스: `response-final.md` 또는 승인된 공지 초안(`response-draft.md` + review/Sign-off)
- 전환 정보(이관 시): `transfer-confirmation.md`, `handoff-index.md`
- 정책/톤: `.bmad-cs-operations/data/policies.md`, `tone-guide.md`

## 산출물
- 발송 기록: `cases/{case_id}-customer-notification.md` (채널/수신자/본문/첨부/링크/발송시각/타임존/결과)
- 상태 전환: `awaiting-customer`
- 후속 일정: 리마인더, 후속 연락 ETA

## 필수 정책
- 어떤 방식이든 고객에게 발송되기 전: `review-response` 사람 Sign-off + `finalize-response`의 pre-send preview/content_hash 일치 검증을 선행해야 함(이메일/챗 공지 시)
- 전화 공지의 경우: 통화 스크립트도 `review-response`로 승인받은 버전을 사용
 - 이관 안내 공지는 `assess-handoff-eligibility` 보고서에 사람이 Sign-off(reviewer, signed_at)한 결정이 기록된 이후에만 발송 가능

## 상태 전이
- before: `ready-to-send` → after: `awaiting-customer`
- guard: 프리뷰/서명 대조 완료, 수신자/채널 검증, 발송 성공/반송 기록

## 단계별 지침
1) 채널 선택 및 수신자 확인(To/Cc/Bcc 또는 대화 상대 ID)
2) 승인된 콘텐츠 사용: `response-final.md` 또는 승인된 스크립트/공지 텍스트를 그대로 사용
3) 채널 포맷팅:
   - Email: 제목/서명/본문/첨부, 미리보기와 일치 확인
   - Chat: 5~8줄 핵심 요약, 링크 권한 재확인
   - Phone: 승인된 스크립트 사용, 요점 기록 남김
4) 발송: 예약/즉시 발송 후 결과 수집(성공/반송/읽음 확인 등)
5) 기록: `customer-notification.md`에 전문/메타데이터/결과/다음 액션 기록
6) 상태 전환: `awaiting-customer`, 필요 시 후속 리마인더 예약

## 제품 경로 안내 스니펫(개별 강화)
```markdown
제품팀에 정식 접수되어 PRD/에픽/스토리 작성을 진행 중입니다.
중간 업데이트는 {{mid_eta}}에, 1차 기획 결과는 {{first_decision_eta}}에 안내드리겠습니다.
```

## 채널별 제약/검증(개별 강화)
- Email: 제목 60자 이내 권장, 수신 도메인 스팸 정책 확인
- Chat: 5~8줄 권장, 링크 권한/미리보기 확인
- Phone: 승인 스크립트 사용, 콜로그에 요지 기록

## 검증 체크리스트
- [ ] 수신자/채널/시간/타임존 검증 완료
- [ ] 승인된 콘텐츠와 실제 발송 내용 일치(pre-send preview/content_hash)
- [ ] 링크/첨부 권한 및 PII 마스킹 확인
- [ ] 톤/컴플라이언스 준수
- [ ] 후속 일정/연락 채널 명시

## 실패/에스컬레이션
- 반송/전달 실패: 수신자/도메인/스팸 정책 점검 후 대체 채널로 재시도, L1 알림
- 규제/법무 리스크 감지: 즉시 L1 에스컬레이션(법무/컴플라이언스 포함)

## 템플릿(붙여넣기)
### 이메일
```text
Subject: [케이스 {{case_id}}] {{one_line_summary}}
To: {{to}}
Cc: {{cc}}

{{greeting}}
{{body}}

{{footer_signature}}
```

### 챗
```markdown
안녕하세요, {{customer_name}} 님.
{{summary_line}}

- 현재 상태: {{current_status}}
- 다음 단계/예상 일정: {{next_steps}} / {{eta}}
```

### 전화 스크립트(요약 기록용)
```markdown
- 인사/본인 확인 → 승인된 요지 전달 → 다음 단계/ETA 안내 → 질문 응대 → 마무리 멘트
- 핵심 전달 문구: {{script_key_points}}
```

## 로그/메트릭(선택)
- channel, sent_at, delivery_result, open/read, followup_due_at

## 연계/핸드오프
- 후속 문의 수신 시 케이스 업데이트, 필요 시 추가 작업 생성
- 이관 케이스는 `track-post-handoff`로 상태 추적 지속
