// ConnectVerse - Main JavaScript Module
// Handles shared functionality across all pages

class ConnectVerse {
    constructor() {
        this.userData = this.loadUserData();
        this.currentPage = this.getCurrentPage();
        this.audioContext = null;
        this.backgroundAudio = null;
        this.init();
    }

    init() {
        this.setupGlobalEventListeners();
        this.initializeAudio();
        this.setupNavigation();
        this.handlePageSpecificFeatures();
    }

    // User Data Management
    loadUserData() {
        const savedData = localStorage.getItem('connectverse-user');
        return savedData ? JSON.parse(savedData) : this.getDefaultUserData();
    }

    getDefaultUserData() {
        return {
            privateId: this.generatePrivateId(),
            username: '',
            avatar: 'cosmic-1',
            mood: 'cosmic',
            level: 1,
            xp: 0,
            tokens: 0,
            interests: [],
            settings: {
                'private-mode': false,
                'auto-bond': false,
                'anonymous-mode': true,
                'event-notifications': true,
                'bond-notifications': true,
                'mood-ai': true
            }
        };
    }

    generatePrivateId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let id = 'CV-';
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 4; j++) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            if (i < 2) id += '-';
        }
        
        return id;
    }

    saveUserData() {
        localStorage.setItem('connectverse-user', JSON.stringify(this.userData));
    }

    // Page Detection
    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('discover')) return 'discover';
        if (path.includes('connect')) return 'connect';
        if (path.includes('space')) return 'space';
        if (path.includes('leaderboard')) return 'leaderboard';
        if (path.includes('events')) return 'events';
        if (path.includes('profile')) return 'profile';
        return 'index';
    }

    // Navigation System
    setupNavigation() {
        // Update active navigation state
        const navIcons = document.querySelectorAll('.nav-icon');
        navIcons.forEach(icon => {
            icon.classList.remove('active');
            if (icon.dataset.page === this.currentPage) {
                icon.classList.add('active');
            }
        });

        // Add navigation event listeners if not already present
        if (!window.navigationInitialized) {
            navIcons.forEach(icon => {
                icon.addEventListener('click', (e) => {
                    e.preventDefault();
                    const page = icon.dataset.page;
                    this.navigateToPage(page);
                });
            });
            window.navigationInitialized = true;
        }
    }

    navigateToPage(page) {
        // Animate transition
        if (typeof anime !== 'undefined') {
            anime({
                targets: 'body',
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInExpo',
                complete: () => {
                    window.location.href = `${page}.html`;
                }
            });
        } else {
            window.location.href = `${page}.html`;
        }
    }

    // Audio System
    initializeAudio() {
        // Create ambient cosmic audio context only after user interaction
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                try {
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    this.createAmbientSound();
                } catch (error) {
                    console.log('Audio not supported:', error);
                }
            }
        }, { once: true });
    }

    createAmbientSound() {
        // Create a simple ambient tone using Web Audio API
        if (!this.audioContext) return;

        // Create oscillator for ambient hum
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(110, this.audioContext.currentTime); // A2 note
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Start ambient sound
        oscillator.start();
        
        // Add subtle modulation
        setInterval(() => {
            if (this.audioContext) {
                oscillator.frequency.setValueAtTime(
                    110 + Math.sin(Date.now() * 0.001) * 10, 
                    this.audioContext.currentTime
                );
            }
        }, 100);
    }

    // Global Event Listeners
    setupGlobalEventListeners() {
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAudio();
            } else {
                this.resumeAudio();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    pauseAudio() {
        if (this.audioContext && this.audioContext.state === 'running') {
            this.audioContext.suspend();
        }
    }

    resumeAudio() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    handleResize() {
        // Handle responsive adjustments
        const isMobile = window.innerWidth < 768;
        document.body.classList.toggle('mobile', isMobile);
    }

    handleKeyboardShortcuts(e) {
        // Global keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    this.navigateToPage('discover');
                    break;
                case '2':
                    e.preventDefault();
                    this.navigateToPage('connect');
                    break;
                case '3':
                    e.preventDefault();
                    this.navigateToPage('space');
                    break;
                case '4':
                    e.preventDefault();
                    this.navigateToPage('leaderboard');
                    break;
                case '5':
                    e.preventDefault();
                    this.navigateToPage('profile');
                    break;
            }
        }
    }

    // Page-specific features
    handlePageSpecificFeatures() {
        switch(this.currentPage) {
            case 'index':
                this.initializeLoginPage();
                break;
            case 'discover':
                this.initializeDiscoverPage();
                break;
            case 'connect':
                this.initializeConnectPage();
                break;
            case 'space':
                this.initializeSpacePage();
                break;
            case 'leaderboard':
                this.initializeLeaderboardPage();
                break;
            case 'events':
                this.initializeEventsPage();
                break;
            case 'profile':
                this.initializeProfilePage();
                break;
        }
    }

    // Page initialization methods
    initializeLoginPage() {
        // Login page specific initialization
        console.log('Initializing login page features');
    }

    initializeDiscoverPage() {
        // Discover page specific initialization
        console.log('Initializing discover page features');
        this.simulateRealTimeUpdates();
    }

    initializeConnectPage() {
        // Connect page specific initialization
        console.log('Initializing connect page features');
        this.setupChatFeatures();
    }

    initializeSpacePage() {
        // Space page specific initialization
        console.log('Initializing space page features');
        this.setupCommunityFeatures();
    }

    initializeLeaderboardPage() {
        // Leaderboard page specific initialization
        console.log('Initializing leaderboard page features');
        this.setupLeaderboardUpdates();
    }

    initializeEventsPage() {
        // Events page specific initialization
        console.log('Initializing events page features');
        this.setupEventFeatures();
    }

    initializeProfilePage() {
        // Profile page specific initialization
        console.log('Initializing profile page features');
        this.setupProfileFeatures();
    }

    // Feature implementations
    simulateRealTimeUpdates() {
        // Simulate real-time updates for discover page
        setInterval(() => {
            if (this.currentPage === 'discover') {
                this.updateOnlineStatus();
            }
        }, 30000); // Update every 30 seconds
    }

    updateOnlineStatus() {
        // Update user online status
        const statusElement = document.getElementById('user-status');
        if (statusElement) {
            const statuses = ['Online', 'Away', 'Meditating', 'Exploring'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            statusElement.textContent = randomStatus;
        }
    }

    setupChatFeatures() {
        // Setup real-time chat features
        console.log('Setting up chat features');
    }

    setupCommunityFeatures() {
        // Setup community space features
        console.log('Setting up community features');
    }

    setupLeaderboardUpdates() {
        // Setup leaderboard real-time updates
        setInterval(() => {
            if (this.currentPage === 'leaderboard') {
                this.updateLeaderboardData();
            }
        }, 60000); // Update every minute
    }

    updateLeaderboardData() {
        // Simulate leaderboard data updates
        console.log('Updating leaderboard data');
    }

    setupEventFeatures() {
        // Setup event participation features
        console.log('Setting up event features');
    }

    setupProfileFeatures() {
        // Setup profile customization features
        console.log('Setting up profile features');
    }

    // Utility methods
    generateNotification(message, type = 'info') {
        if (typeof showNotification === 'function') {
            showNotification(message, type);
        } else {
            // Fallback notification
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }

    updateUserXP(amount) {
        this.userData.xp = (this.userData.xp || 0) + amount;
        this.saveUserData();
        this.generateNotification(`+${amount} XP earned!`, 'success');
    }

    updateUserTokens(amount) {
        this.userData.tokens = (this.userData.tokens || 0) + amount;
        this.saveUserData();
        const action = amount > 0 ? 'earned' : 'spent';
        this.generateNotification(`${Math.abs(amount)} tokens ${action}!`, 'info');
    }

    // Analytics and tracking (placeholder)
    trackEvent(eventName, properties = {}) {
        console.log('Event tracked:', eventName, properties);
        // In a real application, this would send analytics data
    }

    // Performance monitoring
    measurePerformance() {
        if (window.performance && window.performance.timing) {
            // Wait for page to fully load before calculating
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
                    if (loadTime > 0) {
                        console.log(`Page load time: ${loadTime}ms`);
                        this.trackEvent('page_load_time', { loadTime, page: this.currentPage });
                    }
                }, 0);
            });
        }
    }

    // Cleanup method
    destroy() {
        if (this.audioContext) {
            this.audioContext.close();
        }
        // Remove event listeners and clean up resources
    }
}

// Initialize ConnectVerse when DOM is ready
let connectVerse;

document.addEventListener('DOMContentLoaded', () => {
    connectVerse = new ConnectVerse();
    
    // Measure initial page load performance
    setTimeout(() => {
        connectVerse.measurePerformance();
    }, 0);
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (connectVerse) {
        connectVerse.destroy();
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConnectVerse;
}

// Global utility functions
window.ConnectVerseUtils = {
    formatNumber: (num) => num.toLocaleString(),
    formatTime: (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
    generateId: () => Math.random().toString(36).substr(2, 9),
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
};