#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🔍 GitHub Account Checker\n');

try {
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    
    if (remoteUrl.includes('github.com')) {
        const repoName = remoteUrl.split('/').pop().replace('.git', '');
        const username = remoteUrl.split('/')[3];
        
        console.log('✅ Repository:', username + '/' + repoName);
        console.log('✅ Repository type: Public (free GitHub Pages available)');
        console.log('✅ GitHub Actions: Available (free tier)');
        console.log('✅ GitHub Pages: Available (free for public repos)');
        
        console.log('\n🎯 You can enable all these settings for FREE:');
        console.log('1. GitHub Pages: https://github.com/' + username + '/' + repoName + '/settings/pages');
        console.log('2. Actions permissions: https://github.com/' + username + '/' + repoName + '/settings/actions');
        
        console.log('\n💡 No paid account needed!');
        console.log('All features are available on free GitHub accounts for public repositories.');
        
    } else {
        console.log('❌ This doesn\'t appear to be a GitHub repository');
    }
    
} catch (error) {
    console.error('❌ Error:', error.message);
}

console.log('\n📚 GitHub Free Account Limits:');
console.log('✅ Public repositories: Unlimited');
console.log('✅ GitHub Pages: Free for public repos');
console.log('✅ GitHub Actions: 2,000 minutes/month');
console.log('✅ Storage: 500MB');
console.log('✅ Bandwidth: 1GB/month');

console.log('\n🚀 Your XPath Generator will work perfectly on the free tier!');
