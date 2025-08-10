# BMad 문서 템플릿 사양

## 개요

BMad 문서 템플릿은 대화형 문서 생성과 에이전트 상호작용을 구동하기 위해 YAML 형식으로 정의됩니다. 템플릿은 구조 정의와 콘텐츠 생성을 분리하여 사람과 LLM 에이전트 모두에게 친화적입니다.

## 템플릿 구조

```yaml
template:
  id: template-identifier
  name: 사람이 읽을 수 있는 템플릿 이름
  version: 1.0
  output:
    format: markdown
    filename: default-path/to/{{filename}}.md
    title: "{{variable}} 문서 제목"

workflow:
  mode: interactive
  elicitation: advanced-elicitation

sections:
  - id: section-id
    title: 섹션 제목
    instruction: |
      이 섹션을 처리하는 방법에 대한 LLM을 위한 상세한 지침
    # ... 추가 섹션 속성
```

## 핵심 필드

### 템플릿 메타데이터

- **id**: 템플릿의 고유 식별자
- **name**: UI에 표시되는 사람이 읽을 수 있는 이름
- **version**: 변경사항 추적을 위한 템플릿 버전
- **output.format**: 문서 템플릿의 기본값 "markdown"
- **output.filename**: 기본 출력 파일 경로 (변수 포함 가능)
- **output.title**: 문서 제목 (마크다운에서 H1이 됨)

### 워크플로우 구성

- **workflow.mode**: 기본 상호작용 모드 ("interactive" 또는 "yolo")
- **workflow.elicitation**: 사용할 유도 작업 ("advanced-elicitation")

## 섹션 속성

### 필수 필드

- **id**: 고유 섹션 식별자
- **title**: 섹션 제목 텍스트
- **instruction**: 이 섹션 처리에 대한 LLM을 위한 상세한 안내

### 선택적 필드

#### 콘텐츠 제어

- **type**: 구조화된 섹션을 위한 콘텐츠 유형 힌트
- **template**: 섹션 콘텐츠를 위한 고정 템플릿 텍스트
- **item_template**: 섹션 내 반복 가능한 항목을 위한 템플릿
- **prefix**: 번호가 매겨진 항목의 접두사 (예: "FR", "NFR")

#### 동작 플래그

- **elicit**: Boolean - 섹션 렌더링 후 유도 적용
- **repeatable**: Boolean - 섹션을 여러 번 반복할 수 있음
- **condition**: String - 섹션 포함 조건 (예: "UI 요구사항이 있음")

#### 에이전트 권한

- **owner**: String - 이 섹션을 처음 생성/채우는 에이전트 역할
- **editors**: Array - 이 섹션을 수정할 수 있는 에이전트 역할 목록
- **readonly**: Boolean - 초기 생성 후 섹션을 수정할 수 없음

#### 콘텐츠 안내

- **examples**: 예시 콘텐츠 배열 (출력에 포함되지 않음)
- **choices**: 일반적인 결정을 위한 선택 옵션이 있는 객체
- **placeholder**: 기본 자리 표시자 텍스트

#### 구조

- **sections**: 중첩된 하위 섹션 배열

## 지원되는 유형

### 콘텐츠 유형

- **bullet-list**: 순서 없는 목록 항목
- **numbered-list**: 선택적 접두사가 있는 순서 있는 목록
- **paragraphs**: 자유 형식 단락 텍스트
- **table**: 구조화된 테이블 데이터
- **code-block**: 코드 또는 구성 블록
- **template-text**: 변수 대체가 있는 고정 템플릿
- **mermaid**: 지정된 유형과 세부사항이 있는 Mermaid 다이어그램

### 특수 유형

- **repeatable-container**: 여러 인스턴스를 위한 컨테이너
- **conditional-block**: 조건에 따라 표시되는 콘텐츠
- **choice-selector**: 사용자에게 선택사항 제시

## 고급 기능

### 변수 대체

제목, 템플릿 및 콘텐츠에서 `{{variable_name}}` 사용:

```yaml
title: "에픽 {{epic_number}} {{epic_title}}"
template: "{{user_type}}로서, 나는 {{action}}을 원한다, 그래서 {{benefit}}."
```

### 조건부 섹션

```yaml
- id: ui-section
  title: 사용자 인터페이스 디자인
  condition: 프로젝트에 UX/UI 요구사항이 있음
  instruction: 프로젝트에 UI 구성요소가 있는 경우에만 포함
```

### 선택 통합

```yaml
choices:
  architecture: [모놀리스, 마이크로서비스, 서버리스]
  testing: [단위만, 단위 + 통합, 전체 피라미드]
```

### Mermaid 다이어그램

```yaml
- id: system-architecture
  title: 시스템 아키텍처 다이어그램
  type: mermaid
  instruction: 주요 구성요소와 데이터 흐름을 보여주는 시스템 아키텍처 다이어그램 생성
  mermaid_type: flowchart
  details: |
    다음 구성요소를 표시:
    - 사용자 인터페이스 레이어
    - API 게이트웨이
    - 핵심 서비스
    - 데이터베이스 레이어
    - 외부 통합
```

**지원되는 mermaid_type 값:**

**핵심 다이어그램 유형:**

- `flowchart` - 플로우 차트 및 프로세스 다이어그램
- `sequenceDiagram` - 상호작용을 위한 시퀀스 다이어그램
- `classDiagram` - 클래스 관계 다이어그램 (UML)
- `stateDiagram` - 상태 전이 다이어그램
- `erDiagram` - 엔티티 관계 다이어그램
- `gantt` - 타임라인을 위한 간트 차트
- `pie` - 데이터 시각화를 위한 파이 차트

**고급 다이어그램 유형:**

- `journey` - 사용자 여정 맵
- `mindmap` - 브레인스토밍을 위한 마인드맵
- `timeline` - 시간순 이벤트를 위한 타임라인 다이어그램
- `quadrantChart` - 데이터 분류를 위한 사분면 차트
- `xyChart` - XY 차트 (막대 차트, 선 차트)
- `sankey` - 흐름 시각화를 위한 생키 다이어그램

**특수 유형:**

- `c4Context` - C4 컨텍스트 다이어그램 (실험적)
- `requirement` - 요구사항 다이어그램
- `packet` - 네트워크 패킷 다이어그램
- `block` - 블록 다이어그램
- `kanban` - 칸반 보드

### 에이전트 권한 예시

```yaml
- id: story-details
  title: 스토리
  owner: scrum-master
  editors: [scrum-master]
  readonly: false
  sections:
    - id: dev-notes
      title: 개발 노트
      owner: dev-agent
      editors: [dev-agent]
      readonly: false
      instruction: 구현 노트 및 기술적 세부사항
    - id: qa-results
      title: QA 결과
      owner: qa-agent
      editors: [qa-agent]
      readonly: true
      instruction: 품질 보증 테스트 결과
```

### 반복 가능한 섹션

```yaml
- id: epic-details
  title: 에픽 {{epic_number}} {{epic_title}}
  repeatable: true
  sections:
    - id: story
      title: 스토리 {{epic_number}}.{{story_number}} {{story_title}}
      repeatable: true
      sections:
        - id: criteria
          title: 수락 기준
          type: numbered-list
          item_template: "{{criterion_number}}: {{criteria}}"
          repeatable: true
```

### 코드 블록이 있는 예시

````yaml
examples:
  - "FR6: 시스템은 2초 이내에 사용자를 인증해야 합니다"
  - |
    ```mermaid
    sequenceDiagram
        participant 사용자
        participant API
        participant DB
        사용자->>API: POST /login
        API->>DB: 자격 증명 검증
        DB-->>API: 사용자 데이터
        API-->>사용자: JWT 토큰
    ```
  - |
    **아키텍처 결정 기록**

    **결정**: 기본 데이터베이스로 PostgreSQL 사용
    **근거**: ACID 준수 및 JSON 지원 필요
    **결과**: 데이터베이스 관리 전문 지식 필요
````

## 섹션 계층 구조

템플릿은 첫 번째 H2부터 시작하는 완전한 문서 구조를 정의합니다 - 각 레벨은 다음 H#입니다:

```yaml
sections:
  - id: overview
    title: 프로젝트 개요
    sections:
      - id: goals
        title: 목표
      - id: scope
        title: 범위
        sections:
          - id: in-scope
            title: 범위 내
          - id: out-scope
            title: 범위 외
```

## 처리 흐름

1. **템플릿 파싱**: YAML 구조 로드 및 검증
2. **워크플로우 초기화**: 상호작용 모드 및 유도 설정
3. **섹션 처리**: 각 섹션을 순서대로 처리:
   - 조건 확인
   - 지침 적용
   - 콘텐츠 생성
   - 선택사항 및 변수 처리
   - 지정된 경우 유도 적용
   - 중첩된 섹션 처리
4. **출력 생성**: 깨끗한 마크다운 문서 생성

## 모범 사례

### 템플릿 설계

- 지침을 명확하고 구체적으로 유지
- 복잡한 콘텐츠에는 예시 사용
- 섹션을 논리적으로 구성
- LLM을 위한 필요한 모든 안내 포함

### 콘텐츠 지침

- 예상 형식에 대해 명시적으로 설명
- 결정에 대한 근거 포함
- 상호작용 패턴 지정
- 필요한 경우 다른 문서 참조

### 변수 명명

- 설명적인 변수 이름 사용
- 일관된 명명 규칙 따르기
- 예상 변수 값 문서화

### 예시 사용

- 복잡한 섹션에 대한 구체적인 예시 제공
- 간단한 경우와 복잡한 경우 모두 포함
- 현실적인 프로젝트 시나리오 사용
- 도움이 될 때 코드 블록과 다이어그램 포함

## 검증

템플릿은 다음을 검증해야 합니다:

- 유효한 YAML 구문
- 필수 필드 존재
- 일관된 섹션 ID
- 적절한 중첩 구조
- 유효한 변수 참조

## 레거시에서 마이그레이션

markdown+frontmatter 템플릿에서 변환할 때:

1. 임베디드 `[[LLM:]]` 지침을 `instruction` 필드로 추출
2. `<<REPEAT>>` 블록을 `repeatable: true` 섹션으로 변환
3. `^^CONDITIONS^^`를 `condition` 필드로 추출
4. `@{examples}`를 `examples` 배열로 이동
5. `{{placeholders}}`를 적절한 변수 구문으로 변환

이 사양은 복잡한 문서 생성에 필요한 유연성을 유지하면서 템플릿이 사람이 읽을 수 있고 기계가 처리할 수 있도록 보장합니다.
