# VCA Prototype - Copilot Instructions

## Project Overview
**VCA (Victim Case Application)** is a GOV.UK prototype kit application for managing victim case workflows. It demonstrates the Witness and Victim Advocate (WAT2) service, supporting tasks like case onboarding, victim communication, and case documentation.

### Tech Stack
- **Framework**: GOV.UK Prototype Kit v13.18.1 (Express-based)
- **Frontend**: GOV.UK Frontend v5.13, MOJ Frontend v7.1, DWP Frontend v3.4
- **Testing**: Playwright (E2E)
- **Styling**: SCSS compiled from `app/assets/sass/`
- **Build**: `npm run dev` (dev server) | `npm run serve` (static) | `npm test` (Playwright)

## Architecture & Key Concepts

### Multi-Service Routing Pattern
Routes are organized by **service type** and **workflow journey**:
```
app/routes/
  ├── ur/ (Universal Referral) + delivery/
  │   ├── pcd/ (Pre-Conviction Documents)
  │   ├── vcl/ (Victim Communication Letter)
  │   ├── wat/ (Witness and Victim Advocate)
  │   │   ├── onb/ (Onboarding)
  │   │   ├── pcd/
  │   │   └── vcl/
  │   └── nfa/ (No Further Action)
  └── wat2/ (Enhanced WAT service - NEW FOCUS)
```
Each route file (e.g., `delivery/wat2.js`) exports a router function accepting the main router instance.

### View Organization
- **Layouts**: Base templates in `app/views/layouts/main.html`
- **Service paths**: `app/views/delivery/wat2/` mirrors route paths for clarity
- **Partials**: Reusable components in `partials/` subdirs (headers, footers, forms)
- **Nunjucks templating**: Uses `{% extends %}`, `{% include %}`, `{% set %}`

### Session Data & Form Handling
- Session data stored in `request.session.data` (injected by kit)
- Forms POST to routes that redirect with query params for UI state
- Common pattern: Redirect with `?successNotification=yes` or `?pcdStatus=draft-in-progress`

## Critical Patterns

### Filter & Search Implementation (Victims Page)
The **victims.html** page demonstrates sophisticated client-side filtering:
- **Immediate filters**: Owner, Victim, Victim Category (apply on checkbox change)
- **Search criteria**: Service, Area (apply only after form submission)
- **Accessible Autocomplete**: Integration at `initializeOwnerAutocomplete()`, `initializeAreaAutocomplete()`
- **Dynamic chips display**: `renderChips()` creates filter tags with remove buttons
- **Pagination**: 5 results per page with dynamic recalculation based on filtered results

**Key files**:
- [app/assets/javascripts/delivery/wat2/victims.js](app/assets/javascripts/delivery/wat2/victims.js) - Filter logic (~850 lines)
- [app/views/delivery/wat2/victims.html](app/views/delivery/wat2/victims.html) - Markup structure
- [app/assets/sass/patterns/_pagination.scss](app/assets/sass/patterns/_pagination.scss) - Pagination styling

### Form Data Extraction from Summary Lists
Repeated pattern in JavaScript - extract field values from GOV.UK summary lists:
```javascript
function getFieldValue(fieldName) {
    var rows = record.querySelectorAll('.govuk-summary-list__row');
    for (var i = 0; i < rows.length; i++) {
        var keyEl = rows[i].querySelector('.govuk-summary-list__key');
        if (keyEl && keyEl.textContent.trim() === fieldName) {
            var valueEl = rows[i].querySelector('.govuk-summary-list__value');
            return valueEl ? valueEl.textContent.trim() : '';
        }
    }
    return '';
}
```
Use this when filtering or validating data from victim records.

### Conditional Row Visibility
Hide/show summary list rows based on conditions (e.g., hide "Owner" when "Onboarded = No"):
```javascript
function hideServiceRowWhenOnboardedNo() {
    var rows = record.querySelectorAll('.govuk-summary-list__row');
    rows.forEach(function(row) {
        var keyEl = row.querySelector('.govuk-summary-list__key');
        if (keyEl && keyEl.textContent.trim() === 'Owner') {
            row.style.display = onboardedStatus === 'no' ? 'none' : '';
        }
    });
}
```

## Testing & Validation

### Playwright Tests
Tests in [tests/prototype.spec.ts](tests/prototype.spec.ts) focus on:
- Screenshot validation of key pages (routing structure)
- Expanding all `<details>` and accordion elements before capture
- 1280x720 viewport for consistent visual regression

**Commands**:
```bash
npm test                          # Run all Playwright tests
npm run dev                       # Start dev server (required before tests)
npx playwright show               # Open Playwright Inspector
```

Tests use GOV.UK markup conventions - ensure `.govuk-template` and accessibility patterns are preserved.

## Development Workflow

### Adding a New Victims Filter
1. **HTML**: Add checkbox in `app/views/delivery/wat2/victims.html` with class `{filter-type}-checkbox` and `data-label`
2. **JavaScript**: 
   - Add to appropriate group in `victims.js` (e.g., `victimCategoryCheckboxes`)
   - Update `applyVictimFilters()` to check the new filter
   - Update `renderChips()` to display selections
3. **Test**: Use `npm test` to verify page renders correctly

### Modifying Routes
- Post routes redirect with success params: `/delivery/wat2/victims?success=yes&successReason=owner-updated`
- Always include a redirect target - the prototype kit watches for missing handlers
- Session data persists across redirects - use strategically

### Styling New Components
- Add SCSS to `app/assets/sass/patterns/{component-name}.scss`
- Import in `app/assets/sass/application.scss`
- Follow GOV.UK Design System margin/padding utilities: `govuk-!-margin-bottom-3`

## Common Gotchas

1. **Autocomplete + Filter Conflict**: When using accessible-autocomplete with hidden checkboxes, ensure `onConfirm()` explicitly shows the parent item: `parentItem.style.display = 'flex'`
2. **Pagination Recalculation**: Call `window.recalculatePagination()` after hiding/showing records
3. **Query String State**: UI state (success messages, pagination) lives in URL - parse with `new URLSearchParams(window.location.search)`
4. **Event Delegation**: Use document-level listeners for dynamically created checkboxes; avoid attaching to elements that get removed

## Key Files Reference
- **Routes entry**: [app/routes.js](app/routes.js) - Requires all service routes
- **WAT2 logic**: [app/routes/delivery/wat2.js](app/routes/delivery/wat2.js) (387 lines - main business logic)
- **Filter patterns**: [app/assets/javascripts/delivery/wat2/victims.js](app/assets/javascripts/delivery/wat2/victims.js) - Gold standard for complex filtering
- **Config**: [app/config.json](app/config.json) - Service name, plugin settings
- **Main layout**: [app/views/layouts/main.html](app/views/layouts/main.html) - Base template
