# track-external-work

## 목적
- 타 부서(외부) 작업의 진행 상황을 합의된 기준으로 추적하고, 지연을 조기 감지·알림·에스컬레이션하여 SLA 준수를 보장합니다.

## 메타데이터 헤더(공통)
- 반드시 기록: `case_id`, `updated_at(ISO/타임존)`, `author`, `owner`, `status_before`, `status_after`, `links[]`, `content_hash(해당 시)`

## RBAC
- 수행: `cs-collaboration-coordinator`
- 승인/개입: `cs-manager`

## 입력
- 요청서: `cases/{case_id}-delegation-request.md` (기한·마일스톤·업데이트 주기·연락 채널 포함)
- 라우팅/결정 로그: `cases/{case_id}-route-decision.md`
- 기준 파일(선택): `.bmad-cs-operations/data/priority-keywords.yaml`, `sla-matrix.md`

## 산출물
- 추적 로그: `cases/{case_id}-tracking-log.md` (타임스탬프·상태·진척률·리스크·액션)
- 상태 업데이트: `waiting-external` → `external-in-progress` → `external-delayed`(선택) → `external-complete`
- 알림/리마인드/에스컬레이션 기록(채널/수신자/결과)

## 상태 전이
- before: `waiting-external` → after: `external-in-progress` | `external-delayed` | `external-complete`
- guard: 최신 업데이트 수신, 진척률/차단요인/다음 점검 예약 기록

## 기본 규약(초안)
- 업데이트 주기: 요청서 합의 주기(기본 daily)
- 지연 경보: 계획 대비 진척률 지연 ≥ 20% → 경고 및 리마인드
- 중대한 지연: 약속 기한 초과 또는 경보 후 48h 경과 → 에스컬레이션(L1, 필요 시 L2)

### 지연 판단 수식/예시(개별 강화)
- deviation_percent = max(0, (planned_progress - actual_progress) / max(planned_progress, 1)) × 100
- 예: 계획 60%, 실제 30% → 50% 지연 → 경보

## 단계별 지침
1) 기준 로드: 마감일, 마일스톤, 업데이트 주기, 연락 채널, 담당자(owner)
2) 상태 수집: 합의된 채널(스레드/메일/티켓)에서 최신 업데이트 요청/파싱
   - 형식: 완료율(%), 차단요인, 다음 예정일, 첨부/증빙 링크
3) 진척 평가: 계획 대비 편차(%) 계산, 위험도(RAG) 산정
4) 조치 실행:
   - 정상: 로그 기록 후 다음 점검 예약
   - 지연 경보(≥20%): 리마인드 발송, 차단요인 제거 요청, 완화안 제시
   - 중대한 지연: `escalate-urgent` 트리거(L1/L2 기준은 16번 작업 참조)
5) 감사 기록: 추적 로그에 타임스탬프/담당/지표/조치/다음 점검일 저장
6) 완료 신호 수신 시: 상태 `external-complete`로 전환하고 `verify-completion`로 핸드오프

## 검증 체크리스트
- [ ] 마지막 업데이트가 합의 주기 내(예: 24h) 존재
- [ ] 계획 대비 편차와 근거가 기록됨
- [ ] 리마인드/에스컬레이션 발송 내역이 남음
- [ ] 다음 점검 예약이 설정됨

## 상태 정의(권장)
- `waiting-external`: 요청 발송 후 응답 대기
- `external-in-progress`: 작업 진행 중, 업데이트 준수
- `external-delayed`: 경보 조건 충족(≥20% 지연 또는 주기 미준수)
- `external-complete`: 결과물 제출 완료

## 지표(로그에 누적)
- 대기일수(days_waiting), 지연일수(days_delayed)
- 업데이트 준수율(update_compliance_rate)
- 리마인드 횟수(reminders), 에스컬레이션 횟수(escalations)

## 자동 리마인드/스노우볼링 정책(개별 강화)
- 리마인드 1회: 부드러운 안내
- 리마인드 2회: 경고 및 관리자 참조
- 리마인드 3회 이상: L1 에스컬레이션, 반복 시 L2 검토

## 로그 엔트리 템플릿(붙여넣기)
```markdown
# Tracking Entry
- at: {{timestamp}}
- status: waiting-external | external-in-progress | external-delayed | external-complete
- progress: {{percent}}%
- risks: {{risks}}
- blockers: {{blockers}}
- actions: {{actions}}
- notified: {{recipients}}
- next_check_at: {{next_check_at}}
```

## 알림 메시지 예시(리마인드)
```markdown
[Reminder] Case {{case_id}}
합의된 업데이트 주기 기준으로 상태 공유 부탁드립니다.
현재 계획 대비 편차: {{deviation_percent}}%. 차단 요인이 있다면 알려주세요.
```

## 에지 케이스
- 업데이트 포맷 불일치/파싱 실패: 수동 확인 전환, 포맷 표준 안내 재전송
- 외부 채널 중단: 대체 채널 합의(이메일→전화 등) 후 로그에 사유 기록
- 민감정보 포함 업데이트: 비공개 저장소로 이관, 요약만 공개 로그에 기록

## 예시
- 입력: due=오늘 18:00, 최근 업데이트 36h 경과, 계획 60%/실제 30%
- 처리: 지연 경보, 리마인드 2회 발송, 차단요인 제거 요청, 다음 점검 2h
- 산출: 상태 `external-delayed`, 에스컬레이션 후보 표시

## 에스컬레이션 연계
- 지연 지속/기한 초과 시 16번 `escalate-urgent` 절차 적용
- 고객 커뮤니케이션 필요 시 16번 템플릿 활용(톤 가이드 준수)
