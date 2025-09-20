#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔧 Deployment Issues Fix Helper\n');

// Check current status
console.log('📋 Current Status:');
console.log('✅ package-lock.json exists:', fs.existsSync('package-lock.json'));
console.log('✅ dist directory exists:', fs.existsSync('dist'));
console.log('✅ GitHub workflows exist:', fs.existsSync('.github/workflows'));

// Check if we're in a git repository
if (!fs.existsSync('.git')) {
    console.error('❌ Error: Not in a git repository');
    process.exit(1);
}

console.log('✅ Git repository detected\n');

// Check if we can build
console.log('🔨 Testing build process...');
try {
    execSync('npm run build', { stdio: 'pipe' });
    console.log('✅ Build test passed\n');
} catch (error) {
    console.error('❌ Build failed:', error.message);
    console.log('💡 Try running: npm install && npm run build\n');
}

// Display immediate fixes
console.log('🚀 Immediate Fixes Needed:\n');

console.log('1. 📝 Enable GitHub Pages:');
console.log('   - Go to: https://github.com/girish3349/XpathGenerator/settings/pages');
console.log('   - Set Source to "GitHub Actions"');
console.log('   - Click Save\n');

console.log('2. 🔐 Fix Permissions:');
console.log('   - Go to: https://github.com/girish3349/XpathGenerator/settings/actions');
console.log('   - Set Workflow permissions to "Read and write"');
console.log('   - Click Save\n');

console.log('3. 🔑 Optional - Add Secrets (for Vercel/Netlify):');
console.log('   - Go to: https://github.com/girish3349/XpathGenerator/settings/secrets/actions');
console.log('   - Add VERCEL_TOKEN (if using Vercel)');
console.log('   - Add NETLIFY_AUTH_TOKEN (if using Netlify)');
console.log('   - Add SNYK_TOKEN (for security scanning)\n');

console.log('4. 🚀 Deploy:');
console.log('   - Push this commit: git add . && git commit -m "Fix deployment issues" && git push');
console.log('   - Or manually trigger workflow in Actions tab\n');

console.log('📊 Expected Results:');
console.log('   - GitHub Pages: https://girish3349.github.io/XpathGenerator');
console.log('   - Vercel: Will deploy if token is configured');
console.log('   - Netlify: Will deploy if token is configured\n');

console.log('🆘 If issues persist:');
console.log('   - Check Actions tab for detailed logs');
console.log('   - See TROUBLESHOOTING.md for more help');
console.log('   - Ensure all repository settings are correct\n');

console.log('✨ Your deployment should work after following these steps!');
