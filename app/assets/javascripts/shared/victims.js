// Initialize GOV.UK radios module for conditional reveal
if (window.GOVUKFrontend && window.GOVUKFrontend.Radios) {
var radios = new GOVUKFrontend.Radios(document.querySelector('[data-module="govuk-radios"]'));
}

// Show success banner if URL has success params, then remove them
(function() {
    var url = new URL(window.location.href);
    if (url.searchParams.get('success') === 'yes') {
        var successReason = url.searchParams.get('successReason');
        var banner = null;

        if (successReason === 'vlo-updated') {
            banner = document.getElementById('vlo-success-banner');
        } else if (successReason === 'service-updated') {
            banner = document.getElementById('service-success-banner');
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
            victimNameSearchValue: document.getElementById('victim-name-search-input') ? document.getElementById('victim-name-search-input').value : '',
            victimFamilyNameSearchValue: document.getElementById('victim-family-name-search-input') ? document.getElementById('victim-family-name-search-input').value : '',
            victimGivenNamesSearchValue: document.getElementById('victim-given-names-search-input') ? document.getElementById('victim-given-names-search-input').value : '',
            dobSearchDay: document.getElementById('dob-search-day') ? document.getElementById('dob-search-day').value : '',
            dobSearchMonth: document.getElementById('dob-search-month') ? document.getElementById('dob-search-month').value : '',
            dobSearchYear: document.getElementById('dob-search-year') ? document.getElementById('dob-search-year').value : '',
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
            
            // Restore victim name search input
            var victimNameSearchInput = document.getElementById('victim-name-search-input');
            if (victimNameSearchInput && state.victimNameSearchValue) {
                victimNameSearchInput.value = state.victimNameSearchValue;
            }
            
            // Restore split victim name search inputs
            var victimFamilyNameInput = document.getElementById('victim-family-name-search-input');
            if (victimFamilyNameInput && state.victimFamilyNameSearchValue) {
                victimFamilyNameInput.value = state.victimFamilyNameSearchValue;
            }
            var victimGivenNamesInput = document.getElementById('victim-given-names-search-input');
            if (victimGivenNamesInput && state.victimGivenNamesSearchValue) {
                victimGivenNamesInput.value = state.victimGivenNamesSearchValue;
            }
            
            // Restore DOB search fields
            var dobDay = document.getElementById('dob-search-day');
            if (dobDay && state.dobSearchDay) {
                dobDay.value = state.dobSearchDay;
            }
            var dobMonth = document.getElementById('dob-search-month');
            if (dobMonth && state.dobSearchMonth) {
                dobMonth.value = state.dobSearchMonth;
            }
            var dobYear = document.getElementById('dob-search-year');
            if (dobYear && state.dobSearchYear) {
                dobYear.value = state.dobSearchYear;
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
var onboardedCheckboxes = document.querySelectorAll('.onboarded-checkbox');
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
    
    // Check if "Victims allocated to you" (vlo-only) mode is active
    var vloOnlyRadio = document.getElementById('search-by-vlo');
    var isVloOnlyMode = vloOnlyRadio && vloOnlyRadio.checked;
    
    // In vlo-only mode, force filter to THOMPSON, Sarah
    if (isVloOnlyMode && searchFormSubmitted) {
        selectedVlos = ['THOMPSON, Sarah (you)'];
    }
    
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
    
    // Check if "Service, area and victim liaison officer" mode is active
    var serviceAreaRadio = document.getElementById('search-by-service-area');
    var isServiceAreaMode = serviceAreaRadio && serviceAreaRadio.checked;
    
    // Determine if any immediate filters are active (Victim, Category)
    var hasImmediateFilters = selectedVictims.length > 0 || 
                              selectedVictimCategories.length > 0;
    
    // Determine if search criteria filters are active (Service, Area, VLO)
    var hasSearchCriteria = selectedAreas.length > 0 || selectedServices.length > 0 || selectedVlos.length > 0;
    
    // In vlo-only mode, treat as having search criteria when submitted
    if (isVloOnlyMode && searchFormSubmitted) {
        hasSearchCriteria = true;
    }
    
    // Show victims/filters only if: immediate filters are selected OR search form was submitted
    var shouldShowResults = hasImmediateFilters || (searchFormSubmitted && hasSearchCriteria);
    
    // Get search input value
    var searchInput = document.getElementById('search-urn');
    var searchTerm = searchInput ? searchInput.value.trim() : '';
    
    // Show/hide victims container based on whether there are active filters or search
    var victimContainer = document.getElementById('victims-container');
    var paginationNav = document.querySelector('nav.govuk-pagination');
    var filtersSection = document.getElementById('filters-section');
    var resultsCount = document.getElementById('results-count');
    var sortedByText = document.getElementById('sorted-by-text');
    var resultsDivider = document.getElementById('results-divider');
    
    if (victimContainer) {
        victimContainer.style.display = (shouldShowResults || searchTerm !== '') ? '' : 'none';
    }
    if (paginationNav) {
        paginationNav.style.display = (shouldShowResults || searchTerm !== '') ? '' : 'none';
    }
    if (resultsCount) {
        resultsCount.style.display = (shouldShowResults || searchTerm !== '') ? '' : 'none';
    }
    if (sortedByText) {
        sortedByText.style.display = (shouldShowResults || searchTerm !== '') ? '' : 'none';
    }
    if (resultsDivider) {
        resultsDivider.style.display = (shouldShowResults || searchTerm !== '') ? '' : 'none';
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
        
        // In service-area mode, only show onboarded victims
        if (isServiceAreaMode && searchFormSubmitted) {
            var recordServiceValue = getFieldValue('Service lead');
            if (recordServiceValue.indexOf('Not onboarded') !== -1) {
                shouldShow = false;
            }
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
            var matchesService = selectedServices.some(function(service) {
                // Special handling for "Not onboarded" service filter
                if (service === 'Not onboarded') {
                    var serviceValue = getFieldValue('Service lead');
                    // Check if the Service field shows "Not onboarded"
                    return serviceValue.indexOf('Not onboarded') !== -1;
                }
                // Special handling for "Not aligned to a service" filter
                if (service === 'Not aligned to a service') {
                    var serviceValue = getFieldValue('Service lead');
                    return serviceValue.indexOf('Not aligned') !== -1;
                }
                // For regular services, check if service text exists in the Service field
                var serviceValue = getFieldValue('Service lead');
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
        
        
        // If no results should be shown (no active filters/search), mark all as hidden
        if (!shouldShowResults && searchTerm === '') {
            shouldShow = false;
        }
        
        // Mark record as filtered or not using data attribute (pagination uses this)
        record.setAttribute('data-filtered', shouldShow ? 'visible' : 'hidden');
        // Initially show/hide based on filter (pagination will override display for visible records)
        record.style.display = shouldShow ? '' : 'none';
        
        // Also show/hide the parent wrapper div if it has the govuk-!-margin-bottom-9 class
        var parentWrapper = record.parentElement;
        if (parentWrapper && parentWrapper.classList.contains('govuk-!-margin-bottom-9')) {
            parentWrapper.style.display = shouldShow ? '' : 'none';
        }
        
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

// Search functionality for victim or case reference
(function() {
    var searchInput = document.getElementById('search-urn');
    
    if (!searchInput) {
        return;
    }
    
    function applySearch() {
        var searchTerm = searchInput.value.trim().toLowerCase();
        var victimRecords = document.querySelectorAll('.govuk-summary-list');
        var visibleCount = 0;
        
        // Get the victims container and pagination
        var victimContainer = document.getElementById('victims-container');
        var paginationNav = document.querySelector('nav.govuk-pagination');
        var resultsCount = document.getElementById('results-count');
        var sortedByText = document.getElementById('sorted-by-text');
        var resultsDivider = document.getElementById('results-divider');
        
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

        // Hide results count, sorted by, and divider when search is cleared
        if (resultsCount) {
            resultsCount.style.display = searchTerm !== '' ? '' : 'none';
        }
        if (sortedByText) {
            sortedByText.style.display = searchTerm !== '' ? '' : 'none';
        }
        if (resultsDivider) {
            resultsDivider.style.display = searchTerm !== '' ? '' : 'none';
        }
        
        // First, reset all records to visible (clear previous search results)
        victimRecords.forEach(function(record) {
            record.style.display = '';
        });
        
        // Then apply the new search and filter
        victimRecords.forEach(function(record) {
            var victimName = '';
            var caseReference = '';
            
            // Extract victim name from the h2 heading (sibling in parent wrapper)
            var parentWrapper = record.parentElement;
            var headingEl = parentWrapper ? parentWrapper.querySelector('h2') : null;
            if (headingEl) {
                var linkEl = headingEl.querySelector('a');
                victimName = linkEl ? linkEl.textContent.trim() : headingEl.textContent.trim();
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
            
            // Also show/hide the parent wrapper div so heading + summary list appear together
            if (parentWrapper && parentWrapper.classList.contains('govuk-!-margin-bottom-9')) {
                parentWrapper.style.display = shouldShow ? '' : 'none';
            }
            
            if (shouldShow) {
                visibleCount++;
            }
        });
        
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
    }
    
    // Expose applySearch globally for use by restore logic
    window.applySearch = applySearch;
})();

// For v50 and v42, clear saved filters and show no results by default.
// Other versions restore from localStorage and apply default filters.
var currentPath = window.location.pathname;
var isNoDefaultVersion = currentPath.indexOf('/v50/') !== -1 || currentPath.indexOf('/v42/') !== -1;

if (isNoDefaultVersion) {
    try { localStorage.removeItem('vca-victims-filters'); } catch (e) {}
    searchFormSubmitted = false;
} else {
    var filtersRestored = window.restoreFiltersFromStorage();
    if (!filtersRestored) {
        var vloOnlyRadio = document.getElementById('search-by-vlo');
        if (vloOnlyRadio) {
            vloOnlyRadio.checked = true;
        }
        var thompsonCheckbox = document.getElementById('vlo-only-1');
        if (thompsonCheckbox) {
            thompsonCheckbox.checked = true;
        }
        searchFormSubmitted = true;
        window.saveFiltersToStorage();
    }
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
        var victimNameDobForm = document.getElementById('victim-name-dob-form');
        if (victimNameDobForm) victimNameDobForm.style.display = 'none';
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
    } else if (selectedSearchBy === 'victim-name-dob') {
        // Show victim name and DOB form
        if (caseReferenceSection) caseReferenceSection.style.display = 'none';
        if (serviceAreaForm) serviceAreaForm.style.display = 'none';
        if (vloOnlyForm) vloOnlyForm.style.display = 'none';
        var victimNameDobForm = document.getElementById('victim-name-dob-form');
        if (victimNameDobForm) victimNameDobForm.style.display = '';
        if (selectedSearchCriteria) selectedSearchCriteria.style.display = 'none';
        
        // Show clear link if there are values
        var victimNameInput = document.getElementById('victim-name-search-input');
        var victimFamilyNameInput = document.getElementById('victim-family-name-search-input');
        var victimGivenNamesInput = document.getElementById('victim-given-names-search-input');
        var dobDay = document.getElementById('dob-search-day');
        var dobMonth = document.getElementById('dob-search-month');
        var dobYear = document.getElementById('dob-search-year');
        var hasValues = (victimNameInput && victimNameInput.value) ||
                        (victimFamilyNameInput && victimFamilyNameInput.value) ||
                        (victimGivenNamesInput && victimGivenNamesInput.value) ||
                        (dobDay && dobDay.value) || (dobMonth && dobMonth.value) || (dobYear && dobYear.value);
        var clearVictimNameDobWrapper = document.getElementById('clear-victim-name-dob-wrapper');
        if (hasValues && clearVictimNameDobWrapper) {
            clearVictimNameDobWrapper.style.display = '';
        }
        
        // Apply search to show results if form was submitted
        if (hasValues && searchFormSubmitted && window.applyVictimNameDobSearch) {
            window.applyVictimNameDobSearch();
        }
    } else if (selectedSearchBy === 'service-area') {
        // Show service/area form
        if (caseReferenceSection) caseReferenceSection.style.display = 'none';
        if (serviceAreaForm) serviceAreaForm.style.display = '';
        if (vloOnlyForm) vloOnlyForm.style.display = 'none';
        var victimNameDobForm = document.getElementById('victim-name-dob-form');
        if (victimNameDobForm) victimNameDobForm.style.display = 'none';
        var hasServiceOrAreaSelected = Array.from(document.querySelectorAll('.service-radio')).some(function(r) { return r.checked; }) ||
                                       Array.from(areaCheckboxes).some(function(cb) { return cb.checked; });
        if (hasServiceOrAreaSelected && selectedSearchCriteria) {
            selectedSearchCriteria.style.display = '';
        }
    } else if (selectedSearchBy === 'vlo-only') {
        // Show VLO-only form
        if (caseReferenceSection) caseReferenceSection.style.display = 'none';
        if (serviceAreaForm) serviceAreaForm.style.display = 'none';
        var victimNameDobForm = document.getElementById('victim-name-dob-form');
        if (victimNameDobForm) victimNameDobForm.style.display = 'none';
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
                var victimNameDobForm = document.getElementById('victim-name-dob-form');
                if (victimNameDobForm) victimNameDobForm.style.display = 'none';
                if (selectedSearchCriteria) selectedSearchCriteria.style.display = 'none';
            } else if (radio.value === 'victim-name-dob') {
                if (caseReferenceSection) caseReferenceSection.style.display = 'none';
                if (serviceAreaForm) serviceAreaForm.style.display = 'none';
                if (vloOnlyForm) vloOnlyForm.style.display = 'none';
                var victimNameDobForm = document.getElementById('victim-name-dob-form');
                if (victimNameDobForm) victimNameDobForm.style.display = '';
                if (selectedSearchCriteria) selectedSearchCriteria.style.display = 'none';
            } else if (radio.value === 'service-area') {
                if (caseReferenceSection) caseReferenceSection.style.display = 'none';
                if (serviceAreaForm) serviceAreaForm.style.display = '';
                if (vloOnlyForm) vloOnlyForm.style.display = 'none';
                var victimNameDobForm = document.getElementById('victim-name-dob-form');
                if (victimNameDobForm) victimNameDobForm.style.display = 'none';
            } else if (radio.value === 'vlo-only') {
                if (caseReferenceSection) caseReferenceSection.style.display = 'none';
                if (serviceAreaForm) serviceAreaForm.style.display = 'none';
                if (vloOnlyForm) vloOnlyForm.style.display = '';
                var victimNameDobForm = document.getElementById('victim-name-dob-form');
                if (victimNameDobForm) victimNameDobForm.style.display = 'none';
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
        var searchCriteriaForm = document.getElementById('search-criteria-form');
        if (searchCriteriaForm && !searchCriteriaForm.dataset.listenerAttached) {
            searchCriteriaForm.dataset.listenerAttached = 'true';
            searchCriteriaForm.addEventListener('submit', function(e) {
                console.log('Search criteria form submitted');
                e.preventDefault();
                e.stopPropagation();
                searchFormSubmitted = true;
                
                // Determine which search mode is active
                var searchByRadios = document.querySelectorAll('input[name="searchBy"]');
                var selectedSearchBy = '';
                searchByRadios.forEach(function(radio) {
                    if (radio.checked) selectedSearchBy = radio.value;
                });
                
                // For case-reference mode, apply case reference search
                if (selectedSearchBy === 'case-reference' && window.applySearch) {
                    window.applySearch();
                } else if (selectedSearchBy === 'victim-name-dob' && window.applyVictimNameDobSearch) {
                    var familyNameInput = document.getElementById('victim-family-name-search-input');
                    var familyNameValue = familyNameInput ? familyNameInput.value.trim() : '';
                    if (familyNameValue === '') {
                        if (typeof showFamilyNameError === 'function') showFamilyNameError('Enter a last name');
                        return false;
                    }
                    if (familyNameValue.length < 2) {
                        if (typeof showFamilyNameError === 'function') showFamilyNameError('Last name must be 2 characters or more');
                        return false;
                    }
                    if (typeof clearFamilyNameError === 'function') clearFamilyNameError();
                    window.applyVictimNameDobSearch();
                } else {
                    applyVictimFilters();
                }
                
                window.saveFiltersToStorage();
                // Update clear link visibility after form submission
                if (window.updateClearSearchVisibility) {
                    window.updateClearSearchVisibility();
                }
                return false;
            }, true);
        }
    }
    
    // VLO-only form submission (kept for backward compatibility but now handled by main form)
    function attachVloOnlyFormListener() {
        // No-op: vlo-only-form is now a div, submission handled by search-criteria-form
    }
    
    // Victim name and DOB search function
    function applyVictimNameDobSearch() {
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        
        var victimNameInput = document.getElementById('victim-name-search-input');
        var victimFamilyNameInput = document.getElementById('victim-family-name-search-input');
        var victimGivenNamesInput = document.getElementById('victim-given-names-search-input');
        var dobDayInput = document.getElementById('dob-search-day');
        var dobMonthInput = document.getElementById('dob-search-month');
        var dobYearInput = document.getElementById('dob-search-year');
        
        var searchName = victimNameInput ? victimNameInput.value.trim().toLowerCase() : '';
        var searchFamilyName = victimFamilyNameInput ? victimFamilyNameInput.value.trim().toLowerCase() : '';
        var searchGivenNames = victimGivenNamesInput ? victimGivenNamesInput.value.trim().toLowerCase() : '';
        var dobDay = dobDayInput ? dobDayInput.value.trim() : '';
        var dobMonth = dobMonthInput ? dobMonthInput.value.trim() : '';
        var dobYear = dobYearInput ? dobYearInput.value.trim() : '';
        
        // Build DOB search parts for partial matching
        var dobSearchDay = dobDay ? parseInt(dobDay, 10) : null;
        var dobSearchMonth = dobMonth ? parseInt(dobMonth, 10) : null;
        var dobSearchYear = dobYear || null;
        var hasDobSearch = dobSearchDay !== null || dobSearchMonth !== null || dobSearchYear !== null;
        
        var hasSearch = searchName !== '' || searchFamilyName !== '' || searchGivenNames !== '' || hasDobSearch;
        
        var victimContainer = document.getElementById('victims-container');
        var paginationNav = document.querySelector('nav.govuk-pagination');
        var resultsCount = document.getElementById('results-count');
        var sortedByText = document.getElementById('sorted-by-text');
        var resultsDivider = document.getElementById('results-divider');
        
        if (victimContainer) {
            victimContainer.style.display = hasSearch ? '' : 'none';
        }
        if (paginationNav) {
            paginationNav.style.display = hasSearch ? '' : 'none';
        }
        if (resultsCount) {
            resultsCount.style.display = hasSearch ? '' : 'none';
        }
        if (sortedByText) {
            sortedByText.style.display = hasSearch ? '' : 'none';
        }
        if (resultsDivider) {
            resultsDivider.style.display = hasSearch ? '' : 'none';
        }
        
        var victimRecords = document.querySelectorAll('.govuk-summary-list');
        var visibleCount = 0;
        
        victimRecords.forEach(function(record) {
            var shouldShow = true;
            
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
            
            // Match victim name from the heading
            var parentWrapper = record.parentElement;
            var headingEl = parentWrapper ? parentWrapper.querySelector('h2') : null;
            var victimText = '';
            if (headingEl) {
                var linkEl = headingEl.querySelector('a');
                victimText = linkEl ? linkEl.textContent.trim() : headingEl.textContent.trim();
            }
            var victimTextLower = victimText.toLowerCase();
            
            // Single field search (legacy)
            if (searchName !== '') {
                shouldShow = shouldShow && victimTextLower.indexOf(searchName) !== -1;
            }
            
            // Split field search - match family name against surname part and given names against forename part
            if (searchFamilyName !== '' || searchGivenNames !== '') {
                // Heading format is "SURNAME, Forename" - split on comma
                var nameParts = victimText.split(',');
                var surnameText = nameParts[0] ? nameParts[0].trim().toLowerCase() : '';
                var forenameText = nameParts[1] ? nameParts[1].trim().toLowerCase() : '';
                
                if (searchFamilyName !== '') {
                    shouldShow = shouldShow && surnameText.indexOf(searchFamilyName) !== -1;
                }
                if (searchGivenNames !== '') {
                    shouldShow = shouldShow && forenameText.indexOf(searchGivenNames) !== -1;
                }
            }
            
            // Only show onboarded victims
            var recordService = getFieldValue('Service');
            if (recordService.indexOf('Not onboarded') !== -1) {
                shouldShow = false;
            }
            
            // Match DOB - supports partial matching (e.g. just year, or month and year)
            if (hasDobSearch) {
                var recordDob = getFieldValue('Date of birth');
                // Parse the record DOB which is in format "d/m/yyyy (age years old)"
                var dobMatch = recordDob.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
                if (dobMatch) {
                    var recordDay = parseInt(dobMatch[1], 10);
                    var recordMonth = parseInt(dobMatch[2], 10);
                    var recordYear = dobMatch[3];
                    
                    if (dobSearchDay !== null && recordDay !== dobSearchDay) {
                        shouldShow = false;
                    }
                    if (dobSearchMonth !== null && recordMonth !== dobSearchMonth) {
                        shouldShow = false;
                    }
                    if (dobSearchYear !== null && recordYear !== dobSearchYear) {
                        shouldShow = false;
                    }
                } else {
                    shouldShow = false;
                }
            }
            
            record.setAttribute('data-filtered', shouldShow ? 'visible' : 'hidden');
            record.style.display = shouldShow ? '' : 'none';
            
            var parentWrapper = record.parentElement;
            if (parentWrapper && parentWrapper.classList.contains('govuk-!-margin-bottom-9')) {
                parentWrapper.style.display = shouldShow ? '' : 'none';
            }
            
            if (shouldShow) {
                visibleCount++;
            }
        });
        
        // Update clear link visibility
        var clearWrapper = document.getElementById('clear-victim-name-dob-wrapper');
        if (clearWrapper) {
            clearWrapper.style.display = hasSearch ? '' : 'none';
        }
        
        // Show "no results" message
        var noResultsMessage = document.getElementById('no-results-message');
        if (visibleCount === 0 && hasSearch) {
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('div');
                noResultsMessage.id = 'no-results-message';
                noResultsMessage.className = 'govuk-inset-text govuk-!-margin-top-0';
                if (victimContainer) {
                    victimContainer.parentNode.insertBefore(noResultsMessage, victimContainer.nextSibling);
                }
            }
            noResultsMessage.textContent = 'No victims match your search.';
            noResultsMessage.style.display = '';
        } else if (noResultsMessage) {
            noResultsMessage.style.display = 'none';
        }
        
        if (window.recalculatePagination) {
            window.recalculatePagination();
        }
    }
    
    // Expose globally
    window.applyVictimNameDobSearch = applyVictimNameDobSearch;
    
    // Validation: show/clear error for family name field
    function showFamilyNameError(message) {
        var errorText = message || 'Enter a last name';
        var formGroup = document.getElementById('victim-family-name-form-group');
        var errorMessage = document.getElementById('victim-family-name-error');
        var input = document.getElementById('victim-family-name-search-input');
        var errorSummary = document.getElementById('error-summary');
        var errorSummaryList = document.getElementById('error-summary-list');

        if (formGroup) formGroup.classList.add('govuk-form-group--error');
        if (errorMessage) {
            errorMessage.innerHTML = '<span class="govuk-visually-hidden">Error:</span> ' + errorText;
            errorMessage.style.display = '';
        }
        if (input) input.classList.add('govuk-input--error');

        if (errorSummary && errorSummaryList) {
            errorSummaryList.innerHTML = '<li><a href="#victim-family-name-search-input">' + errorText + '</a></li>';
            errorSummary.style.display = '';
            errorSummary.focus();
        }
    }

    function clearFamilyNameError() {
        var formGroup = document.getElementById('victim-family-name-form-group');
        var errorMessage = document.getElementById('victim-family-name-error');
        var input = document.getElementById('victim-family-name-search-input');
        var errorSummary = document.getElementById('error-summary');
        var errorSummaryList = document.getElementById('error-summary-list');

        if (formGroup) formGroup.classList.remove('govuk-form-group--error');
        if (errorMessage) errorMessage.style.display = 'none';
        if (input) input.classList.remove('govuk-input--error');

        if (errorSummary) errorSummary.style.display = 'none';
        if (errorSummaryList) errorSummaryList.innerHTML = '';
    }

    // Victim name and DOB form submission
    function attachVictimNameDobFormListener() {
        var victimNameDobForm = document.getElementById('victim-name-dob-form');
        if (victimNameDobForm && !victimNameDobForm.dataset.listenerAttached) {
            victimNameDobForm.dataset.listenerAttached = 'true';
            victimNameDobForm.addEventListener('submit', function(e) {
                e.preventDefault();
                e.stopPropagation();

                var familyNameInput = document.getElementById('victim-family-name-search-input');
                var familyNameValue = familyNameInput ? familyNameInput.value.trim() : '';

                if (familyNameValue === '') {
                    showFamilyNameError('Enter a last name');
                    return false;
                }

                if (familyNameValue.length < 2) {
                    showFamilyNameError('Last name must be 2 characters or more');
                    return false;
                }

                clearFamilyNameError();
                searchFormSubmitted = true;
                applyVictimNameDobSearch();
                window.saveFiltersToStorage();
                return false;
            }, true);
        }
    }
    
    // Attach listener immediately and also on DOM ready to ensure it's set
    attachServiceAreaFormListener();
    attachVloOnlyFormListener();
    attachVictimNameDobFormListener();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachServiceAreaFormListener);
        document.addEventListener('DOMContentLoaded', attachVloOnlyFormListener);
        document.addEventListener('DOMContentLoaded', attachVictimNameDobFormListener);
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

// Function to update clear search filters link visibility
function updateClearSearchFiltersVisibility() {
    var clearSearchWrapper = document.getElementById('clear-search-wrapper');
    if (!clearSearchWrapper) return;
    
    var hasServiceSelected = Array.from(serviceRadios).some(function(r) { return r.checked; });
    var hasAreaSelected = Array.from(areaCheckboxes).some(function(cb) { return cb.checked; });
    var hasVloSelected = Array.from(document.querySelectorAll('.vlo-checkbox')).some(function(cb) { return cb.checked; });
    var hasServiceAreaVloSelected = Array.from(document.querySelectorAll('.service-area-vlo-checkbox')).some(function(cb) { return cb.checked; });
    var searchInput = document.getElementById('search-urn');
    var hasCaseRef = searchInput && searchInput.value.trim() !== '';
    
    if (hasServiceSelected || hasAreaSelected || hasVloSelected || hasServiceAreaVloSelected || hasCaseRef) {
        clearSearchWrapper.style.display = '';
    } else {
        clearSearchWrapper.style.display = 'none';
    }
}

// Make it available globally
window.updateClearSearchFiltersVisibility = updateClearSearchFiltersVisibility;
window.updateClearSearchVisibility = updateClearSearchFiltersVisibility;
window.updateClearVloOnlyFiltersVisibility = updateClearSearchFiltersVisibility;

// Update visibility on page load
updateClearSearchFiltersVisibility();

// Add click handler to Clear search link
var clearSearchLink = document.getElementById('clear-search-link');
if (clearSearchLink) {
    clearSearchLink.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Helper function to uncheck and trigger change event
        function uncheckAndTriggerChange(items) {
            items.forEach(function (item) {
                item.checked = false;
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
        
        // Clear VLO-only autocomplete input
        var vloOnlyInput = document.querySelector('#vlo-only-autocomplete-input');
        if (vloOnlyInput) vloOnlyInput.value = '';
        
        // Clear service-area-vlo checkboxes
        var serviceAreaVloCheckboxes = document.querySelectorAll('.service-area-vlo-checkbox');
        uncheckAndTriggerChange(serviceAreaVloCheckboxes);
        
        // Clear service-area-vlo chips
        var serviceAreaVloChipsContainer = document.getElementById('service-area-vlo-chips-container');
        if (serviceAreaVloChipsContainer) serviceAreaVloChipsContainer.innerHTML = '';
        
        // Clear service-area-vlo autocomplete input
        var serviceAreaVloInput = document.querySelector('#service-area-vlo-autocomplete-input');
        if (serviceAreaVloInput) serviceAreaVloInput.value = '';
        
        // Clear search criteria (Service, Area)
        uncheckAndTriggerChange(serviceRadios);
        uncheckAndTriggerChange(areaCheckboxes);
        
        // Clear and hide the area checkboxes container
        var areaCheckboxesContainer = document.getElementById('area-checkboxes-container');
        if (areaCheckboxesContainer) areaCheckboxesContainer.style.display = 'none';
        
        // Clear area autocomplete and chips
        var areaInput = document.querySelector('#area-autocomplete-input');
        if (areaInput) areaInput.value = '';
        var areaChipsContainer = document.getElementById('area-chips-container');
        if (areaChipsContainer) areaChipsContainer.innerHTML = '';
        
        // Clear case reference input
        var searchInput = document.getElementById('search-urn');
        if (searchInput) searchInput.value = '';
        
        // Reset search form submitted flag
        searchFormSubmitted = false;
        
        // Hide the clear search wrapper
        updateClearSearchFiltersVisibility();
        
        // Update UI and apply filters
        applyVictimFilters();
        window.saveFiltersToStorage();
    });
}

// Add click handler to Clear victim name and DOB search link
var clearVictimNameDobLink = document.getElementById('clear-victim-name-dob-link');
if (clearVictimNameDobLink) {
    clearVictimNameDobLink.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Clear victim name input
        var victimNameInput = document.getElementById('victim-name-search-input');
        if (victimNameInput) victimNameInput.value = '';
        
        // Clear split victim name inputs
        var victimFamilyNameInput = document.getElementById('victim-family-name-search-input');
        if (victimFamilyNameInput) victimFamilyNameInput.value = '';
        var victimGivenNamesInput = document.getElementById('victim-given-names-search-input');
        if (victimGivenNamesInput) victimGivenNamesInput.value = '';
        
        // Clear DOB inputs
        var dobDay = document.getElementById('dob-search-day');
        if (dobDay) dobDay.value = '';
        var dobMonth = document.getElementById('dob-search-month');
        if (dobMonth) dobMonth.value = '';
        var dobYear = document.getElementById('dob-search-year');
        if (dobYear) dobYear.value = '';
        
        // Reset search form submitted flag
        searchFormSubmitted = false;
        
        // Hide clear wrapper
        var clearWrapper = document.getElementById('clear-victim-name-dob-wrapper');
        if (clearWrapper) clearWrapper.style.display = 'none';
        
        // Hide results
        var victimContainer = document.getElementById('victims-container');
        if (victimContainer) victimContainer.style.display = 'none';
        var paginationNav = document.querySelector('nav.govuk-pagination');
        if (paginationNav) paginationNav.style.display = 'none';
        
        // Hide no results message
        var noResultsMessage = document.getElementById('no-results-message');
        if (noResultsMessage) noResultsMessage.style.display = 'none';
        
        // Reset all records
        var victimRecords = document.querySelectorAll('.govuk-summary-list');
        victimRecords.forEach(function(record) {
            record.setAttribute('data-filtered', 'visible');
            record.style.display = '';
            var parentWrapper = record.parentElement;
            if (parentWrapper && parentWrapper.classList.contains('govuk-!-margin-bottom-9')) {
                parentWrapper.style.display = '';
            }
        });
        
        // Update results count
        if (window.recalculatePagination) {
            window.recalculatePagination();
        }
        
        window.saveFiltersToStorage();
    });
}

})();

})();

