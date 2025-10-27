/**
 * Browse page functionality
 */

let allCountries = [];
let currentCountryData = null;
let filteredChanges = [];

/**
 * Initialize browse page
 */
document.addEventListener('DOMContentLoaded', () => {
    loadCountries();

    // Setup search
    const countrySearch = document.getElementById('countrySearch');
    if (countrySearch) {
        countrySearch.addEventListener('input', Utils.debounce((e) => {
            filterCountries(e.target.value);
        }, 300));
    }

    // Setup filters
    const actionFilter = document.getElementById('actionFilter');
    const entityFilter = document.getElementById('entityFilter');
    const changeSearch = document.getElementById('changeSearch');

    if (actionFilter) {
        actionFilter.addEventListener('change', applyFilters);
    }
    if (entityFilter) {
        entityFilter.addEventListener('change', applyFilters);
    }
    if (changeSearch) {
        changeSearch.addEventListener('input', Utils.debounce(applyFilters, 300));
    }

    // Check URL hash for direct country link
    if (window.location.hash) {
        const countryCode = window.location.hash.substring(1);
        if (countryCode) {
            loadCountryChangelog(countryCode);
        }
    }
});

/**
 * Load countries list from stats
 */
async function loadCountries() {
    try {
        showLoading('loadingCountries');
        hideElement('countryGrid');
        hideElement('emptyCountries');

        const stats = await API.getStats();

        if (!stats.by_country) {
            throw new Error('No country data in stats');
        }

        // Convert to array and sort
        allCountries = Object.entries(stats.by_country).map(([code, data]) => ({
            code: code,
            name: getCountryName(code),
            totalChanges: data.total_changes,
            actions: data.actions,
            entities: data.entities
        })).sort((a, b) => b.totalChanges - a.totalChanges);

        renderCountries(allCountries);

        hideLoading('loadingCountries');
        showElement('countryGrid');

    } catch (error) {
        hideLoading('loadingCountries');
        handleError(error, 'Failed to load countries');
    }
}

/**
 * Render countries grid
 */
function renderCountries(countries) {
    const grid = document.getElementById('countryGrid');
    if (!grid) return;

    if (countries.length === 0) {
        hideElement('countryGrid');
        showElement('emptyCountries');
        return;
    }

    grid.innerHTML = countries.map(country => `
        <div class="country-card" onclick="loadCountryChangelog('${country.code}')">
            <div class="country-flag">${getCountryFlag(country.code)}</div>
            <div class="country-name">${country.name}</div>
            <div class="country-code">${country.code}</div>
            <div class="country-changes">${Utils.formatNumber(country.totalChanges)} changes</div>
        </div>
    `).join('');

    hideElement('emptyCountries');
    showElement('countryGrid');
}

/**
 * Filter countries by search term
 */
function filterCountries(searchTerm) {
    const term = searchTerm.toLowerCase().trim();

    if (!term) {
        renderCountries(allCountries);
        return;
    }

    const filtered = allCountries.filter(country =>
        country.name.toLowerCase().includes(term) ||
        country.code.toLowerCase().includes(term)
    );

    renderCountries(filtered);
}

/**
 * Load changelog for specific country
 */
async function loadCountryChangelog(countryCode) {
    try {
        // Update URL hash
        window.location.hash = countryCode;

        // Show detail view
        hideElement('countryListView');
        showElement('countryDetailView');

        showLoading('loadingChanges');
        hideElement('changesList');
        hideElement('emptyChanges');

        const changelog = await API.getCountryChangelog(countryCode);

        currentCountryData = changelog;

        // Update header
        document.getElementById('countryDetailName').textContent =
            `${getCountryFlag(countryCode)} ${changelog.country_name}`;
        document.getElementById('countryDetailCount').textContent =
            Utils.formatNumber(changelog.total_changes);

        // Reset filters
        document.getElementById('actionFilter').value = '';
        document.getElementById('entityFilter').value = '';
        document.getElementById('changeSearch').value = '';

        // Render changes
        filteredChanges = changelog.changes || [];
        renderChanges(filteredChanges);

        hideLoading('loadingChanges');

    } catch (error) {
        hideLoading('loadingChanges');
        handleError(error, `Failed to load changelog for ${countryCode}`);
        showCountryList();
    }
}

/**
 * Render changes list
 */
function renderChanges(changes) {
    const list = document.getElementById('changesList');
    if (!list) return;

    if (changes.length === 0) {
        hideElement('changesList');
        showElement('emptyChanges');
        return;
    }

    list.innerHTML = changes.map(change => `
        <div class="change-card ${change.action}">
            <div class="change-header">
                <div class="change-entity">
                    ${Utils.getEntityIcon(change.entity_type)}
                    ${change.entity?.name || 'Unknown'}
                </div>
                <span class="badge ${Utils.getActionBadgeClass(change.action)}">
                    ${change.action}
                </span>
            </div>
            <div class="change-meta">
                <span>📅 ${Utils.formatDate(change.timestamp)}</span>
                <span>👤 ${change.author}</span>
                <span>🔗 ${change.id}</span>
                <span>📦 ${change.entity_type}</span>
            </div>
            ${change.message ? `<div class="change-message">"${change.message}"</div>` : ''}
            ${renderChangeDetails(change)}
        </div>
    `).join('');

    hideElement('emptyChanges');
    showElement('changesList');
}

/**
 * Render change details section
 */
function renderChangeDetails(change) {
    if (!change.changes) return '';

    let details = '<div class="change-details">';

    if (change.action === 'add' && change.changes.added) {
        details += '<strong>Added:</strong><br>';
        details += `<pre>${Utils.prettyJSON(change.changes.added)}</pre>`;
    } else if (change.action === 'update') {
        if (change.changes.before && change.changes.after) {
            details += '<strong>Changes:</strong><br>';
            details += `<pre>${Utils.prettyJSON({ before: change.changes.before, after: change.changes.after })}</pre>`;
        }
    } else if (change.action === 'delete') {
        details += '<strong>Deleted:</strong> ID ' + (change.entity?.id || 'Unknown');
    }

    details += '</div>';
    return details;
}

/**
 * Apply filters to changes
 */
function applyFilters() {
    if (!currentCountryData) return;

    const actionFilter = document.getElementById('actionFilter').value;
    const entityFilter = document.getElementById('entityFilter').value;
    const searchTerm = document.getElementById('changeSearch').value.toLowerCase().trim();

    let filtered = currentCountryData.changes || [];

    // Action filter
    if (actionFilter) {
        filtered = filtered.filter(c => c.action === actionFilter);
    }

    // Entity filter
    if (entityFilter) {
        filtered = filtered.filter(c => c.entity_type === entityFilter);
    }

    // Search filter
    if (searchTerm) {
        filtered = filtered.filter(c =>
            (c.entity?.name && c.entity.name.toLowerCase().includes(searchTerm)) ||
            (c.message && c.message.toLowerCase().includes(searchTerm)) ||
            (c.author && c.author.toLowerCase().includes(searchTerm))
        );
    }

    filteredChanges = filtered;
    renderChanges(filteredChanges);
}

/**
 * Show country list view
 */
function showCountryList() {
    window.location.hash = '';
    hideElement('countryDetailView');
    showElement('countryListView');
    currentCountryData = null;
    filteredChanges = [];
}

/**
 * Get country name (helper)
 */
function getCountryName(code) {
    const names = {
        'US': 'United States',
        'IN': 'India',
        'GB': 'United Kingdom',
        'CA': 'Canada',
        'AU': 'Australia',
        'CN': 'China',
        'BR': 'Brazil',
        'MX': 'Mexico',
        'RU': 'Russia',
        'DE': 'Germany',
        'FR': 'France',
        'JP': 'Japan',
        // Add more as needed
    };
    return names[code] || code;
}

/**
 * Get country flag emoji (helper)
 */
function getCountryFlag(code) {
    if (!code || code.length !== 2) return '🌍';
    const offset = 127397;
    return String.fromCodePoint(...code.split('').map(c => c.charCodeAt(0) + offset));
}
