// Initialize GOV.UK radios module for conditional reveal
if (window.GOVUKFrontend && window.GOVUKFrontend.Radios) {
var radios = new GOVUKFrontend.Radios(document.querySelector('[data-module="govuk-radios"]'));
}

// Track whether search criteria form has been submitted
var searchFormSubmitted = false;

// Track whether initial page setup is complete
var initialSetupComplete = false;

// ===== localStorage Persistence for Victims Filters =====
// Store and restore filter settings when navigating away and returning
(function() {
    var STORAGE_KEY = 'vca-victims-filters';
    
    // Function to save all filter states to localStorage
    function saveFiltersToStorage() {
        var state = {
            vloChecked: [],
            serviceAreaVloChecked: [],
            victimChecked: [],
            areaChecked: [],
            serviceChecked: [],
            victimCategoryChecked: [],
            onboardedChecked: [],
            searchFormSubmitted: searchFormSubmitted,
            searchByValue: '',
            caseReferenceValue: document.getElementById('search-urn') ? document.getElementById('search-urn').value : '',
            searchUrnValue: document.getElementById('search-urn') ? document.getElementById('search-urn').value : '',
            vloInput: document.querySelector('#vlo-autocomplete-input') ? document.querySelector('#vlo-autocomplete-input').value : '',
            victimInput: document.querySelector('#victim-autocomplete-input') ? document.querySelector('#victim-autocomplete-input').value : '',
            areaInput: document.querySelector('#area-autocomplete-input') ? document.querySelector('#area-autocomplete-input').value : ''
        };
        
        // Collect selected "Search by" radio
        var searchByRadios = document.querySelectorAll('input[name="searchBy"]');
        searchByRadios.forEach(function(radio) {
            if (radio.checked) {
                state.searchByValue = radio.value;
            }
        });
        
        // Collect checked VLO checkboxes
        document.querySelectorAll('.vlo-checkbox').forEach(function(cb) {
            if (cb.checked) {
                state.vloChecked.push(cb.id);
            }
        });
        
        // Collect checked Service Area VLO checkboxes
        document.querySelectorAll('.service-area-vlo-checkbox').forEach(function(cb) {
            if (cb.checked) {
                state.serviceAreaVloChecked.push(cb.id);
            }
        });
        
        // Collect checked Victim checkboxes
        document.querySelectorAll('.victim-checkbox').forEach(function(cb) {
            if (cb.checked) {
                state.victimChecked.push(cb.id);
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
        
        // Collect checked Victim Category checkboxes
        document.querySelectorAll('.victim-category-checkbox').forEach(function(cb) {
            if (cb.checked) {
                state.victimCategoryChecked.push(cb.id);
            }
        });
        
        // Collect checked Onboarded checkboxes
        document.querySelectorAll('.onboarded-checkbox').forEach(function(cb) {
            if (cb.checked) {
                state.onboardedChecked.push(cb.id);
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
            
            // If we have saved state, consider it restored (even if no filters are selected)
            // This prevents default settings from being applied when user has intentionally
            // configured a different search setup
            
            // Restore VLO checkboxes
            if (state.vloChecked) {
                state.vloChecked.forEach(function(id) {
                    var checkbox = document.getElementById(id);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }
            
            // Restore Service Area VLO checkboxes
            if (state.serviceAreaVloChecked) {
                state.serviceAreaVloChecked.forEach(function(id) {
                    var checkbox = document.getElementById(id);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }
            
            // Restore Victim checkboxes
            if (state.victimChecked) {
                state.victimChecked.forEach(function(id) {
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
            
            // Restore Victim Category checkboxes
            if (state.victimCategoryChecked) {
                state.victimCategoryChecked.forEach(function(id) {
                    var checkbox = document.getElementById(id);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }
            
            // Restore Onboarded checkboxes
            if (state.onboardedChecked) {
                state.onboardedChecked.forEach(function(id) {
                    var checkbox = document.getElementById(id);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }
            
            // Restore search form submitted state
            searchFormSubmitted = state.searchFormSubmitted || false;
            
            // Restore "Search by" radio selection
            if (state.searchByValue) {
                var searchByRadios = document.querySelectorAll('input[name="searchBy"]');
                searchByRadios.forEach(function(radio) {
                    if (radio.value === state.searchByValue) {
                        radio.checked = true;
                    }
                });
            }
            
            // Restore search URN/Case reference input value
            var searchInput = document.getElementById('search-urn');
            if (searchInput && state.caseReferenceValue) {
                searchInput.value = state.caseReferenceValue;
            }
            
            // Restore VLO autocomplete input
            var vloInput = document.querySelector('#vlo-autocomplete-input');
            if (vloInput && state.vloInput) {
                vloInput.value = state.vloInput;
            }
            
            // Restore Victim autocomplete input
            var victimInput = document.querySelector('#victim-autocomplete-input');
            if (victimInput && state.victimInput) {
                victimInput.value = state.victimInput;
            }
            
            // Restore Area autocomplete input
            var areaInput = document.querySelector('#area-autocomplete-input');
            if (areaInput && state.areaInput) {
                areaInput.value = state.areaInput;
            }
            
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

// Handle Victim liaison officer filter chips
(function () {
var vloCheckboxes = document.querySelectorAll('.vlo-checkbox');
var victimCheckboxes = document.querySelectorAll('.victim-checkbox');
var areaCheckboxes = document.querySelectorAll('.area-checkbox');
var serviceRadios = document.querySelectorAll('.service-radio');
var victimCategoryCheckboxes = document.querySelectorAll('.victim-category-checkbox');
var clearFiltersWrapper = document.getElementById('clear-filters-wrapper');

// Update visibility of clear filters link
function updateClearFiltersVisibility() {
    var hasCheckedFilters = Array.from(vloCheckboxes).some(function (checkbox) {
    return checkbox.checked;
    }) || Array.from(victimCheckboxes).some(function (checkbox) {
    return checkbox.checked;
    }) || Array.from(areaCheckboxes).some(function (checkbox) {
    return checkbox.checked;
    }) || Array.from(serviceRadios).some(function (radio) {
    return radio.checked;
    }) || Array.from(victimCategoryCheckboxes).some(function (checkbox) {
    return checkbox.checked;
    });
    clearFiltersWrapper.style.display = hasCheckedFilters ? '' : 'none';
    
    // Update heading text and tag
    var heading = document.getElementById('selected-filters-heading');
    if (heading) {
        var newText = hasCheckedFilters ? 'Selected filters' : 'No filters selected';
        
        // If we need to change the tag type
        if (hasCheckedFilters && heading.tagName !== 'H2') {
            var h2 = document.createElement('h2');
            h2.id = heading.id;
            h2.className = 'govuk-heading-m';
            h2.textContent = newText;
            heading.parentNode.replaceChild(h2, heading);
        } else if (!hasCheckedFilters && heading.tagName !== 'P') {
            var p = document.createElement('p');
            p.id = heading.id;
            p.className = 'govuk-body';
            p.textContent = newText;
            heading.parentNode.replaceChild(p, heading);
        } else {
            // Same tag type, just update text
            heading.textContent = newText;
        }
    }
}

// Apply filters to victim list
function applyVictimFilters() {
    var vloCheckboxes = document.querySelectorAll('.vlo-checkbox');
    var serviceAreaVloCheckboxes = document.querySelectorAll('.service-area-vlo-checkbox');
    var victimCheckboxes = document.querySelectorAll('.victim-checkbox');
    var areaCheckboxes = document.querySelectorAll('.area-checkbox');
    var serviceRadios = document.querySelectorAll('.service-radio');
    var victimCategoryCheckboxes = document.querySelectorAll('.victim-category-checkbox');
    
    // Get all checked filter values - combine VLO checkboxes from both forms
    var selectedVlos = Array.from(vloCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.getAttribute('data-label'); });
    
    // Also include service-area-vlo checkboxes
    var selectedServiceAreaVlos = Array.from(serviceAreaVloCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.getAttribute('data-label'); });
    
    // Combine both VLO selections
    selectedVlos = selectedVlos.concat(selectedServiceAreaVlos);
    
    var selectedVictims = Array.from(victimCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.getAttribute('data-label'); });
    
    var selectedAreas = Array.from(areaCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.getAttribute('data-label'); });
    
    var selectedServices = Array.from(serviceRadios)
        .filter(function(radio) { return radio.checked; })
        .map(function(radio) { return radio.getAttribute('data-label'); });
    
    var selectedVictimCategories = Array.from(victimCategoryCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.value; });
    
    // Determine if any immediate filters are active (Victim, Category)
    var hasImmediateFilters = selectedVictims.length > 0 || 
                              selectedVictimCategories.length > 0;
    
    // Determine if search criteria filters are active (Service, Area, VLO)
    var hasSearchCriteria = selectedAreas.length > 0 || selectedServices.length > 0 || selectedVlos.length > 0;
    
    // Show victims/filters only if: immediate filters are selected OR search form was submitted
    var shouldShowResults = hasImmediateFilters || (searchFormSubmitted && hasSearchCriteria);
    
    // Get search input value
    var searchInput = document.getElementById('search-urn');
    var searchTerm = searchInput ? searchInput.value.trim() : '';
    
    // Show/hide victims container based on whether there are active filters or search
    var victimContainer = document.getElementById('victims-container');
    var paginationNav = document.querySelector('nav.govuk-pagination');
    var filtersSection = document.getElementById('filters-section');
    
    if (victimContainer) {
        victimContainer.style.display = (shouldShowResults || searchTerm !== '') ? '' : 'none';
    }
    if (paginationNav) {
        paginationNav.style.display = (shouldShowResults || searchTerm !== '') ? '' : 'none';
    }
    // Don't show filters section yet - it will be shown after we calculate visibleCount
    
    // Get all summary lists (victim records)
    var victimRecords = document.querySelectorAll('.govuk-summary-list');
    var visibleCount = 0;
    
    victimRecords.forEach(function(record) {
        var shouldShow = true;
        var recordText = record.textContent || '';
        
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
        
        // Check Victim liaison officer filter (only apply if search form has been submitted)
        if (selectedVlos.length > 0 && searchFormSubmitted) {
            var recordVlo = getFieldValue('Victim liaison officer');
            var matchesVlo = selectedVlos.some(function(selectedVlo) {
                // Remove "(you)" suffix from selected VLO label for matching
                var vloToMatch = selectedVlo.replace(/\s*\(you\)\s*$/, '');
                return recordVlo.indexOf(vloToMatch) !== -1;
            });
            shouldShow = shouldShow && matchesVlo;
        }
        
        // Check Victim filter
        if (selectedVictims.length > 0) {
            var victimName = record.querySelector('h2');
            var victimText = victimName ? victimName.textContent.trim() : '';
            var matchesVictim = selectedVictims.some(function(victim) {
                return victimText.indexOf(victim) !== -1;
            });
            shouldShow = shouldShow && matchesVictim;
        }
        
        // Check Service filter (only apply if search form has been submitted)
        if (selectedServices.length > 0 && searchFormSubmitted) {
            // Get the helper function to extract field values
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
            
            var matchesService = selectedServices.some(function(service) {
                // Special handling for "Not onboarded" service filter
                if (service === 'Not onboarded') {
                    var serviceValue = getFieldValue('Service');
                    // Check if the Service field shows "Not onboarded"
                    return serviceValue.indexOf('Not onboarded') !== -1;
                }
                // For regular services, check if service text exists in the Service field
                var serviceValue = getFieldValue('Service');
                return serviceValue.indexOf(service) !== -1;
            });
            shouldShow = shouldShow && matchesService;
        }
        
        // Check Area filter (only apply if search form has been submitted)
        if (selectedAreas.length > 0 && searchFormSubmitted) {
            // Area information would need to be in the victim record
            // For now, check if area text exists in the record
            var matchesArea = selectedAreas.some(function(area) {
                return recordText.indexOf(area) !== -1;
            });
            shouldShow = shouldShow && matchesArea;
        }
        
        // Check Victim Category filter
        if (selectedVictimCategories.length > 0) {
            var victimCategory = getFieldValue('Victim category');
            var matchesCategory = selectedVictimCategories.some(function(category) {
                return victimCategory.toLowerCase() === category.toLowerCase();
            });
            shouldShow = shouldShow && matchesCategory;
        }
        
        
        // Mark record as filtered or not using data attribute (pagination uses this)
        record.setAttribute('data-filtered', shouldShow ? 'visible' : 'hidden');
        // Initially show/hide based on filter (pagination will override display for visible records)
        record.style.display = shouldShow ? '' : 'none';
        if (shouldShow) {
            visibleCount++;
        }
    });
    
    // Show "no results" message if no victims match filters (only when results area is visible)
    var noResultsMessage = document.getElementById('no-results-message');
    var isResultsAreaVisible = shouldShowResults || searchTerm !== '';
    if (visibleCount === 0 && isResultsAreaVisible) {
        if (!noResultsMessage) {
            noResultsMessage = document.createElement('div');
            noResultsMessage.id = 'no-results-message';
            noResultsMessage.className = 'govuk-inset-text govuk-!-margin-top-0';
            noResultsMessage.textContent = 'No results found. Try changing your search criteria.';
            var victimContainer = document.getElementById('victims-container');
            if (victimContainer) {
                victimContainer.parentNode.insertBefore(noResultsMessage, victimContainer.nextSibling);
            }
        }
        noResultsMessage.style.display = '';
    } else if (noResultsMessage) {
        noResultsMessage.style.display = 'none';
    }
    
    // Show/hide filters section - show if search results are displayed
    if (filtersSection) {
        filtersSection.style.display = (shouldShowResults || searchTerm !== '') ? '' : 'none';
    }
    
    // Hide Service row if Onboarded is "No"
    hideServiceRowWhenOnboardedNo();
    
    // Recalculate pagination to limit results to 5 per page
    if (window.recalculatePagination) {
        window.recalculatePagination();
    }
}

// Hide Service and Victim liaison officer rows when Onboarded value is "No"
function hideServiceRowWhenOnboardedNo() {
    var victimRecords = document.querySelectorAll('.govuk-summary-list');
    
    victimRecords.forEach(function(record) {
        // Skip if record is hidden
        if (record.style.display === 'none') {
            return;
        }
        
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
        
        // Get the Onboarded value
        var onboardedValue = getFieldValue('Onboarded');
        var onboardedMatch = onboardedValue.match(/^(Yes|No)/i);
        var onboardedStatus = onboardedMatch ? onboardedMatch[1].toLowerCase() : '';
        
        // Find and hide/show the Victim liaison officer row only
        var rows = record.querySelectorAll('.govuk-summary-list__row');
        rows.forEach(function(row) {
            var keyEl = row.querySelector('.govuk-summary-list__key');
            if (keyEl) {
                var fieldName = keyEl.textContent.trim();
                // Hide the Victim liaison officer row if Onboarded is "No", otherwise show it
                // Service row should always be visible
                if (fieldName === 'Victim liaison officer') {
                    row.style.display = onboardedStatus === 'no' ? 'none' : '';
                }
            }
        });
    });
}

// Dynamic pagination based on filtered results
(function() {
    var RESULTS_PER_PAGE = 5;
    
    function recalculatePagination() {
        var victimPages = document.querySelectorAll('.victims-page');
        var victimRecords = document.querySelectorAll('.govuk-summary-list');
        
        // Show all pages initially to count visible records
        victimPages.forEach(function(page) {
            page.style.display = '';
        });
        
        // Count visible records across all pages (use data-filtered attribute)
        var visibleRecords = 0;
        victimRecords.forEach(function(record) {
            if (record.getAttribute('data-filtered') === 'visible') {
                visibleRecords++;
            }
        });
        
        // Calculate total pages needed
        var totalPages = Math.ceil(visibleRecords / RESULTS_PER_PAGE) || 1;
        
        // Get UI elements that should be hidden when no results
        var paginationNav = document.querySelector('.govuk-pagination');
        var resultsCountTop = document.getElementById('results-count');
        var resultsCountBottom = document.getElementById('results-count-bottom');
        var sortedByText = document.getElementById('sorted-by-text');
        var resultsDivider = document.getElementById('results-divider');
        
        // Hide pagination, results count, sorted-by text, and divider when no results
        if (visibleRecords === 0) {
            if (paginationNav) paginationNav.style.display = 'none';
            if (resultsCountTop) resultsCountTop.style.display = 'none';
            if (resultsCountBottom) resultsCountBottom.style.display = 'none';
            if (sortedByText) sortedByText.style.display = 'none';
            if (resultsDivider) resultsDivider.style.display = 'none';
            return;
        } else {
            // Show these elements when there are results
            if (resultsCountTop) resultsCountTop.style.display = '';
            if (resultsCountBottom) resultsCountBottom.style.display = '';
            if (sortedByText) sortedByText.style.display = '';
            if (resultsDivider) resultsDivider.style.display = '';
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
        // Pattern: show first page, last page, current page, and pages immediately around current
        // Use ellipses (...) to replace skipped pages
        var pagesToShow = getPagesToShow(currentPage, totalPages);
        
        // Build pagination items
        var previousPageNum = null;
        pagesToShow.forEach(function(pageNum) {
            // Add ellipsis if there's a gap
            if (previousPageNum !== null && pageNum > previousPageNum + 1) {
                var ellipsisItem = document.createElement('li');
                ellipsisItem.className = 'govuk-pagination__item govuk-pagination__item--ellipses';
                ellipsisItem.textContent = '⋯'; // Midline horizontal ellipsis (GOV.UK standard)
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
    // Examples from the design system:
    // [1] 2 ... 100           (page 1)
    // 1 [2] 3 ... 100         (page 2)
    // 1 2 [3] 4 ... 100       (page 3)
    // 1 2 3 [4] 5 ... 100     (page 4)
    // 1 ... 4 [5] 6 ... 100   (page 5, middle)
    // 1 ... 97 [98] 99 100    (page 98)
    // 1 ... 98 [99] 100       (page 99)
    // 1 ... 99 [100]          (page 100)
    function getPagesToShow(currentPage, totalPages) {
        var pages = [];
        
        // If 7 or fewer pages, show all of them (no ellipsis needed)
        if (totalPages <= 7) {
            for (var i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }
        
        // Always include first page
        pages.push(1);
        
        // Near the start: show 1 2 3 4 5 ... last
        if (currentPage <= 4) {
            for (var i = 2; i <= Math.min(currentPage + 1, 5); i++) {
                pages.push(i);
            }
            pages.push(totalPages);
            return pages;
        }
        
        // Near the end: show 1 ... (last-4) (last-3) (last-2) (last-1) last
        if (currentPage >= totalPages - 3) {
            for (var i = Math.max(currentPage - 1, totalPages - 4); i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }
        
        // Middle: show 1 ... (current-1) current (current+1) ... last
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push(totalPages);
        
        return pages;
    }
    
    function showPage(pageNumber, totalPages) {
        // Calculate totalPages dynamically if not provided
        if (!totalPages) {
            var victimRecords = document.querySelectorAll('.govuk-summary-list');
            var visibleCount = 0;
            victimRecords.forEach(function(record) {
                if (record.getAttribute('data-filtered') === 'visible') {
                    visibleCount++;
                }
            });
            totalPages = Math.ceil(visibleCount / RESULTS_PER_PAGE) || 1;
        }
        
        // Validate page number
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }
        
        var victimRecords = document.querySelectorAll('.govuk-summary-list');
        var visibleRecords = [];
        
        // Show all pages first so we can see all records
        var victimPages = document.querySelectorAll('.victims-page');
        victimPages.forEach(function(page) {
            page.style.display = '';
        });
        
        // Collect all records that pass filters (use data-filtered attribute)
        victimRecords.forEach(function(record) {
            if (record.getAttribute('data-filtered') === 'visible') {
                visibleRecords.push(record);
            }
        });
        
        // Calculate which records belong on this page
        var startIndex = (pageNumber - 1) * RESULTS_PER_PAGE;
        var endIndex = startIndex + RESULTS_PER_PAGE;
        
        // Hide all records (both filtered and non-filtered)
        victimRecords.forEach(function(record) {
            record.style.display = 'none';
        });
        
        // Show only records for current page
        for (var i = startIndex; i < endIndex && i < visibleRecords.length; i++) {
            visibleRecords[i].style.display = '';
            // Also ensure parent victims-page is visible
            var parentPage = visibleRecords[i].closest('.victims-page');
            if (parentPage) {
                parentPage.style.display = '';
            }
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
        
        // Update page title for screen readers
        document.title = 'Victims (page ' + pageNumber + ' of ' + totalPages + ')';
        
        // Update results count text (both top and bottom elements)
        var resultsCountTop = document.getElementById('results-count');
        var resultsCountBottom = document.getElementById('results-count-bottom');
        var firstResult = startIndex + 1;
        var lastResult = Math.min(endIndex, visibleRecords.length);
        var resultsText = 'Showing results ' + firstResult + ' to ' + lastResult + ' of ' + visibleRecords.length + ' total results';
        if (resultsCountTop) resultsCountTop.textContent = resultsText;
        if (resultsCountBottom) resultsCountBottom.textContent = resultsText;
        
        // Scroll to top of results
        var container = document.getElementById('victims-container');
        if (container) {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            // Only show pagination if there are multiple pages
            var pageItems = document.querySelectorAll('.govuk-pagination__item');
            if (pageItems.length > 1) {
                var paginationNav = document.querySelector('.govuk-pagination');
                if (paginationNav) {
                    paginationNav.style.display = '';
                }
            }
        });
    } else {
        setupPaginationListeners();
        // Only show pagination if there are multiple pages
        var pageItems = document.querySelectorAll('.govuk-pagination__item');
        if (pageItems.length > 1) {
            var paginationNav = document.querySelector('.govuk-pagination');
            if (paginationNav) {
                paginationNav.style.display = '';
            }
        }
    }
    
    // Make functions available globally
    window.recalculatePagination = recalculatePagination;
    window.showPage = showPage;
    window.updatePaginationPages = updatePaginationPages;

})();

// Search functionality for victim or case reference
(function() {
    var searchForm = document.querySelector('.moj-search form');
    var searchInput = document.getElementById('search-urn');
    var clearSearchWrapper = document.getElementById('clear-search-wrapper');
    var clearSearchLink = document.getElementById('clear-search-link');
    
    if (!searchForm || !searchInput) {
        return;
    }
    
    function applySearch() {
        var searchTerm = searchInput.value.trim().toLowerCase();
        var victimRecords = document.querySelectorAll('.govuk-summary-list');
        var visibleCount = 0;
        
        // Get the victims container and pagination
        var victimContainer = document.getElementById('victims-container');
        var paginationNav = document.querySelector('nav.govuk-pagination');
        
        // Show victims container when search is applied, hide when search is cleared
        if (victimContainer) {
            if (searchTerm !== '') {
                victimContainer.style.display = '';
            } else {
                victimContainer.style.display = 'none';
            }
        }
        
        // Hide pagination when search is cleared
        if (paginationNav) {
            if (searchTerm !== '') {
                paginationNav.style.display = '';
            } else {
                paginationNav.style.display = 'none';
            }
        }
        
        // First, reset all records to visible (clear previous search results)
        victimRecords.forEach(function(record) {
            record.style.display = '';
        });
        
        // Then apply the new search and filter
        victimRecords.forEach(function(record) {
            var victimName = '';
            var caseReference = '';
            
            // Extract victim name from the h2 heading
            var headingEl = record.querySelector('h2');
            if (headingEl) {
                var linkEl = headingEl.querySelector('a');
                victimName = linkEl ? linkEl.textContent.trim() : '';
            }
            
            // Helper function to extract specific field value
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
            
            caseReference = getFieldValue('Case reference');
            
            // Check if search term matches victim name or case reference
            var matchesSearch = false;
            if (searchTerm === '') {
                matchesSearch = true;
            } else {
                matchesSearch = victimName.toLowerCase().indexOf(searchTerm) !== -1 ||
                               caseReference.toLowerCase().indexOf(searchTerm) !== -1;
            }
            
            // Apply both search and filter visibility using data-filtered attribute
            var shouldShow = matchesSearch;
            record.setAttribute('data-filtered', shouldShow ? 'visible' : 'hidden');
            record.style.display = shouldShow ? '' : 'none';
            if (shouldShow) {
                visibleCount++;
            }
        });
        
        // Update clear search link visibility
        if (searchTerm !== '') {
            clearSearchWrapper.style.display = '';
        } else {
            clearSearchWrapper.style.display = 'none';
        }
        
        // Update or show "no results" message
        var noResultsMessage = document.getElementById('no-results-message');
        if (visibleCount === 0 && searchTerm !== '') {
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('div');
                noResultsMessage.id = 'no-results-message';
                noResultsMessage.className = 'govuk-inset-text govuk-!-margin-top-0';
                var victimContainer = document.getElementById('victims-container');
                if (victimContainer) {
                    victimContainer.parentNode.insertBefore(noResultsMessage, victimContainer.nextSibling);
                }
            }
            noResultsMessage.textContent = 'No victims match your search.';
            noResultsMessage.style.display = '';
        } else if (noResultsMessage) {
            noResultsMessage.style.display = 'none';
        }
        
        // Recalculate pagination to limit results to 5 per page
        if (window.recalculatePagination) {
            window.recalculatePagination();
        }
        
        // Recalculate pagination to limit results to 5 per page
        if (window.recalculatePagination) {
            window.recalculatePagination();
        }
    }
    
    // Handle search input change to show/hide clear link in real-time
    searchInput.addEventListener('input', function() {
        var searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            clearSearchWrapper.style.display = '';
        } else {
            clearSearchWrapper.style.display = 'none';
        }
    });
    
    // Handle search form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        applySearch();
        window.saveFiltersToStorage();
    });
    
    // Handle clear search link
    if (clearSearchLink) {
        clearSearchLink.addEventListener('click', function(e) {
            e.preventDefault();
            searchInput.value = '';
            clearSearchWrapper.style.display = 'none';
            applySearch();
            window.saveFiltersToStorage();
            searchInput.focus();
        });
    }
    
    // Expose applySearch globally for use by restore logic
    window.applySearch = applySearch;
})();

// Restore filter settings from localStorage if available
var filtersRestored = window.restoreFiltersFromStorage();

// Apply default filters on initial session (when no localStorage data exists)
if (!filtersRestored) {
    // Set default: "Search by Victim liaison officer" with "THOMPSON, Sarah (you)" selected
    var vloOnlyRadio = document.getElementById('search-by-vlo');
    if (vloOnlyRadio) {
        vloOnlyRadio.checked = true;
    }
    
    // Show the VLO-only form section
    var vloOnlyForm = document.getElementById('vlo-only-form');
    if (vloOnlyForm) {
        vloOnlyForm.style.display = '';
    }
    
    // Check the "THOMPSON, Sarah (you)" VLO checkbox
    var thompsonCheckbox = document.getElementById('vlo-only-1');
    if (thompsonCheckbox) {
        thompsonCheckbox.checked = true;
    }
    
    // Set searchFormSubmitted to true so filters are applied
    searchFormSubmitted = true;
    
    // Save the initial state to localStorage
    window.saveFiltersToStorage();
}

// Apply filters on page load if any are selected
applyVictimFilters();

// Hide Service row when Onboarded is "No" on page load
hideServiceRowWhenOnboardedNo();

// Render VLO chips on page load (after filters are restored)
if (window.renderVloChips) {
    window.renderVloChips();
}

// Render VLO-only chips on page load (for the VLO search form)
if (window.renderVloOnlyChips) {
    window.renderVloOnlyChips();
}

// Render Service Area VLO chips on page load (for the Service/Area search form)
if (window.renderServiceAreaVloChips) {
    window.renderServiceAreaVloChips();
}

// Render Area chips on page load (after filters are restored)
if (window.renderAreaChips) {
    window.renderAreaChips();
}

// Show checked victim items on page load
var victimCheckboxes = document.querySelectorAll('.victim-checkbox');
victimCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
        var parentItem = checkbox.closest('.govuk-checkboxes__item');
        if (parentItem) {
            parentItem.style.display = 'flex';
        }
    }
});

// Show the victim checkboxes container if there are checked items
var victimCheckboxesContainer = document.getElementById('victim-checkboxes-container');
if (Array.from(victimCheckboxes).some(function (cb) { return cb.checked; })) {
    victimCheckboxesContainer.style.display = '';
}

// Handle restored search form state visibility
(function() {
    var searchByRadios = document.querySelectorAll('input[name="searchBy"]');
    var caseReferenceSection = document.getElementById('case-reference-section');
    var serviceAreaForm = document.getElementById('service-area-form');
    var vloOnlyForm = document.getElementById('vlo-only-form');
    var selectedSearchCriteria = document.getElementById('selected-search-criteria');
    var searchCriteriaForm = document.getElementById('search-criteria-form');
    
    // Check which searchBy option is selected (restored from storage or default)
    var selectedSearchBy = '';
    searchByRadios.forEach(function(radio) {
        if (radio.checked) {
            selectedSearchBy = radio.value;
        }
    });
    
    // Show appropriate sections based on selected searchBy value
    if (selectedSearchBy === 'case-reference') {
        // Show case reference section, hide other forms
        if (caseReferenceSection) caseReferenceSection.style.display = '';
        if (serviceAreaForm) serviceAreaForm.style.display = 'none';
        if (vloOnlyForm) vloOnlyForm.style.display = 'none';
        if (selectedSearchCriteria) selectedSearchCriteria.style.display = 'none';
        
        // Also show the clear search link if there's a search value
        var searchInput = document.getElementById('search-urn');
        var clearSearchWrapper = document.getElementById('clear-search-wrapper');
        if (searchInput && searchInput.value && clearSearchWrapper) {
            clearSearchWrapper.style.display = '';
        }
        
        // Apply search to show results
        if (searchInput && searchInput.value && window.applySearch) {
            window.applySearch();
        }
    } else if (selectedSearchBy === 'service-area') {
        // Show service/area form
        if (caseReferenceSection) caseReferenceSection.style.display = 'none';
        if (serviceAreaForm) serviceAreaForm.style.display = '';
        if (vloOnlyForm) vloOnlyForm.style.display = 'none';
        var hasServiceOrAreaSelected = Array.from(document.querySelectorAll('.service-radio')).some(function(r) { return r.checked; }) ||
                                       Array.from(areaCheckboxes).some(function(cb) { return cb.checked; });
        if (hasServiceOrAreaSelected && selectedSearchCriteria) {
            selectedSearchCriteria.style.display = '';
        }
    } else if (selectedSearchBy === 'vlo-only') {
        // Show VLO-only form
        if (caseReferenceSection) caseReferenceSection.style.display = 'none';
        if (serviceAreaForm) serviceAreaForm.style.display = 'none';
        if (vloOnlyForm) vloOnlyForm.style.display = '';
    }
})();

// Add event listener to searchBy radios to save selection when changed
(function() {
    var searchByRadios = document.querySelectorAll('input[name="searchBy"]');
    var caseReferenceSection = document.getElementById('case-reference-section');
    var serviceAreaForm = document.getElementById('service-area-form');
    var vloOnlyForm = document.getElementById('vlo-only-form');
    var selectedSearchCriteria = document.getElementById('selected-search-criteria');
    
    searchByRadios.forEach(function(radio) {
        radio.addEventListener('change', function() {
            // Save the selection
            window.saveFiltersToStorage();
            
            // Show/hide appropriate sections based on selection
            if (radio.value === 'case-reference') {
                if (caseReferenceSection) caseReferenceSection.style.display = '';
                if (serviceAreaForm) serviceAreaForm.style.display = 'none';
                if (vloOnlyForm) vloOnlyForm.style.display = 'none';
                if (selectedSearchCriteria) selectedSearchCriteria.style.display = 'none';
            } else if (radio.value === 'service-area') {
                if (caseReferenceSection) caseReferenceSection.style.display = 'none';
                if (serviceAreaForm) serviceAreaForm.style.display = '';
                if (vloOnlyForm) vloOnlyForm.style.display = 'none';
            } else if (radio.value === 'vlo-only') {
                if (caseReferenceSection) caseReferenceSection.style.display = 'none';
                if (serviceAreaForm) serviceAreaForm.style.display = 'none';
                if (vloOnlyForm) vloOnlyForm.style.display = '';
            }
        });
    });
})();

// Add event listeners to filter checkboxes
// Victim and Victim Category apply immediately on change
// Service, Area, and VLO only apply when Search button is clicked
(function() {
    var immediateFilterCheckboxes = document.querySelectorAll('.victim-checkbox, .victim-category-checkbox, .onboarded-checkbox');
    var searchCriteriaCheckboxes = document.querySelectorAll('.service-radio, .area-checkbox, .vlo-checkbox');
    
    // Immediate filters
    immediateFilterCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            applyVictimFilters();
            window.saveFiltersToStorage();
        });
    });
    
    // Search criteria form submission
    function attachServiceAreaFormListener() {
        var serviceAreaForm = document.getElementById('service-area-form');
        if (serviceAreaForm && !serviceAreaForm.dataset.listenerAttached) {
            serviceAreaForm.dataset.listenerAttached = 'true';
            serviceAreaForm.addEventListener('submit', function(e) {
                console.log('Service/Area form submitted');
                e.preventDefault();
                e.stopPropagation();
                searchFormSubmitted = true;
                applyVictimFilters();
                window.saveFiltersToStorage();
                return false;
            }, true);
        }
    }
    
    // VLO-only form submission
    function attachVloOnlyFormListener() {
        var vloOnlyForm = document.getElementById('vlo-only-form');
        if (vloOnlyForm && !vloOnlyForm.dataset.listenerAttached) {
            vloOnlyForm.dataset.listenerAttached = 'true';
            vloOnlyForm.addEventListener('submit', function(e) {
                console.log('VLO-only form submitted');
                e.preventDefault();
                e.stopPropagation();
                searchFormSubmitted = true;
                applyVictimFilters();
                window.saveFiltersToStorage();
                // Update clear link visibility after form submission
                if (window.updateClearVloOnlyFiltersVisibility) {
                    window.updateClearVloOnlyFiltersVisibility();
                }
                return false;
            }, true);
        }
    }
    
    // Attach listener immediately and also on DOM ready to ensure it's set
    attachServiceAreaFormListener();
    attachVloOnlyFormListener();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachServiceAreaFormListener);
        document.addEventListener('DOMContentLoaded', attachVloOnlyFormListener);
    }
    
    // Update filter storage for Service, Area, and VLO on checkbox change (but don't filter)
    // Reset searchFormSubmitted so user must click Search again to apply changes
    // But only after initial setup is complete to avoid resetting during page load
    searchCriteriaCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (!initialSetupComplete) return; // Skip during initial setup
            searchFormSubmitted = false;
            // Don't apply filters immediately - wait for Search button click
            window.saveFiltersToStorage();
            if (window.updateClearSearchFiltersVisibility) {
                window.updateClearSearchFiltersVisibility();
            }
        });
    });

// Expose functions to window so they can be called from other scopes
window.applyVictimFilters = applyVictimFilters;

// Add click handler to Clear filters link
var clearFiltersLink = document.querySelector('#clear-filters-wrapper a');
if (clearFiltersLink) {
    clearFiltersLink.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Helper function to uncheck and trigger change event
        function uncheckAndTriggerChange(checkboxes) {
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = false;
                // Trigger change event to ensure listeners fire
                var changeEvent = new Event('change', { bubbles: true });
                checkbox.dispatchEvent(changeEvent);
            });
        }
        
        // Only clear the filters, not search criteria
        uncheckAndTriggerChange(vloCheckboxes);
        uncheckAndTriggerChange(victimCheckboxes);
        uncheckAndTriggerChange(victimCategoryCheckboxes);
        uncheckAndTriggerChange(onboardedCheckboxes);
        
        // Clear and hide the vlo checkboxes container
        var vloCheckboxesContainer = document.getElementById('vlo-checkboxes-container');
        if (vloCheckboxesContainer) {
            vloCheckboxesContainer.style.display = 'none';
        }
        var victimCheckboxesContainer = document.getElementById('victim-checkboxes-container');
        if (victimCheckboxesContainer) {
            victimCheckboxesContainer.style.display = 'none';
        }
        
        // Clear autocomplete inputs for filters only
        var vloInput = document.querySelector('#vlo-autocomplete-input');
        if (vloInput) vloInput.value = '';
        var victimInput = document.querySelector('#victim-autocomplete-input');
        if (victimInput) victimInput.value = '';
        
        // Update UI
        updateClearFiltersVisibility();
        applyVictimFilters();
        hideServiceRowWhenOnboardedNo();
        window.saveFiltersToStorage();
    });
}

// Add click handler to Clear search link
var clearSearchCriteriaLink = document.querySelector('#clear-search-criteria-link');
if (clearSearchCriteriaLink) {
    clearSearchCriteriaLink.addEventListener('click', function (e) {
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
        
        // Only clear search criteria (Service and Area), not filters
        uncheckAndTriggerChange(serviceRadios);
        uncheckAndTriggerChange(areaCheckboxes);
        
        // Clear and hide the area checkboxes container
        var areaCheckboxesContainer = document.getElementById('area-checkboxes-container');
        if (areaCheckboxesContainer) {
            areaCheckboxesContainer.style.display = 'none';
        }
        
        // Clear autocomplete input for area only
        var areaInput = document.querySelector('#area-autocomplete-input');
        if (areaInput) areaInput.value = '';
        
        // Clear search URN input
        var searchUrnInput = document.getElementById('search-urn');
        if (searchUrnInput) searchUrnInput.value = '';
        
        // Reset search form submitted flag
        searchFormSubmitted = false;
        
        // Update UI and apply filters
        applyVictimFilters();
        window.saveFiltersToStorage();
    });
}

// Add click handler to Clear search button (clears service, area, and VLO selections)
var clearSearchFiltersButton = document.getElementById('clear-search-filters');
if (clearSearchFiltersButton) {
    clearSearchFiltersButton.addEventListener('click', function (e) {
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
        
        // Clear search criteria (Service, Area, and VLO)
        uncheckAndTriggerChange(serviceRadios);
        uncheckAndTriggerChange(areaCheckboxes);
        uncheckAndTriggerChange(vloCheckboxes);
        
        // Clear and hide the area checkboxes container
        var areaCheckboxesContainer = document.getElementById('area-checkboxes-container');
        if (areaCheckboxesContainer) {
            areaCheckboxesContainer.style.display = 'none';
        }
        
        // Clear and hide the VLO checkboxes container
        var vloCheckboxesContainer = document.getElementById('vlo-checkboxes-container');
        if (vloCheckboxesContainer) {
            vloCheckboxesContainer.style.display = 'none';
        }
        
        // Clear autocomplete inputs
        var areaInput = document.querySelector('#area-autocomplete-input');
        if (areaInput) areaInput.value = '';
        var vloInput = document.querySelector('#vlo-autocomplete-input');
        if (vloInput) vloInput.value = '';
        
        // Clear area and VLO chips
        var areaChipsContainer = document.getElementById('area-chips-container');
        if (areaChipsContainer) areaChipsContainer.innerHTML = '';
        var vloChipsContainer = document.getElementById('vlo-chips-container');
        if (vloChipsContainer) vloChipsContainer.innerHTML = '';
        
        // Reset search form submitted flag
        searchFormSubmitted = false;
        
        // Hide the clear search wrapper
        var clearSearchFiltersWrapper = document.getElementById('clear-search-filters-wrapper');
        if (clearSearchFiltersWrapper) clearSearchFiltersWrapper.style.display = 'none';
        
        // Update UI and apply filters
        applyVictimFilters();
        window.saveFiltersToStorage();
    });
}

// Function to update clear search filters link visibility
function updateClearSearchFiltersVisibility() {
    var clearSearchFiltersWrapper = document.getElementById('clear-search-filters-wrapper');
    if (!clearSearchFiltersWrapper) return;
    
    var hasServiceSelected = Array.from(serviceRadios).some(function(r) { return r.checked; });
    var hasAreaSelected = Array.from(areaCheckboxes).some(function(cb) { return cb.checked; });
    var hasVloSelected = Array.from(vloCheckboxes).some(function(cb) { return cb.checked; });
    
    if (hasServiceSelected || hasAreaSelected || hasVloSelected) {
        clearSearchFiltersWrapper.style.display = '';
    } else {
        clearSearchFiltersWrapper.style.display = 'none';
    }
}

// Make it available globally
window.updateClearSearchFiltersVisibility = updateClearSearchFiltersVisibility;

// Update visibility on page load
updateClearSearchFiltersVisibility();

// Function to update clear VLO-only search link visibility
function updateClearVloOnlyFiltersVisibility() {
    var clearVloOnlyFiltersWrapper = document.getElementById('clear-vlo-only-filters-wrapper');
    if (!clearVloOnlyFiltersWrapper) return;
    
    var vloOnlyCheckboxes = document.querySelectorAll('.vlo-checkbox');
    var hasVloSelected = Array.from(vloOnlyCheckboxes).some(function(cb) { return cb.checked; });
    
    if (hasVloSelected) {
        clearVloOnlyFiltersWrapper.style.display = '';
    } else {
        clearVloOnlyFiltersWrapper.style.display = 'none';
    }
}

// Make it available globally
window.updateClearVloOnlyFiltersVisibility = updateClearVloOnlyFiltersVisibility;

// Update visibility on page load
updateClearVloOnlyFiltersVisibility();

// Add click handler to Clear VLO-only search link
var clearVloOnlyFiltersLink = document.getElementById('clear-vlo-only-filters');
if (clearVloOnlyFiltersLink) {
    clearVloOnlyFiltersLink.addEventListener('click', function (e) {
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
        
        // Clear VLO checkboxes in the VLO-only form
        var vloOnlyCheckboxes = document.querySelectorAll('#vlo-only-checkboxes-container .vlo-checkbox');
        uncheckAndTriggerChange(vloOnlyCheckboxes);
        
        // Clear VLO-only chips
        var vloOnlyChipsContainer = document.getElementById('vlo-only-chips-container');
        if (vloOnlyChipsContainer) vloOnlyChipsContainer.innerHTML = '';
        
        // Clear autocomplete input
        var vloOnlyInput = document.querySelector('#vlo-only-autocomplete-input');
        if (vloOnlyInput) vloOnlyInput.value = '';
        
        // Reset search form submitted flag
        searchFormSubmitted = false;
        
        // Hide the clear search wrapper
        updateClearVloOnlyFiltersVisibility();
        
        // Update UI and apply filters
        applyVictimFilters();
        window.saveFiltersToStorage();
    });
}

})();

// Filter vlo list based on autocomplete (now handled by initializeVloAutocomplete)
// Old search input listener removed - autocomplete handles this now
})();

// Initialize accessible-autocomplete for Area filter
(function () {
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

if (container && typeof accessibleAutocomplete !== 'undefined') {
    accessibleAutocomplete({
    element: container,
    id: 'area-autocomplete-input',
    source: areas.map(function (a) { return a.label; }),
    showAllValues: true,
    minLength: 0,
    confirmOnBlur: true,
    onConfirm: function (selected) {
        if (!selected) { 
        return; 
        }
        var item = areas.find(function (a) { return a.label === selected; });
        if (item) {
        // Find the corresponding checkbox and check it
        areaCheckboxes.forEach(function (checkbox) {
            if (checkbox.value === item.value) {
            checkbox.checked = true;
            // Clear the autocomplete input
            var input = container.querySelector('input');
            if (input) input.value = '';
            // Render chips
            if (window.renderAreaChips) window.renderAreaChips();
            }
        });
        }
    }
    });
}
});

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

// Expose renderAreaChips globally for use by restore functions
window.renderAreaChips = renderAreaChips;
}

// Initialize accessible-autocomplete for Victim liaison officer filter
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

// Expose renderVloOnlyChips globally for use by restore functions
window.renderVloOnlyChips = renderVloOnlyChips;
}

// Initialize accessible-autocomplete for Service and Area VLO filter
function initializeServiceAreaVloAutocomplete() {
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

// Expose renderServiceAreaVloChips globally for use by restore functions
window.renderServiceAreaVloChips = renderServiceAreaVloChips;
}

// Initialize accessible-autocomplete for Victim filter
function initializeVictimAutocomplete() {
var victims = [
    { label: 'OBERON, Shelly', value: 'oberon-shelly' },
    { label: 'KING, Wendy', value: 'king-wendy' },
    { label: 'RICHARDSON, Sarah', value: 'richardson-sarah' },
    { label: 'SMITH, Emma', value: 'smith-emma' },
    { label: 'JONES, Amanda', value: 'jones-amanda' },
    { label: 'BROWN, Susan', value: 'brown-susan' },
    { label: 'DAVIES, Elizabeth', value: 'davies-elizabeth' },
    { label: 'MILLER, Jennifer', value: 'miller-jennifer' }
];

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
    // Mark initial setup as complete after all initialization
    initialSetupComplete = true;
});
} else {
initializeAreaAutocomplete();
initializeVloAutocomplete();
initializeVloOnlyAutocomplete();
initializeServiceAreaVloAutocomplete();
initializeVictimAutocomplete();
// Mark initial setup as complete after all initialization
initialSetupComplete = true;
}

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
(function () {
var vlos = [
    { label: 'Amanda Smith', value: 'amanda-smith' },
    { label: 'Benjamin Taylor', value: 'benjamin-taylor' },
    { label: 'Catherine Johnson', value: 'catherine-johnson' },
    { label: 'David Brown', value: 'david-brown' },
    { label: 'Emma Wilson', value: 'emma-wilson' }
];

var container = document.querySelector('#vlo-name-autocomplete');
var hidden = document.getElementById('vlo-name');

if (container && typeof accessibleAutocomplete !== 'undefined') {
    accessibleAutocomplete({
    element: container,
    id: 'vlo-name-autocomplete-input',
    source: vlos.map(function (a) { return a.label; }),
    showAllValues: true,
    minLength: 0,
    confirmOnBlur: true,
    onConfirm: function (selected) {
        if (!selected) { 
        hidden.value = ''; 
        return; 
        }
        var item = vlos.find(function (a) { return a.label === selected; });
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