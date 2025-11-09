// Global State
const state = {
    currentSection: 'dashboard',
    theme: 'dark',
    apiEndpoints: [
        {
            method: 'GET',
            path: '/api/imagen',
            description: 'Generate AI Image dengan parameter prompt & ratio',
            parameters: [
                { name: 'prompt', type: 'string', required: true },
                { name: 'ratio', type: 'string', required: true }
            ],
            example: 'https://www.fuku-api.my.id/api/imagen?prompt=A+beautiful+landscape&ratio=1:1'
        },
        {
            method: 'GET',
            path: '/api/chatbot',
            description: 'AI Chatbot dengan parameter prompt & query',
            parameters: [
                { name: 'prompt', type: 'string', required: false },
                { name: 'query', type: 'string', required: true }
            ],
            example: 'https://www.fuku-api.my.id/api/chatbot?prompt=You+are+helpful+assistant&query=Hello'
        },
        {
            method: 'GET',
            path: '/api/tts',
            description: 'Text-to-Speech dengan berbagai voice options',
            parameters: [
                { name: 'text', type: 'string', required: true },
                { name: 'voice', type: 'string', required: false },
                { name: 'speed', type: 'number', required: false },
                { name: 'pitch', type: 'number', required: false }
            ],
            example: 'https://www.fuku-api.my.id/api/tts?text=Hello+World&voice=id-ID-ArdiNeural'
        },
        {
            method: 'GET',
            path: '/api/qwentts',
            description: 'Text-to-Speech menggunakan Qwen TTS',
            parameters: [
                { name: 'text', type: 'string', required: true },
                { name: 'voice', type: 'string', required: false }
            ],
            example: 'https://www.fuku-api.my.id/api/qwentts?text=Hello+World&voice=Sunny'
        },
        {
            method: 'GET',
            path: '/api/ytmp3',
            description: 'YouTube to MP3 Downloader',
            parameters: [
                { name: 'url', type: 'string', required: true },
                { name: 'quality', type: 'string', required: false }
            ],
            example: 'https://www.fuku-api.my.id/api/ytmp3?url=https://youtube.com/watch?v=example'
        },
        {
            method: 'GET',
            path: '/api/brat',
            description: 'Generate gambar Brat dari teks',
            parameters: [
                { name: 'text', type: 'string', required: true }
            ],
            example: 'https://www.fuku-api.my.id/api/brat?text=Hello+World'
        },
        {
            method: 'GET',
            path: '/api/tobase64',
            description: 'Convert text to Base64',
            parameters: [
                { name: 'text', type: 'string', required: true }
            ],
            example: 'https://www.fuku-api.my.id/api/tobase64?text=Hello+World'
        },
        {
            method: 'GET',
            path: '/api/nanobanana',
            description: 'Edit gambar dengan AI (Premium)',
            parameters: [
                { name: 'image', type: 'string', required: true },
                { name: 'prompt', type: 'string', required: true },
                { name: 'apikeyFuku', type: 'string', required: true }
            ],
            example: 'https://www.fuku-api.my.id/api/nanobanana?image=URL&prompt=style&apikeyFuku=key'
        },
        {
            method: 'GET',
            path: '/api/cpanel',
            description: 'Buat server panel Ptero (Premium)',
            parameters: [
                { name: 'username', type: 'string', required: true },
                { name: 'paket', type: 'string', required: true },
                { name: 'akses', type: 'string', required: true }
            ],
            example: 'https://www.fuku-api.my.id/api/cpanel?username=user&paket=1gb&akses=key'
        },
        {
            method: 'GET',
            path: '/api/status',
            description: 'Cek status FUKU API',
            parameters: [],
            example: 'https://www.fuku-api.my.id/api/status'
        }
    ]
};

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    createParticles();
    startTimeUpdates();
    initializeEventListeners();
    renderAPIEndpoints();
    initializeIntersectionObserver();
});

// Initialize Application
function initializeApp() {
    // Set initial theme
    const savedTheme = localStorage.getItem('fukuapi-theme') || 'dark';
    setTheme(savedTheme);
    
    // Show initial section
    showSection('dashboard');
}

// Theme Management
function setTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fukuapi-theme', theme);
    
    const themeIcon = document.querySelector('#themeToggle i');
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function toggleTheme() {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
    
    state.currentSection = sectionId;
}

function scrollToSection(sectionId) {
    showSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile Menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');
    
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Background Effects
function createParticles() {
    const particleCount = 50;
    const container = document.body;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random color
        const colors = ['#667eea', '#764ba2', '#f43f5e', '#4ade80', '#3b82f6'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        // Random animation
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 5;
        particle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
        
        container.appendChild(particle);
    }
}

// Time Updates
function startTimeUpdates() {
    updateTime();
    updateUptime();
    updateStats();
    
    setInterval(updateTime, 1000);
    setInterval(updateUptime, 1000);
    setInterval(updateStats, 5000);
}

function updateTime() {
    const now = new Date();
    const options = { 
        timeZone: 'Asia/Jakarta', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    };
    const timeString = now.toLocaleTimeString('id-ID', options);
    document.getElementById('current-time').textContent = `${timeString} WIB`;
}

function updateUptime() {
    // Simulate uptime calculation
    const uptimeElement = document.getElementById('uptime');
    if (uptimeElement) {
        const hours = Math.floor(performance.now() / 3600000);
        const minutes = Math.floor((performance.now() % 3600000) / 60000);
        uptimeElement.textContent = `Uptime: ${hours}h ${minutes}m`;
    }
}

function updateStats() {
    // Animate response time
    const responseTime = document.getElementById('response-time');
    if (responseTime) {
        const randomMs = Math.floor(Math.random() * 20) + 40;
        responseTime.textContent = `< ${randomMs}ms`;
    }
    
    // Animate total requests
    const totalRequests = document.getElementById('total-requests');
    if (totalRequests) {
        const current = parseInt(totalRequests.textContent) || 10000000;
        const increment = Math.floor(Math.random() * 1000);
        totalRequests.textContent = (current + increment).toLocaleString() + '+';
    }
}

// API Endpoints Rendering
function renderAPIEndpoints() {
    const apiGrid = document.getElementById('apiGrid');
    if (!apiGrid) return;
    
    apiGrid.innerHTML = state.apiEndpoints.map(endpoint => `
        <div class="api-card" data-endpoint="${endpoint.path}">
            <div class="api-header">
                <div class="api-method">${endpoint.method}</div>
                <div class="api-path">${endpoint.path}</div>
            </div>
            <div class="api-description">${endpoint.description}</div>
            
            ${endpoint.parameters.length > 0 ? `
                <div class="api-parameters">
                    ${endpoint.parameters.map(param => `
                        <div class="parameter">
                            <span class="param-name">${param.name}</span>
                            <span class="param-type">${param.required ? 'required' : 'optional'} • ${param.type}</span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            <div class="api-actions">
                <button class="btn btn-primary" onclick="testEndpoint('${endpoint.path}')">
                    <i class="fas fa-play"></i> Test API
                </button>
                <button class="btn btn-secondary" onclick="copyToClipboard('${endpoint.example}')">
                    <i class="fas fa-copy"></i> Copy URL
                </button>
            </div>
        </div>
    `).join('');
}

// API Testing
function testEndpoint(endpointPath) {
    const endpoint = state.apiEndpoints.find(ep => ep.path === endpointPath);
    if (!endpoint) return;
    
    // For now, redirect to the example URL
    // In a real implementation, you'd want to create a proper API tester interface
    window.open(endpoint.example, '_blank');
}

function openApiTester() {
    // Implementation for API tester modal
    alert('API Tester feature will be implemented in the next version!');
}

// Utility Functions
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('URL copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy URL', 'error');
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4ade80' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Intersection Observer for Animations
function initializeIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all API cards and other elements
    document.querySelectorAll('.api-card, .action-card, .endpoint-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Event Listeners
function initializeEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Mobile menu
    document.getElementById('hamburger').addEventListener('click', toggleMobileMenu);
    
    // Navigation links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.getElementById('hamburger');
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Mouse move effects
    document.addEventListener('mousemove', handleMouseMove);
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const button = e.target.querySelector('button');
    const originalText = button.innerHTML;
    
    // Show loading state
    button.innerHTML = '<div class="loading"></div> Sending...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        button.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.disabled = false;
            e.target.reset();
            
            showNotification('Message sent successfully!', 'success');
        }, 2000);
    }, 1500);
}

function handleMouseMove(e) {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelectorAll('.orb').forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        orb.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
    });
}

// Add CSS for notifications
const notificationStyles = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Export functions for global access
window.scrollToSection = scrollToSection;
window.testEndpoint = testEndpoint;
window.copyToClipboard = copyToClipboard;
window.openApiTester = openApiTester;
window.toggleTheme = toggleTheme;