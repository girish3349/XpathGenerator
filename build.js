const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copy index.html to dist
try {
    fs.copyFileSync('index.html', path.join(distDir, 'index.html'));
    console.log('✓ Copied index.html to dist/');
} catch (error) {
    console.error('Error copying index.html:', error.message);
}

// Copy assets directory if it exists
const assetsDir = path.join(__dirname, 'assets');
if (fs.existsSync(assetsDir)) {
    try {
        copyDir(assetsDir, path.join(distDir, 'assets'));
        console.log('✓ Copied assets/ to dist/');
    } catch (error) {
        console.error('Error copying assets:', error.message);
    }
}

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

console.log('✓ Build optimization completed');
