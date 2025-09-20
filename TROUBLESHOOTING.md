# Troubleshooting Guide

This guide helps you resolve common issues with the XPath Generator deployment pipeline.

## 🚨 Common Errors and Solutions

### 1. Vercel Deployment Errors

#### Error: `Input required and not supplied: vercel-token`
**Cause**: The `VERCEL_TOKEN` secret is not configured in your repository.

**Solution**:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to Settings → Tokens
3. Create a new token
4. Go to your GitHub repository → Settings → Secrets and variables → Actions
5. Add a new secret named `VERCEL_TOKEN` with your token value
6. Optionally add `ORG_ID` and `PROJECT_ID` secrets

**Alternative**: The workflow will now skip Vercel deployment if the token is not configured.

### 2. GitHub Pages Errors

#### Error: `Get Pages site failed. Please verify that the repository has Pages enabled`
**Cause**: GitHub Pages is not enabled in your repository settings.

**Solution**:
1. Go to your GitHub repository
2. Click **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **"GitHub Actions"**
5. Click **Save**
6. Re-run the workflow

#### Error: `Write access to repository not granted`
**Cause**: Insufficient permissions for the workflow.

**Solution**:
1. Go to **Settings** → **Actions** → **General**
2. Scroll down to **Workflow permissions**
3. Select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"**
5. Click **Save**

### 3. Build Errors

#### Error: `Dependencies lock file is not found`
**Cause**: `package-lock.json` is missing.

**Solution**:
```bash
npm install
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

#### Error: `Build failed`
**Cause**: Build process encountered an error.

**Solution**:
1. Check the Actions logs for detailed error messages
2. Test locally: `npm run build`
3. Ensure all dependencies are installed: `npm ci`
4. Check for syntax errors in your code

### 4. Security Scan Errors

#### Error: `Snyk security scan failed`
**Cause**: Security vulnerabilities found or `SNYK_TOKEN` not configured.

**Solution**:
1. **If token missing**: Add `SNYK_TOKEN` secret to your repository
2. **If vulnerabilities found**: Run `npm audit fix` locally and commit changes
3. **To skip**: The workflow will continue even if Snyk fails

### 5. Lighthouse Errors

#### Error: `Chrome prevented page load with an interstitial`
**Cause**: The test server is not running or accessible.

**Solution**:
1. This is expected for the current test setup
2. The workflow uses a simplified build test instead
3. For real Lighthouse testing, ensure the server is running

## 🔧 Quick Fixes

### Reset Everything
```bash
# Clean and rebuild
npm run clean
npm install
npm run build

# Commit and push
git add .
git commit -m "Fix deployment issues"
git push
```

### Check Workflow Status
1. Go to **Actions** tab in your repository
2. Click on the failed workflow run
3. Check the logs for specific error messages
4. Follow the suggested solutions above

### Manual Deployment
If automatic deployment fails, you can deploy manually:

#### GitHub Pages
```bash
npm run build
npm run deploy:github
```

#### Vercel
```bash
npm run deploy:vercel
```

#### Netlify
```bash
npm run deploy:netlify
```

## 📋 Pre-Deployment Checklist

Before pushing to main branch, ensure:

- [ ] `package-lock.json` exists
- [ ] Build works locally: `npm run build`
- [ ] Tests pass: `npm test`
- [ ] No linting errors: `npm run lint`
- [ ] GitHub Pages is enabled (if using)
- [ ] Required secrets are configured (if using Vercel/Netlify)

## 🆘 Getting Help

### Check These First
1. **Repository Settings**: Pages enabled, correct permissions
2. **Secrets**: All required secrets are configured
3. **Local Build**: `npm run build` works without errors
4. **Workflow Logs**: Check Actions tab for detailed error messages

### Common Solutions
1. **Enable GitHub Pages**: Settings → Pages → Source: GitHub Actions
2. **Fix Permissions**: Settings → Actions → General → Read and write permissions
3. **Add Secrets**: Settings → Secrets and variables → Actions
4. **Update Dependencies**: `npm audit fix` and commit changes

### Still Having Issues?
1. Check the [GitHub Actions documentation](https://docs.github.com/en/actions)
2. Review the [GitHub Pages documentation](https://docs.github.com/en/pages)
3. Check the [Vercel documentation](https://vercel.com/docs)
4. Check the [Netlify documentation](https://docs.netlify.com/)

## 🎯 Expected Workflow Behavior

### Successful Deployment
- ✅ Build completes without errors
- ✅ Tests pass
- ✅ Security scan completes (may have warnings)
- ✅ GitHub Pages deploys (if enabled)
- ✅ Vercel deploys (if token configured)
- ✅ Netlify deploys (if token configured)

### Partial Success
- ⚠️ Some deployments may be skipped if secrets are not configured
- ⚠️ Security warnings may appear (non-blocking)
- ✅ Core functionality should still work

### Complete Failure
- ❌ Build fails - check code and dependencies
- ❌ GitHub Pages fails - check repository settings
- ❌ All deployments fail - check workflow configuration

---

**Remember**: The most common issues are missing repository settings and unconfigured secrets. Follow the checklist above to resolve most problems! 🚀
