// Initialize GOV.UK radios module for conditional reveal
if (window.GOVUKFrontend && window.GOVUKFrontend.Radios) {
var radios = new GOVUKFrontend.Radios(document.querySelector('[data-module="govuk-radios"]'));
}

// Handle VLO filter chips
(function () {
var vloCheckboxes = document.querySelectorAll('.vlo-checkbox');
var areaCheckboxes = document.querySelectorAll('.area-checkbox');
var serviceCheckboxes = document.querySelectorAll('.service-checkbox');
var victimCategoryCheckboxes = document.querySelectorAll('.victim-category-checkbox');
var onboardedCheckboxes = document.querySelectorAll('.onboarded-checkbox');
var selectedFiltersChips = document.getElementById('selected-filters-chips');
var clearFiltersWrapper = document.getElementById('clear-filters-wrapper');

// Render chips
function renderChips() {
    selectedFiltersChips.innerHTML = '';
    
    // Helper function to add heading and render chips for a category
    function renderChipCategory(checkboxes, heading) {
    var checkedItems = Array.from(checkboxes).filter(function(cb) { return cb.checked; });
    if (checkedItems.length > 0) {
        var h3 = document.createElement('h3');
        h3.className = 'govuk-heading-s govuk-!-margin-top-3';
        h3.style.marginBottom = '8px';
        h3.textContent = heading;
        selectedFiltersChips.appendChild(h3);
        
        checkedItems.forEach(function(checkbox) {
        createChip(checkbox);
        });
    }
    }
    
    // Render assignee chips
    renderChipCategory(vloCheckboxes, 'Assignee');
    
    // Render area chips
    renderChipCategory(areaCheckboxes, 'Area');
    
    // Render service chips
    renderChipCategory(serviceCheckboxes, 'Service');
    
    // Render victim category chips
    renderChipCategory(victimCategoryCheckboxes, 'Victim category');
    
    // Render onboarded chips
    renderChipCategory(onboardedCheckboxes, 'Onboarded');
    
    updateClearFiltersVisibility();
}

// Create a chip element
function createChip(checkbox) {
    var chip = document.createElement('div');
    chip.className = 'moj-filter-tags__tag';
    chip.style.cssText = 'display: flex; align-items: baseline; background-color: #ffffff; color: #0b0c0c; padding: 5px 10px; margin-right: 5px; margin-bottom: 8px; border: 1px solid #0b0c0c; border-radius: 0;';
    
    var chipText = document.createElement('span');
    chipText.className = 'govuk-body govuk-!-margin-0';
    var label = checkbox.getAttribute('data-label');
    
    chipText.textContent = label;
    
    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.setAttribute('aria-label', 'Remove ' + checkbox.getAttribute('data-label') + ' filter');
    removeBtn.style.cssText = 'background: none; border: none; padding: 0 4px; margin-left: auto; cursor: pointer; color: #0b0c0c; font-weight: normal; font-size: 24px; line-height: 0.8; flex-shrink: 0;';
    removeBtn.textContent = '×';
    
    removeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    checkbox.checked = false;
    renderChips();
    updateClearFiltersVisibility();
    });
    
    chip.appendChild(chipText);
    chip.appendChild(removeBtn);
    selectedFiltersChips.appendChild(chip);
}

// Update visibility of clear filters link
function updateClearFiltersVisibility() {
    var hasCheckedFilters = Array.from(vloCheckboxes).some(function (checkbox) {
    return checkbox.checked;
    }) || Array.from(areaCheckboxes).some(function (checkbox) {
    return checkbox.checked;
    }) || Array.from(serviceCheckboxes).some(function (checkbox) {
    return checkbox.checked;
    }) || Array.from(victimCategoryCheckboxes).some(function (checkbox) {
    return checkbox.checked;
    }) || Array.from(onboardedCheckboxes).some(function (checkbox) {
    return checkbox.checked;
    });
    clearFiltersWrapper.style.display = hasCheckedFilters ? '' : 'none';
    
    // Update heading text
    var heading = document.getElementById('selected-filters-heading');
    heading.textContent = hasCheckedFilters ? 'Selected filters' : 'No filters selected';
}

// Add click handler to Clear filters link
var clearFiltersLink = document.querySelector('#clear-filters-wrapper a');
if (clearFiltersLink) {
    clearFiltersLink.addEventListener('click', function (e) {
    e.preventDefault();
    vloCheckboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });
    areaCheckboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });
    serviceCheckboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });
    victimCategoryCheckboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });
    onboardedCheckboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });
    renderChips();
    });
}

// Render chips on page load
renderChips();

// Show checked vlo items on page load
vloCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
    var parentItem = checkbox.closest('.govuk-checkboxes__item');
    if (parentItem) {
        parentItem.style.display = 'flex';
    }
    }
});

// Show the vlo checkboxes container if there are checked items
var vloCheckboxesContainer = document.getElementById('vlo-checkboxes-container');
if (Array.from(vloCheckboxes).some(function (cb) { return cb.checked; })) {
    vloCheckboxesContainer.style.display = '';
}
// Filter vlo list based on autocomplete (now handled by initializeVloAutocomplete)
// Old search input listener removed - autocomplete handles this now
})();;

// Initialize accessible-autocomplete for Area filter
function initializeAreaAutocomplete() {
var areas = [
    { label: 'Avon and Somerset', value: 'avon-somerset' },
    { label: 'Bedfordshire', value: 'bedfordshire' },
    { label: 'Cambridgeshire', value: 'cambridgeshire' },
    { label: 'Cheshire', value: 'cheshire' },
    { label: 'Cleveland', value: 'cleveland' },
    { label: 'Cumbria', value: 'cumbria' },
    { label: 'Devon and Cornwall', value: 'devon-cornwall' },
    { label: 'Durham', value: 'durham' },
    { label: 'Dyfed Powys', value: 'dyfed-powys' },
    { label: 'Essex', value: 'essex' },
    { label: 'Gloucestershire', value: 'gloucestershire' },
    { label: 'Greater Manchester', value: 'greater-manchester' },
    { label: 'Gwent', value: 'gwent' },
    { label: 'Hampshire and Isle of Wight', value: 'hampshire-iow' },
    { label: 'Hertfordshire', value: 'hertfordshire' },
    { label: 'HMCPSI', value: 'hmcpsi' },
    { label: 'Humberside', value: 'humberside' },
    { label: 'Kent', value: 'kent' },
    { label: 'Lancashire', value: 'lancashire' },
    { label: 'Leatherhead', value: 'leatherhead' },
    { label: 'Leicestershire', value: 'leicestershire' },
    { label: 'Lincolnshire', value: 'lincolnshire' },
    { label: 'London', value: 'london' },
    { label: 'Merseyside', value: 'merseyside' },
    { label: 'Norfolk', value: 'norfolk' },
    { label: 'North Wales', value: 'north-wales' },
    { label: 'North Yorkshire', value: 'north-yorkshire' },
    { label: 'Northamptonshire', value: 'northamptonshire' },
    { label: 'Northumbria', value: 'northumbria' },
    { label: 'Nottinghamshire', value: 'nottinghamshire' },
    { label: 'Records Management Unit area', value: 'rmu-area' },
    { label: 'South Wales', value: 'south-wales' },
    { label: 'South Yorkshire', value: 'south-yorkshire' },
    { label: 'Stafford', value: 'stafford' },
    { label: 'Suffolk', value: 'suffolk' },
    { label: 'Surrey', value: 'surrey' },
    { label: 'Sussex', value: 'sussex' },
    { label: 'Thames Valley', value: 'thames-valley' },
    { label: 'Warwickshire', value: 'warwickshire' },
    { label: 'West Mercia', value: 'west-mercia' },
    { label: 'West Midlands', value: 'west-midlands' },
    { label: 'West Yorkshire', value: 'west-yorkshire' },
    { label: 'Wiltshire', value: 'wiltshire' }
];

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
            // Show this checkbox's parent item
            var parentItem = checkbox.closest('.govuk-checkboxes__item');
            if (parentItem) {
            parentItem.style.display = 'flex';
            }
            areaCheckboxesContainer.style.display = '';
        }
        });
        // Clear the input field after selection
        var input = container.querySelector('input');
        if (input) input.value = '';
    }
    }
});
}

// Initialize accessible-autocomplete for assignee (Victim Liaison Officer) filter
function initializeVloAutocomplete() {
var vlos = [
    { label: 'THOMPSON, Sarah (you)', value: 'thompson-sarah' },
    { label: 'Unassigned', value: 'unassigned' },
    { label: 'KUMAR, Priya', value: 'kumar-priya' },
    { label: 'BISHOP, James', value: 'bishop-james' },
    { label: 'MORRISON, Claire', value: 'morrison-claire' },
    { label: 'HAYES, Michael', value: 'hayes-michael' },
    { label: 'ANDERSON, David', value: 'anderson-david' },
    { label: 'WRIGHT, Hannah', value: 'wright-hannah' },
    { label: 'MARTINEZ, Carlos', value: 'martinez-carlos' },
    { label: 'JOHNSON, Patricia', value: 'johnson-patricia' },
    { label: 'CHEN, Michael', value: 'chen-michael' },
    { label: 'PATEL, Ravi', value: 'patel-ravi' },
    { label: 'O\'CONNELL, Siobhan', value: 'oconnell-siobhan' },
    { label: 'THOMPSON, Robert', value: 'thompson-robert' },
    { label: 'GARCÍA, Luis', value: 'garcía-luis' },
    { label: 'HENDERSON, Louise', value: 'henderson-louise' },
    { label: 'WILLIAMS, Anna', value: 'williams-anna' },
    { label: 'STEWART, James', value: 'stewart-james' },
    { label: 'LEWIS, Elizabeth', value: 'lewis-elizabeth' },
    { label: 'WALKER, George', value: 'walker-george' },
    { label: 'CLARK, Victoria', value: 'clark-victoria' }
];

var container = document.querySelector('#assignee-autocomplete');
var vloCheckboxesContainer = document.getElementById('vlo-checkboxes-container');
var vloCheckboxes = document.querySelectorAll('.vlo-checkbox');

if (!container) {
    console.error('Assignee autocomplete container not found');
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
    var item = vlos.find(function (o) { 
        return o.label === selected || o.label === (selected.label || selected); 
    });
    if (item) {
        // Find and check the selected checkbox
        vloCheckboxes.forEach(function (checkbox) {
        if (checkbox.value === item.value) {
            checkbox.checked = true;
            // Show this checkbox's parent item
            var parentItem = checkbox.closest('.govuk-checkboxes__item');
            if (parentItem) {
            parentItem.style.display = 'flex';
            }
            vloCheckboxesContainer.style.display = '';
        }
        });
        // Clear the input field after selection
        var input = container.querySelector('input');
        if (input) input.value = '';
    }
    }
});
}

// Initialize accessible-autocomplete for VLO filter
function initializeVloAutocomplete() {
console.log('initializeVloAutocomplete called');
var vlos = [
    { label: 'THOMPSON, Sarah (you)', value: 'thompson-sarah' },
    { label: 'Unassigned', value: 'unassigned' },
    { label: 'KUMAR, Priya', value: 'kumar-priya' },
    { label: 'BISHOP, James', value: 'bishop-james' },
    { label: 'MORRISON, Claire', value: 'morrison-claire' },
    { label: 'HAYES, Michael', value: 'hayes-michael' },
    { label: 'ANDERSON, David', value: 'anderson-david' },
    { label: 'WRIGHT, Hannah', value: 'wright-hannah' },
    { label: 'MARTINEZ, Carlos', value: 'martinez-carlos' },
    { label: 'JOHNSON, Patricia', value: 'johnson-patricia' },
    { label: 'CHEN, Michael', value: 'chen-michael' },
    { label: 'PATEL, Ravi', value: 'patel-ravi' },
    { label: 'O\'CONNELL, Siobhan', value: 'oconnell-siobhan' },
    { label: 'THOMPSON, Robert', value: 'thompson-robert' },
    { label: 'GARCÍA, Luis', value: 'garcía-luis' },
    { label: 'HENDERSON, Louise', value: 'henderson-louise' },
    { label: 'WILLIAMS, Anna', value: 'williams-anna' },
    { label: 'STEWART, James', value: 'stewart-james' },
    { label: 'LEWIS, Elizabeth', value: 'lewis-elizabeth' },
    { label: 'WALKER, George', value: 'walker-george' },
    { label: 'CLARK, Victoria', value: 'clark-victoria' }
];

var container = document.querySelector('#vlo-autocomplete');
var vloCheckboxesContainer = document.getElementById('vlo-checkboxes-container');
var vloCheckboxes = document.querySelectorAll('.vlo-checkbox');

console.log('VLO container:', container);
console.log('VLO checkboxes found:', vloCheckboxes.length);

if (!container) {
    console.error('VLO autocomplete container not found');
    return;
}

if (typeof accessibleAutocomplete === 'undefined') {
    console.error('accessibleAutocomplete library not loaded');
    return;
}

console.log('Initializing VLO accessible-autocomplete');

// Create source function that returns matching VLO labels
var sourceFunction = function(query, populateResults) {
    if (!query) {
    populateResults(vlos.map(function(v) { return v.label; }));
    } else {
    var filtered = vlos.filter(function(v) {
        return v.label.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    populateResults(filtered.map(function(v) { return v.label; }));
    }
};

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
    var item = vlos.find(function (v) { 
        return v.label === selected || v.label === (selected.label || selected); 
    });
    if (item) {
        // Find and check the selected checkbox
        vloCheckboxes.forEach(function (checkbox) {
        if (checkbox.value === item.value) {
            checkbox.checked = true;
            // Show this checkbox's parent item
            var parentItem = checkbox.closest('.govuk-checkboxes__item');
            if (parentItem) {
            parentItem.style.display = 'flex';
            }
            vloCheckboxesContainer.style.display = '';
        }
        });
        // Clear the input field after selection
        var input = container.querySelector('input');
        if (input) input.value = '';
    }
    }
});
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', function() {
    initializeAreaAutocomplete();
    initializeVloAutocomplete();
});
} else {
initializeAreaAutocomplete();
initializeVloAutocomplete();
}

// Add change event listener to area checkboxes to hide when unchecked
document.addEventListener('change', function(e) {
if (e.target && e.target.classList.contains('area-checkbox')) {
    var checkbox = e.target;
    var parentItem = checkbox.closest('.govuk-checkboxes__item');
    if (parentItem) {
    if (!checkbox.checked) {
        parentItem.style.display = 'none';
    }
    }
}
}, true);

// Add change event listener to vlo checkboxes to hide when unchecked
document.addEventListener('change', function(e) {
if (e.target && e.target.classList.contains('vlo-checkbox')) {
    var checkbox = e.target;
    var parentItem = checkbox.closest('.govuk-checkboxes__item');
    if (parentItem) {
    if (!checkbox.checked) {
        parentItem.style.display = 'none';
    }
    }
}
}, true);

(function () {
var assignees = [
    { label: 'Amanda Smith', value: 'amanda-smith' },
    { label: 'Benjamin Taylor', value: 'benjamin-taylor' },
    { label: 'Catherine Johnson', value: 'catherine-johnson' },
    { label: 'David Brown', value: 'david-brown' },
    { label: 'Emma Wilson', value: 'emma-wilson' }
];

var container = document.querySelector('#assignee-name-autocomplete');
var hidden = document.getElementById('assignee-name');

if (container && typeof accessibleAutocomplete !== 'undefined') {
    accessibleAutocomplete({
    element: container,
    id: 'assignee-name-autocomplete-input',
    source: assignees.map(function (a) { return a.label; }),
    showAllValues: true,
    minLength: 0,
    confirmOnBlur: true,
    onConfirm: function (selected) {
        if (!selected) { 
        hidden.value = ''; 
        return; 
        }
        var item = assignees.find(function (a) { return a.label === selected; });
        if (item) {
        hidden.value = item.value;
        var input = container.querySelector('input');
        if (input) input.value = item.label;
        } else {
        hidden.value = selected;
        }
    }
    });
}
})();