# Deployment Guide for XPath Generator

This guide covers various deployment options for the XPath Generator application.

## 🚀 Quick Deploy Options

### 1. GitHub Pages (Free)
- **Best for**: Static hosting, open source projects
- **Cost**: Free
- **Setup**: Automatic via GitHub Actions

```bash
# Enable GitHub Pages in repository settings
# Set source to "GitHub Actions"
# The workflow will automatically deploy on push to main
```

### 2. Vercel (Recommended)
- **Best for**: Modern web apps, automatic deployments
- **Cost**: Free tier available
- **Setup**: Connect GitHub repository

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Or connect via web interface at vercel.com
```

### 3. Netlify
- **Best for**: JAMstack applications, form handling
- **Cost**: Free tier available
- **Setup**: Connect GitHub repository

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

## 🐳 Docker Deployment

### Local Docker
```bash
# Build image
docker build -t xpath-generator .

# Run container
docker run -p 3000:3000 xpath-generator

# Or use docker-compose
docker-compose up -d
```

### Docker Hub
```bash
# Build and push
docker build -t yourusername/xpath-generator .
docker push yourusername/xpath-generator

# Deploy anywhere
docker run -p 3000:3000 yourusername/xpath-generator
```

## ☁️ Cloud Platform Deployment

### AWS
1. **S3 + CloudFront**:
   - Upload `dist/` folder to S3 bucket
   - Configure CloudFront distribution
   - Set up custom domain

2. **Elastic Beanstalk**:
   - Use the provided Dockerfile
   - Deploy as Docker application

3. **Lambda + API Gateway**:
   - Convert to serverless function
   - Use AWS Lambda for dynamic content

### Google Cloud Platform
1. **Cloud Storage**:
   - Upload static files to Cloud Storage
   - Configure as website

2. **Cloud Run**:
   - Use Dockerfile for containerized deployment
   - Scale automatically

### Azure
1. **Static Web Apps**:
   - Connect GitHub repository
   - Automatic deployment on push

2. **Container Instances**:
   - Use Dockerfile for container deployment

## 🔧 Environment Configuration

### Required Environment Variables
```bash
# Optional: Custom domain for GitHub Pages
CUSTOM_DOMAIN=your-domain.com

# Vercel
VERCEL_TOKEN=your_vercel_token
ORG_ID=your_org_id
PROJECT_ID=your_project_id

# Netlify
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id

# Security scanning
SNYK_TOKEN=your_snyk_token

# Docker Hub
DOCKER_USERNAME=your_docker_username
DOCKER_PASSWORD=your_docker_password
```

### GitHub Secrets Setup
1. Go to repository Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `VERCEL_TOKEN`
   - `ORG_ID`
   - `PROJECT_ID`
   - `NETLIFY_AUTH_TOKEN`
   - `NETLIFY_SITE_ID`
   - `SNYK_TOKEN`
   - `DOCKER_USERNAME`
   - `DOCKER_PASSWORD`

## 📊 Monitoring and Analytics

### Performance Monitoring
- **Lighthouse CI**: Automated performance testing
- **Web Vitals**: Core web vitals tracking
- **Bundle Analysis**: Size optimization

### Security Monitoring
- **Snyk**: Vulnerability scanning
- **CodeQL**: Code security analysis
- **Dependabot**: Dependency updates

### Uptime Monitoring
- **GitHub Actions**: Build status
- **Deployment Status**: Success/failure tracking
- **Health Checks**: Application health monitoring

## 🔄 CI/CD Pipeline

### Automatic Deployments
- **Main branch**: Deploys to production
- **Develop branch**: Deploys to staging
- **Pull requests**: Runs tests and security scans

### Manual Deployments
```bash
# Deploy specific version
git tag v1.0.0
git push origin v1.0.0

# Deploy from local
npm run deploy:github
npm run deploy:vercel
npm run deploy:netlify
```

## 🛠️ Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality
```bash
# Lint code
npm run lint

# Format code
npm run format

# Check formatting
npm run format -- --check
```

## 📈 Performance Optimization

### Build Optimization
- **Minification**: CSS and JS minification
- **Compression**: Gzip compression enabled
- **Caching**: Long-term caching for static assets
- **CDN**: Global content delivery

### Runtime Optimization
- **Lazy Loading**: Defer non-critical resources
- **Code Splitting**: Split JavaScript bundles
- **Image Optimization**: Compress and optimize images
- **Service Worker**: Offline functionality

## 🔒 Security Best Practices

### Headers
- **X-Frame-Options**: Prevent clickjacking
- **X-XSS-Protection**: XSS protection
- **X-Content-Type-Options**: MIME type sniffing protection
- **Referrer-Policy**: Control referrer information

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';">
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for syntax errors

2. **Deployment Issues**:
   - Verify environment variables
   - Check build artifacts
   - Review deployment logs

3. **Performance Issues**:
   - Run Lighthouse audit
   - Check bundle size
   - Optimize images and assets

### Debug Commands
```bash
# Check build locally
npm run build && npm run preview

# Test Docker build
docker build -t test-xpath-generator .

# Check security vulnerabilities
npm audit

# Run performance tests
npm run test:lighthouse
```

## 📞 Support

For deployment issues:
1. Check the GitHub Actions logs
2. Review the deployment platform documentation
3. Open an issue in the repository
4. Check the troubleshooting section above

## 🎯 Next Steps

After successful deployment:
1. Set up monitoring and alerts
2. Configure custom domain (if needed)
3. Set up SSL certificates
4. Configure CDN for better performance
5. Set up backup and disaster recovery

---

**Happy Deploying!** 🚀
