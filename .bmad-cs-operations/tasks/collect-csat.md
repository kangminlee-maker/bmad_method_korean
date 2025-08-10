# collect-csat

## 목적
- 고객 만족도(CSAT) 및 서술형 피드백을 수집해 품질 개선과 KPI 관리에 반영합니다.

## 메타데이터 헤더(공통)
- 반드시 기록: `case_id`, `updated_at(ISO/타임존)`, `author`, `owner`, `status_before`, `status_after`, `links[]`

## RBAC
- 수행: `cs-processor`
- 집계/인사이트: `cs-analytics`(선택)

## 입력
- 케이스 정보: `closure.md` 요약, 고객 채널/언어/타임존
- 설문 템플릿: `customer-satisfaction-tmpl.yaml`
- 정책: 연락 빈도/광고성 금지/옵트아웃 처리

## 산출물
- CSAT 기록: `cases/{case_id}-csat.md`(점수/코멘트/수집 채널/시각)
- 집계 데이터(선택): 주간 리포트에 반영

## 상태 전이
- before: `closed` → after: `closed`(의사결정/설문 기록만 추가)
- guard: 발송 조건 충족, 옵트아웃 준수

## 단계별 지침
1) 발송 조건 확인: 케이스 `closed` 상태, 최근 7일 중복 발송 금지, 옵트아웃 여부 확인
2) 채널별 설문 발송: 이메일/챗(링크 또는 인라인), 전화 시 간단 스코어링 요청
3) 수집/정규화: 점수(1~5), 자유 코멘트(PII 제거), 감성 태그(긍/부/중립)
4) 개선 연계: 부정 코멘트는 개선 백로그로 자동 티켓화(카테고리/팀 매핑)
5) 기록/집계: `csat.md` 저장, 주간 리포트 반영

## 채널별 응답률 향상 팁(개별 강화)
- 이메일: 업무시간 종료 1~2시간 전에 발송, 제목은 20자 내 간결하게
- 챗: 응대 종료 10~30분 내 짧은 설문 링크
- 전화: 통화 말미 1~2문장으로 구두 스코어 요청

## 부정 코멘트 라우팅(개별 강화)
- 카테고리 매핑 → 담당 팀 백로그 자동 티켓화, 우선순위 규칙: 치명적(P1) 키워드 포함 시 상향

## 검증 체크리스트
- [ ] 옵트아웃 준수, 광고성 금지
- [ ] 중복 발송/과도 빈도 방지
- [ ] PII 제거 및 보관 정책 준수
- [ ] 부정 피드백 티켓화

## 템플릿(응답 저장 예시)
```markdown
# CSAT (Case {{case_id}})
- Score: {{score}}/5
- Comment: {{comment}}
- Sent via: {{channel}} at {{sent_at}}
- Received at: {{received_at}}
- Sentiment: {{positive|neutral|negative}}
```

## 연계/핸드오프
- 주간 리포트: `generate-weekly-report`
- 반복 이슈는 정책/템플릿/워크플로우 개선 항목으로 전달
