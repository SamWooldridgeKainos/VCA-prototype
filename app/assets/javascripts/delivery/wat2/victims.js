// Initialize GOV.UK radios module for conditional reveal
if (window.GOVUKFrontend && window.GOVUKFrontend.Radios) {
var radios = new GOVUKFrontend.Radios(document.querySelector('[data-module="govuk-radios"]'));
}

// Track whether search criteria form has been submitted
var searchFormSubmitted = false;

// Handle Owner filter chips
(function () {
var ownerCheckboxes = document.querySelectorAll('.owner-checkbox');
var victimCheckboxes = document.querySelectorAll('.victim-checkbox');
var areaCheckboxes = document.querySelectorAll('.area-checkbox');
var serviceCheckboxes = document.querySelectorAll('.service-checkbox');
var victimCategoryCheckboxes = document.querySelectorAll('.victim-category-checkbox');
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
        createChip(checkbox, selectedFiltersChips);
        });
    }
    }
    
    // Render owner chips
    renderChipCategory(ownerCheckboxes, 'Owner');
    
    // Render victim chips
    renderChipCategory(victimCheckboxes, 'Victim');
    
    // Render victim category chips
    renderChipCategory(victimCategoryCheckboxes, 'Victim category');
    
    updateClearFiltersVisibility();
}

// Render search criteria chips (Service and Area)
function renderSearchCriteriaChips() {
    var searchCriteriaChipsContainer = document.getElementById('search-criteria-chips');
    if (!searchCriteriaChipsContainer) return;
    
    searchCriteriaChipsContainer.innerHTML = '';
    var hasSearchCriteria = false;
    
    function renderChipCategory(checkboxes, heading) {
        var checkedItems = Array.from(checkboxes).filter(function(cb) { return cb.checked; });
        if (checkedItems.length > 0) {
            hasSearchCriteria = true;
            var h3 = document.createElement('h3');
            h3.className = 'govuk-heading-s govuk-!-margin-top-3';
            h3.style.marginBottom = '8px';
            h3.textContent = heading;
            searchCriteriaChipsContainer.appendChild(h3);
            
            checkedItems.forEach(function(checkbox) {
                createChip(checkbox, searchCriteriaChipsContainer);
            });
        }
    }
    
    renderChipCategory(serviceCheckboxes, 'Service');
    renderChipCategory(areaCheckboxes, 'Area');
    
    // Update heading text
    var heading = document.getElementById('selected-search-criteria-heading');
    if (heading) {
        heading.textContent = hasSearchCriteria ? 'Selected search criteria' : 'No search criteria selected';
    }
}

// Create a chip element
function createChip(checkbox, container) {
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
    renderSearchCriteriaChips();
    updateClearFiltersVisibility();
    });
    
    chip.appendChild(chipText);
    chip.appendChild(removeBtn);
    container.appendChild(chip);
}

// Update visibility of clear filters link
function updateClearFiltersVisibility() {
    var hasCheckedFilters = Array.from(ownerCheckboxes).some(function (checkbox) {
    return checkbox.checked;
    }) || Array.from(victimCheckboxes).some(function (checkbox) {
    return checkbox.checked;
    }) || Array.from(areaCheckboxes).some(function (checkbox) {
    return checkbox.checked;
    }) || Array.from(serviceCheckboxes).some(function (checkbox) {
    return checkbox.checked;
    }) || Array.from(victimCategoryCheckboxes).some(function (checkbox) {
    return checkbox.checked;
    });
    clearFiltersWrapper.style.display = hasCheckedFilters ? '' : 'none';
    
    // Update heading text
    var heading = document.getElementById('selected-filters-heading');
    heading.textContent = hasCheckedFilters ? 'Selected filters' : 'No filters selected';
}

// Apply filters to victim list
function applyVictimFilters() {
    var ownerCheckboxes = document.querySelectorAll('.owner-checkbox');
    var victimCheckboxes = document.querySelectorAll('.victim-checkbox');
    var areaCheckboxes = document.querySelectorAll('.area-checkbox');
    var serviceCheckboxes = document.querySelectorAll('.service-checkbox');
    var victimCategoryCheckboxes = document.querySelectorAll('.victim-category-checkbox');
    
    // Show victims container since filters are being applied
    var victimContainer = document.getElementById('victims-container');
    if (victimContainer) {
        victimContainer.style.display = '';
    }
    
    // Get all checked filter values
    var selectedOwners = Array.from(ownerCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.getAttribute('data-label'); });
    
    var selectedVictims = Array.from(victimCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.getAttribute('data-label'); });
    
    var selectedAreas = Array.from(areaCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.getAttribute('data-label'); });
    
    var selectedServices = Array.from(serviceCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.getAttribute('data-label'); });
    
    var selectedVictimCategories = Array.from(victimCategoryCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.value; });
    
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
        
        // Check Owner filter
        if (selectedOwners.length > 0) {
            var owner = getFieldValue('Owner');
            var matchesOwner = selectedOwners.some(function(owner) {
                // Remove "(you)" suffix from owner label for matching
                var ownerToMatch = owner.replace(/\s*\(you\)\s*$/, '');
                return owner.indexOf(ownerToMatch) !== -1;
            });
            shouldShow = shouldShow && matchesOwner;
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
        
        
        // Show or hide the record
        record.style.display = shouldShow ? '' : 'none';
        if (shouldShow) {
            visibleCount++;
        }
    });
    
    // Show "no results" message if no victims match filters
    var noResultsMessage = document.getElementById('no-results-message');
    if (visibleCount === 0 && (selectedOwners.length > 0 || selectedVictims.length > 0 || selectedServices.length > 0 || 
                               selectedAreas.length > 0 || selectedVictimCategories.length > 0)) {
        if (!noResultsMessage) {
            noResultsMessage = document.createElement('div');
            noResultsMessage.id = 'no-results-message';
            noResultsMessage.className = 'govuk-inset-text';
            noResultsMessage.textContent = 'No victims match the selected filters.';
            var victimContainer = document.getElementById('victims-container');
            if (victimContainer) {
                victimContainer.parentNode.insertBefore(noResultsMessage, victimContainer.nextSibling);
            }
        }
        noResultsMessage.style.display = '';
    } else if (noResultsMessage) {
        noResultsMessage.style.display = 'none';
    }
    
    // Hide Service row if Onboarded is "No"
    hideServiceRowWhenOnboardedNo();
}

// Hide Service and Owner rows when Onboarded value is "No"
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
        
        // Find and hide/show the Owner row only
        var rows = record.querySelectorAll('.govuk-summary-list__row');
        rows.forEach(function(row) {
            var keyEl = row.querySelector('.govuk-summary-list__key');
            if (keyEl) {
                var fieldName = keyEl.textContent.trim();
                // Hide the Owner row if Onboarded is "No", otherwise show it
                // Service row should always be visible
                if (fieldName === 'Owner') {
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
        
        // Count visible records across all pages
        var visibleRecords = 0;
        victimRecords.forEach(function(record) {
            if (record.style.display !== 'none') {
                visibleRecords++;
            }
        });
        
        // Calculate total pages needed
        var totalPages = Math.ceil(visibleRecords / RESULTS_PER_PAGE) || 1;
        
        // Update pagination buttons
        updatePaginationPages(totalPages);
        
        // Show page 1 by default after recalculation
        showPage(1, totalPages);
    }
    
    function updatePaginationPages(totalPages) {
        var paginationNav = document.querySelector('.govuk-pagination');
        
        // Hide entire pagination if only one page
        if (totalPages === 1) {
            if (paginationNav) {
                paginationNav.style.display = 'none';
            }
            return;
        }
        
        // Show pagination nav if more than one page
        if (paginationNav) {
            paginationNav.style.display = '';
        }
        
        // Hide all page items first
        var paginationItems = document.querySelectorAll('.govuk-pagination__item');
        paginationItems.forEach(function(item, index) {
            item.style.display = 'none';
        });
        
        // Show only the required number of page items
        paginationItems.forEach(function(item, index) {
            var pageNum = index + 1;
            if (pageNum <= totalPages) {
                item.style.display = '';
            }
        });
    }
    
    function showPage(pageNumber, totalPages) {
        if (!totalPages) {
            totalPages = 3;
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
        
        // Collect all records that pass filters
        victimRecords.forEach(function(record) {
            if (record.style.display !== 'none') {
                visibleRecords.push(record);
            }
        });
        
        // Calculate which records belong on this page
        var startIndex = (pageNumber - 1) * RESULTS_PER_PAGE;
        var endIndex = startIndex + RESULTS_PER_PAGE;
        
        // Hide all records
        victimRecords.forEach(function(record) {
            record.style.display = 'none';
        });
        
        // Show only records for current page
        for (var i = startIndex; i < endIndex && i < visibleRecords.length; i++) {
            visibleRecords[i].style.display = '';
        }
        
        // Update pagination styling
        var paginationItems = document.querySelectorAll('.govuk-pagination__item');
        paginationItems.forEach(function(item, index) {
            var pageNum = index + 1;
            var pageLink = item.querySelector('.govuk-pagination__link');
            
            if (pageNum === pageNumber) {
                item.classList.add('govuk-pagination__item--current');
                if (pageLink) {
                    pageLink.setAttribute('aria-current', 'page');
                }
            } else {
                item.classList.remove('govuk-pagination__item--current');
                if (pageLink) {
                    pageLink.removeAttribute('aria-current');
                }
            }
        })
        
        // Update previous/next button visibility
        var prevButton = document.getElementById('pagination-prev');
        var nextButton = document.getElementById('pagination-next');
        
        if (pageNumber === 1) {
            prevButton.parentElement.style.display = 'none';
        } else {
            prevButton.parentElement.style.display = 'block';
            prevButton.setAttribute('data-page', pageNumber - 1);
        }
        
        if (pageNumber === totalPages) {
            nextButton.parentElement.style.display = 'none';
        } else {
            nextButton.parentElement.style.display = 'block';
            nextButton.setAttribute('data-page', pageNumber + 1);
        }
        
        // Update page title for screen readers
        document.title = 'Victims (page ' + pageNumber + ' of ' + totalPages + ')';
        
        // Scroll to top of results
        var container = document.getElementById('victims-container');
        if (container) {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Set up pagination link event listeners
    function setupPaginationListeners() {
        var pageLinks = document.querySelectorAll('.govuk-pagination__list .govuk-pagination__link');
        var prevButton = document.getElementById('pagination-prev');
        var nextButton = document.getElementById('pagination-next');
        
        pageLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var pageNum = parseInt(this.getAttribute('data-page'));
                if (!isNaN(pageNum)) {
                    showPage(pageNum);
                }
            });
        });
        
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
        
        // Show victims container when search is applied
        var victimContainer = document.getElementById('victims-container');
        if (victimContainer && searchTerm !== '') {
            victimContainer.style.display = '';
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
            
            // Apply both search and filter visibility
            if (matchesSearch) {
                // Check if this record is also passing the active filters
                var currentDisplay = record.style.display;
                record.style.display = (currentDisplay === 'none') ? 'none' : '';
                if (record.style.display !== 'none') {
                    visibleCount++;
                }
            } else {
                record.style.display = 'none';
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
                noResultsMessage.className = 'govuk-inset-text';
                var victimContainer = document.getElementById('victims-container');
                if (victimContainer) {
                    victimContainer.parentNode.insertBefore(noResultsMessage, victimContainer.nextSibling);
                }
            }
            noResultsMessage.textContent = 'No victims match your search.';
            noResultsMessage.style.display = '';
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
    });
    
    // Handle clear search link
    if (clearSearchLink) {
        clearSearchLink.addEventListener('click', function(e) {
            e.preventDefault();
            searchInput.value = '';
            clearSearchWrapper.style.display = 'none';
            applySearch();
            searchInput.focus();
        });
    }
})();

// Add click handler to Clear filters link
var clearFiltersLink = document.querySelector('#clear-filters-wrapper a');
if (clearFiltersLink) {
    clearFiltersLink.addEventListener('click', function (e) {
    e.preventDefault();
    ownerCheckboxes.forEach(function (checkbox) {
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
    applyVictimFilters();
    hideServiceRowWhenOnboardedNo();
    });
}

// Render chips on page load
renderChips();
renderSearchCriteriaChips();

// Apply filters on page load if any are selected
applyVictimFilters();

// Hide Service row when Onboarded is "No" on page load
hideServiceRowWhenOnboardedNo();

// Show checked owner items on page load
ownerCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
    var parentItem = checkbox.closest('.govuk-checkboxes__item');
    if (parentItem) {
        parentItem.style.display = 'flex';
    }
    }
});

// Show the owner checkboxes container if there are checked items
var ownerCheckboxesContainer = document.getElementById('owner-checkboxes-container');
if (Array.from(ownerCheckboxes).some(function (cb) { return cb.checked; })) {
    ownerCheckboxesContainer.style.display = '';
}

// Add event listeners to filter checkboxes
// Owner, Victim Category, and Onboarded apply immediately on change
// Service and Area only apply when Search button is clicked
(function() {
    var immediateFilterCheckboxes = document.querySelectorAll('.owner-checkbox, .victim-checkbox, .victim-category-checkbox, .onboarded-checkbox');
    var searchCriteriaCheckboxes = document.querySelectorAll('.service-checkbox, .area-checkbox');
    
    // Immediate filters
    immediateFilterCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            var ownerCheckboxes = document.querySelectorAll('.owner-checkbox');
            var victimCheckboxes = document.querySelectorAll('.victim-checkbox');
            var areaCheckboxes = document.querySelectorAll('.area-checkbox');
            var serviceCheckboxes = document.querySelectorAll('.service-checkbox');
            var victimCategoryCheckboxes = document.querySelectorAll('.victim-category-checkbox');
            var onboardedCheckboxes = document.querySelectorAll('.onboarded-checkbox');
            
            var renderChips = function() {
                var selectedFiltersChips = document.getElementById('selected-filters-chips');
                selectedFiltersChips.innerHTML = '';
                
                function renderChipCategory(checkboxes, heading) {
                    var checkedItems = Array.from(checkboxes).filter(function(cb) { return cb.checked; });
                    if (checkedItems.length > 0) {
                        var h3 = document.createElement('h3');
                        h3.className = 'govuk-heading-s govuk-!-margin-top-3';
                        h3.style.marginBottom = '8px';
                        h3.textContent = heading;
                        selectedFiltersChips.appendChild(h3);
                        
                        checkedItems.forEach(function(checkbox) {
                            var chip = document.createElement('div');
                            chip.className = 'moj-filter-tags__tag';
                            chip.style.cssText = 'display: flex; align-items: baseline; background-color: #ffffff; color: #0b0c0c; padding: 5px 10px; margin-right: 5px; margin-bottom: 8px; border: 1px solid #0b0c0c; border-radius: 0;';
                            
                            var chipText = document.createElement('span');
                            chipText.className = 'govuk-body govuk-!-margin-0';
                            chipText.textContent = checkbox.getAttribute('data-label');
                            
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
                                applyVictimFilters();
                            });
                            
                            chip.appendChild(chipText);
                            chip.appendChild(removeBtn);
                            selectedFiltersChips.appendChild(chip);
                        });
                    }
                }
                
                renderChipCategory(ownerCheckboxes, 'Owner');
                renderChipCategory(victimCheckboxes, 'Victim');
                renderChipCategory(areaCheckboxes, 'Area');
                renderChipCategory(serviceCheckboxes, 'Service');
                renderChipCategory(victimCategoryCheckboxes, 'Victim category');
                renderChipCategory(onboardedCheckboxes, 'Onboarded');
                updateClearFiltersVisibility();
            };
            
            var updateClearFiltersVisibility = function() {
                var clearFiltersWrapper = document.getElementById('clear-filters-wrapper');
                var hasCheckedFilters = Array.from(ownerCheckboxes).some(function (checkbox) {
                    return checkbox.checked;
                }) || Array.from(victimCheckboxes).some(function (checkbox) {
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
                
                var heading = document.getElementById('selected-filters-heading');
                heading.textContent = hasCheckedFilters ? 'Selected filters' : 'No filters selected';
            };
            
            renderChips();
            applyVictimFilters();
        });
    });
    
    // Search criteria form submission
    var searchCriteriaForm = document.getElementById('search-criteria-form');
    if (searchCriteriaForm) {
        searchCriteriaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            searchFormSubmitted = true;
            renderChips();
            renderSearchCriteriaChips();
            applyVictimFilters();
        });
    }
    
    // Update chips display for Service and Area on checkbox change (but don't filter)
    searchCriteriaCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            renderChips();
            renderSearchCriteriaChips();
        });
    });

// Expose functions to window so they can be called from other scopes
window.applyVictimFilters = applyVictimFilters;
window.renderChips = renderChips;
})();

// Filter owner list based on autocomplete (now handled by initializeOwnerAutocomplete)
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
var selectedContainer = document.getElementById('area-selected-container');
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
            // Show the checkbox container
            areaCheckboxesContainer.style.display = '';
            // Clear the autocomplete input
            var input = container.querySelector('input');
            if (input) input.value = '';
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
        // Apply filters and render chips immediately
        if (window.applyVictimFilters) window.applyVictimFilters();
        if (window.renderChips) window.renderChips();
    }
    }
});
}

// Initialize accessible-autocomplete for Owner (Owner) filter
function initializeOwnerAutocomplete() {
var owners = [
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

var container = document.querySelector('#owner-autocomplete');
var ownerCheckboxesContainer = document.getElementById('owner-checkboxes-container');
var ownerCheckboxes = document.querySelectorAll('.owner-checkbox');

if (!container) {
    console.error('Owner autocomplete container not found');
    return;
}

if (typeof accessibleAutocomplete === 'undefined') {
    console.error('accessibleAutocomplete library not loaded');
    return;
}

// Create source function that returns matching owner labels
var sourceFunction = function(query, populateResults) {
    if (!query) {
    populateResults(owners.map(function(o) { return o.label; }));
    } else {
    var filtered = owners.filter(function(o) {
        return o.label.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    populateResults(filtered.map(function(o) { return o.label; }));
    }
};

accessibleAutocomplete({
    element: container,
    id: 'owner-autocomplete-input',
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
    var item = owners.find(function (o) { 
        return o.label === selected || o.label === (selected.label || selected); 
    });
    if (item) {
        // Find and check the selected checkbox
        ownerCheckboxes.forEach(function (checkbox) {
        if (checkbox.value === item.value) {
            checkbox.checked = true;
            // Show this checkbox's parent item
            var parentItem = checkbox.closest('.govuk-checkboxes__item');
            if (parentItem) {
            parentItem.style.display = 'flex';
            }
            ownerCheckboxesContainer.style.display = '';
        }
        });
        // Clear the input field after selection
        var input = container.querySelector('input');
        if (input) input.value = '';
        // Apply filters and render chips immediately
        if (window.applyVictimFilters) window.applyVictimFilters();
        if (window.renderChips) window.renderChips();
    }
    }
});
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
    console.error('Victim autocomplete container not found');
    return;
}

if (typeof accessibleAutocomplete === 'undefined') {
    console.error('accessibleAutocomplete library not loaded');
    return;
}

// Create source function that returns matching victim labels
var sourceFunction = function(query, populateResults) {
    if (!query) {
    populateResults(victims.map(function(v) { return v.label; }));
    } else {
    var filtered = victims.filter(function(v) {
        return v.label.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    populateResults(filtered.map(function(v) { return v.label; }));
    }
};

accessibleAutocomplete({
    element: container,
    id: 'victim-autocomplete-input',
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
        // Apply filters and render chips immediately
        if (window.applyVictimFilters) window.applyVictimFilters();
        if (window.renderChips) window.renderChips();
    }
    }
});
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', function() {
    initializeAreaAutocomplete();
    initializeOwnerAutocomplete();
    initializeVictimAutocomplete();
});
} else {
initializeAreaAutocomplete();
initializeOwnerAutocomplete();
initializeVictimAutocomplete();
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

// Add change event listener to owner checkboxes to hide when unchecked
document.addEventListener('change', function(e) {
if (e.target && e.target.classList.contains('owner-checkbox')) {
    var checkbox = e.target;
    var parentItem = checkbox.closest('.govuk-checkboxes__item');
    if (parentItem) {
    if (!checkbox.checked) {
        parentItem.style.display = 'none';
    }
    }
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
var owners = [
    { label: 'Amanda Smith', value: 'amanda-smith' },
    { label: 'Benjamin Taylor', value: 'benjamin-taylor' },
    { label: 'Catherine Johnson', value: 'catherine-johnson' },
    { label: 'David Brown', value: 'david-brown' },
    { label: 'Emma Wilson', value: 'emma-wilson' }
];

var container = document.querySelector('#owner-name-autocomplete');
var hidden = document.getElementById('owner-name');

if (container && typeof accessibleAutocomplete !== 'undefined') {
    accessibleAutocomplete({
    element: container,
    id: 'owner-name-autocomplete-input',
    source: owners.map(function (a) { return a.label; }),
    showAllValues: true,
    minLength: 0,
    confirmOnBlur: true,
    onConfirm: function (selected) {
        if (!selected) { 
        hidden.value = ''; 
        return; 
        }
        var item = owners.find(function (a) { return a.label === selected; });
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