# CS 라우팅 규칙 · 운영정책 생성을 위한 데이터 요청서

## 1. 배경/목적
- BMAD-CS 확장팩 구축을 위해 `routing-rules.md/.yaml` 및 정책 문서(참조: `docs/cs-expansion/CS-Operations-Policies-and-Processes.md`)를 자동 생성·정합화하려면, 실제 CS 응대 대화 데이터가 필요합니다.
- 요구 데이터는 규칙 학습/정제, SLA·우선순위(P1 신호)·라우팅·협업/이관 분기 수립, 톤/컴플라이언스 가이드 반영의 근거로 사용됩니다.

## 2. 요청 산출물(Deliverables)
- 필수: JSONL 대화 데이터 (1줄 = 1 케이스)
- 선택: CSV 요약(집계/메타데이터) / 원문 마크다운(익명화 완료본)

## 3. 제출 경로(Repo 내 저장 위치)
- JSONL 원본: `docs/cs-expansion/data/conversations/*.jsonl`
- 선택 CSV: `docs/cs-expansion/data/conversations/summary.csv`
- 선택 원문: `docs/cs-expansion/data/conversations/raw/`

## 4. JSONL 스키마(권장)
한 줄 = 하나의 케이스/대화. 최소 필드부터 권장 필드까지 아래를 참고해 주세요. 정책 참조: `docs/cs-expansion/CS-Operations-Policies-and-Processes.md`.
```json
{"id":"case-2025-0001",
 "channel":"email|chat|phone",
 "customer_tier":"VIP|Standard|... ",
 "language":"ko",
 "created_at":"2025-08-10T09:12:00+09:00",
 "labels":{
   "category":"billing|technical|account|shipping|refund|product-bug|feature-request|...",
   "subcategory":"invoice|payment-failed|password-reset|...",
   "priority":"P1|P2|P3",
   "branch":"general|collaboration|handoff|to_pm",
   "route_department":"finance|engineering|accounting|logistics|...",
   "handoff_to":"engineering",
   "collaboration_with":["finance"],
   "escalation_level":"L1|L2|none",
   "sla_target_minutes":240,
   "sla_met":true
 },
 "p1_signals":{
   "vip":true,
   "payment_or_refund":true,
   "regulatory_threat":false,
   "escalated_tone":false,
   "regulatory_terms_detected":["공정위","소보원"]
 },
 "policy_refs":["PII-masking","refund-policy-2024-12"],
 "outcome":"resolved|unresolved|handoff|product-path",
 "resolution_time_minutes":185,
 "messages":[
   {"role":"customer","ts":"...","text":"청구서 금액이 이상합니다..."},
   {"role":"agent","ts":"...","text":"확인 후 재발행 도와드리겠습니다..."},
   {"role":"agent","ts":"...","text":"재무팀 협업 요청 접수했고 완료시 안내드려요"},
   {"role":"dept:finance","ts":"...","text":"조정 완료, 재발행 가능"},
   {"role":"agent","ts":"...","text":"조정 완료되어 재발행 드렸습니다."}
 ],
 "notes":"규정 준수 위해 카드번호 마스킹 적용, VIP 우선 처리"}
```
설명:
- `messages[].role`: `customer` | `agent` | `dept:{부서명}` 형식 허용
- 라벨이 없으면 저희가 추론 가능하나, 20~50건 정도는 `labels.branch/priority/category`와 `p1_signals`가 포함되면 품질이 크게 향상됩니다.
- `p1_signals`는 정책의 P1 조건(📌 VIP / 결제·환불 / 규제기관 신고 의사 / 격앙 톤)에 해당하는 신호를 표준 키로 기입합니다.
- `policy_refs`: 대화에서 준수한 내부 규정 키(예: `PII-masking`).

## 5. CSV 요약(선택)
```csv
id,channel,customer_tier,category,subcategory,priority,department,handoff_to,collaboration_with,policy_refs,outcome,resolution_time_minutes,sla_target_minutes,sla_met
case-2025-0001,email,VIP,billing,invoice,P1,finance,,,"PII-masking;refund-policy-2024-12",resolved,185,240,true
```

## 6. 원문 마크다운(선택)
```markdown
# case-2025-0002
- channel: chat
- customer_tier: Standard
- suspected_category: technical/password-reset
- notes: PII 마스킹 완료

## transcript
[customer] 계정 비밀번호가 계속 오류…
[agent] 인증 로그 확인 후 초기화 링크 발송…
[agent] 보안정책-2단계인증 적용 안내…
```

## 7. 익명화/보안 가이드
- 제출 전 PII 마스킹 권장: 이메일/전화/카드/주민번호 → `***` 또는 토큰화
- 필요 시 마스킹 규칙(정규식) 제공해 주시면 추가 적용 가능합니다.
- 민감 데이터는 원천 저장소(사내) 외부로 반출 금지. 본 저장소에는 익명화본만 업로드해 주세요.

## 8. 분량/일정
- 초기 학습 샘플: 20~50건 (스프린트 1)
- 정교화 단계: 100~300건 (스프린트 2)
- 제출 마감 제안: 초안 1주 내, 보강본 3주 내

## 9. 수용 기준(Acceptance Criteria)
- JSONL 파싱 무결성(전 건 유효 JSON)
- PII 마스킹 100% 적용(무누락)
- 최소 필드 충족: `id`, `messages`, `outcome`
- 품질 샘플 20건 이상에 `labels.category/priority/department` 포함
- 무작위 10건 표본 검수 통과(톤/컴플라이언스/익명화)

## 10. 산출물 활용/출력물
- `routing-rules.yaml`(머신 실행 규칙) + `routing-rules.md`(사람용 요약)
- `policies.md`(도메인 운영정책) 및 `docs/cs-expansion/CS-Operations-Policies-and-Processes.md`와의 정합성 검증 리포트
- `.bmad-cs-operations/data/priority-keywords.yaml`(P1 키워드/조건 규칙) 보강

## 11. 제출 방법
- 권장: 본 저장소에 브랜치 생성 후 PR 제출
- 대안: 사내 보안 스토리지 링크 공유(권한: 읽기 전용 링크)

## 12. 연락처
- 요청자: CS BMAD 팀
- 담당: 데이터 온보딩 오너 (이메일/슬랙 채널 기입)
- 문의: 라벨링/익명화 기준 관련 사전 질의 환영

## 13. FAQ
- Q: 라벨이 전혀 없으면? → 초안은 가능하나 규칙 품질이 낮음. 최소 20~50건 라벨 권장.
- Q: 다국어 포함? → `language` 필드로 구분. 우선 `ko`부터 진행 후 다국어 확장.
- Q: 매우 긴 대화? → JSONL에 그대로 포함. 필요 시 1 케이스를 1 파일로도 허용.

---
본 요청에 따라 데이터가 수집/제출되면 3영업일 내 1차 규칙/정책 초안을 제공하겠습니다.

## 부록: 샘플 JSONL (4건)
```json
{"id":"case-2025-0001","channel":"email","customer_tier":"VIP","language":"ko","created_at":"2025-08-10T09:12:00+09:00","labels":{"category":"billing","subcategory":"invoice","priority":"P1","branch":"collaboration","route_department":"finance","handoff_to":"","collaboration_with":["finance"],"escalation_level":"L1","sla_target_minutes":15,"sla_met":true},"p1_signals":{"vip":true,"payment_or_refund":true,"regulatory_threat":false,"escalated_tone":false,"regulatory_terms_detected":[]},"policy_refs":["PII-masking","refund-policy-2024-12"],"outcome":"resolved","resolution_time_minutes":185,"messages":[{"role":"customer","ts":"...","text":"청구서 금액이 이상합니다"},{"role":"agent","ts":"...","text":"재무팀 협업 요청 접수했고 완료시 안내드리겠습니다"},{"role":"dept:finance","ts":"...","text":"조정 완료, 재발행 가능"},{"role":"agent","ts":"...","text":"조정 완료되어 재발행 드렸습니다"}],"notes":"VIP 우선 처리"}
```

```json
{"id":"case-2025-0002","channel":"chat","customer_tier":"Standard","language":"ko","created_at":"2025-08-11T10:00:00+09:00","labels":{"category":"technical","subcategory":"password-reset","priority":"P2","branch":"general","route_department":"engineering","handoff_to":"","collaboration_with":[],"escalation_level":"none","sla_target_minutes":60,"sla_met":true},"p1_signals":{"vip":false,"payment_or_refund":false,"regulatory_threat":false,"escalated_tone":false,"regulatory_terms_detected":[]},"policy_refs":["PII-masking"],"outcome":"resolved","resolution_time_minutes":45,"messages":[{"role":"customer","ts":"...","text":"비밀번호 초기화 링크가 안와요"},{"role":"agent","ts":"...","text":"발송 이력 확인 후 재발송했습니다"}],"notes":"표준 처리"}
```

```json
{"id":"case-2025-0003","channel":"email","customer_tier":"Standard","language":"ko","created_at":"2025-08-11T13:30:00+09:00","labels":{"category":"product-bug","subcategory":"editor-crash","priority":"P2","branch":"to_pm","route_department":"pm","handoff_to":"pm","collaboration_with":["engineering"],"escalation_level":"none","sla_target_minutes":1440,"sla_met":false},"p1_signals":{"vip":false,"payment_or_refund":false,"regulatory_threat":false,"escalated_tone":false,"regulatory_terms_detected":[]},"policy_refs":["PII-masking"],"outcome":"product-path","resolution_time_minutes":0,"messages":[{"role":"customer","ts":"...","text":"편집기가 자꾸 꺼집니다"},{"role":"agent","ts":"...","text":"제품팀에 정식 접수하여 기획/개발을 진행하겠습니다"}],"notes":"PM 48h 1차 판단 예정"}
```

```json
{"id":"case-2025-0004","channel":"email","customer_tier":"Standard","language":"ko","created_at":"2025-08-12T08:20:00+09:00","labels":{"category":"billing","subcategory":"refund","priority":"P1","branch":"general","route_department":"finance","handoff_to":"","collaboration_with":[],"escalation_level":"L1","sla_target_minutes":15,"sla_met":true},"p1_signals":{"vip":false,"payment_or_refund":true,"regulatory_threat":true,"escalated_tone":false,"regulatory_terms_detected":["공정위"]},"policy_refs":["PII-masking","refund-policy-2024-12"],"outcome":"resolved","resolution_time_minutes":120,"messages":[{"role":"customer","ts":"...","text":"환불 안해주면 공정위 신고하겠습니다"},{"role":"agent","ts":"...","text":"즉시 확인하여 환불 절차 진행하겠습니다"}],"notes":"규제 위협 포함 → P1"}
```
