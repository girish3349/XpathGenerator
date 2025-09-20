# GitHub Pages Setup Guide

This guide will help you set up GitHub Pages deployment for your XPath Generator project.

## 🔧 Repository Settings

### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **"GitHub Actions"**
5. Save the settings

### 2. Repository Permissions
1. Go to **Settings** → **Actions** → **General**
2. Scroll down to **Workflow permissions**
3. Select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"**
5. Click **Save**

## 🚀 Deployment Process

### Automatic Deployment
- The workflow will automatically deploy when you push to `main` or `master` branch
- The deployment will be available at: `https://girish3349.github.io/XpathGenerator`

### Manual Deployment
- Go to **Actions** tab in your repository
- Click on **"Deploy to GitHub Pages"** workflow
- Click **"Run workflow"** button
- Select the branch and click **"Run workflow"**

## 🔍 Troubleshooting

### Common Issues

#### 1. "Write access to repository not granted" Error
**Solution**: 
- Make sure you've enabled "Read and write permissions" in repository settings
- Ensure the workflow has the correct permissions (already configured in the workflow file)

#### 2. "Environment not found" Error
**Solution**:
- The `github-pages` environment is automatically created when you enable GitHub Pages
- If it doesn't exist, manually create it in Settings → Environments

#### 3. "Build failed" Error
**Solution**:
- Check the Actions tab for detailed error logs
- Ensure all dependencies are properly installed
- Verify the build process works locally with `npm run build`

#### 4. "Page not found" Error
**Solution**:
- Wait a few minutes for the deployment to complete
- Check if the URL is correct: `https://girish3349.github.io/XpathGenerator`
- Ensure the `dist` folder contains the built files

## 📁 File Structure After Deployment

```
dist/
├── index.html          # Main HTML file
├── styles.min.css      # Minified CSS
└── script.min.js       # Minified JavaScript
```

## 🔄 Workflow Details

The GitHub Pages deployment workflow:
1. **Checkout** the repository code
2. **Setup Node.js** with caching
3. **Install dependencies** using `npm ci`
4. **Build** the project using `npm run build`
5. **Upload** the `dist` folder as a Pages artifact
6. **Deploy** to GitHub Pages

## 🌐 Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to your repository root with your domain name
2. Configure DNS settings with your domain provider
3. Add the domain to GitHub Pages settings

## 📊 Monitoring

- Check deployment status in the **Actions** tab
- View deployment logs for debugging
- Monitor the **Pages** section in repository settings

## 🆘 Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify repository permissions
3. Ensure the build process works locally
4. Check the GitHub Pages documentation

---

**Your XPath Generator will be live at: `https://girish3349.github.io/XpathGenerator`** 🚀
