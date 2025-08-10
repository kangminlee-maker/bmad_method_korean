# cs-pre-send-checklist (권장)

## 목적
- 발송 직전(ready-to-send) 상태에서 실제 발송 내용과 승인된 프리뷰의 일치를 최종 확인합니다.

## 메타데이터 헤더(공통)
- 기록 필드: `case_id`, `checked_at(ISO/타임존)`, `checker`, `links[]`

## Guards(필수)
- `finalize-response`에서 저장한 `content_hash`와 실제 발송 프리뷰의 해시가 일치

## 항목
- [ ] 수신자(To/Cc/Bcc) 정확
- [ ] 채널/제목/본문 렌더링이 승인된 프리뷰와 동일
- [ ] 첨부/링크 권한 유효, PII/민감정보 비노출
- [ ] 발송 예정 시각·타임존 적합(SLA 내)
- [ ] content_hash 계산 및 `review-response` Sign-off 레코드와 일치

## 결과
- Pass: 발송 진행
- Fail: `finalize-response`로 되돌려 수정/재승인

## Notes
- 해시 알고리즘: SHA-256, 저장 위치: 케이스 메타 또는 별도 JSON
