# compliance-check

## 목적
- 고객 커뮤니케이션 및 처리 과정이 법/규정/내부 정책을 준수하는지 독립적으로 점검합니다.
- PII/민감정보, 약관, 환불/결제 규정, 공개 범위, 기록 보관 의무 등을 확인합니다.

## 메타데이터 헤더(공통)
- 반드시 기록: `case_id`, `updated_at(ISO/타임존)`, `author`, `owner`, `status_before`, `status_after(의사결정)`, `links[]`

## RBAC
- 수행: `cs-quality`
- 승인/법무 판단: `legal`, `compliance`, 필요 시 `cs-manager`

## 입력
- 답변 초안 또는 최종안: `cases/{case_id}-response-draft.md` / `cases/{case_id}-response-final.md`
- 처리/통합 자료: `processing-notes.md` / `integrated-response.md`
- 정책/가이드: `.bmad-cs-operations/data/policies.md`, `tone-guide.md`, `sla-matrix.md`
- 감사 로그/증빙 링크: 커밋/티켓/문서/시스템 로그

## 산출물
- 컴플라이언스 점검 보고: `cases/{case_id}-compliance-report.md`
- 판정: `pass` | `fail` | `needs-legal-review`
- 수정 요구 사항 목록 및 우선순위(블로킹/권고)

## 상태 전이
- 없음(의무 판단이며, 발송 가능 여부는 `review-response`/`finalize-response`에서 반영)

## 점검 범주(예시)
1) 개인정보/민감정보: 마스킹, 최소 공개, 저장 금지, 전송 암호화
2) 법/규제: 전자상거래/환불/소비자보호/표시광고법 등 관련 근거 준수
3) 약관/정책: 환불/결제/계정/보상/데이터 보존/접근권한
4) 공개 범위: 내부 링크/시스템 세부 제거, 고객용 요약으로 대체
5) 기록 보관: 감사 로그/증빙의 충분성 및 보존 기간 기준
6) 톤/브랜드: 책임 소재 표현, 오해 소지 제거, 금칙어

## 단계별 지침
1) 점검 범주별 체크리스트 기반 확인, 근거(정책 조항/문구)와 함께 기록
2) 이슈 분류: 블로킹/권고, 고객 영향/법적 리스크/시급성 평가
3) 수정 안내: 구체적 대체 문구/처리 절차/승인 경로 제안
4) 최종 판정 기록: `pass` | `fail` | `needs-legal-review`
5) `fail`/`needs-legal-review` 시: L1 에스컬레이션(법무/컴플라이언스 포함), 재검토 일정 합의

## 의무 조치 SLA(개별 강화)
- `fail`: 24h 이내 수정안 제시 및 재검토 요청 등록
- `needs-legal-review`: 즉시 L1(법무/컴플) 에스컬레이션, 8h 이내 1차 소견 확보 목표

## 정책 참조 포맷
- 문서명#섹션 형식으로 기록: 예) `policies.md#refund-policy-2.1`

## 검증 체크리스트
- [ ] PII/민감정보 비노출 및 마스킹
- [ ] 법/규정/약관 준수 근거 기록
- [ ] 내부정보 비공개 및 고객용 표현 정제
- [ ] 감사 로그/증빙 충분
- [ ] 톤 가이드 준수

## 템플릿(붙여넣기)
```markdown
# Compliance Report (Case {{case_id}})
- Verdict: pass | fail | needs-legal-review
- Key Issues:
  - [ ] {{issue_1}} — policy: {{policy_ref}} — risk: {{risk_level}}
- Recommendations:
  - [ ] {{rec_1}} — action: {{what}} — due: {{due_at}} — owner: {{owner}}
```

## 에지 케이스
- 상충 규정(해외/지역 법) 적용: 더 엄격한 기준 우선, 이견 시 법무 판단 우선
- 근거 자료 접근 권한 부재: 권한 요청 후 요약으로 임시 기록, 확정 후 원문 링크 갱신
- 시간 임박: 보수적 문안 권장, 발송 보류 권고 가능

## 예시
- 입력: 환불 안내 최종안, 링크 2건, 개인정보 마스킹 적용
- 처리: 약관/전자상거래법 대조, 톤·금칙어 점검 → pass
- 산출: `cases/CASE-1234-compliance-report.md` 저장

## 연계/핸드오프
- `review-response`와 병행 가능, 최종 발송 전 반드시 반영
- `finalize-response`에서 수정 반영 후 pre‑send preview 재생성/재승인 필요
