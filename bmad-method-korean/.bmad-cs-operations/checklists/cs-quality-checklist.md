# cs-quality-checklist

## 목적
- 고객 발송 전 품질/컴플라이언스를 보증하고, 사람 리뷰/Sign-off 절차를 강제합니다.

## 메타데이터 헤더(공통)
- 기록 필드: `case_id`, `updated_at(ISO/타임존)`, `reviewer`, `signed_at`, `content_hash(미리보기 기준)`, `links[]`

## RBAC
- 수행: `cs-quality`
- 승인(선택): `cs-manager`

## Guards(필수)
- pre-send preview 존재 여부 확인
- `content_hash(preview)` == `review-response Sign-off.content_hash`

## 항목
- [ ] 정확성: 사실/수치/링크 최신·일치
- [ ] 완전성: 질문 전부 응답, 다음 단계/ETA 포함
- [ ] 톤/브랜드: 공손/명확/책임감, 금칙어 제거
- [ ] 보안/컴플라이언스: PII/민감정보 비노출, 공개 범위 적절
- [ ] 링크/첨부 접근성: 권한/만료/무결성 확인
- [ ] pre-send preview 생성: 수신자/채널/제목/본문 렌더링/첨부·링크/발송 시각/타임존 포함
- [ ] content_hash 저장 및 `review-response` Sign-off 레코드와 일치 확인
- [ ] 승인 이후 변경 없음(변경 시 프리뷰 재생성·재승인)

## 결과
- Pass: 전체 체크 통과 + Sign-off 기록(reviewer, signed_at, content_hash)
- Fail: 보완 필요(블로킹 항목 명시) → 수정 후 재검토

## Notes
- content_hash 저장 위치: `cases/{case_id}-response-final.md` 상단 메타 또는 별도 JSON
