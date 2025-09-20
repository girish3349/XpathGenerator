class XPathGenerator {
    constructor() {
        this.init();
        this.bindEvents();
        this.xpathData = [];
        this.currentFilter = 'all';
    }

    init() {
        this.urlInput = document.getElementById('urlInput');
        this.extractBtn = document.getElementById('extractBtn');
        this.loadingSection = document.getElementById('loadingSection');
        this.resultsSection = document.getElementById('resultsSection');
        this.errorSection = document.getElementById('errorSection');
        this.xpathList = document.getElementById('xpathList');
        this.searchInput = document.getElementById('searchInput');
        this.includeNonInteractive = document.getElementById('includeNonInteractive');
        this.includeText = document.getElementById('includeText');
        
        // Preview elements
        this.previewSection = document.getElementById('previewSection');
        this.previewFrame = document.getElementById('previewFrame');
        this.previewError = document.getElementById('previewError');
        this.previewContainer = document.querySelector('.preview-container');
        this.togglePreviewBtn = document.getElementById('togglePreviewBtn');
        this.refreshPreviewBtn = document.getElementById('refreshPreviewBtn');
        this.openInNewTabBtn = document.getElementById('openInNewTabBtn');
        
        // Stats elements
        this.totalElements = document.getElementById('totalElements');
        this.interactiveElements = document.getElementById('interactiveElements');
        this.formElements = document.getElementById('formElements');
        
        // Preview state
        this.isPreviewVisible = false;
        this.currentUrl = '';
    }

    bindEvents() {
        this.extractBtn.addEventListener('click', () => this.extractXPaths());
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.extractXPaths();
        });
        
        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.filterXPaths(e.target.dataset.filter));
        });
        
        // Search functionality
        this.searchInput.addEventListener('input', (e) => this.searchXPaths(e.target.value));
        
        // Control buttons
        document.getElementById('copyAllBtn').addEventListener('click', () => this.copyAllXPaths());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadXPaths());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearResults());
        document.getElementById('retryBtn').addEventListener('click', () => this.hideError());
        
        // Preview controls
        this.togglePreviewBtn.addEventListener('click', () => this.togglePreview());
        this.refreshPreviewBtn.addEventListener('click', () => this.refreshPreview());
        this.openInNewTabBtn.addEventListener('click', () => this.openInNewTab());
    }

    async extractXPaths() {
        const url = this.urlInput.value.trim();
        
        if (!url) {
            this.showError('Please enter a valid URL');
            return;
        }

        if (!this.isValidUrl(url)) {
            this.showError('Please enter a valid URL format (e.g., https://example.com)');
            return;
        }

        this.currentUrl = url;
        this.showLoading();
        this.hideError();
        this.hideResults();

        try {
            // Since we can't directly fetch external URLs due to CORS, we'll simulate the process
            // In a real implementation, you'd need a backend service or browser extension
            await this.simulateXPathExtraction(url);
        } catch (error) {
            this.showError(`Failed to extract XPaths: ${error.message}`);
        }
    }

    async simulateXPathExtraction(url) {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate sample XPath data based on common interactive elements
        this.xpathData = this.generateSampleXPaths();
        this.displayResults();
    }

    generateSampleXPaths() {
        const sampleData = [
            // Interactive elements
            { type: 'button', xpath: '//button[@class="btn-primary"]', text: 'Submit', id: 'submit-btn', class: 'btn-primary' },
            { type: 'button', xpath: '//button[contains(@class, "menu-toggle")]', text: 'Menu', id: 'menu-toggle', class: 'menu-toggle' },
            { type: 'input', xpath: '//input[@type="text" and @name="username"]', text: '', id: 'username', class: 'form-control', placeholder: 'Enter username' },
            { type: 'input', xpath: '//input[@type="email" and @name="email"]', text: '', id: 'email', class: 'form-control', placeholder: 'Enter email' },
            { type: 'input', xpath: '//input[@type="password" and @name="password"]', text: '', id: 'password', class: 'form-control', placeholder: 'Enter password' },
            { type: 'input', xpath: '//input[@type="checkbox" and @name="remember"]', text: '', id: 'remember', class: 'checkbox' },
            { type: 'input', xpath: '//input[@type="radio" and @name="gender"]', text: '', id: 'gender-male', class: 'radio' },
            { type: 'select', xpath: '//select[@name="country"]', text: '', id: 'country', class: 'form-select' },
            { type: 'textarea', xpath: '//textarea[@name="message"]', text: '', id: 'message', class: 'form-control', placeholder: 'Enter your message' },
            { type: 'link', xpath: '//a[@href="/login"]', text: 'Login', id: 'login-link', class: 'nav-link' },
            { type: 'link', xpath: '//a[@href="/register"]', text: 'Register', id: 'register-link', class: 'nav-link' },
            { type: 'link', xpath: '//a[contains(@class, "social-link")]', text: 'Follow us', id: 'social-link', class: 'social-link' },
            
            // Form elements
            { type: 'form', xpath: '//form[@id="login-form"]', text: '', id: 'login-form', class: 'login-form' },
            { type: 'form', xpath: '//form[@id="contact-form"]', text: '', id: 'contact-form', class: 'contact-form' },
            
            // Navigation elements
            { type: 'nav', xpath: '//nav[@class="main-navigation"]', text: '', id: 'main-nav', class: 'main-navigation' },
            { type: 'nav', xpath: '//nav[@class="breadcrumb"]', text: '', id: 'breadcrumb', class: 'breadcrumb' },
            
            // Interactive containers
            { type: 'div', xpath: '//div[@class="dropdown-menu"]', text: '', id: 'dropdown-menu', class: 'dropdown-menu' },
            { type: 'div', xpath: '//div[@class="modal-content"]', text: '', id: 'modal-content', class: 'modal-content' },
            { type: 'div', xpath: '//div[@class="tab-content"]', text: '', id: 'tab-content', class: 'tab-content' },
            
            // Media elements
            { type: 'img', xpath: '//img[@alt="Logo"]', text: '', id: 'logo', class: 'logo', alt: 'Company Logo' },
            { type: 'img', xpath: '//img[@class="hero-image"]', text: '', id: 'hero-image', class: 'hero-image', alt: 'Hero Image' },
            
            // Text elements (if included)
            { type: 'h1', xpath: '//h1[@class="page-title"]', text: 'Welcome to Our Website', id: 'page-title', class: 'page-title' },
            { type: 'h2', xpath: '//h2[@class="section-title"]', text: 'Our Services', id: 'section-title', class: 'section-title' },
            { type: 'p', xpath: '//p[@class="description"]', text: 'This is a sample description text.', id: 'description', class: 'description' },
            { type: 'span', xpath: '//span[@class="price"]', text: '$99.99', id: 'price', class: 'price' },
        ];

        // Filter based on options
        let filteredData = sampleData;
        
        if (!this.includeNonInteractive.checked) {
            filteredData = filteredData.filter(item => 
                ['button', 'input', 'select', 'textarea', 'link', 'form'].includes(item.type)
            );
        }
        
        if (!this.includeText.checked) {
            filteredData = filteredData.filter(item => 
                !['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'].includes(item.type)
            );
        }

        return filteredData;
    }

    displayResults() {
        this.hideLoading();
        this.updateStats();
        this.renderXPathList();
        this.resultsSection.style.display = 'block';
    }

    updateStats() {
        const total = this.xpathData.length;
        const interactive = this.xpathData.filter(item => 
            ['button', 'input', 'select', 'textarea', 'link'].includes(item.type)
        ).length;
        const forms = this.xpathData.filter(item => 
            ['form', 'input', 'select', 'textarea'].includes(item.type)
        ).length;

        this.totalElements.textContent = total;
        this.interactiveElements.textContent = interactive;
        this.formElements.textContent = forms;
    }

    renderXPathList() {
        this.xpathList.innerHTML = '';
        
        const filteredData = this.getFilteredData();
        
        filteredData.forEach((item, index) => {
            const xpathItem = this.createXPathItem(item, index);
            this.xpathList.appendChild(xpathItem);
        });
    }

    createXPathItem(item, index) {
        const div = document.createElement('div');
        div.className = 'xpath-item';
        div.dataset.type = item.type;
        div.dataset.index = index;

        const elementTypeClass = this.getElementTypeClass(item.type);
        
        div.innerHTML = `
            <div class="xpath-header">
                <span class="element-type ${elementTypeClass}">${item.type}</span>
                <button class="copy-xpath-btn" onclick="xpathGenerator.copySingleXPath('${item.xpath}')" title="Copy XPath">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
            <div class="xpath-path">${item.xpath}</div>
            <div class="element-info">
                ${item.text ? `<span><i class="fas fa-font"></i> Text: "${item.text}"</span>` : ''}
                ${item.id ? `<span><i class="fas fa-tag"></i> ID: ${item.id}</span>` : ''}
                ${item.class ? `<span><i class="fas fa-layer-group"></i> Class: ${item.class}</span>` : ''}
                ${item.placeholder ? `<span><i class="fas fa-comment"></i> Placeholder: "${item.placeholder}"</span>` : ''}
                ${item.alt ? `<span><i class="fas fa-image"></i> Alt: "${item.alt}"</span>` : ''}
            </div>
        `;

        return div;
    }

    getElementTypeClass(type) {
        const typeClasses = {
            'button': 'type-button',
            'input': 'type-input',
            'select': 'type-select',
            'textarea': 'type-textarea',
            'link': 'type-link',
            'form': 'type-form',
            'nav': 'type-nav',
            'div': 'type-div',
            'img': 'type-img',
            'h1': 'type-heading',
            'h2': 'type-heading',
            'h3': 'type-heading',
            'h4': 'type-heading',
            'h5': 'type-heading',
            'h6': 'type-heading',
            'p': 'type-text',
            'span': 'type-text'
        };
        return typeClasses[type] || 'type-default';
    }

    getFilteredData() {
        let filtered = this.xpathData;
        
        // Apply type filter
        if (this.currentFilter !== 'all') {
            const filterMap = {
                'interactive': ['button', 'input', 'select', 'textarea', 'link'],
                'forms': ['form', 'input', 'select', 'textarea'],
                'links': ['link'],
                'buttons': ['button']
            };
            
            if (filterMap[this.currentFilter]) {
                filtered = filtered.filter(item => 
                    filterMap[this.currentFilter].includes(item.type)
                );
            }
        }
        
        // Apply search filter
        const searchTerm = this.searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(item => 
                item.xpath.toLowerCase().includes(searchTerm) ||
                item.type.toLowerCase().includes(searchTerm) ||
                (item.text && item.text.toLowerCase().includes(searchTerm)) ||
                (item.id && item.id.toLowerCase().includes(searchTerm)) ||
                (item.class && item.class.toLowerCase().includes(searchTerm))
            );
        }
        
        return filtered;
    }

    filterXPaths(filter) {
        this.currentFilter = filter;
        
        // Update active tab
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.renderXPathList();
    }

    searchXPaths(searchTerm) {
        this.renderXPathList();
    }

    copySingleXPath(xpath) {
        navigator.clipboard.writeText(xpath).then(() => {
            this.showToast('XPath copied to clipboard!');
        }).catch(() => {
            this.showToast('Failed to copy XPath');
        });
    }

    copyAllXPaths() {
        const filteredData = this.getFilteredData();
        const allXPaths = filteredData.map(item => item.xpath).join('\n');
        
        navigator.clipboard.writeText(allXPaths).then(() => {
            this.showToast(`Copied ${filteredData.length} XPaths to clipboard!`);
        }).catch(() => {
            this.showToast('Failed to copy XPaths');
        });
    }

    downloadXPaths() {
        const filteredData = this.getFilteredData();
        const csvContent = this.convertToCSV(filteredData);
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'xpaths.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        this.showToast('XPaths downloaded as CSV!');
    }

    convertToCSV(data) {
        const headers = ['Type', 'XPath', 'Text', 'ID', 'Class', 'Placeholder', 'Alt'];
        const csvRows = [headers.join(',')];
        
        data.forEach(item => {
            const row = [
                item.type,
                `"${item.xpath}"`,
                `"${item.text || ''}"`,
                `"${item.id || ''}"`,
                `"${item.class || ''}"`,
                `"${item.placeholder || ''}"`,
                `"${item.alt || ''}"`
            ];
            csvRows.push(row.join(','));
        });
        
        return csvRows.join('\n');
    }

    clearResults() {
        this.xpathData = [];
        this.hideResults();
        this.hidePreview();
        this.urlInput.value = '';
        this.searchInput.value = '';
        this.currentFilter = 'all';
        this.currentUrl = '';
        
        // Reset filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector('[data-filter="all"]').classList.add('active');
        
        // Reset preview button
        this.togglePreviewBtn.innerHTML = '<i class="fas fa-eye"></i> Show Preview';
        this.isPreviewVisible = false;
    }

    // Preview methods
    togglePreview() {
        if (this.isPreviewVisible) {
            this.hidePreview();
        } else {
            this.showPreview();
        }
    }

    showPreview() {
        if (!this.currentUrl) {
            this.showToast('No URL available for preview');
            return;
        }

        this.previewSection.style.display = 'block';
        this.isPreviewVisible = true;
        this.togglePreviewBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Preview';
        
        // Update layout
        const resultsContainer = document.querySelector('.results-container');
        resultsContainer.classList.add('with-preview');
        
        // Try to load the preview
        this.loadPreview();
    }

    hidePreview() {
        this.previewSection.style.display = 'none';
        this.isPreviewVisible = false;
        this.togglePreviewBtn.innerHTML = '<i class="fas fa-eye"></i> Show Preview';
        
        // Update layout
        const resultsContainer = document.querySelector('.results-container');
        resultsContainer.classList.remove('with-preview');
    }

    loadPreview() {
        try {
            // Hide error initially
            this.previewError.style.display = 'none';
            
            // Show loading state
            this.showPreviewLoading();
            
            // Set iframe source
            this.previewFrame.src = this.currentUrl;
            
            // Handle iframe load events
            this.previewFrame.onload = () => {
                console.log('Preview loaded successfully');
                this.hidePreviewLoading();
            };
            
            this.previewFrame.onerror = () => {
                this.hidePreviewLoading();
                this.showPreviewError();
            };
            
            // Set a timeout to show error if iframe doesn't load
            setTimeout(() => {
                try {
                    // Try to access iframe content to check if it loaded
                    const iframeDoc = this.previewFrame.contentDocument || this.previewFrame.contentWindow.document;
                    if (!iframeDoc || iframeDoc.readyState === 'loading') {
                        this.hidePreviewLoading();
                        this.showPreviewError();
                    } else {
                        this.hidePreviewLoading();
                    }
                } catch (e) {
                    // Cross-origin error means the iframe loaded but we can't access it
                    // This is actually good - it means the preview is working
                    console.log('Preview loaded (cross-origin)');
                    this.hidePreviewLoading();
                }
            }, 5000);
            
        } catch (error) {
            this.hidePreviewLoading();
            this.showPreviewError();
        }
    }

    showPreviewLoading() {
        // Remove existing loading if any
        const existingLoading = this.previewContainer.querySelector('.preview-loading');
        if (existingLoading) {
            existingLoading.remove();
        }
        
        // Create loading element
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'preview-loading';
        loadingDiv.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading preview...</p>
        `;
        
        this.previewContainer.appendChild(loadingDiv);
    }

    hidePreviewLoading() {
        const loadingDiv = this.previewContainer.querySelector('.preview-loading');
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }

    showPreviewError() {
        this.previewError.style.display = 'flex';
        this.previewFrame.style.display = 'none';
    }

    refreshPreview() {
        if (!this.isPreviewVisible || !this.currentUrl) {
            this.showToast('No preview to refresh');
            return;
        }
        
        this.previewError.style.display = 'none';
        this.previewFrame.style.display = 'block';
        this.previewFrame.src = '';
        
        // Small delay to ensure iframe is cleared
        setTimeout(() => {
            this.loadPreview();
        }, 100);
    }

    openInNewTab() {
        if (!this.currentUrl) {
            this.showToast('No URL available');
            return;
        }
        
        try {
            window.open(this.currentUrl, '_blank', 'noopener,noreferrer');
            this.showToast('Opened in new tab');
        } catch (error) {
            this.showToast('Failed to open in new tab');
        }
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    showLoading() {
        this.loadingSection.style.display = 'block';
        this.extractBtn.disabled = true;
        this.extractBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }

    hideLoading() {
        this.loadingSection.style.display = 'none';
        this.extractBtn.disabled = false;
        this.extractBtn.innerHTML = '<i class="fas fa-search"></i> Extract XPaths';
    }

    showResults() {
        this.resultsSection.style.display = 'block';
    }

    hideResults() {
        this.resultsSection.style.display = 'none';
    }

    showError(message) {
        document.getElementById('errorMessage').textContent = message;
        this.errorSection.style.display = 'block';
        this.hideLoading();
    }

    hideError() {
        this.errorSection.style.display = 'none';
    }

    showToast(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #667eea;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Add CSS for toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize the application
let xpathGenerator;
document.addEventListener('DOMContentLoaded', () => {
    xpathGenerator = new XPathGenerator();
});
