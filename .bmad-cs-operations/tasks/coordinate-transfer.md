# coordinate-transfer

## 목적
- 수신 부서와 이관 절차(일정/담당/채널/승인)를 합의하고, 소유권 전환을 명확히 합니다.
- 혼선 없이 신속한 전환과 고객 기대 관리를 보장합니다.

## 메타데이터 헤더(공통)
- 반드시 기록: `case_id`, `updated_at(ISO/타임존)`, `author`, `owner`, `status_before`, `status_after`, `links[]`, `content_hash(확인서)`

## RBAC
- 수행: `cs-handoff-processor`
- 승인/서명: 수신 부서 리드, `cs-manager`(필요 시)

## 입력
- 이관 패키지: `cases/{case_id}-handoff-package/`
- 색인/요약: `cases/{case_id}-handoff-index.md`
- 수신 부서 정보: `.bmad-cs-operations/data/departments.yaml`

## 산출물
- 전환 확인서: `cases/{case_id}-transfer-confirmation.md`(합의된 일정/담당/채널/업데이트 주기/에스컬레이션)
- 소유권 전환 기록: 케이스 오너 변경, 상태 `transferred`
- 알림 로그: 발신/수신 부서/매니저/고객(필요 시)
 - handoff 레퍼런스: `handoff-assessment`의 Sign-off(reviewer, signed_at) 메타 포함

## 상태 전이
- before: `transferring` → after: `transferred`
- guard: 전환 확인서 서명(content_hash 포함), 오너 변경, 알림 발송

## 단계별 지침
1) 킥오프/핸드셰이크(또는 승인 워크플로우) 일정 조율, 참석자 지정
2) 합의 항목 정리: 일정(시작/중간/마감), 담당/백업, 채널/업데이트 주기, Done 기준/검증 방식
3) 의존성/차단요인/권한/보안 요구 확인 및 해결 계획 합의
4) 전환 확인서 작성 및 서명(전자 서명 허용), content_hash 저장
5) 케이스 오너 전환, 상태 `transferred`, 알림 발송(내부/필요 시 고객 안내는 review→finalize 경유)

## content_hash 저장 위치(개별 강화)
- `cases/{case_id}-transfer-confirmation.md` 상단 메타 또는 `cases/{case_id}-transfer-confirmation.json`
- 해시 대상: 확인서 본문 + 일정/담당/채널/업데이트 주기/에스컬레이션 항목

## 전환 실패 롤백 플랜(개별 강화)
- 임시 소유권 유지, 이관 재시도 일정 재합의, 고객 안내 문안 준비(필요 시)

## 검증 체크리스트
- [ ] 일정/담당/채널/업데이트 주기 합의됨
- [ ] Done/검증 기준·에스컬레이션 경로 명시됨
- [ ] 권한/보안 요구 충족 및 기록
- [ ] 전환 확인서 서명/보관(content_hash 포함)

## 실패/에스컬레이션
- 수신 부서 불가/지연: cs-manager L1, 필요 시 부서장 조정
- 보안/권한 문제: 접근 요청·임시 대안 합의, 법무/보안 동시 검토

## 템플릿(붙여넣기)
```markdown
# Transfer Confirmation (Case {{case_id}})
- Participants: {{names}}
- Timeline: {{start}} ~ {{end}}
- Owners: from {{from_owner}} to {{to_owner}} (backup: {{backup}})
- Channel/Cadence: {{channel}} / {{cadence}}
- Done/Verification: {{criteria}}
- Escalation: {{path}}
- Signed: {{signed_by}} at {{signed_at}} (content_hash={{hash}})
```

## 연계/핸드오프
- 다음 단계: `notify-customer` → `track-post-handoff`
