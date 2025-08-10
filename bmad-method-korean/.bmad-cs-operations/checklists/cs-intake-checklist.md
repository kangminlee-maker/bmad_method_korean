# cs-intake-checklist

## 목적
- 신규 문의 접수 시 필수 정보/보안/우선순위 판정이 누락 없이 충족되었는지 확인합니다.

## 메타데이터 헤더(공통)
- 기록 필드: `case_id`, `updated_at(ISO/타임존)`, `author`, `links[]`

## Guards(필수)
- PII 마스킹 적용(이메일/전화/카드/주민번호)
- 최소 필드 충족: 요약/상세/희망결과
- P1 신호 추출 시도: vip/payment_or_refund/regulatory_threat/escalated_tone
- 키워드 규칙 참조: `.bmad-cs-operations/data/priority-keywords.yaml`(주 1회 점검/롤백 기록)

## 항목
- [ ] 채널/언어/고객등급/수신시각/타임존/연락 선호 입력
- [ ] 원문 발췌(마스킹) 및 식별자(마스킹) 수록
- [ ] 링크 추출 및 권한 확인 필요 표시
- [ ] 첨부 존재 시 무결성/안전성 확인
- [ ] P1 신호 판정(vip/결제·환불/규제 위협/격앙 톤) 기록
- [ ] 초기 분류/경로 후보(category/subcategory/branch) 기록
- [ ] 초기 우선순위/초기 SLA 타깃 분 설정(P1=15m/P2=60m/P3=240m)
- [ ] 접수 문서 생성: `inquiry-record-tmpl.yaml` 사용 → `cases/{case_id}-inquiry.md`
- [ ] 케이스 상태 `new` 설정 및 라우팅 대기 큐 등록

## 결과
- Pass: `new` 상태로 `classify-and-route` 진행
- Fail: 정보 보강 요청 발송, 6h/24h 리마인드, 24h 초과 시 L1 에스컬레이션

## Notes
- 정책 참조: `docs/cs-expansion/CS-Operations-Policies-and-Processes.md`
- 보안: 마스킹 누락 의심 시 접수 보류 및 보안 담당 통보

