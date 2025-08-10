# cs-handoff-checklist

## 목적
- 완전 이관 시 패키징/전환 준비가 기준에 부합하는지 확인합니다.

## 메타데이터 헤더(공통)
- 기록 필드: `case_id`, `updated_at(ISO/타임존)`, `author`, `links[]`

## Guards(필수)
- 이관 적격성 점수표 적용(합계 ≥ 6 권고)
- 패키지 색인에 최종 체크리스트 포함
- PII 마스킹 및 권한 점검 완료

## 항목
- [ ] 적격성 보고서 저장(`handoff-assessment.md`) 및 점수 기록
- [ ] 적격성 보고서에 사람 Sign-off(reviewer, signed_at) 기록 확인
- [ ] 패키지 파일 세트 구성(고객 컨텍스트/히스토리/요구/증빙/연락/프라이버시 노트)
- [ ] Done 정의/마일스톤/ETA 기입
- [ ] 연락/업데이트/에스컬레이션 경로 명시
- [ ] 전환 확인서 서명 계획 및 content_hash 저장 위치 준비

## 결과
- Pass: `coordinate-transfer` 진행, 오너/알림 준비
- Fail: 정보 보강/권한 확보 후 재검토, 고객 임시 안내 준비

## Notes
- 정책 참조: `docs/cs-expansion/CS-Operations-Policies-and-Processes.md`
- 롤백 플랜: 전환 실패 시 임시 소유권 유지 및 재시도 일정 합의

