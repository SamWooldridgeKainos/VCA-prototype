// Victims autocomplete initializations
// Depends on: filter-data.js (FilterData), accessible-autocomplete library
// Depends on globals: searchFormSubmitted, window.saveFiltersToStorage, window.applyVictimFilters

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

var areaChipsContainer = document.getElementById('area-chips-container');

// Function to render area chips
function renderAreaChips() {
    if (!areaChipsContainer) return;
    areaChipsContainer.innerHTML = '';
    areaCheckboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            var label = checkbox.getAttribute('data-label') || checkbox.value;
            var li = document.createElement('li');
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'app-filter__tag';
            button.textContent = label;
            button.setAttribute('data-value', checkbox.value);
            button.addEventListener('click', function() {
                checkbox.checked = false;
                renderAreaChips();
                // Don't apply filters immediately - wait for Search button click
                searchFormSubmitted = false;
                window.saveFiltersToStorage();
            });
            li.appendChild(button);
            areaChipsContainer.appendChild(li);
        }
    });
}

// Initial render of chips
renderAreaChips();

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
        // Render chips
        renderAreaChips();
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

// Expose renderAreaChips globally for use by restore functions
window.renderAreaChips = renderAreaChips;
}

// Initialize accessible-autocomplete for Victim liaison officer filter
function initializeVloAutocomplete() {
var vlos = FilterData.vlos;

var container = document.querySelector('#vlo-autocomplete');
var vloCheckboxesContainer = document.getElementById('vlo-checkboxes-container');
var vloCheckboxes = document.querySelectorAll('.vlo-checkbox');

if (!container) {
    // Container not on this page - silently return
    return;
}

if (typeof accessibleAutocomplete === 'undefined') {
    console.error('accessibleAutocomplete library not loaded');
    return;
}

// Create source function that returns matching vlo labels
var sourceFunction = function(query, populateResults) {
    if (!query) {
    populateResults(vlos.map(function(o) { return o.label; }));
    } else {
    var filtered = vlos.filter(function(o) {
        return o.label.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    populateResults(filtered.map(function(o) { return o.label; }));
    }
};

var vloChipsContainer = document.getElementById('vlo-chips-container');

// Function to render VLO chips
function renderVloChips() {
    if (!vloChipsContainer) return;
    vloChipsContainer.innerHTML = '';
    vloCheckboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            var label = checkbox.getAttribute('data-label') || checkbox.value;
            var li = document.createElement('li');
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'app-filter__tag';
            button.textContent = label;
            button.setAttribute('data-value', checkbox.value);
            button.addEventListener('click', function() {
                checkbox.checked = false;
                renderVloChips();
                // Don't apply filters immediately - wait for Search button click
                searchFormSubmitted = false;
                window.saveFiltersToStorage();
            });
            li.appendChild(button);
            vloChipsContainer.appendChild(li);
        }
    });
}

// Initial render of chips
renderVloChips();

accessibleAutocomplete({
    element: container,
    id: 'vlo-autocomplete-input',
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
    var item = vlos.find(function (o) { 
        return o.label === selected || o.label === (selected.label || selected); 
    });
    if (item) {
        // Find and check the selected checkbox
        vloCheckboxes.forEach(function (checkbox) {
        if (checkbox.value === item.value) {
            checkbox.checked = true;
        }
        });
        // Render chips
        renderVloChips();
        // Clear the input field after selection
        var input = container.querySelector('input');
        if (input) input.value = '';
        // Don't apply filters immediately - wait for Search button click
        searchFormSubmitted = false;
        window.saveFiltersToStorage();
    }
    }
});

// Expose renderVloChips globally for use by restore functions
window.renderVloChips = renderVloChips;
}

// Initialize accessible-autocomplete for VLO-only form
function initializeVloOnlyAutocomplete() {
var vlos = FilterData.vlos;

var container = document.querySelector('#vlo-only-autocomplete');
var vloOnlyCheckboxesContainer = document.getElementById('vlo-only-checkboxes-container');
var vloOnlyCheckboxes = document.querySelectorAll('#vlo-only-checkboxes-container .vlo-checkbox');

if (!container) {
    console.error('VLO-only autocomplete container not found');
    return;
}

if (typeof accessibleAutocomplete === 'undefined') {
    console.error('accessibleAutocomplete library not loaded');
    return;
}

// Create source function that returns matching vlo labels
var sourceFunction = function(query, populateResults) {
    if (!query) {
    populateResults(vlos.map(function(o) { return o.label; }));
    } else {
    var filtered = vlos.filter(function(o) {
        return o.label.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    populateResults(filtered.map(function(o) { return o.label; }));
    }
};

var vloOnlyChipsContainer = document.getElementById('vlo-only-chips-container');

// Function to render VLO-only chips
function renderVloOnlyChips() {
    if (!vloOnlyChipsContainer) return;
    vloOnlyChipsContainer.innerHTML = '';
    vloOnlyCheckboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            var label = checkbox.getAttribute('data-label') || checkbox.value;
            var li = document.createElement('li');
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'app-filter__tag';
            button.textContent = label;
            button.setAttribute('data-value', checkbox.value);
            button.addEventListener('click', function() {
                checkbox.checked = false;
                renderVloOnlyChips();
                // Don't apply filters immediately - wait for Search button click
                searchFormSubmitted = false;
                window.saveFiltersToStorage();
                // Update clear link visibility
                if (window.updateClearVloOnlyFiltersVisibility) {
                    window.updateClearVloOnlyFiltersVisibility();
                }
            });
            li.appendChild(button);
            vloOnlyChipsContainer.appendChild(li);
        }
    });
}

// Initial render of chips
renderVloOnlyChips();

accessibleAutocomplete({
    element: container,
    id: 'vlo-only-autocomplete-input',
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
    var item = vlos.find(function (o) { 
        return o.label === selected || o.label === (selected.label || selected); 
    });
    if (item) {
        // Find and check the selected checkbox
        vloOnlyCheckboxes.forEach(function (checkbox) {
        if (checkbox.value === item.value) {
            checkbox.checked = true;
        }
        });
        // Render chips
        renderVloOnlyChips();
        // Clear the input field after selection
        var input = container.querySelector('input');
        if (input) input.value = '';
        // Don't apply filters immediately - wait for Search button click
        searchFormSubmitted = false;
        window.saveFiltersToStorage();
        // Update clear link visibility
        if (window.updateClearVloOnlyFiltersVisibility) {
            window.updateClearVloOnlyFiltersVisibility();
        }
    }
    }
});

// Set aria-labelledby to reference the legend
var vloOnlyAutocompleteInput = document.querySelector('#vlo-only-autocomplete-input');
if (vloOnlyAutocompleteInput) {
    vloOnlyAutocompleteInput.setAttribute('aria-labelledby', 'vlo-only-legend');
}

// Expose renderVloOnlyChips globally for use by restore functions
window.renderVloOnlyChips = renderVloOnlyChips;
}

// Initialize accessible-autocomplete for Service and Area VLO filter
function initializeServiceAreaVloAutocomplete() {
var vlos = FilterData.vlos;

var container = document.querySelector('#service-area-vlo-autocomplete');
var serviceAreaVloCheckboxesContainer = document.getElementById('service-area-vlo-checkboxes-container');
var serviceAreaVloCheckboxes = document.querySelectorAll('#service-area-vlo-checkboxes-container .service-area-vlo-checkbox');

if (!container) {
    // Container not on this page - silently return
    return;
}

if (typeof accessibleAutocomplete === 'undefined') {
    console.error('accessibleAutocomplete library not loaded');
    return;
}

// Create source function that returns matching vlo labels
var sourceFunction = function(query, populateResults) {
    if (!query) {
    populateResults(vlos.map(function(o) { return o.label; }));
    } else {
    var filtered = vlos.filter(function(o) {
        return o.label.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    populateResults(filtered.map(function(o) { return o.label; }));
    }
};

var serviceAreaVloChipsContainer = document.getElementById('service-area-vlo-chips-container');

// Function to render Service Area VLO chips
function renderServiceAreaVloChips() {
    if (!serviceAreaVloChipsContainer) return;
    serviceAreaVloChipsContainer.innerHTML = '';
    serviceAreaVloCheckboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            var label = checkbox.getAttribute('data-label') || checkbox.value;
            var li = document.createElement('li');
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'app-filter__tag';
            button.textContent = label;
            button.setAttribute('data-value', checkbox.value);
            button.addEventListener('click', function() {
                checkbox.checked = false;
                renderServiceAreaVloChips();
                // Don't apply filters immediately - wait for Search button click
                searchFormSubmitted = false;
                window.saveFiltersToStorage();
            });
            li.appendChild(button);
            serviceAreaVloChipsContainer.appendChild(li);
        }
    });
}

// Initial render of chips
renderServiceAreaVloChips();

accessibleAutocomplete({
    element: container,
    id: 'service-area-vlo-autocomplete-input',
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
    var item = vlos.find(function (o) { 
        return o.label === selected || o.label === (selected.label || selected); 
    });
    if (item) {
        // Find and check the selected checkbox
        serviceAreaVloCheckboxes.forEach(function (checkbox) {
        if (checkbox.value === item.value) {
            checkbox.checked = true;
        }
        });
        // Render chips
        renderServiceAreaVloChips();
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
var serviceAreaVloAutocompleteInput = document.querySelector('#service-area-vlo-autocomplete-input');
if (serviceAreaVloAutocompleteInput) {
    serviceAreaVloAutocompleteInput.setAttribute('aria-labelledby', 'service-area-vlo-legend');
}

// Expose renderServiceAreaVloChips globally for use by restore functions
window.renderServiceAreaVloChips = renderServiceAreaVloChips;
}

// Initialize accessible-autocomplete for Victim filter
function initializeVictimAutocomplete() {
var victims = FilterData.victims;

var container = document.querySelector('#victim-autocomplete');
var victimCheckboxesContainer = document.getElementById('victim-checkboxes-container');
var victimCheckboxes = document.querySelectorAll('.victim-checkbox');

if (!container) {
    // Container not on this page - silently return
    return;
}

if (typeof accessibleAutocomplete === 'undefined') {
    console.error('accessibleAutocomplete library not loaded');
    return;
}

// Create source function that returns matching victim labels
var sourceArray = victims.map(function(v) { return v.label; });

accessibleAutocomplete({
    element: container,
    id: 'victim-autocomplete-input',
    source: sourceArray,
    showAllValues: true,
    minLength: 0,
    confirmOnBlur: true,
    onConfirm: function (selected) {
    if (!selected) { 
        return; 
    }
    var item = victims.find(function (v) { 
        return v.label === selected || v.label === (selected.label || selected); 
    });
    if (item) {
        // Hide all unchecked victim checkboxes
        victimCheckboxes.forEach(function (checkbox) {
            if (checkbox.value !== item.value) {
                var parentItem = checkbox.closest('.govuk-checkboxes__item');
                if (parentItem) {
                    parentItem.style.display = 'none';
                }
            }
        });
        
        // Find and check the selected checkbox
        victimCheckboxes.forEach(function (checkbox) {
        if (checkbox.value === item.value) {
            checkbox.checked = true;
            // Show this checkbox's parent item
            var parentItem = checkbox.closest('.govuk-checkboxes__item');
            if (parentItem) {
            parentItem.style.display = 'flex';
            }
            victimCheckboxesContainer.style.display = '';
        }
        });
        // Clear the input field after selection
        var input = container.querySelector('input');
        if (input) input.value = '';
        // Apply filters immediately
        if (window.applyVictimFilters) window.applyVictimFilters();
    }
    }
});
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', function() {
    initializeAreaAutocomplete();
    initializeVloAutocomplete();
    initializeVloOnlyAutocomplete();
    initializeServiceAreaVloAutocomplete();
    initializeVictimAutocomplete();
});
} else {
initializeAreaAutocomplete();
initializeVloAutocomplete();
initializeVloOnlyAutocomplete();
initializeServiceAreaVloAutocomplete();
initializeVictimAutocomplete();
}

// Mark initial setup as complete after all initialization
initialSetupComplete = true;

// Add change event listener to area checkboxes to re-render chips
document.addEventListener('change', function(e) {
if (e.target && e.target.classList.contains('area-checkbox')) {
    if (window.renderAreaChips) window.renderAreaChips();
}
}, true);

// Add change event listener to vlo checkboxes to re-render chips
document.addEventListener('change', function(e) {
if (e.target && e.target.classList.contains('vlo-checkbox')) {
    if (window.renderVloChips) window.renderVloChips();
    if (window.renderVloOnlyChips) window.renderVloOnlyChips();
}
}, true);

// Add change event listener to service-area-vlo checkboxes to re-render chips
document.addEventListener('change', function(e) {
if (e.target && e.target.classList.contains('service-area-vlo-checkbox')) {
    if (window.renderServiceAreaVloChips) window.renderServiceAreaVloChips();
}
}, true);

// Add change event listener to victim checkboxes to hide when unchecked
document.addEventListener('change', function(e) {
if (e.target && e.target.classList.contains('victim-checkbox')) {
    var checkbox = e.target;
    var parentItem = checkbox.closest('.govuk-checkboxes__item');
    if (parentItem) {
    if (!checkbox.checked) {
        parentItem.style.display = 'none';
    }
    }
}
}, true);
