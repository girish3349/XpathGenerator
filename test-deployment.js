#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Deployment\n');

// Check if dist directory exists and has correct files
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    console.error('❌ dist directory not found');
    process.exit(1);
}

console.log('📁 Checking dist directory contents:');
const files = fs.readdirSync(distDir);
files.forEach(file => {
    console.log('  ✓', file);
});

// Check if required files exist
const requiredFiles = ['index.html', 'styles.min.css', 'script.min.js'];
const missingFiles = requiredFiles.filter(file => !files.includes(file));

if (missingFiles.length > 0) {
    console.error('❌ Missing files:', missingFiles.join(', '));
    process.exit(1);
}

console.log('✅ All required files present');

// Check HTML content
const htmlContent = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

// Check if HTML references correct files
const hasCorrectCSS = htmlContent.includes('styles.min.css');
const hasCorrectJS = htmlContent.includes('script.min.js');
const hasIncorrectCSS = htmlContent.includes('styles.css');
const hasIncorrectJS = htmlContent.includes('script.js');

console.log('\n🔍 Checking HTML references:');
console.log('  ✓ CSS reference (minified):', hasCorrectCSS);
console.log('  ✓ JS reference (minified):', hasCorrectJS);
console.log('  ❌ CSS reference (unminified):', hasIncorrectCSS);
console.log('  ❌ JS reference (unminified):', hasIncorrectJS);

if (hasCorrectCSS && hasCorrectJS && !hasIncorrectCSS && !hasIncorrectJS) {
    console.log('\n🎉 Deployment test PASSED!');
    console.log('Your site should now work correctly at:');
    console.log('https://girish3349.github.io/XpathGenerator');
    console.log('\n⏰ Note: It may take 1-2 minutes for changes to appear on GitHub Pages');
} else {
    console.log('\n❌ Deployment test FAILED!');
    console.log('The HTML file has incorrect references to CSS/JS files');
}
