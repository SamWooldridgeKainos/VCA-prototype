// Initialize GOV.UK radios module for conditional reveal
if (window.GOVUKFrontend && window.GOVUKFrontend.Radios) {
var radios = new GOVUKFrontend.Radios(document.querySelector('[data-module="govuk-radios"]'));
}

// Track whether search form has been submitted
var searchFormSubmitted = false;

// Track whether initial page setup is complete
var initialSetupComplete = false;

// ===== localStorage Persistence for Tasks Filters =====
// Store and restore filter settings when navigating away and returning
(function() {
    var STORAGE_KEY = 'vca-tasks-filters';
    
    // Function to save all filter states to localStorage
    function saveFiltersToStorage() {
        var state = {
            taskAssigneeChecked: [],
            areaChecked: [],
            serviceChecked: [],
            searchFormSubmitted: searchFormSubmitted,
            taskAssigneeInput: document.querySelector('#assignee-autocomplete-input') ? document.querySelector('#assignee-autocomplete-input').value : '',
            areaInput: document.querySelector('#area-autocomplete-input') ? document.querySelector('#area-autocomplete-input').value : ''
        };
        
        // Collect checked Task Assignee checkboxes
        document.querySelectorAll('.task-assignee-checkbox').forEach(function(cb) {
            if (cb.checked) {
                state.taskAssigneeChecked.push(cb.id);
            }
        });
        
        // Collect checked Area checkboxes
        document.querySelectorAll('.area-checkbox').forEach(function(cb) {
            if (cb.checked) {
                state.areaChecked.push(cb.id);
            }
        });
        
        // Collect checked Service radios
        document.querySelectorAll('.service-radio').forEach(function(radio) {
            if (radio.checked) {
                state.serviceChecked.push(radio.id);
            }
        });
        
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('Failed to save filters to localStorage:', e);
        }
    }
    
    // Function to restore filters from localStorage
    function restoreFiltersFromStorage() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return false;
            
            var state = JSON.parse(saved);
            
            // Restore Task Assignee checkboxes
            if (state.taskAssigneeChecked) {
                state.taskAssigneeChecked.forEach(function(id) {
                    var checkbox = document.getElementById(id);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }
            
            // Restore Area checkboxes
            if (state.areaChecked) {
                state.areaChecked.forEach(function(id) {
                    var checkbox = document.getElementById(id);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }
            
            // Restore Service radios
            if (state.serviceChecked) {
                state.serviceChecked.forEach(function(id) {
                    var radio = document.getElementById(id);
                    if (radio) {
                        radio.checked = true;
                    }
                });
            }
            
            // Restore search form submitted state
            searchFormSubmitted = state.searchFormSubmitted || false;
            
            // Return true because we had saved state to restore from
            return true;
        } catch (e) {
            console.warn('Failed to restore filters from localStorage:', e);
            return false;
        }
    }
    
    // Make functions available globally for use throughout the script
    window.saveFiltersToStorage = saveFiltersToStorage;
    window.restoreFiltersFromStorage = restoreFiltersFromStorage;
})();

// Handle Task filter chips
(function () {
var taskAssigneeCheckboxes = document.querySelectorAll('.task-assignee-checkbox');
var areaCheckboxes = document.querySelectorAll('.area-checkbox');
var serviceRadios = document.querySelectorAll('.service-radio');
var clearFiltersWrapper = document.getElementById('clear-filters-wrapper');

// Get inline selection containers
var taskAssigneeChipsContainer = document.getElementById('task-assignee-chips-container');
var areaChipsContainer = document.getElementById('area-chips-container');

// Render chips in the inline selection containers (Area, Task Assignee)
function renderInlineChips() {
    // Render Task Assignee chips
    if (taskAssigneeChipsContainer) {
        taskAssigneeChipsContainer.innerHTML = '';
        var assigneeChecked = Array.from(taskAssigneeCheckboxes).filter(function(cb) { return cb.checked; });
        assigneeChecked.forEach(function(checkbox) {
            createInlineChip(checkbox, taskAssigneeChipsContainer);
        });
    }
    
    // Render Area chips
    if (areaChipsContainer) {
        areaChipsContainer.innerHTML = '';
        var areaChecked = Array.from(areaCheckboxes).filter(function(cb) { return cb.checked; });
        areaChecked.forEach(function(checkbox) {
            createInlineChip(checkbox, areaChipsContainer);
        });
    }
}

// Create an inline chip element for the filter section (matches Victims page styling)
function createInlineChip(checkbox, container) {
    var label = checkbox.getAttribute('data-label') || checkbox.value;
    var li = document.createElement('li');
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'app-filter__tag';
    button.textContent = label;
    button.setAttribute('data-value', checkbox.value);
    button.addEventListener('click', function() {
        checkbox.checked = false;
        renderInlineChips();
        updateClearFiltersVisibility();
        // Don't apply filters immediately - wait for Search button click
        searchFormSubmitted = false;
        window.saveFiltersToStorage();
    });
    li.appendChild(button);
    container.appendChild(li);
}

// Update visibility of clear filters link
function updateClearFiltersVisibility() {
    var hasCheckedFilters = Array.from(taskAssigneeCheckboxes).some(function (checkbox) {
        return checkbox.checked;
    }) || Array.from(areaCheckboxes).some(function (checkbox) {
        return checkbox.checked;
    }) || Array.from(serviceRadios).some(function (radio) {
        return radio.checked;
    });
    
    if (clearFiltersWrapper) {
        clearFiltersWrapper.style.display = hasCheckedFilters ? '' : 'none';
    }
}

// Apply filters to task list
function applyTaskFilters() {
    var taskAssigneeCheckboxes = document.querySelectorAll('.task-assignee-checkbox');
    var areaCheckboxes = document.querySelectorAll('.area-checkbox');
    var serviceRadios = document.querySelectorAll('.service-radio');
    
    // Get all checked filter values
    var selectedAssignees = Array.from(taskAssigneeCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.getAttribute('data-label'); });
    
    var selectedAreas = Array.from(areaCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.getAttribute('data-label'); });
    
    var selectedServices = Array.from(serviceRadios)
        .filter(function(radio) { return radio.checked; })
        .map(function(radio) { return radio.getAttribute('data-label'); });
    
    // Determine if search criteria filters are active
    var hasSearchCriteria = selectedAssignees.length > 0 || selectedAreas.length > 0 || selectedServices.length > 0;
    
    // Get all task records (summary lists within margin-bottom-9 containers)
    var taskContainers = document.querySelectorAll('.govuk-grid-column-three-quarters > .govuk-\\!-margin-bottom-9');
    var visibleCount = 0;
    
    taskContainers.forEach(function(container) {
        var record = container.querySelector('.govuk-summary-list');
        if (!record) return;
        
        var shouldShow = true;
        
        // Helper function to extract specific field value from record
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
        
        // Check Task Assignee filter (only apply if search form has been submitted)
        if (selectedAssignees.length > 0 && searchFormSubmitted) {
            var recordAssignee = getFieldValue('Task assignee');
            var matchesAssignee = selectedAssignees.some(function(selectedAssignee) {
                // Remove "(you)" suffix from selected assignee label for matching
                var assigneeToMatch = selectedAssignee.replace(/\s*\(you\)\s*$/, '');
                return recordAssignee.indexOf(assigneeToMatch) !== -1;
            });
            shouldShow = shouldShow && matchesAssignee;
        }
        
        // Check Service filter (only apply if search form has been submitted)
        if (selectedServices.length > 0 && searchFormSubmitted) {
            var recordService = getFieldValue('Service');
            var matchesService = selectedServices.some(function(service) {
                return recordService.toLowerCase().indexOf(service.toLowerCase()) !== -1;
            });
            shouldShow = shouldShow && matchesService;
        }
        
        // Check Area filter (only apply if search form has been submitted)
        if (selectedAreas.length > 0 && searchFormSubmitted) {
            var recordArea = getFieldValue('Area');
            var recordText = record.textContent || '';
            var matchesArea = selectedAreas.some(function(area) {
                return recordArea.indexOf(area) !== -1 || recordText.indexOf(area) !== -1;
            });
            shouldShow = shouldShow && matchesArea;
        }
        
        // If no search criteria submitted, show all tasks
        if (!searchFormSubmitted || !hasSearchCriteria) {
            shouldShow = true;
        }
        
        // Mark record as filtered or not using data attribute (pagination uses this)
        record.setAttribute('data-filtered', shouldShow ? 'visible' : 'hidden');
        // Show/hide the container
        container.style.display = shouldShow ? '' : 'none';
        
        if (shouldShow) {
            visibleCount++;
        }
    });
    
    // Show "no results" message if no tasks match filters (only when search was submitted)
    var noResultsMessage = document.getElementById('no-results-message');
    var resultsDivider = document.getElementById('results-divider');
    if (visibleCount === 0 && searchFormSubmitted && hasSearchCriteria) {
        if (!noResultsMessage) {
            noResultsMessage = document.createElement('div');
            noResultsMessage.id = 'no-results-message';
            noResultsMessage.className = 'govuk-inset-text govuk-!-margin-top-0';
            noResultsMessage.textContent = 'No results found. Try changing your search criteria.';
            var resultsArea = document.querySelector('.govuk-grid-column-three-quarters');
            if (resultsArea && resultsDivider) {
                resultsDivider.parentNode.insertBefore(noResultsMessage, resultsDivider.nextSibling);
            }
        }
        noResultsMessage.style.display = '';
        if (resultsDivider) {
            resultsDivider.style.display = 'none';
        }
    } else if (noResultsMessage) {
        noResultsMessage.style.display = 'none';
        if (resultsDivider) {
            resultsDivider.style.display = '';
        }
    }
    
    // Update results count
    updateResultsCount(visibleCount);
    
    // Recalculate pagination
    if (window.recalculatePagination) {
        window.recalculatePagination();
    }
}

// Update results count text
function updateResultsCount(visibleCount) {
    var resultsCountTop = document.getElementById('results-count');
    var paginationNav = document.querySelector('.govuk-pagination');
    var sortedByText = document.getElementById('sorted-by-text');
    
    // Get total task count
    var totalTasks = document.querySelectorAll('.govuk-grid-column-three-quarters > .govuk-\\!-margin-bottom-9').length;
    
    // Determine count to show based on whether filters are active
    var countToShow = searchFormSubmitted ? visibleCount : totalTasks;
    
    // Update results count text
    if (resultsCountTop) {
        var RESULTS_PER_PAGE = 5;
        var startResult = 1;
        var endResult = Math.min(RESULTS_PER_PAGE, countToShow);
        var resultsText = 'Showing results ' + startResult + ' to ' + endResult + ' of ' + countToShow + ' total results';
        resultsCountTop.textContent = resultsText;
        
        // Hide results count if no results
        resultsCountTop.style.display = countToShow === 0 ? 'none' : '';
    }
    
    // Hide pagination and sorted-by text when no results
    if (paginationNav) {
        paginationNav.style.display = countToShow === 0 ? 'none' : '';
    }
    if (sortedByText) {
        sortedByText.style.display = countToShow === 0 ? 'none' : '';
    }
}

// Add click handler to Clear search link
var clearFiltersLink = document.querySelector('#clear-filters-wrapper a');
if (clearFiltersLink) {
    clearFiltersLink.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Helper function to uncheck and trigger change event
        function uncheckAndTriggerChange(items) {
            items.forEach(function (item) {
                item.checked = false;
                // Trigger change event to ensure listeners fire
                var changeEvent = new Event('change', { bubbles: true });
                item.dispatchEvent(changeEvent);
            });
        }
        
        // Clear all filters
        uncheckAndTriggerChange(taskAssigneeCheckboxes);
        uncheckAndTriggerChange(areaCheckboxes);
        uncheckAndTriggerChange(serviceRadios);
        
        // Clear autocomplete inputs
        var assigneeInput = document.querySelector('#assignee-autocomplete-input');
        if (assigneeInput) assigneeInput.value = '';
        var areaInput = document.querySelector('#area-autocomplete-input');
        if (areaInput) areaInput.value = '';
        
        // Clear chips
        if (taskAssigneeChipsContainer) taskAssigneeChipsContainer.innerHTML = '';
        if (areaChipsContainer) areaChipsContainer.innerHTML = '';
        
        // Reset search form submitted flag
        searchFormSubmitted = false;
        
        // Update UI
        updateClearFiltersVisibility();
        applyTaskFilters();
        window.saveFiltersToStorage();
    });
}

// Render chips on page load
renderInlineChips();

// Expose functions to global scope for use in autocomplete handlers
window.renderInlineChips = renderInlineChips;
window.applyTaskFilters = applyTaskFilters;
window.updateClearFiltersVisibility = updateClearFiltersVisibility;

})();

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
console.log('Initializing Task Assignee Autocomplete');
var assignees = [
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
var taskAssigneeCheckboxesContainer = document.getElementById('task-assignee-checkboxes-container');
var taskAssigneeCheckboxes = document.querySelectorAll('.task-assignee-checkbox');

console.log('Task Assignee container:', container);
console.log('Task Assignee checkboxes found:', taskAssigneeCheckboxes.length);

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
    console.log('Task Assignee selected:', selected);
    if (!selected) { 
        return; 
    }
    var item = assignees.find(function (o) { 
        return o.label === selected || o.label === (selected.label || selected); 
    });
    if (item) {
        console.log('Found item:', item);
        // Find and check the selected checkbox
        taskAssigneeCheckboxes.forEach(function (checkbox) {
        if (checkbox.value === item.value) {
            console.log('Checking task assignee checkbox:', checkbox.value);
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

// Dynamic pagination based on filtered results
(function() {
    var RESULTS_PER_PAGE = 5;
    
    function recalculatePagination() {
        var taskContainers = document.querySelectorAll('.govuk-grid-column-three-quarters > .govuk-\\!-margin-bottom-9');
        
        // Count visible records
        var visibleRecords = 0;
        taskContainers.forEach(function(container) {
            var record = container.querySelector('.govuk-summary-list');
            if (record && record.getAttribute('data-filtered') !== 'hidden') {
                visibleRecords++;
            }
        });
        
        // If no filters applied, count all
        if (!searchFormSubmitted) {
            visibleRecords = taskContainers.length;
        }
        
        // Calculate total pages needed
        var totalPages = Math.ceil(visibleRecords / RESULTS_PER_PAGE) || 1;
        
        // Get UI elements
        var paginationNav = document.querySelector('.govuk-pagination');
        var resultsCountTop = document.getElementById('results-count');
        var sortedByText = document.getElementById('sorted-by-text');
        
        // Hide pagination, results count, sorted-by text when no results
        if (visibleRecords === 0 && searchFormSubmitted) {
            if (paginationNav) paginationNav.style.display = 'none';
            if (resultsCountTop) resultsCountTop.style.display = 'none';
            if (sortedByText) sortedByText.style.display = 'none';
            return;
        } else {
            // Show these elements when there are results
            if (resultsCountTop) resultsCountTop.style.display = '';
            if (sortedByText) sortedByText.style.display = '';
        }
        
        // Update pagination buttons
        updatePaginationPages(totalPages);
        
        // Show page 1 by default after recalculation
        showPage(1, totalPages);
    }
    
    function updatePaginationPages(totalPages, currentPage) {
        var paginationNav = document.querySelector('.govuk-pagination');
        var paginationList = document.querySelector('.govuk-pagination__list');
        
        // Hide entire pagination if only one page
        if (totalPages <= 1) {
            if (paginationNav) {
                paginationNav.style.display = 'none';
            }
            return;
        }
        
        // Show pagination nav if more than one page
        if (paginationNav) {
            paginationNav.style.display = '';
        }
        
        if (!paginationList) return;
        
        // Default to page 1 if not specified
        currentPage = currentPage || 1;
        
        // Clear existing pagination items
        paginationList.innerHTML = '';
        
        // Calculate which page numbers to show based on GOV.UK Design System guidelines
        var pagesToShow = getPagesToShow(currentPage, totalPages);
        
        // Build pagination items
        var previousPageNum = null;
        pagesToShow.forEach(function(pageNum) {
            // Add ellipsis if there's a gap
            if (previousPageNum !== null && pageNum > previousPageNum + 1) {
                var ellipsisItem = document.createElement('li');
                ellipsisItem.className = 'govuk-pagination__item govuk-pagination__item--ellipses';
                ellipsisItem.textContent = '⋯';
                paginationList.appendChild(ellipsisItem);
            }
            
            var newItem = document.createElement('li');
            newItem.className = 'govuk-pagination__item';
            
            if (pageNum === currentPage) {
                newItem.classList.add('govuk-pagination__item--current');
            }
            
            var newLink = document.createElement('a');
            newLink.className = 'govuk-link govuk-pagination__link';
            newLink.href = '#';
            newLink.setAttribute('aria-label', 'Page ' + pageNum);
            newLink.setAttribute('data-page', pageNum);
            newLink.textContent = pageNum;
            
            if (pageNum === currentPage) {
                newLink.setAttribute('aria-current', 'page');
            }
            
            newItem.appendChild(newLink);
            paginationList.appendChild(newItem);
            
            previousPageNum = pageNum;
        });
    }
    
    // Get the array of page numbers to display based on GOV.UK Design System patterns
    function getPagesToShow(currentPage, totalPages) {
        var pages = [];
        
        // If 7 or fewer pages, show all of them
        if (totalPages <= 7) {
            for (var i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }
        
        // Always include first page
        pages.push(1);
        
        // Near the start
        if (currentPage <= 4) {
            for (var i = 2; i <= Math.min(currentPage + 1, 5); i++) {
                pages.push(i);
            }
            pages.push(totalPages);
            return pages;
        }
        
        // Near the end
        if (currentPage >= totalPages - 3) {
            for (var i = Math.max(currentPage - 1, totalPages - 4); i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }
        
        // Middle
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push(totalPages);
        
        return pages;
    }
    
    function showPage(pageNumber, totalPages) {
        // Calculate totalPages dynamically if not provided
        if (!totalPages) {
            var taskContainers = document.querySelectorAll('.govuk-grid-column-three-quarters > .govuk-\\!-margin-bottom-9');
            var visibleCount = 0;
            taskContainers.forEach(function(container) {
                var record = container.querySelector('.govuk-summary-list');
                if (record && record.getAttribute('data-filtered') !== 'hidden') {
                    visibleCount++;
                }
            });
            if (!searchFormSubmitted) {
                visibleCount = taskContainers.length;
            }
            totalPages = Math.ceil(visibleCount / RESULTS_PER_PAGE) || 1;
        }
        
        // Validate page number
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }
        
        var taskContainers = document.querySelectorAll('.govuk-grid-column-three-quarters > .govuk-\\!-margin-bottom-9');
        var visibleRecords = [];
        
        // Collect all records that pass filters
        taskContainers.forEach(function(container) {
            var record = container.querySelector('.govuk-summary-list');
            if (record && record.getAttribute('data-filtered') !== 'hidden') {
                visibleRecords.push(container);
            } else if (!searchFormSubmitted) {
                visibleRecords.push(container);
            }
        });
        
        // Calculate which records belong on this page
        var startIndex = (pageNumber - 1) * RESULTS_PER_PAGE;
        var endIndex = startIndex + RESULTS_PER_PAGE;
        
        // Hide all records first
        taskContainers.forEach(function(container) {
            container.style.display = 'none';
        });
        
        // Show only records for current page
        for (var i = startIndex; i < endIndex && i < visibleRecords.length; i++) {
            visibleRecords[i].style.display = '';
        }
        
        // Update pagination with ellipsis pattern for current page
        updatePaginationPages(totalPages, pageNumber);
        
        // Update previous/next button visibility
        var prevButton = document.getElementById('pagination-prev');
        var nextButton = document.getElementById('pagination-next');
        
        if (prevButton && prevButton.parentElement) {
            if (pageNumber === 1) {
                prevButton.parentElement.style.display = 'none';
            } else {
                prevButton.parentElement.style.display = '';
                prevButton.setAttribute('data-page', pageNumber - 1);
            }
        }
        
        if (nextButton && nextButton.parentElement) {
            if (pageNumber === totalPages) {
                nextButton.parentElement.style.display = 'none';
            } else {
                nextButton.parentElement.style.display = '';
                nextButton.setAttribute('data-page', pageNumber + 1);
            }
        }
        
        // Update results count text
        var resultsCountTop = document.getElementById('results-count');
        var firstResult = startIndex + 1;
        var lastResult = Math.min(endIndex, visibleRecords.length);
        var resultsText = 'Showing results ' + firstResult + ' to ' + lastResult + ' of ' + visibleRecords.length + ' total results';
        if (resultsCountTop) resultsCountTop.textContent = resultsText;
        
        // Scroll to top of results
        var heading = document.getElementById('main-heading');
        if (heading) {
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Set up pagination link event listeners
    function setupPaginationListeners() {
        var paginationList = document.querySelector('.govuk-pagination__list');
        var prevButton = document.getElementById('pagination-prev');
        var nextButton = document.getElementById('pagination-next');
        
        // Use event delegation on the pagination list to handle dynamically added page links
        if (paginationList) {
            paginationList.addEventListener('click', function(e) {
                var link = e.target.closest('.govuk-pagination__link');
                if (link) {
                    e.preventDefault();
                    var pageNum = parseInt(link.getAttribute('data-page'));
                    if (!isNaN(pageNum)) {
                        showPage(pageNum);
                    }
                }
            });
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                var pageNum = parseInt(this.getAttribute('data-page'));
                if (!isNaN(pageNum)) {
                    showPage(pageNum);
                }
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                var pageNum = parseInt(this.getAttribute('data-page'));
                if (!isNaN(pageNum)) {
                    showPage(pageNum);
                }
            });
        }
    }
    
    // Initialize pagination on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setupPaginationListeners();
        });
    } else {
        setupPaginationListeners();
    }
    
    // Make functions available globally
    window.recalculatePagination = recalculatePagination;
    window.showPage = showPage;
    window.updatePaginationPages = updatePaginationPages;

})();

// Handle form submission
(function() {
    function attachFormListener() {
        var filtersForm = document.getElementById('filters-form');
        if (filtersForm && !filtersForm.dataset.listenerAttached) {
            filtersForm.dataset.listenerAttached = 'true';
            filtersForm.addEventListener('submit', function(e) {
                e.preventDefault();
                e.stopPropagation();
                searchFormSubmitted = true;
                if (window.applyTaskFilters) window.applyTaskFilters();
                window.saveFiltersToStorage();
                return false;
            }, true);
        }
    }
    
    // Attach listener immediately and also on DOM ready
    attachFormListener();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachFormListener);
    }
})();

// Sort tasks by due date (earliest first)
(function() {
    function parseDueDate(dateText) {
        // Remove tags like "Overdue", "Due today" and extract the date
        var cleanText = dateText.replace(/Overdue|Due today|Due in \d+ days?/gi, '').trim();
        
        // Parse date in format "14 November 2025"
        var months = {
            'january': 0, 'february': 1, 'march': 2, 'april': 3,
            'may': 4, 'june': 5, 'july': 6, 'august': 7,
            'september': 8, 'october': 9, 'november': 10, 'december': 11
        };
        
        var match = cleanText.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/);
        if (match) {
            var day = parseInt(match[1]);
            var month = months[match[2].toLowerCase()];
            var year = parseInt(match[3]);
            if (month !== undefined) {
                return new Date(year, month, day);
            }
        }
        return null;
    }
    
    function getDueDateFromContainer(container) {
        var record = container.querySelector('.govuk-summary-list');
        if (!record) return null;
        
        var rows = record.querySelectorAll('.govuk-summary-list__row');
        for (var i = 0; i < rows.length; i++) {
            var keyEl = rows[i].querySelector('.govuk-summary-list__key');
            if (keyEl && keyEl.textContent.trim() === 'Due date') {
                var valueEl = rows[i].querySelector('.govuk-summary-list__value');
                return valueEl ? parseDueDate(valueEl.textContent) : null;
            }
        }
        return null;
    }
    
    function sortTasksByDueDate() {
        var resultsArea = document.querySelector('.govuk-grid-column-three-quarters');
        if (!resultsArea) return;
        
        var taskContainers = Array.from(resultsArea.querySelectorAll(':scope > .govuk-\\!-margin-bottom-9'));
        if (taskContainers.length === 0) return;
        
        // Get the pagination element so we can keep it at the end
        var paginationNav = resultsArea.querySelector('.govuk-pagination');
        
        // Sort containers by due date (earliest first)
        taskContainers.sort(function(a, b) {
            var dateA = getDueDateFromContainer(a);
            var dateB = getDueDateFromContainer(b);
            
            // Handle null dates - put them at the end
            if (!dateA && !dateB) return 0;
            if (!dateA) return 1;
            if (!dateB) return -1;
            
            return dateA.getTime() - dateB.getTime();
        });
        
        // Reorder the DOM - insert before pagination to keep pagination at the end
        taskContainers.forEach(function(container) {
            if (paginationNav) {
                resultsArea.insertBefore(container, paginationNav);
            } else {
                resultsArea.appendChild(container);
            }
        });
    }
    
    // Sort on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', sortTasksByDueDate);
    } else {
        sortTasksByDueDate();
    }
    
    // Make function available globally
    window.sortTasksByDueDate = sortTasksByDueDate;
})();

// Restore filter settings from localStorage if available
var filtersRestored = window.restoreFiltersFromStorage();

// Apply default filters on initial session (when no localStorage data exists)
if (!filtersRestored) {
    // Set default: "THOMPSON, Sarah (you)" selected as task assignee
    var thompsonCheckbox = document.getElementById('task-assignee-1');
    if (thompsonCheckbox) {
        thompsonCheckbox.checked = true;
    }
    
    // Set searchFormSubmitted to true so filters are applied on first load
    searchFormSubmitted = true;
    
    // Save the initial state to localStorage
    window.saveFiltersToStorage();
}

// Apply filters on page load if any are selected
if (window.applyTaskFilters) {
    window.applyTaskFilters();
}

// Render chips on page load (after filters are restored)
if (window.renderInlineChips) {
    window.renderInlineChips();
}

// Update clear filters visibility on page load
if (window.updateClearFiltersVisibility) {
    window.updateClearFiltersVisibility();
}

// Mark initial setup as complete
initialSetupComplete = true;

// Show success banner if URL has success params, then remove them
(function() {
    var url = new URL(window.location.href);
    if (url.searchParams.get('success') === 'yes') {
        var successReason = url.searchParams.get('successReason');
        var banner = null;
        
        if (successReason === 'due-date-updated') {
            banner = document.getElementById('due-date-success-banner');
        } else if (successReason === 'assignee-updated') {
            banner = document.getElementById('assignee-success-banner');
        }
        
        if (banner) {
            banner.style.display = 'block';
        }
        // Remove params from URL so banner doesn't show on back/refresh
        url.searchParams.delete('success');
        url.searchParams.delete('successReason');
        window.history.replaceState({}, document.title, url.pathname + url.search);
    }
})();