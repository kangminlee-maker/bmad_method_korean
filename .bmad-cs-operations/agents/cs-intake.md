# CS 접수 담당자 (cs-intake)
role: 접수/분류/라우팅/에스컬레이션
commands: [intake-new-inquiry, classify-and-route, escalate-urgent, deliver-final-response]
EOF

cat > .bmad-cs-operations/agents/cs-collaboration-coordinator.md <<\"EOF\"
# 협업 코디네이터 (cs-collaboration-coordinator)
role: 타 부서 협업 요청/추적/완료확인/통합답변
commands: [delegate-to-department, track-external-work, verify-completion, integrate-responses, escalate-delays]
EOF

cat > .bmad-cs-operations/agents/cs-handoff-processor.md <<\"EOF\"
# 이관 프로세서 (cs-handoff-processor)
role: 완전 이관 평가/패키지/전환/사후 추적
commands: [assess-handoff-eligibility, create-handoff-package, coordinate-transfer, notify-customer, track-post-handoff]
EOF

cat > .bmad-cs-operations/agents/cs-processor.md <<\"EOF\"
# 처리 담당자 (cs-processor)
role: 내부 처리 원칙 기반 업무 수행/답변 초안 작성
commands: [process-inquiry, draft-response, finalize-response]
EOF

cat > .bmad-cs-operations/agents/cs-quality.md <<\"EOF\"
# 품질 관리자 (cs-quality)
role: 정확성/완전성/톤/컴플라이언스 검토 및 승인
commands: [review-response, compliance-check]
EOF

# 3) 작업 스캐폴딩 (.bmad)
for f in \
  intake-new-inquiry \
  classify-and-route \
  escalate-urgent \
  delegate-to-department \
  track-external-work \
  verify-completion \
  integrate-responses \
  process-inquiry \
  draft-response \
  finalize-response \
  review-response \
  compliance-check \
  assess-handoff-eligibility \
  create-handoff-package \
  coordinate-transfer \
  notify-customer \
  track-post-handoff \
  close-case \
  collect-csat \
  generate-weekly-report; do
  cat > .bmad-cs-operations/tasks/${f}.md <<EOF
# ${f}

## 목적
- TBD

## 지침
- TBD
EOF
done

# 4) 워크플로우 스캐폴딩 (.bmad)
cat > .bmad-cs-operations/workflows/cs-general-inquiry.yaml <<\"EOF\"
workflow:
  id: cs-general-inquiry
  name: 일반 고객 문의 처리
  sequence:
    - agent: cs-intake
      action: intake-new-inquiry
    - agent: cs-processor
      action: process-inquiry
    - agent: cs-quality
      action: review-response
    - agent: cs-intake
      action: deliver-final-response
EOF

cat > .bmad-cs-operations/workflows/cs-collaboration-workflow.yaml <<\"EOF\"
workflow:
  id: cs-collaboration-workflow
  name: 타 부서 협업 처리
  sequence:
    - agent: cs-intake
      action: classify-and-route
    - agent: cs-collaboration-coordinator
      action: delegate-to-department
    - agent: cs-collaboration-coordinator
      action: track-external-work
      repeats: until_completion
    - agent: cs-collaboration-coordinator
      action: verify-completion
    - agent: cs-collaboration-coordinator
      action: integrate-responses
    - agent: cs-quality
      action: review-response
    - agent: cs-intake
      action: deliver-final-response
EOF

cat > .bmad-cs-operations/workflows/cs-handoff-workflow.yaml <<\"EOF\"
workflow:
  id: cs-handoff-workflow
  name: 타 부서 완전 이관
  sequence:
    - agent: cs-intake
      action: intake-new-inquiry
    - agent: cs-handoff-processor
      action: assess-handoff-eligibility
    - agent: cs-handoff-processor
      action: create-handoff-package
    - agent: cs-handoff-processor
      action: coordinate-transfer
    - agent: cs-handoff-processor
      action: notify-customer
    - agent: cs-handoff-processor
      action: track-post-handoff
EOF

cat > .bmad-cs-operations/workflows/cs-escalation.yaml <<\"EOF\"
workflow:
  id: cs-escalation
  name: 에스컬레이션 처리
  sequence:
    - agent: cs-intake
      action: escalate-urgent
    - agent: cs-manager
      action: assess-priority
      optional: true
EOF

cat > .bmad-cs-operations/workflows/cs-complex-case.yaml <<\"EOF\"
workflow:
  id: cs-complex-case
  name: 복잡 케이스 처리
  sequence:
    - agent: cs-intake
      action: intake-new-inquiry
    - agent: cs-collaboration-coordinator
      action: coordinate-departments
      optional: true
    - agent: cs-processor
      action: draft-response
    - agent: cs-quality
      action: compliance-check
EOF

# 5) 템플릿 스캐폴딩 (.bmad)
cat > .bmad-cs-operations/templates/inquiry-record-tmpl.yaml <<\"EOF\"
template:
  id: inquiry-record-template
  name: 고객 문의 접수 기록
  output:
    format: markdown
    filename: cases/{{case_id}}-inquiry.md
sections:
  - id: customer-info
    title: 고객 정보
    template: |
      - 고객명: {{customer_name}}
      - 연락처: {{contact_info}}
  - id: inquiry-details
    title: 문의 내용
    template: |
      유형: {{inquiry_type}}
      우선순위: {{priority_level}}
      상세: {{inquiry_description}}
EOF

cat > .bmad-cs-operations/templates/response-template-tmpl.yaml <<\"EOF\"
template:
  id: response-template
  name: 고객 답변 템플릿
  output:
    format: markdown
    filename: cases/{{case_id}}-response.md
sections:
  - id: greeting
    title: 인사말
    template: | 
      안녕하세요, {{customer_name}} 님.
  - id: body
    title: 본문
    template: |
      {{response_body}}
  - id: footer
    title: 마무리
    template: |
      추가 문의가 있으시면 언제든지 연락 주세요.
EOF

cat > .bmad-cs-operations/templates/external-work-request-tmpl.yaml <<\"EOF\"
template:
  id: external-work-request
  name: 타 부서 작업 요청서
sections:
  - id: request-summary
    title: 요청 개요
    template: |
      수신 부서: {{target_department}}
      요청 날짜: {{request_date}}
  - id: work-details
    title: 작업 상세
    template: |
      {{detailed_requirements}}
EOF

cat > .bmad-cs-operations/templates/handoff-package-tmpl.yaml <<\"EOF\"
template:
  id: handoff-package
  name: 이관 패키지
sections:
  - id: executive-summary
    title: 이관 요약
    template: |
      이관 사유: {{handoff_reason}}
  - id: attachments
    title: 첨부 문서
    template: |
      - customer-context.md
      - case-history.md
EOF

cat > .bmad-cs-operations/templates/quality-review-tmpl.yaml <<\"EOF\"
template:
  id: quality-review
  name: 품질 검토 리포트
sections:
  - id: checklist
    title: 체크항목
    template: |
      - 정확성
      - 완전성
      - 톤
      - 컴플라이언스
EOF

cat > .bmad-cs-operations/templates/customer-satisfaction-tmpl.yaml <<\"EOF\"
template:
  id: csat
  name: 고객 만족도
sections:
  - id: score
    title: 점수
    template: |
      CSAT: {{csat_score}}/5
EOF

cat > .bmad-cs-operations/templates/case-closure-tmpl.yaml <<\"EOF\"
template:
  id: case-closure
  name: 케이스 종료 보고서
sections:
  - id: summary
    title: 요약
    template: |
      케이스 {{case_id}} 종료 사유: {{reason}}
EOF

# 6) 체크리스트 스캐폴딩 (.bmad)
cat > .bmad-cs-operations/checklists/cs-intake-checklist.md <<\"EOF\"
# cs-intake-checklist
- [ ] 문의 유형 분류
- [ ] 라우팅 대상 지정
- [ ] PII 마스킹 검토
EOF

cat > .bmad-cs-operations/checklists/cs-quality-checklist.md <<\"EOF\"
# cs-quality-checklist
- [ ] 정확성
- [ ] 완전성
- [ ] 톤 가이드 준수
- [ ] 컴플라이언스 확인
EOF

cat > .bmad-cs-operations/checklists/cs-handoff-checklist.md <<\"EOF\"
# cs-handoff-checklist
- [ ] 고객 컨텍스트 정리
- [ ] 관련 문서 첨부
- [ ] 수신 부서 확인서 수령
- [ ] 고객 공지 발송
EOF

cat > .bmad-cs-operations/checklists/cs-escalation-checklist.md <<\"EOF\"
# cs-escalation-checklist
- [ ] 에스컬레이션 조건 충족 확인
- [ ] 레벨 지정
- [ ] 알림 발송
- [ ] 해제 조건 정의
EOF

# 7) 데이터 스캐폴딩 (.bmad)
cat > .bmad-cs-operations/data/policies.md <<\"EOF\"
# 내부 처리 원칙 / 규제
- TBD
EOF

cat > .bmad-cs-operations/data/routing-rules.yaml <<\"EOF\"
rules:
  - type: billing
    route: finance-dept
  - type: technical
    route: engineering-dept
EOF

cat > .bmad-cs-operations/data/sla-matrix.md <<\"EOF\"
# SLA Matrix
- P1: 4h
- P2: 1d
- P3: 3d
EOF

cat > .bmad-cs-operations/data/tone-guide.md <<\"EOF\"
# 톤 가이드 / 금칙어
- 공손하고 명확하게, 전문 용어는 쉽게 풀어서
EOF

cat > .bmad-cs-operations/data/departments.yaml <<\"EOF\"
departments:
  - id: finance-dept
    contact: finance@example.com
  - id: engineering-dept
    contact: eng@example.com
EOF

cat > .bmad-cs-operations/data/macro-library.md <<\"EOF\"
# 매크로/FAQ 스니펫
- TBD
EOF

# 8) 팀 스캐폴딩 (.bmad)
cat > .bmad-cs-operations/teams/cs-team-basic.txt <<\"EOF\"
팀: CS Basic
구성: cs-intake, cs-processor, cs-quality
EOF

cat > .bmad-cs-operations/teams/cs-team-enterprise.txt <<\"EOF\"
팀: CS Enterprise
구성: cs-intake, cs-collaboration-coordinator, cs-handoff-processor, cs-processor, cs-quality
EOF

# 9) 웹 번들 에이전트 플레이스홀더 (.txt)
for a in cs-intake cs-collaboration-coordinator cs-handoff-processor cs-processor cs-quality; do
  cat > web-bundles/expansion-packs/bmad-cs-operations/agents/${a}.txt <<TXT
# 웹 에이전트 번들 지침

==================== START: .bmad-cs-operations/agents/${a}.md ====================
[에이전트 ${a} 리소스가 여기 포함됩니다]
==================== END: .bmad-cs-operations/agents/${a}.md ====================
TXT
done

# 10) 웹 번들 팀 파일
cat > web-bundles/expansion-packs/bmad-cs-operations/teams/cs-team-basic.txt <<\"EOF\"
==================== START: .bmad-cs-operations/teams/cs-team-basic.txt ====================
팀: CS Basic (웹 번들)
구성: cs-intake, cs-processor, cs-quality
==================== END: .bmad-cs-operations/teams/cs-team-basic.txt ====================
EOF

cat > web-bundles/expansion-packs/bmad-cs-operations/teams/cs-team-enterprise.txt <<\"EOF\"
==================== START: .bmad-cs-operations/teams/cs-team-enterprise.txt ====================
팀: CS Enterprise (웹 번들)
구성: cs-intake, cs-collaboration-coordinator, cs-handoff-processor, cs-processor, cs-quality
==================== END: .bmad-cs-operations/teams/cs-team-enterprise.txt ====================
EOF
