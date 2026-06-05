// Tasks autocomplete initializations
// Depends on: filter-data.js (FilterData), accessible-autocomplete library
// Depends on globals: searchFormSubmitted, initialSetupComplete, window.saveFiltersToStorage,
//   window.renderInlineChips, window.updateClearFiltersVisibility

// Initialize accessible-autocomplete for Area filter
function initializeAreaAutocomplete() {
var areas = FilterData.areas;

var container = document.querySelector('#area-autocomplete');
var areaCheckboxesContainer = document.getElementById('area-checkboxes-container');
var areaCheckboxes = document.querySelectorAll('.area-checkbox');

if (!container) {
    console.error('Area autocomplete container not found');
    return;
}

if (typeof accessibleAutocomplete === 'undefined') {
    console.error('accessibleAutocomplete library not loaded');
    return;
}

// Create source function that returns matching area labels
var sourceFunction = function(query, populateResults) {
    if (!query) {
    populateResults(areas.map(function(a) { return a.label; }));
    } else {
    var filtered = areas.filter(function(a) {
        return a.label.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    populateResults(filtered.map(function(a) { return a.label; }));
    }
};

accessibleAutocomplete({
    element: container,
    id: 'area-autocomplete-input',
    source: sourceFunction,
    showAllValues: true,
    minLength: 0,
    confirmOnBlur: true,
    templates: {
    inputValue: function(result) {
        return '';
    },
    suggestion: function(result) {
        return result ? result.label || result : '';
    }
    },
    onConfirm: function (selected) {
    if (!selected) { 
        return; 
    }
    var item = areas.find(function (a) { 
        return a.label === selected || a.label === (selected.label || selected); 
    });
    if (item) {
        // Find and check the selected checkbox
        areaCheckboxes.forEach(function (checkbox) {
        if (checkbox.value === item.value) {
            checkbox.checked = true;
        }
        });
        // Render inline chips
        if (window.renderInlineChips) window.renderInlineChips();
        if (window.updateClearFiltersVisibility) window.updateClearFiltersVisibility();
        // Clear the input field after selection
        var input = container.querySelector('input');
        if (input) input.value = '';
        // Don't apply filters immediately - wait for Search button click
        searchFormSubmitted = false;
        window.saveFiltersToStorage();
    }
    }
});

// Set aria-labelledby to reference the legend
var areaAutocompleteInput = document.querySelector('#area-autocomplete-input');
if (areaAutocompleteInput) {
    areaAutocompleteInput.setAttribute('aria-labelledby', 'area-legend');
}
}

// Initialize accessible-autocomplete for task assignee (Victim Liaison Officer) filter
function initializeTaskAssigneeAutocomplete() {
var assignees = FilterData.vlos;

var container = document.querySelector('#assignee-autocomplete');
var taskAssigneeCheckboxesContainer = document.getElementById('task-assignee-checkboxes-container');
var taskAssigneeCheckboxes = document.querySelectorAll('.task-assignee-checkbox');

if (!container) {
    console.error('Task assignee autocomplete container not found');
    return;
}

if (typeof accessibleAutocomplete === 'undefined') {
    console.error('accessibleAutocomplete library not loaded');
    return;
}

// Create source function that returns matching task assignee labels
var sourceFunction = function(query, populateResults) {
    if (!query) {
    populateResults(assignees.map(function(o) { return o.label; }));
    } else {
    var filtered = assignees.filter(function(o) {
        return o.label.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    populateResults(filtered.map(function(o) { return o.label; }));
    }
};

accessibleAutocomplete({
    element: container,
    id: 'assignee-autocomplete-input',
    source: sourceFunction,
    showAllValues: true,
    minLength: 0,
    confirmOnBlur: true,
    templates: {
    inputValue: function(result) {
        return '';
    },
    suggestion: function(result) {
        return result ? result.label || result : '';
    }
    },
    onConfirm: function (selected) {
    if (!selected) { 
        return; 
    }
    var item = assignees.find(function (o) { 
        return o.label === selected || o.label === (selected.label || selected); 
    });
    if (item) {
        // Find and check the selected checkbox
        taskAssigneeCheckboxes.forEach(function (checkbox) {
        if (checkbox.value === item.value) {
            checkbox.checked = true;
        }
        });
        // Render inline chips
        if (window.renderInlineChips) window.renderInlineChips();
        if (window.updateClearFiltersVisibility) window.updateClearFiltersVisibility();
        // Clear the input field after selection
        var input = container.querySelector('input');
        if (input) input.value = '';
        // Don't apply filters immediately - wait for Search button click
        searchFormSubmitted = false;
        window.saveFiltersToStorage();
    }
    }
});

// Set aria-labelledby to reference the legend
var autocompleteInput = document.querySelector('#assignee-autocomplete-input');
if (autocompleteInput) {
    autocompleteInput.setAttribute('aria-labelledby', 'task-assignee-legend');
}
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', function() {
    initializeAreaAutocomplete();
    initializeTaskAssigneeAutocomplete();
});
} else {
initializeAreaAutocomplete();
initializeTaskAssigneeAutocomplete();
}

// Add change event listener to area checkboxes to update chips
document.addEventListener('change', function(e) {
if (e.target && e.target.classList.contains('area-checkbox')) {
    if (window.renderInlineChips) window.renderInlineChips();
    if (window.updateClearFiltersVisibility) window.updateClearFiltersVisibility();
    // Don't apply filters immediately - wait for Search button click
    if (initialSetupComplete) {
        searchFormSubmitted = false;
    }
    window.saveFiltersToStorage();
}
}, true);

// Add change event listener to task-assignee checkboxes to update chips
document.addEventListener('change', function(e) {
if (e.target && e.target.classList.contains('task-assignee-checkbox')) {
    if (window.renderInlineChips) window.renderInlineChips();
    if (window.updateClearFiltersVisibility) window.updateClearFiltersVisibility();
    // Don't apply filters immediately - wait for Search button click
    if (initialSetupComplete) {
        searchFormSubmitted = false;
    }
    window.saveFiltersToStorage();
}
}, true);

// Add change event listener to service radios to update visibility
document.addEventListener('change', function(e) {
if (e.target && e.target.classList.contains('service-radio')) {
    if (window.updateClearFiltersVisibility) window.updateClearFiltersVisibility();
    // Don't apply filters immediately - wait for Search button click
    if (initialSetupComplete) {
        searchFormSubmitted = false;
    }
    window.saveFiltersToStorage();
}
}, true);
