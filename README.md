# 📜 Countries States Cities - Changelog System

<div align="center">

[![Live Website](https://img.shields.io/badge/Live-changelog.countrystatecity.in-blue)](https://changelog.countrystatecity.in)
[![GitHub](https://img.shields.io/badge/GitHub-dr5hn%2Fcountries--states--cities--database-black)](https://github.com/dr5hn/countries-states-cities-database)
[![Changes](https://img.shields.io/badge/Changes-157%2C076-green)](https://changelog.countrystatecity.in/stats.html)

Complete change history tracking system for the [Countries States Cities Database](https://github.com/dr5hn/countries-states-cities-database).

[🌍 View Live](https://changelog.countrystatecity.in) • [📊 Statistics](https://changelog.countrystatecity.in/stats.html) • [📖 API Docs](#-api-access)

</div>

---

## 🌟 Overview

An automated changelog tracking system that monitors and documents every change made to the geographic database. The system analyzes git history to detect additions, updates, and deletions of countries, states, and cities, presenting them in an easy-to-browse format.

### Key Features

- 🔍 **Complete History**: Tracks all changes with full git commit details
- 🌍 **250 Countries**: Individual changelog files for each country
- 📊 **157,076+ Changes**: Comprehensive tracking since inception
- 🎯 **Action Detection**: Automatically identifies add/update/delete operations
- 🌐 **Interactive Website**: Browse changes via beautiful web interface
- 📦 **JSON API**: Programmatic access to all changelog data
- ⏱️ **24-Month Retention**: Configurable retention period with archival

## 🚀 Quick Start

### View Changelogs Online

Visit **[changelog.countrystatecity.in](https://changelog.countrystatecity.in)** to:
- Browse changes by country
- View timeline of all changes
- Explore statistics and analytics
- Download country-specific JSON files

### Generate Changelogs Locally

```bash
# Clone the repository
git clone https://github.com/dr5hn/csc-changelog.git
cd csc-changelog
```

## 📁 Project Structure

```
csc-changelog/
├── site/                      # 🌐 GitHub Pages website
│   ├── index.html            # Homepage
│   ├── browse.html           # Browse countries
│   ├── timeline.html         # Change timeline
│   ├── stats.html            # Statistics dashboard
│   ├── css/                  # Stylesheets
│   ├── js/                   # JavaScript
│   └── assets/               # Images & icons
│
├── changelogs/               # 📊 Generated changelog data
│   ├── global-changelog.json    # Recent global changes
│   ├── stats.json               # Summary statistics
│   ├── countries/               # Per-country JSON files
│   │   ├── US.json
│   │   ├── IN.json
│   │   └── ...
│   └── README.md                # Data documentation
│
├── README.md                 # This file
└── CNAME                     # Custom domain config
```

## 📊 Statistics

- **Total Changes**: 157,076
- **Countries Tracked**: 250
- **Cities Changes**: 151,701
- **States Changes**: 5,125
- **Countries Changes**: 250
- **Actions**: 156,688 additions, 388 deletions

## 🔗 API Access

### Download Country Changelogs

Each country has its own JSON file with complete change history:

```bash
# United States
curl https://raw.githubusercontent.com/dr5hn/csc-changelog/main/changelogs/countries/US.json

# India
curl https://raw.githubusercontent.com/dr5hn/csc-changelog/main/changelogs/countries/IN.json

# France
curl https://raw.githubusercontent.com/dr5hn/csc-changelog/main/changelogs/countries/FR.json
```

### JavaScript Example

```javascript
// Fetch US changelogs
fetch('https://raw.githubusercontent.com/dr5hn/csc-changelog/main/changelogs/countries/US.json')
  .then(response => response.json())
  .then(data => {
    console.log(`${data.country_name} has ${data.total_changes} changes`);
    data.changes.forEach(change => {
      console.log(`${change.action}: ${change.entity.name} (${change.timestamp})`);
    });
  });
```

### Python Example

```python
import requests

# Fetch global statistics
response = requests.get(
    'https://raw.githubusercontent.com/dr5hn/csc-changelog/main/changelogs/stats.json'
)
stats = response.json()
print(f"Total changes: {stats['summary']['total_changes']}")
```

## 📖 JSON Schema

Each country changelog file follows this structure:

```json
{
  "version": "1.0.0",
  "country_code": "US",
  "country_name": "United States",
  "last_updated": "2025-10-27T13:10:49Z",
  "total_changes": 19844,
  "changes": [
    {
      "id": "c7f3a92b",
      "timestamp": "2025-10-15T09:23:11Z",
      "commit_sha": "c7f3a92b4e8d9f2a1c5b6e7d8a9f0b1c2d3e4f5a",
      "author": "John Doe",
      "action": "add",
      "entity_type": "city",
      "entity": {
        "id": 12345,
        "name": "Springfield",
        "state_code": "IL",
        "country_code": "US"
      },
      "changes": {
        "added": {
          "name": "Springfield",
          "state_id": 14
        }
      },
      "message": "Add Springfield, Illinois"
    }
  ]
}
```

## 🛠️ How It Works

1. **Git Analysis**: Scans commit history from the main database repository
2. **JSON Diffing**: Analyzes changes in contributions files (cities, states, countries)
3. **Action Detection**: Automatically identifies add/update/delete operations
4. **Data Generation**: Creates per-country JSON files and global statistics
5. **Web Publishing**: Updates GitHub Pages website with latest changes
6. **Retention Management**: Archives changes older than configured retention period

## 🌐 Website Features

The interactive website at [changelog.countrystatecity.in](https://changelog.countrystatecity.in) provides:

- **Home**: Overview and quick stats
- **Browse**: Search and filter by country
- **Timeline**: Chronological view of all changes
- **Statistics**: Visual analytics and insights

## 🤝 Contributing

This is an automated system that generates changelogs from the main [Countries States Cities Database](https://github.com/dr5hn/countries-states-cities-database) repository.

To contribute data changes:
1. Visit the main repository
2. Edit files in the `contributions/` folder
3. Submit a pull request
4. Changelogs auto-update on merge

## 📝 License

This project follows the same license as the parent [Countries States Cities Database](https://github.com/dr5hn/countries-states-cities-database) repository.

## 🔗 Related Links

- [Main Database Repository](https://github.com/dr5hn/countries-states-cities-database)
- [Live Changelog Website](https://changelog.countrystatecity.in)
- [API Documentation](https://github.com/dr5hn/countries-states-cities-database#api)

---

<div align="center">
Made with ❤️ by <a href="https://github.com/dr5hn">@dr5hn</a>
</div>
