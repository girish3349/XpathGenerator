#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🔍 GitHub Pages Status Checker\n');

// Check if we're in a git repository
if (!require('fs').existsSync('.git')) {
    console.error('❌ Error: Not in a git repository');
    process.exit(1);
}

console.log('📋 Repository Information:');

try {
    // Get repository URL
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    console.log('✅ Repository URL:', remoteUrl);
    
    // Get current branch
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    console.log('✅ Current branch:', currentBranch);
    
    // Check if it's a GitHub repository
    if (remoteUrl.includes('github.com')) {
        const repoName = remoteUrl.split('/').pop().replace('.git', '');
        const username = remoteUrl.split('/')[3];
        
        console.log('\n🌐 GitHub Repository Details:');
        console.log('   Username:', username);
        console.log('   Repository:', repoName);
        console.log('   Expected Pages URL: https://' + username + '.github.io/' + repoName);
        
        console.log('\n📝 Required Settings:');
        console.log('1. Go to: https://github.com/' + username + '/' + repoName + '/settings/pages');
        console.log('2. Set Source to "GitHub Actions"');
        console.log('3. Save settings');
        console.log('4. Go to: https://github.com/' + username + '/' + repoName + '/settings/actions');
        console.log('5. Set Workflow permissions to "Read and write"');
        console.log('6. Save settings');
        
    } else {
        console.log('⚠️  This doesn\'t appear to be a GitHub repository');
    }
    
} catch (error) {
    console.error('❌ Error getting repository info:', error.message);
}

console.log('\n🔧 Alternative Solutions:');
console.log('1. Use the manual deployment workflow (no Pages required)');
console.log('2. Deploy to Vercel or Netlify instead');
console.log('3. Use GitHub Pages with branch deployment');

console.log('\n💡 Quick Fix:');
console.log('Run: npm run deploy:github');
console.log('This will deploy directly without requiring Pages to be enabled first.');
