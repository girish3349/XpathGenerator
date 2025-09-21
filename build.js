const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copy and fix index.html to dist
try {
    let indexContent = fs.readFileSync('index.html', 'utf8');
    
    // Fix CSS and JS references to use minified versions
    indexContent = indexContent.replace('href="styles.css"', 'href="styles.min.css"');
    indexContent = indexContent.replace('src="script.js"', 'src="script.min.js"');
    
    fs.writeFileSync(path.join(distDir, 'index.html'), indexContent);
    console.log('✓ Copied and fixed index.html to dist/');
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
