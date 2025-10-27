/**
 * Core application utilities and API client
 */

const API = {
    baseUrl: 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/changelogs-data/changelogs',

    /**
     * Fetch statistics
     */
    async getStats() {
        const response = await fetch(`${this.baseUrl}/stats.json`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        return response.json();
    },

    /**
     * Fetch global changelog
     */
    async getGlobalChangelog() {
        const response = await fetch(`${this.baseUrl}/global-changelog.json`);
        if (!response.ok) throw new Error('Failed to fetch global changelog');
        return response.json();
    },

    /**
     * Fetch country-specific changelog
     */
    async getCountryChangelog(countryCode) {
        const response = await fetch(`${this.baseUrl}/countries/${countryCode}.json`);
        if (!response.ok) throw new Error(`Failed to fetch changelog for ${countryCode}`);
        return response.json();
    },

    /**
     * Fetch archive index
     */
    async getArchiveIndex() {
        const response = await fetch(`${this.baseUrl}/archives/index.json`);
        if (!response.ok) throw new Error('Failed to fetch archive index');
        return response.json();
    },

    /**
     * Fetch archived changelog for a specific year
     */
    async getArchivedChangelog(year, countryCode) {
        const response = await fetch(`${this.baseUrl}/archives/${year}/${countryCode}.json`);
        if (!response.ok) throw new Error(`Failed to fetch archive for ${countryCode} (${year})`);
        return response.json();
    }
};

/**
 * Utility functions
 */
const Utils = {
    /**
     * Format date from ISO string
     */
    formatDate(isoString, options = {}) {
        const date = new Date(isoString);
        const defaultOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
    },

    /**
     * Format relative time (e.g., "2 days ago")
     */
    formatRelativeTime(isoString) {
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);
        const diffWeek = Math.floor(diffDay / 7);
        const diffMonth = Math.floor(diffDay / 30);
        const diffYear = Math.floor(diffDay / 365);

        if (diffSec < 60) return 'just now';
        if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
        if (diffHour < 24) return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
        if (diffDay < 7) return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
        if (diffWeek < 5) return `${diffWeek} week${diffWeek !== 1 ? 's' : ''} ago`;
        if (diffMonth < 12) return `${diffMonth} month${diffMonth !== 1 ? 's' : ''} ago`;
        return `${diffYear} year${diffYear !== 1 ? 's' : ''} ago`;
    },

    /**
     * Debounce function
     */
    debounce(func, wait) {
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

    /**
     * Format number with commas
     */
    formatNumber(num) {
        return num.toLocaleString('en-US');
    },

    /**
     * Get action badge class
     */
    getActionBadgeClass(action) {
        switch (action) {
            case 'add': return 'badge-add';
            case 'update': return 'badge-update';
            case 'delete': return 'badge-delete';
            default: return '';
        }
    },

    /**
     * Get entity icon
     */
    getEntityIcon(entityType) {
        switch (entityType) {
            case 'city': return '🏙️';
            case 'state': return '📍';
            case 'country': return '🌍';
            default: return '📝';
        }
    },

    /**
     * Truncate text
     */
    truncate(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },

    /**
     * Pretty print JSON
     */
    prettyJSON(obj) {
        return JSON.stringify(obj, null, 2);
    },

    /**
     * Search/filter array of objects
     */
    filterObjects(objects, searchTerm, searchFields) {
        const term = searchTerm.toLowerCase();
        return objects.filter(obj => {
            return searchFields.some(field => {
                const value = this.getNestedValue(obj, field);
                return value && String(value).toLowerCase().includes(term);
            });
        });
    },

    /**
     * Get nested object value by path (e.g., "entity.name")
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, prop) => current?.[prop], obj);
    },

    /**
     * Download JSON file
     */
    downloadJSON(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    /**
     * Copy to clipboard
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    }
};

/**
 * Simple state management
 */
const State = {
    data: {},

    set(key, value) {
        this.data[key] = value;
    },

    get(key) {
        return this.data[key];
    },

    has(key) {
        return key in this.data;
    },

    clear(key) {
        if (key) {
            delete this.data[key];
        } else {
            this.data = {};
        }
    }
};

/**
 * Error handling
 */
function handleError(error, userMessage = 'An error occurred') {
    console.error('Error:', error);
    alert(`${userMessage}\n\nDetails: ${error.message}`);
}

/**
 * Loading state helpers
 */
function showLoading(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.style.display = 'block';
}

function hideLoading(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.style.display = 'none';
}

function showElement(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.style.display = 'block';
}

function hideElement(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.style.display = 'none';
}
