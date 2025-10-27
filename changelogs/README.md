# Data Changelogs

Generated changelog files tracking all data changes in the world.sql database.

## Overview

- **Version:** 1.0.0
- **Generated:** 2025-10-27T13:10:49Z
- **Retention Period:** 24 months (configurable)
- **Format:** Minified JSON with standard field names

## Structure

```
changelogs/
├── countries/          # Per-country changelog files
│   ├── US.json        # United States changes
│   ├── IN.json        # India changes
│   └── ...
├── archives/          # Archived changes (older than retention period)
│   ├── 2023/
│   └── 2024/
├── global-changelog.json  # Recent changes across all countries
├── stats.json         # Statistics and summary
└── README.md          # This file
```

## JSON Schema

### Per-Country Changelog

```json
{
  "version": "1.0.0",
  "country_code": "US",
  "country_name": "United States",
  "last_updated": "2025-10-26T12:34:56Z",
  "total_changes": 145,
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

### Field Definitions

- `id`: Short change identifier (8-char SHA)
- `timestamp`: ISO 8601 timestamp
- `commit_sha`: Full git commit SHA
- `author`: Commit author name
- `action`: Type of change (`add`, `update`, `delete`)
- `entity_type`: Entity type (`city`, `state`, `country`)
- `entity`: Entity data
- `changes`: Specific changes made (added/before/after)
- `message`: Commit message

## Usage

### View Changelog Online

Visit: https://changelog.countrystatecity.in

### Download Specific Country

```bash
curl https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/changelogs-data/changelogs/countries/US.json
```

### Load in JavaScript

```javascript
fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/changelogs-data/changelogs/countries/US.json')
  .then(r => r.json())
  .then(data => console.log(data));
```

## Statistics

- **Total Changes:** 157,076
- **Countries:** 250
- **Actions:** {'delete': 388, 'add': 156688}
- **Entities:** {'city': 151701, 'state': 5125, 'country': 250}

## Retention Policy

- **Active Changes:** Last 24 months in main files
- **Archived Changes:** Older changes in `archives/` directory (organized by year)
- **Storage:** Hosted in separate `changelogs-data` branch to keep main branch clean

## Contributing

Changes are automatically generated from git history. To contribute data changes:

1. Edit `contributions/` JSON files
2. Submit pull request
3. Changelogs auto-update on merge

## License

Same as parent repository.
