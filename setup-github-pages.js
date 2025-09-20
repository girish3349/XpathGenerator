#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 GitHub Pages Setup Helper\n');

// Check if we're in a git repository
if (!fs.existsSync('.git')) {
    console.error('❌ Error: Not in a git repository. Please run this from your project root.');
    process.exit(1);
}

// Check if package.json exists
if (!fs.existsSync('package.json')) {
    console.error('❌ Error: package.json not found. Please run this from your project root.');
    process.exit(1);
}

console.log('✅ Git repository detected');
console.log('✅ package.json found');

// Check if GitHub Actions workflows exist
const workflowsDir = '.github/workflows';
if (!fs.existsSync(workflowsDir)) {
    console.error('❌ Error: .github/workflows directory not found.');
    process.exit(1);
}

const workflowFiles = fs.readdirSync(workflowsDir);
const hasGitHubPagesWorkflow = workflowFiles.some(file => file.includes('github-pages'));

if (!hasGitHubPagesWorkflow) {
    console.error('❌ Error: GitHub Pages workflow not found.');
    process.exit(1);
}

console.log('✅ GitHub Pages workflow found');

// Check if dist directory exists and has content
if (!fs.existsSync('dist')) {
    console.log('📦 Building project...');
    const { execSync } = require('child_process');
    try {
        execSync('npm run build', { stdio: 'inherit' });
        console.log('✅ Project built successfully');
    } catch (error) {
        console.error('❌ Build failed:', error.message);
        process.exit(1);
    }
} else {
    console.log('✅ Build directory exists');
}

// Check dist contents
const distFiles = fs.readdirSync('dist');
const requiredFiles = ['index.html'];
const hasRequiredFiles = requiredFiles.every(file => distFiles.includes(file));

if (!hasRequiredFiles) {
    console.error('❌ Error: Required files missing from dist directory');
    process.exit(1);
}

console.log('✅ Required files present in dist directory');

// Display next steps
console.log('\n🎉 Setup Complete! Next steps:\n');

console.log('1. 📝 Repository Settings:');
console.log('   - Go to your repository on GitHub');
console.log('   - Click Settings → Pages');
console.log('   - Set Source to "GitHub Actions"');
console.log('   - Save settings\n');

console.log('2. 🔐 Permissions:');
console.log('   - Go to Settings → Actions → General');
console.log('   - Set Workflow permissions to "Read and write"');
console.log('   - Save settings\n');

console.log('3. 🚀 Deploy:');
console.log('   - Push your changes to main/master branch');
console.log('   - Or manually trigger the workflow in Actions tab\n');

console.log('4. 🌐 Access:');
console.log('   - Your site will be available at:');
console.log('   - https://girish3349.github.io/XpathGenerator\n');

console.log('📚 For detailed instructions, see GITHUB-PAGES-SETUP.md');

// Check if this is a GitHub repository
const { execSync } = require('child_process');
try {
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    if (remoteUrl.includes('github.com')) {
        const repoName = remoteUrl.split('/').pop().replace('.git', '');
        const username = remoteUrl.split('/')[3];
        console.log(`\n🔗 Your site URL: https://${username}.github.io/${repoName}`);
    }
} catch (error) {
    console.log('\n💡 Tip: Make sure you have a GitHub remote configured');
}
