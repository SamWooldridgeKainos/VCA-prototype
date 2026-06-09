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
            dueChecked: [],
            taskTypeChecked: [],
            meetingPurposeChecked: [],
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
        document.querySelectorAll('.service-radio').forEach(function(cb) {
            if (cb.checked) {
                state.serviceChecked.push(cb.id);
            }
        });
        
        // Collect checked Due checkboxes
        document.querySelectorAll('.due-checkbox').forEach(function(cb) {
            if (cb.checked) {
                state.dueChecked.push(cb.id);
            }
        });
        
        // Collect checked Task Type checkboxes
        document.querySelectorAll('.task-type-checkbox').forEach(function(cb) {
            if (cb.checked) {
                state.taskTypeChecked.push(cb.id);
            }
        });
        
        // Collect checked Meeting Purpose checkboxes
        document.querySelectorAll('.meeting-purpose-checkbox').forEach(function(cb) {
            if (cb.checked) {
                state.meetingPurposeChecked.push(cb.id);
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
            
            // Restore Service checkboxes
            if (state.serviceChecked) {
                state.serviceChecked.forEach(function(id) {
                    var checkbox = document.getElementById(id);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }
            
            // Restore Due checkboxes
            if (state.dueChecked) {
                state.dueChecked.forEach(function(id) {
                    var checkbox = document.getElementById(id);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }
            
            // Restore Task Type checkboxes
            if (state.taskTypeChecked) {
                state.taskTypeChecked.forEach(function(id) {
                    var checkbox = document.getElementById(id);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }
            
            // Restore Meeting Purpose checkboxes
            if (state.meetingPurposeChecked) {
                state.meetingPurposeChecked.forEach(function(id) {
                    var checkbox = document.getElementById(id);
                    if (checkbox) {
                        checkbox.checked = true;
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
var serviceCheckboxes = document.querySelectorAll('.service-radio');
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
    var dueCheckboxes = document.querySelectorAll('.due-checkbox');
    var taskTypeCheckboxes = document.querySelectorAll('.task-type-checkbox');
    var meetingPurposeCheckboxes = document.querySelectorAll('.meeting-purpose-checkbox');
    var hasCheckedFilters = Array.from(taskAssigneeCheckboxes).some(function (checkbox) {
        return checkbox.checked;
    }) || Array.from(areaCheckboxes).some(function (checkbox) {
        return checkbox.checked;
    }) || Array.from(serviceCheckboxes).some(function (checkbox) {
        return checkbox.checked;
    }) || Array.from(dueCheckboxes).some(function (checkbox) {
        return checkbox.checked;
    }) || Array.from(taskTypeCheckboxes).some(function (checkbox) {
        return checkbox.checked;
    }) || Array.from(meetingPurposeCheckboxes).some(function (checkbox) {
        return checkbox.checked;
    });
    
    if (clearFiltersWrapper) {
        clearFiltersWrapper.style.display = hasCheckedFilters ? '' : 'none';
    }
}

// Apply filters to task list
function applyTaskFilters() {
    var taskAssigneeCheckboxes = document.querySelectorAll('.task-assignee-checkbox');
    var areaCheckboxes = document.querySelectorAll('.area-checkbox');
    var serviceCheckboxes = document.querySelectorAll('.service-radio');
    
    // Get all checked filter values
    var selectedAssignees = Array.from(taskAssigneeCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.getAttribute('data-label'); });
    
    var selectedAreas = Array.from(areaCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.getAttribute('data-label'); });
    
    var selectedServices = Array.from(serviceCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.getAttribute('data-label'); });
    
    var dueCheckboxes = document.querySelectorAll('.due-checkbox');
    var selectedDue = Array.from(dueCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.getAttribute('data-label'); });
    
    var taskTypeCheckboxes = document.querySelectorAll('.task-type-checkbox');
    var selectedTaskTypes = Array.from(taskTypeCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.getAttribute('data-label'); });
    
    var meetingPurposeCheckboxes = document.querySelectorAll('.meeting-purpose-checkbox');
    var selectedMeetingPurposes = Array.from(meetingPurposeCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.getAttribute('data-label'); });
    
    // Determine if search criteria filters are active
    var hasSearchCriteria = selectedAssignees.length > 0 || selectedAreas.length > 0 || selectedServices.length > 0 || selectedDue.length > 0 || selectedTaskTypes.length > 0 || selectedMeetingPurposes.length > 0;
    
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
            var recordService = getFieldValue('Service lead');
            var matchesService = selectedServices.some(function(service) {
                // Special handling for "Not aligned" filter
                if (service === 'Not aligned' || service === 'Not aligned to a service') {
                    return recordService.indexOf('Not aligned') !== -1;
                }
                // Special handling for "Not onboarded" filter
                if (service === 'Not onboarded') {
                    return recordService.indexOf('Not onboarded') !== -1;
                }
                return recordService.toLowerCase().indexOf(service.toLowerCase()) !== -1;
            });
            shouldShow = shouldShow && matchesService;
        }
        
        // Check Area filter (only apply if search form has been submitted)
        if (selectedAreas.length > 0 && searchFormSubmitted) {
            var recordArea = getFieldValue('CPS area');
            var recordText = record.textContent || '';
            var matchesArea = selectedAreas.some(function(area) {
                return recordArea.indexOf(area) !== -1 || recordText.indexOf(area) !== -1;
            });
            shouldShow = shouldShow && matchesArea;
        }
        
        // Check Due filter (only apply if search form has been submitted)
        if (selectedDue.length > 0 && searchFormSubmitted) {
            var dueDateValue = getFieldValue('Due date');
            var matchesDue = selectedDue.some(function(due) {
                if (due === 'Overdue') {
                    return dueDateValue.indexOf('Overdue') !== -1;
                }
                if (due === 'Due today') {
                    return dueDateValue.indexOf('Due today') !== -1;
                }
                return false;
            });
            shouldShow = shouldShow && matchesDue;
        }
        
        // Check Task Type filter (only apply if search form has been submitted)
        if (selectedTaskTypes.length > 0 && searchFormSubmitted) {
            var recordTask = getFieldValue('Task');
            var matchesTaskType = selectedTaskTypes.some(function(taskType) {
                if (taskType === 'Other') {
                    // Match anything not in the known task types
                    var knownTypes = ['Inform of a decision to charge', 'Inform of a no further action decision', 'Inform of a stopped charge', 'Inform of a substantially altered charge', 'Arrange CPS pre-trial meeting', 'Arrange a CPS pre-trial meeting', 'Log offered meeting', 'Log arranged meeting', 'Log offer response', 'Log meeting outcome'];
                    return !knownTypes.some(function(known) { return recordTask.indexOf(known) !== -1; });
                }
                if (taskType === 'Arrange CPS pre-trial meeting') {
                    return recordTask.indexOf('Arrange') !== -1 && recordTask.indexOf('pre-trial meeting') !== -1;
                }
                return recordTask.indexOf(taskType) !== -1;
            });
            shouldShow = shouldShow && matchesTaskType;
        }
        
        // Check Meeting Purpose filter (only apply if search form has been submitted)
        if (selectedMeetingPurposes.length > 0 && searchFormSubmitted) {
            var recordPurpose = getFieldValue('Purpose');
            var matchesMeetingPurpose = selectedMeetingPurposes.some(function(purpose) {
                return recordPurpose.indexOf(purpose) !== -1;
            });
            shouldShow = shouldShow && matchesMeetingPurpose;
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
        uncheckAndTriggerChange(serviceCheckboxes);
        
        // Clear due, task type, and meeting purpose checkboxes
        var dueCheckboxes = document.querySelectorAll('.due-checkbox');
        var taskTypeCheckboxes = document.querySelectorAll('.task-type-checkbox');
        var meetingPurposeCheckboxes = document.querySelectorAll('.meeting-purpose-checkbox');
        uncheckAndTriggerChange(dueCheckboxes);
        uncheckAndTriggerChange(taskTypeCheckboxes);
        uncheckAndTriggerChange(meetingPurposeCheckboxes);
        
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
        if (window.renderSelectedFilters) window.renderSelectedFilters();
    });
}

// Render chips on page load
renderInlineChips();

// Expose functions to global scope for use in autocomplete handlers
window.renderInlineChips = renderInlineChips;
window.applyTaskFilters = applyTaskFilters;
window.updateClearFiltersVisibility = updateClearFiltersVisibility;

})();


// Handle form submission
(function() {
    function applyFilters() {
        searchFormSubmitted = true;
        if (window.applyTaskFilters) window.applyTaskFilters();
        window.saveFiltersToStorage();
        if (window.renderSelectedFilters) window.renderSelectedFilters();
    }

    function attachFormListener() {
        var filtersForm = document.getElementById('filters-form');
        if (filtersForm && !filtersForm.dataset.listenerAttached) {
            filtersForm.dataset.listenerAttached = 'true';
            filtersForm.addEventListener('submit', function(e) {
                e.preventDefault();
                e.stopPropagation();
                applyFilters();
                return false;
            }, true);
        }
    }

    // Apply filters button (outside form)
    var applyBtn = document.getElementById('apply-filters-button');
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            applyFilters();
        });
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

// ===== Selected Filters Display =====
(function() {
    var isRenderingSelectedFilters = false;

    function renderSelectedFilters() {
        if (isRenderingSelectedFilters) return;
        isRenderingSelectedFilters = true;
        var container = document.getElementById('selected-filters-chips');
        var heading = document.getElementById('selected-filters-heading');
        var clearWrapper = document.getElementById('clear-search-filters-wrapper');
        if (!container) { isRenderingSelectedFilters = false; return; }

        container.innerHTML = '';

        // Collect chips by category
        var assigneeChips = [];
        document.querySelectorAll('.task-assignee-checkbox:checked').forEach(function(cb) {
            assigneeChips.push({ label: cb.getAttribute('data-label'), input: cb });
        });

        var serviceChips = [];
        document.querySelectorAll('.service-radio:checked').forEach(function(cb) {
            serviceChips.push({ label: cb.getAttribute('data-label'), input: cb });
        });

        var areaChips = [];
        document.querySelectorAll('.area-checkbox:checked').forEach(function(cb) {
            areaChips.push({ label: cb.getAttribute('data-label'), input: cb });
        });

        var dueChips = [];
        document.querySelectorAll('.due-checkbox:checked').forEach(function(cb) {
            dueChips.push({ label: cb.getAttribute('data-label'), input: cb });
        });

        var taskTypeChips = [];
        document.querySelectorAll('.task-type-checkbox:checked').forEach(function(cb) {
            taskTypeChips.push({ label: cb.getAttribute('data-label'), input: cb });
        });

        var meetingPurposeChips = [];
        document.querySelectorAll('.meeting-purpose-checkbox:checked').forEach(function(cb) {
            meetingPurposeChips.push({ label: cb.getAttribute('data-label'), input: cb });
        });

        var totalChips = assigneeChips.length + serviceChips.length + areaChips.length + dueChips.length + taskTypeChips.length + meetingPurposeChips.length;

        // Update heading
        if (heading) {
            if (totalChips > 0) {
                if (heading.tagName !== 'H2') {
                    var h2 = document.createElement('h2');
                    h2.id = 'selected-filters-heading';
                    h2.className = 'govuk-heading-m govuk-!-margin-bottom-1';
                    h2.textContent = 'Selected filters';
                    heading.parentNode.replaceChild(h2, heading);
                } else {
                    heading.textContent = 'Selected filters';
                }
                if (clearWrapper) clearWrapper.style.display = '';
            } else {
                if (heading.tagName !== 'P') {
                    var p = document.createElement('p');
                    p.id = 'selected-filters-heading';
                    p.className = 'govuk-body';
                    p.textContent = 'No filters selected';
                    heading.parentNode.replaceChild(p, heading);
                } else {
                    heading.textContent = 'No filters selected';
                }
                if (clearWrapper) clearWrapper.style.display = 'none';
            }
        }

        // Helper to create a sub-section with heading and chips
        function createSubSection(title, chips) {
            if (chips.length === 0) return;
            var subHeading = document.createElement('h3');
            subHeading.className = 'govuk-heading-s govuk-!-margin-bottom-1 govuk-!-margin-top-3';
            subHeading.textContent = title;
            container.appendChild(subHeading);

            var ul = document.createElement('ul');
            ul.className = 'app-filter-tags govuk-!-margin-bottom-0';
            chips.forEach(function(chip) {
                var li = document.createElement('li');
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'app-filter__tag';
                btn.textContent = chip.label;
                btn.addEventListener('click', function() {
                    if (chip.input) {
                        chip.input.checked = false;
                        var changeEvent = new Event('change', { bubbles: true });
                        chip.input.dispatchEvent(changeEvent);
                    }
                    searchFormSubmitted = true;
                    if (window.applyTaskFilters) window.applyTaskFilters();
                    if (window.renderInlineChips) window.renderInlineChips();
                    if (window.saveFiltersToStorage) window.saveFiltersToStorage();
                    renderSelectedFilters();
                });
                li.appendChild(btn);
                ul.appendChild(li);
            });
            container.appendChild(ul);
        }

        createSubSection('Task assignee', assigneeChips);
        createSubSection('Service lead', serviceChips);
        createSubSection('CPS area', areaChips);
        createSubSection('Due', dueChips);
        createSubSection('Task type', taskTypeChips);
        createSubSection('Meeting purpose', meetingPurposeChips);
        isRenderingSelectedFilters = false;
    }
    window.renderSelectedFilters = renderSelectedFilters;

    // Update selected filters when any filter changes
    document.querySelectorAll('.task-assignee-checkbox, .area-checkbox, .service-radio, .due-checkbox, .task-type-checkbox, .meeting-purpose-checkbox').forEach(function(cb) {
        cb.addEventListener('change', function() {
            renderSelectedFilters();
        });
    });

    // Observe inline chip containers for changes (autocomplete uses local function refs)
    var assigneeChipsEl = document.getElementById('task-assignee-chips-container');
    var areaChipsEl = document.getElementById('area-chips-container');
    var chipObserver = new MutationObserver(function() {
        renderSelectedFilters();
    });
    if (assigneeChipsEl) chipObserver.observe(assigneeChipsEl, { childList: true });
    if (areaChipsEl) chipObserver.observe(areaChipsEl, { childList: true });

    // Clear filters button handler
    var clearBtn = document.getElementById('clear-search-filters');
    if (clearBtn) {
        clearBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Uncheck all Task Assignee checkboxes
            document.querySelectorAll('.task-assignee-checkbox').forEach(function(cb) { cb.checked = false; });
            // Uncheck all Area checkboxes
            document.querySelectorAll('.area-checkbox').forEach(function(cb) { cb.checked = false; });
            // Uncheck all Service radios
            document.querySelectorAll('.service-radio').forEach(function(cb) { cb.checked = false; });
            // Uncheck all Due checkboxes
            document.querySelectorAll('.due-checkbox').forEach(function(cb) { cb.checked = false; });
            // Uncheck all Task Type checkboxes
            document.querySelectorAll('.task-type-checkbox').forEach(function(cb) { cb.checked = false; });
            // Uncheck all Meeting Purpose checkboxes
            document.querySelectorAll('.meeting-purpose-checkbox').forEach(function(cb) { cb.checked = false; });
            // Clear autocomplete inputs
            var assigneeInput = document.querySelector('#assignee-autocomplete-input');
            if (assigneeInput) assigneeInput.value = '';
            var areaInput = document.querySelector('#area-autocomplete-input');
            if (areaInput) areaInput.value = '';
            // Clear inline chips
            if (assigneeChipsEl) assigneeChipsEl.innerHTML = '';
            if (areaChipsEl) areaChipsEl.innerHTML = '';
            // Re-apply filters and update UI
            searchFormSubmitted = true;
            if (window.applyTaskFilters) window.applyTaskFilters();
            if (window.renderInlineChips) window.renderInlineChips();
            if (window.saveFiltersToStorage) window.saveFiltersToStorage();
            if (window.updateClearFiltersVisibility) window.updateClearFiltersVisibility();
            renderSelectedFilters();
        });
    }

    // Initial render of selected filters
    renderSelectedFilters();
})();

// Show success banner if URL has success params, then remove them
(function() {
    var url = new URL(window.location.href);
    if (url.searchParams.get('success') === 'yes') {
        var successReason = url.searchParams.get('successReason');
        var banner = null;
        
        if (successReason === 'due-date-updated') {
            banner = document.getElementById('due-date-success-banner');
        } else if (successReason === 'due-date-removed') {
            banner = document.getElementById('due-date-removed-banner');
        } else if (successReason === 'assignee-updated') {
            banner = document.getElementById('assignee-success-banner');
        } else if (successReason === 'manual-task-completed') {
            banner = document.getElementById('manual-task-completed-banner');
            var taskContainer = document.getElementById('manual-task-container');
            if (taskContainer) {
                taskContainer.style.display = 'none';
            }
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