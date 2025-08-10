#!/usr/bin/env node

/**
 * BMAD 메소드 한글 버전 CLI
 */

const path = require('path');
const chalk = require('chalk');

const args = process.argv.slice(2);
const command = args[0];

function showHelp() {
  console.log(chalk.cyan(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║          🤖 BMAD 메소드 한글 버전 CLI v1.0.0               ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`));
  
  console.log(chalk.white('사용법:'));
  console.log(chalk.gray('  bmad-korean <command> [options]'));
  
  console.log(chalk.white('\n명령어:'));
  console.log(chalk.green('  install') + chalk.gray('          현재 디렉토리에 BMAD 설치'));
  console.log(chalk.green('  init') + chalk.gray('             새 프로젝트 초기화'));
  console.log(chalk.green('  list-agents') + chalk.gray('      사용 가능한 에이전트 목록'));
  console.log(chalk.green('  list-tasks') + chalk.gray('       사용 가능한 작업 목록'));
  console.log(chalk.green('  list-templates') + chalk.gray('   사용 가능한 템플릿 목록'));
  console.log(chalk.green('  repair') + chalk.gray('           BMAD 설치 복구'));
  console.log(chalk.green('  update') + chalk.gray('           최신 버전으로 업데이트'));
  console.log(chalk.green('  help') + chalk.gray('             이 도움말 표시'));
  
  console.log(chalk.white('\n예시:'));
  console.log(chalk.gray('  $ bmad-korean install'));
  console.log(chalk.gray('  $ bmad-korean list-agents'));
  console.log(chalk.gray('  $ bmad-korean init my-new-project'));
  
  console.log(chalk.white('\n추가 정보:'));
  console.log(chalk.gray('  문서: https://github.com/bmad-korean/bmad-method-korean'));
  console.log(chalk.gray('  Discord: https://discord.gg/gk8jAdXWmj'));
}

function listAgents() {
  console.log(chalk.cyan('\n📋 사용 가능한 에이전트:\n'));
  
  const agents = [
    { id: 'pm', name: '제품관리자', icon: '📋', role: 'Product Manager' },
    { id: 'architect', name: '아키텍트', icon: '🏗️', role: 'System Architect' },
    { id: 'dev', name: '개발자', icon: '💻', role: 'Full-Stack Developer' },
    { id: 'qa', name: '품질보증', icon: '🔍', role: 'Quality Assurance' },
    { id: 'sm', name: '스크럼마스터', icon: '🏃', role: 'Scrum Master' },
    { id: 'po', name: '제품소유자', icon: '👤', role: 'Product Owner' },
    { id: 'ux-expert', name: 'UX전문가', icon: '🎨', role: 'UX Expert' },
    { id: 'analyst', name: '분석가', icon: '📊', role: 'Business Analyst' },
    { id: 'bmad-master', name: 'BMAD마스터', icon: '🧙', role: 'BMAD Master' },
    { id: 'bmad-orchestrator', name: 'BMAD오케스트레이터', icon: '🎭', role: 'Orchestrator' }
  ];
  
  agents.forEach(agent => {
    console.log(`${agent.icon} ${chalk.green(agent.name)} (${chalk.gray(agent.id)})`);
    console.log(`   ${chalk.gray(agent.role)}`);
    console.log();
  });
}

function listTasks() {
  console.log(chalk.cyan('\n📋 사용 가능한 작업:\n'));
  
  const tasks = [
    { id: 'create-doc', name: '문서생성', desc: '템플릿 기반 문서 생성' },
    { id: 'create-next-story', name: '다음스토리생성', desc: '다음 개발 스토리 생성' },
    { id: 'shard-doc', name: '문서분할', desc: '큰 문서를 작은 단위로 분할' },
    { id: 'execute-checklist', name: '체크리스트실행', desc: '품질 체크리스트 실행' },
    { id: 'review-story', name: '스토리검토', desc: '작성된 스토리 검토' },
    { id: 'validate-next-story', name: '다음스토리검증', desc: '스토리 유효성 검증' },
    { id: 'correct-course', name: '과정수정', desc: '프로젝트 방향 수정' }
  ];
  
  tasks.forEach(task => {
    console.log(`• ${chalk.green(task.name)} (${chalk.gray(task.id)})`);
    console.log(`  ${chalk.gray(task.desc)}`);
    console.log();
  });
}

function listTemplates() {
  console.log(chalk.cyan('\n📋 사용 가능한 템플릿:\n'));
  
  const templates = [
    { id: 'prd-tmpl', name: '제품요구사항문서', desc: 'Product Requirements Document' },
    { id: 'architecture-tmpl', name: '아키텍처문서', desc: 'System Architecture Document' },
    { id: 'story-tmpl', name: '사용자스토리', desc: 'User Story Template' },
    { id: 'front-end-spec-tmpl', name: '프런트엔드스펙', desc: 'Frontend Specification' },
    { id: 'project-brief-tmpl', name: '프로젝트개요', desc: 'Project Brief' },
    { id: 'market-research-tmpl', name: '시장조사', desc: 'Market Research Report' }
  ];
  
  templates.forEach(template => {
    console.log(`📄 ${chalk.green(template.name)} (${chalk.gray(template.id)})`);
    console.log(`   ${chalk.gray(template.desc)}`);
    console.log();
  });
}

// 메인 실행
switch (command) {
  case 'install':
    require('../scripts/install').main();
    break;
    
  case 'init':
    console.log(chalk.yellow('⚠️  init 명령은 아직 구현되지 않았습니다.'));
    console.log(chalk.gray('대신 install 명령을 사용하세요.'));
    break;
    
  case 'list-agents':
    listAgents();
    break;
    
  case 'list-tasks':
    listTasks();
    break;
    
  case 'list-templates':
    listTemplates();
    break;
    
  case 'repair':
    console.log(chalk.yellow('⚠️  repair 명령은 아직 구현되지 않았습니다.'));
    break;
    
  case 'update':
    console.log(chalk.yellow('⚠️  update 명령은 아직 구현되지 않았습니다.'));
    break;
    
  case 'help':
  case undefined:
    showHelp();
    break;
    
  default:
    console.log(chalk.red(`❌ 알 수 없는 명령어: ${command}`));
    console.log(chalk.gray('bmad-korean help 를 실행하여 사용 가능한 명령어를 확인하세요.'));
    process.exit(1);
}
