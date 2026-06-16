// Tasks table view - filtering and pagination
// Replaces tasks.js and tasks-pagination.js for table layout

// Track whether search form has been submitted
var searchFormSubmitted = false;

// Track whether initial page setup is complete
var initialSetupComplete = false;

// ===== localStorage Persistence for Tasks Filters =====
(function() {
    var STORAGE_KEY = 'vca-tasks-filters';

    function saveFiltersToStorage() {
        var state = {
            taskAssigneeChecked: [],
            areaChecked: [],
            serviceChecked: [],
            dueChecked: [],
            taskTypeChecked: [],
            meetingPurposeChecked: [],
            searchFormSubmitted: searchFormSubmitted,
            searchUrn: document.getElementById('search-urn') ? document.getElementById('search-urn').value : '',
            taskAssigneeInput: document.querySelector('#assignee-autocomplete-input') ? document.querySelector('#assignee-autocomplete-input').value : '',
            areaInput: document.querySelector('#area-autocomplete-input') ? document.querySelector('#area-autocomplete-input').value : ''
        };

        document.querySelectorAll('.task-assignee-checkbox').forEach(function(cb) {
            if (cb.checked) state.taskAssigneeChecked.push(cb.id);
        });
        document.querySelectorAll('.area-checkbox').forEach(function(cb) {
            if (cb.checked) state.areaChecked.push(cb.id);
        });
        document.querySelectorAll('.service-checkbox').forEach(function(cb) {
            if (cb.checked) state.serviceChecked.push(cb.id);
        });
        document.querySelectorAll('.due-checkbox').forEach(function(cb) {
            if (cb.checked) state.dueChecked.push(cb.id);
        });
        document.querySelectorAll('.task-type-checkbox').forEach(function(cb) {
            if (cb.checked) state.taskTypeChecked.push(cb.id);
        });
        document.querySelectorAll('.meeting-purpose-checkbox').forEach(function(cb) {
            if (cb.checked) state.meetingPurposeChecked.push(cb.id);
        });

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('Failed to save filters to localStorage:', e);
        }
    }

    function restoreFiltersFromStorage() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return false;

            var state = JSON.parse(saved);

            if (state.taskAssigneeChecked) {
                state.taskAssigneeChecked.forEach(function(id) {
                    var cb = document.getElementById(id);
                    if (cb) cb.checked = true;
                });
            }
            if (state.areaChecked) {
                state.areaChecked.forEach(function(id) {
                    var cb = document.getElementById(id);
                    if (cb) cb.checked = true;
                });
            }
            if (state.serviceChecked) {
                state.serviceChecked.forEach(function(id) {
                    var cb = document.getElementById(id);
                    if (cb) cb.checked = true;
                });
            }
            if (state.dueChecked) {
                state.dueChecked.forEach(function(id) {
                    var cb = document.getElementById(id);
                    if (cb) cb.checked = true;
                });
            }
            if (state.taskTypeChecked) {
                state.taskTypeChecked.forEach(function(id) {
                    var cb = document.getElementById(id);
                    if (cb) cb.checked = true;
                });
            }
            if (state.meetingPurposeChecked) {
                state.meetingPurposeChecked.forEach(function(id) {
                    var cb = document.getElementById(id);
                    if (cb) cb.checked = true;
                });
            }

            searchFormSubmitted = state.searchFormSubmitted || false;

            if (state.searchUrn) {
                var searchInput = document.getElementById('search-urn');
                if (searchInput) searchInput.value = state.searchUrn;
                var clearSearchWrapper = document.getElementById('clear-search-wrapper');
                if (clearSearchWrapper) clearSearchWrapper.style.display = '';
            }

            return true;
        } catch (e) {
            console.warn('Failed to restore filters from localStorage:', e);
            return false;
        }
    }

    window.saveFiltersToStorage = saveFiltersToStorage;
    window.restoreFiltersFromStorage = restoreFiltersFromStorage;
})();

// Handle Task filter chips and filtering
(function() {
    var taskAssigneeCheckboxes = document.querySelectorAll('.task-assignee-checkbox');
    var areaCheckboxes = document.querySelectorAll('.area-checkbox');
    var serviceCheckboxes = document.querySelectorAll('.service-checkbox');
    var clearFiltersWrapper = document.getElementById('clear-filters-wrapper');

    var taskAssigneeChipsContainer = document.getElementById('task-assignee-chips-container');
    var areaChipsContainer = document.getElementById('area-chips-container');

    function renderInlineChips() {
        if (taskAssigneeChipsContainer) {
            taskAssigneeChipsContainer.innerHTML = '';
            Array.from(taskAssigneeCheckboxes).filter(function(cb) { return cb.checked; }).forEach(function(checkbox) {
                createInlineChip(checkbox, taskAssigneeChipsContainer);
            });
        }
        if (areaChipsContainer) {
            areaChipsContainer.innerHTML = '';
            Array.from(areaCheckboxes).filter(function(cb) { return cb.checked; }).forEach(function(checkbox) {
                createInlineChip(checkbox, areaChipsContainer);
            });
        }
    }

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
            searchFormSubmitted = false;
            window.saveFiltersToStorage();
        });
        li.appendChild(button);
        container.appendChild(li);
    }

    function updateClearFiltersVisibility() {
        var dueCheckboxes = document.querySelectorAll('.due-checkbox');
        var taskTypeCheckboxes = document.querySelectorAll('.task-type-checkbox');
        var meetingPurposeCheckboxes = document.querySelectorAll('.meeting-purpose-checkbox');
        var searchInput = document.getElementById('search-urn');
        var hasCheckedFilters = Array.from(taskAssigneeCheckboxes).some(function(cb) { return cb.checked; }) ||
            Array.from(areaCheckboxes).some(function(cb) { return cb.checked; }) ||
            Array.from(serviceCheckboxes).some(function(cb) { return cb.checked; }) ||
            Array.from(dueCheckboxes).some(function(cb) { return cb.checked; }) ||
            Array.from(taskTypeCheckboxes).some(function(cb) { return cb.checked; }) ||
            Array.from(meetingPurposeCheckboxes).some(function(cb) { return cb.checked; }) ||
            (searchInput && searchInput.value.trim() !== '');

        if (clearFiltersWrapper) {
            clearFiltersWrapper.style.display = hasCheckedFilters ? '' : 'none';
        }
    }

    // Apply filters to table rows using data attributes
    function applyTaskFilters() {
        var selectedAssignees = Array.from(document.querySelectorAll('.task-assignee-checkbox:checked'))
            .map(function(cb) { return cb.getAttribute('data-label'); });

        var selectedAreas = Array.from(document.querySelectorAll('.area-checkbox:checked'))
            .map(function(cb) { return cb.getAttribute('data-label'); });

        var selectedServices = Array.from(document.querySelectorAll('.service-checkbox:checked'))
            .map(function(cb) { return cb.getAttribute('data-label'); });

        var selectedDue = Array.from(document.querySelectorAll('.due-checkbox:checked'))
            .map(function(cb) { return cb.getAttribute('data-label'); });

        var selectedTaskTypes = Array.from(document.querySelectorAll('.task-type-checkbox:checked'))
            .map(function(cb) { return cb.getAttribute('data-label'); });

        var selectedMeetingPurposes = Array.from(document.querySelectorAll('.meeting-purpose-checkbox:checked'))
            .map(function(cb) { return cb.getAttribute('data-label'); });

        var searchInput = document.getElementById('search-urn');
        var searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';

        var hasSearchCriteria = selectedAssignees.length > 0 || selectedAreas.length > 0 ||
            selectedServices.length > 0 || selectedDue.length > 0 || selectedTaskTypes.length > 0 ||
            selectedMeetingPurposes.length > 0 || searchTerm !== '';

        var rows = document.querySelectorAll('.govuk-table__body .govuk-table__row');
        var visibleCount = 0;

        rows.forEach(function(row) {
            var shouldShow = true;

            if (!searchFormSubmitted || !hasSearchCriteria) {
                shouldShow = true;
            } else {
                // Search term filter - when search is active, it overrides other filters
                if (searchTerm !== '' && searchFormSubmitted) {
                    var victimName = (row.getAttribute('data-victim-name') || '').toLowerCase();
                    var caseReference = (row.getAttribute('data-case-reference') || '').toLowerCase();
                    shouldShow = victimName.indexOf(searchTerm) !== -1 || caseReference.indexOf(searchTerm) !== -1;
                } else {

                // Task assignee filter
                if (selectedAssignees.length > 0 && searchFormSubmitted) {
                    var rowAssignee = row.getAttribute('data-task-assignee') || '';
                    var matchesAssignee = selectedAssignees.some(function(assignee) {
                        var assigneeToMatch = assignee.replace(/\s*\(you\)\s*$/, '');
                        return rowAssignee.indexOf(assigneeToMatch) !== -1;
                    });
                    // Handle "Unassigned" filter
                    if (!matchesAssignee) {
                        matchesAssignee = selectedAssignees.some(function(assignee) {
                            return assignee === 'Unassigned' && rowAssignee === 'Unassigned';
                        });
                    }
                    shouldShow = shouldShow && matchesAssignee;
                }

                // Service filter
                if (selectedServices.length > 0 && searchFormSubmitted) {
                    var rowService = row.getAttribute('data-service') || '';
                    var matchesService = selectedServices.some(function(service) {
                        if (service === 'Not aligned') return rowService.indexOf('Not aligned') !== -1;
                        if (service === 'Not onboarded') return rowService.indexOf('Not onboarded') !== -1;
                        return rowService.toLowerCase().indexOf(service.toLowerCase()) !== -1;
                    });
                    shouldShow = shouldShow && matchesService;
                }

                // Area filter
                if (selectedAreas.length > 0 && searchFormSubmitted) {
                    var rowArea = row.getAttribute('data-area') || '';
                    var matchesArea = selectedAreas.some(function(area) {
                        return rowArea.indexOf(area) !== -1;
                    });
                    shouldShow = shouldShow && matchesArea;
                }

                // Due date filter
                if (selectedDue.length > 0 && searchFormSubmitted) {
                    var rowDueTag = row.getAttribute('data-due-tag') || '';
                    var matchesDue = selectedDue.some(function(due) {
                        if (due === 'Overdue') return rowDueTag === 'Overdue';
                        if (due === 'Due today') return rowDueTag === 'Due today';
                        return false;
                    });
                    shouldShow = shouldShow && matchesDue;
                }

                // Task type filter
                if (selectedTaskTypes.length > 0 && searchFormSubmitted) {
                    var rowTaskType = row.getAttribute('data-task-type') || '';
                    var matchesTaskType = selectedTaskTypes.some(function(taskType) {
                        if (taskType === 'Inform of a decision to charge') return rowTaskType.indexOf('decision to charge') !== -1 || rowTaskType === 'dtc';
                        if (taskType === 'Inform of a no further action decision') return rowTaskType.indexOf('no further action') !== -1 || rowTaskType === 'nfa';
                        if (taskType === 'Log offered meeting') return rowTaskType.indexOf('Log offered meeting') !== -1 || rowTaskType === 'meeting-offer';
                        if (taskType === 'Log offer response') return rowTaskType.indexOf('Log offer response') !== -1 || rowTaskType === 'offer-response';
                        if (taskType === 'Log arranged meeting') return rowTaskType.indexOf('Log arranged meeting') !== -1 || rowTaskType === 'meeting-arranged';
                        if (taskType === 'Log meeting outcome') return rowTaskType.indexOf('Log meeting outcome') !== -1 || rowTaskType === 'meeting-outcome';
                        if (taskType === 'Other') {
                            var knownTypes = ['decision to charge', 'no further action', 'stopped charge', 'substantially altered', 'Log offered meeting', 'Log arranged meeting', 'Log offer response', 'Log meeting outcome'];
                            return !knownTypes.some(function(known) { return rowTaskType.indexOf(known) !== -1; }) && rowTaskType !== 'dtc' && rowTaskType !== 'nfa' && rowTaskType !== 'meeting-offer' && rowTaskType !== 'meeting-arranged' && rowTaskType !== 'meeting-outcome' && rowTaskType !== 'offer-response';
                        }
                        return rowTaskType.indexOf(taskType) !== -1;
                    });
                    shouldShow = shouldShow && matchesTaskType;
                }

                // Meeting purpose filter
                if (selectedMeetingPurposes.length > 0 && searchFormSubmitted) {
                    var rowPurpose = row.getAttribute('data-purpose') || '';
                    var matchesPurpose = selectedMeetingPurposes.some(function(purpose) {
                        if (purpose === 'CPS pre-trial meeting') return rowPurpose.indexOf('pre-trial') !== -1;
                        if (purpose === 'Inform victim about charging decision') return rowPurpose.indexOf('charging-decision') !== -1;
                        if (purpose === 'Stopped or substantially altered charge (VCL Scheme)') return rowPurpose.indexOf('stopped-altered') !== -1;
                        if (purpose === "Victims' Right to Review (VRR)") return rowPurpose.indexOf('vrr') !== -1;
                        if (purpose === 'Victim complaint') return rowPurpose.indexOf('complaint') !== -1;
                        if (purpose === 'Other') return rowPurpose === 'other';
                        return rowPurpose.indexOf(purpose) !== -1;
                    });
                    shouldShow = shouldShow && matchesPurpose;
                }
                }
            }

            row.setAttribute('data-filtered', shouldShow ? 'visible' : 'hidden');
            row.style.display = shouldShow ? '' : 'none';

            if (shouldShow) visibleCount++;
        });

        // No results message
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
            if (resultsDivider) resultsDivider.style.display = 'none';
        } else if (noResultsMessage) {
            noResultsMessage.style.display = 'none';
            if (resultsDivider) resultsDivider.style.display = '';
        }

        updateResultsCount(visibleCount);

        if (window.recalculatePagination) window.recalculatePagination();
    }

    function updateResultsCount(visibleCount) {
        var resultsCountTop = document.getElementById('results-count');
        var paginationNav = document.querySelector('.govuk-pagination');
        var sortedByText = document.getElementById('sorted-by-text');

        var totalTasks = document.querySelectorAll('.govuk-table__body .govuk-table__row').length;
        var countToShow = searchFormSubmitted ? visibleCount : totalTasks;

        if (resultsCountTop) {
            var RESULTS_PER_PAGE = 10;
            var startResult = 1;
            var endResult = Math.min(RESULTS_PER_PAGE, countToShow);
            var resultsText = 'Showing results ' + startResult + ' to ' + endResult + ' of ' + countToShow + ' total results';
            resultsCountTop.textContent = resultsText;
            resultsCountTop.style.display = countToShow === 0 ? 'none' : '';
        }

        if (paginationNav) paginationNav.style.display = countToShow === 0 ? 'none' : '';
        if (sortedByText) sortedByText.style.display = countToShow === 0 ? 'none' : '';
    }

    // Clear filters
    var clearFiltersLink = document.querySelector('#clear-filters-wrapper a');
    if (clearFiltersLink) {
        clearFiltersLink.addEventListener('click', function(e) {
            e.preventDefault();
            function uncheckAndTriggerChange(items) {
                items.forEach(function(item) {
                    item.checked = false;
                    item.dispatchEvent(new Event('change', { bubbles: true }));
                });
            }

            uncheckAndTriggerChange(taskAssigneeCheckboxes);
            uncheckAndTriggerChange(areaCheckboxes);
            uncheckAndTriggerChange(serviceCheckboxes);
            uncheckAndTriggerChange(document.querySelectorAll('.due-checkbox'));
            uncheckAndTriggerChange(document.querySelectorAll('.task-type-checkbox'));
            uncheckAndTriggerChange(document.querySelectorAll('.meeting-purpose-checkbox'));

            var assigneeInput = document.querySelector('#assignee-autocomplete-input');
            if (assigneeInput) assigneeInput.value = '';
            var areaInput = document.querySelector('#area-autocomplete-input');
            if (areaInput) areaInput.value = '';

            var searchUrnInput = document.getElementById('search-urn');
            if (searchUrnInput) searchUrnInput.value = '';
            var clearSearchWrapper = document.getElementById('clear-search-wrapper');
            if (clearSearchWrapper) clearSearchWrapper.style.display = 'none';

            if (taskAssigneeChipsContainer) taskAssigneeChipsContainer.innerHTML = '';
            if (areaChipsContainer) areaChipsContainer.innerHTML = '';

            searchFormSubmitted = false;
            updateClearFiltersVisibility();
            applyTaskFilters();
            window.saveFiltersToStorage();
            if (window.renderSelectedFilters) window.renderSelectedFilters();
        });
    }

    renderInlineChips();

    window.renderInlineChips = renderInlineChips;
    window.applyTaskFilters = applyTaskFilters;
    window.updateClearFiltersVisibility = updateClearFiltersVisibility;
})();

// Handle form submission (Apply filters button)
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

    var applyBtn = document.getElementById('apply-filters-button');
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            applyFilters();
        });
    }

    attachFormListener();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachFormListener);
    }
})();

// Search input is now inside filters-form, handled by the Apply filters button.
// No separate search form handler needed.

// ===== Table Pagination =====
(function() {
    var RESULTS_PER_PAGE = 10;

    function recalculatePagination() {
        var rows = document.querySelectorAll('.govuk-table__body .govuk-table__row');
        var visibleRecords = 0;

        rows.forEach(function(row) {
            if (row.getAttribute('data-filtered') !== 'hidden') {
                visibleRecords++;
            }
        });

        if (!searchFormSubmitted) {
            visibleRecords = rows.length;
        }

        var totalPages = Math.ceil(visibleRecords / RESULTS_PER_PAGE) || 1;

        var paginationNav = document.querySelector('.govuk-pagination');
        var resultsCountTop = document.getElementById('results-count');
        var sortedByText = document.getElementById('sorted-by-text');

        if (visibleRecords === 0 && searchFormSubmitted) {
            if (paginationNav) paginationNav.style.display = 'none';
            if (resultsCountTop) resultsCountTop.style.display = 'none';
            if (sortedByText) sortedByText.style.display = 'none';
            return;
        } else {
            if (resultsCountTop) resultsCountTop.style.display = '';
            if (sortedByText) sortedByText.style.display = '';
        }

        PaginationCore.updatePaginationPages(totalPages);
        showPage(1, totalPages);
    }

    function showPage(pageNumber, totalPages) {
        if (!totalPages) {
            var rows = document.querySelectorAll('.govuk-table__body .govuk-table__row');
            var visibleCount = 0;
            rows.forEach(function(row) {
                if (row.getAttribute('data-filtered') !== 'hidden') visibleCount++;
            });
            if (!searchFormSubmitted) visibleCount = rows.length;
            totalPages = Math.ceil(visibleCount / RESULTS_PER_PAGE) || 1;
        }

        if (pageNumber < 1 || pageNumber > totalPages) return;

        var allRows = document.querySelectorAll('.govuk-table__body .govuk-table__row');
        var visibleRows = [];

        allRows.forEach(function(row) {
            if (row.getAttribute('data-filtered') !== 'hidden') {
                visibleRows.push(row);
            } else if (!searchFormSubmitted) {
                visibleRows.push(row);
            }
        });

        var startIndex = (pageNumber - 1) * RESULTS_PER_PAGE;
        var endIndex = startIndex + RESULTS_PER_PAGE;

        // Hide all rows first
        allRows.forEach(function(row) {
            row.style.display = 'none';
        });

        // Show only rows for current page
        for (var i = startIndex; i < endIndex && i < visibleRows.length; i++) {
            visibleRows[i].style.display = '';
        }

        PaginationCore.updatePaginationPages(totalPages, pageNumber);

        var prevButton = document.getElementById('pagination-prev');
        var nextButton = document.getElementById('pagination-next');

        if (prevButton && prevButton.parentElement) {
            prevButton.parentElement.style.display = pageNumber === 1 ? 'none' : '';
            if (pageNumber > 1) prevButton.setAttribute('data-page', pageNumber - 1);
        }

        if (nextButton && nextButton.parentElement) {
            nextButton.parentElement.style.display = pageNumber === totalPages ? 'none' : '';
            if (pageNumber < totalPages) nextButton.setAttribute('data-page', pageNumber + 1);
        }

        // Update results count
        var resultsCountTop = document.getElementById('results-count');
        var firstResult = startIndex + 1;
        var lastResult = Math.min(endIndex, visibleRows.length);
        var resultsText = 'Showing results ' + firstResult + ' to ' + lastResult + ' of ' + visibleRows.length + ' total results';
        if (resultsCountTop) resultsCountTop.textContent = resultsText;

        if (initialSetupComplete) {
            var heading = document.getElementById('main-heading');
            if (heading) {
                heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    function init() {
        PaginationCore.setupPaginationListeners(showPage);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.recalculatePagination = recalculatePagination;
    window.showPage = showPage;
    window.updatePaginationPages = PaginationCore.updatePaginationPages;
})();

// Restore filter settings from localStorage
var filtersRestored = window.restoreFiltersFromStorage();

// Apply default filters on initial session
if (!filtersRestored) {
    var thompsonCheckbox = document.getElementById('task-assignee-1');
    if (thompsonCheckbox) {
        thompsonCheckbox.checked = true;
    }
    searchFormSubmitted = true;
    window.saveFiltersToStorage();
}

// Apply filters on page load
if (window.applyTaskFilters) window.applyTaskFilters();

// Render chips on page load
if (window.renderInlineChips) window.renderInlineChips();

// Update clear filters visibility
if (window.updateClearFiltersVisibility) window.updateClearFiltersVisibility();

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

        var assigneeChips = [];
        document.querySelectorAll('.task-assignee-checkbox:checked').forEach(function(cb) {
            assigneeChips.push({ label: cb.getAttribute('data-label'), input: cb });
        });
        var serviceChips = [];
        document.querySelectorAll('.service-checkbox:checked').forEach(function(cb) {
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

        // Add search term as a chip
        var searchInput = document.getElementById('search-urn');
        var searchTerm = searchInput ? searchInput.value.trim() : '';
        var searchChips = [];
        if (searchTerm !== '') {
            searchChips.push({ label: searchTerm, input: searchInput });
            totalChips++;
        }

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
                    if (chip.input && chip.input.type === 'checkbox') {
                        chip.input.checked = false;
                        chip.input.dispatchEvent(new Event('change', { bubbles: true }));
                    } else if (chip.input && chip.input.type === 'text') {
                        chip.input.value = '';
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

        createSubSection('Case reference or victim name', searchChips);
        createSubSection('Task assignee', assigneeChips);
        createSubSection('Service lead', serviceChips);
        createSubSection('CPS area', areaChips);
        createSubSection('Due', dueChips);
        createSubSection('Task type', taskTypeChips);
        createSubSection('Meeting purpose', meetingPurposeChips);
        isRenderingSelectedFilters = false;
    }
    window.renderSelectedFilters = renderSelectedFilters;

    document.querySelectorAll('.task-assignee-checkbox, .area-checkbox, .service-checkbox, .due-checkbox, .task-type-checkbox, .meeting-purpose-checkbox').forEach(function(cb) {
        cb.addEventListener('change', function() {
            renderSelectedFilters();
        });
    });

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
            document.querySelectorAll('.task-assignee-checkbox').forEach(function(cb) { cb.checked = false; });
            document.querySelectorAll('.area-checkbox').forEach(function(cb) { cb.checked = false; });
            document.querySelectorAll('.service-checkbox').forEach(function(cb) { cb.checked = false; });
            document.querySelectorAll('.due-checkbox').forEach(function(cb) { cb.checked = false; });
            document.querySelectorAll('.task-type-checkbox').forEach(function(cb) { cb.checked = false; });
            document.querySelectorAll('.meeting-purpose-checkbox').forEach(function(cb) { cb.checked = false; });
            var assigneeInput = document.querySelector('#assignee-autocomplete-input');
            if (assigneeInput) assigneeInput.value = '';
            var areaInput = document.querySelector('#area-autocomplete-input');
            if (areaInput) areaInput.value = '';
            var searchInput = document.getElementById('search-urn');
            if (searchInput) searchInput.value = '';
            var clearSearchWrapper = document.getElementById('clear-search-wrapper');
            if (clearSearchWrapper) clearSearchWrapper.style.display = 'none';
            if (assigneeChipsEl) assigneeChipsEl.innerHTML = '';
            if (areaChipsEl) areaChipsEl.innerHTML = '';
            searchFormSubmitted = true;
            if (window.applyTaskFilters) window.applyTaskFilters();
            if (window.renderInlineChips) window.renderInlineChips();
            if (window.saveFiltersToStorage) window.saveFiltersToStorage();
            if (window.updateClearFiltersVisibility) window.updateClearFiltersVisibility();
            renderSelectedFilters();
        });
    }

    renderSelectedFilters();
})();

// Show success banner if URL has success params
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
            if (taskContainer) taskContainer.style.display = 'none';
        }

        if (banner) banner.style.display = 'block';
        url.searchParams.delete('success');
        url.searchParams.delete('successReason');
        window.history.replaceState({}, document.title, url.pathname + url.search);
    }
})();
