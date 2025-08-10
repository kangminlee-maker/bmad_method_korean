#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

// 상수 정의
const BMAD_DIR = '.bmad-core';
const SOURCE_DIR = path.join(__dirname, '..', BMAD_DIR);
const TARGET_DIR = path.join(process.cwd(), BMAD_DIR);

// 배너 출력
console.log(chalk.cyan(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║       🤖 BMAD 메소드 한글 버전 설치 프로그램 v1.0.0         ║
║                                                              ║
║       AI 기반 애자일 개발 방법론의 완전한 한글화 버전       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`));

console.log(chalk.gray(`
📍 설치 위치: ${process.cwd()}
`));

// 스피너 시작
const spinner = ora('BMAD 한글 버전을 설치하는 중...').start();

async function install() {
  try {
    // 1. 대상 디렉토리가 이미 존재하는지 확인
    if (await fs.pathExists(TARGET_DIR)) {
      spinner.warn(chalk.yellow('⚠️  .bmad-core 디렉토리가 이미 존재합니다.'));
      console.log(chalk.gray('   기존 파일은 유지되며, 새 파일만 추가됩니다.\n'));
    }

    // 2. .bmad-core 디렉토리 복사
    await fs.copy(SOURCE_DIR, TARGET_DIR, {
      overwrite: false,
      errorOnExist: false
    });

    // 3. 프로젝트 구조 생성
    const projectDirs = ['src', 'tests', 'docs'];
    for (const dir of projectDirs) {
      await fs.ensureDir(path.join(process.cwd(), dir));
    }

    // 4. 기본 .gitignore 생성 (없는 경우만)
    const gitignorePath = path.join(process.cwd(), '.gitignore');
    if (!await fs.pathExists(gitignorePath)) {
      const gitignoreContent = `# Dependencies
node_modules/

# IDE
.idea/
.vscode/
*.swp
*.swo
.DS_Store

# Build
dist/
build/

# Logs
*.log
npm-debug.log*

# Environment
.env
.env.local
.env.*.local

# BMAD
.bmad-cache/
agent-core-dump/
`;
      await fs.writeFile(gitignorePath, gitignoreContent);
    }

    // 5. 기본 package.json 생성 (없는 경우만)
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (!await fs.pathExists(packageJsonPath)) {
      const packageJson = {
        name: "my-bmad-project",
        version: "1.0.0",
        description: "BMAD 메소드를 사용한 프로젝트",
        scripts: {
          "test": "echo \"Error: no test specified\" && exit 1"
        }
      };
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    }

    spinner.succeed(chalk.green('✅ BMAD 메소드 한글 버전 설치가 완료되었습니다!'));

    // 성공 메시지
    console.log(chalk.cyan(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║                    🎉 설치 완료!                             ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`));

    console.log(chalk.white('📚 다음 단계:'));
    console.log(chalk.gray('   1. IDE에서 프로젝트를 엽니다'));
    console.log(chalk.gray('   2. @제품관리자 *help 를 입력하여 시작합니다'));
    console.log(chalk.gray('   3. docs/BMAD-시작하기.md 를 참조합니다\n'));

    console.log(chalk.white('🔗 유용한 링크:'));
    console.log(chalk.gray('   - 사용자 가이드: .bmad-core/사용자가이드.md'));
    console.log(chalk.gray('   - Discord 커뮤니티: https://discord.gg/gk8jAdXWmj'));
    console.log(chalk.gray('   - GitHub: https://github.com/bmad-korean/bmad-method-korean\n'));

  } catch (error) {
    spinner.fail(chalk.red('❌ 설치 중 오류가 발생했습니다.'));
    console.error(chalk.red(`\n오류 내용: ${error.message}`));
    console.log(chalk.yellow('\n💡 도움이 필요하시면 GitHub 이슈를 생성해주세요.'));
    process.exit(1);
  }
}

// 설치 실행
install();