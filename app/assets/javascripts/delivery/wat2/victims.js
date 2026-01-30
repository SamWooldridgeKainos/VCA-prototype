// Initialize GOV.UK radios module for conditional reveal
if (window.GOVUKFrontend && window.GOVUKFrontend.Radios) {
var radios = new GOVUKFrontend.Radios(document.querySelector('[data-module="govuk-radios"]'));
}

// Track whether search criteria form has been submitted
var searchFormSubmitted = false;

// Handle Victim Liaison Officer filter chips
(function () {
var vloCheckboxes = document.querySelectorAll('.vlo-checkbox');
var victimCheckboxes = document.querySelectorAll('.victim-checkbox');
var areaCheckboxes = document.querySelectorAll('.area-checkbox');
var serviceRadios = document.querySelectorAll('.service-radio');
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
    
    // Render Victim Liaison Officer chips
    renderChipCategory(vloCheckboxes, 'Victim Liaison Officer');
    
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
    
    function renderChipCategory(items, heading) {
        var checkedItems = Array.from(items).filter(function(item) { return item.checked; });
        if (checkedItems.length > 0) {
            hasSearchCriteria = true;
            var h3 = document.createElement('h3');
            h3.className = 'govuk-heading-s govuk-!-margin-top-3';
            h3.style.marginBottom = '8px';
            h3.textContent = heading;
            searchCriteriaChipsContainer.appendChild(h3);
            
            checkedItems.forEach(function(item) {
                createChip(item, searchCriteriaChipsContainer);
            });
        }
    }
    
    renderChipCategory(serviceRadios, 'Service');
    renderChipCategory(areaCheckboxes, 'Area');
    
    // Update heading text and tag
    var heading = document.getElementById('selected-search-criteria-heading');
    if (heading) {
        heading.textContent = hasSearchCriteria ? 'Selected search criteria' : 'No search criteria selected';
        // Change from p to h2 when selections are made, or back to p when none
        if (hasSearchCriteria && heading.tagName !== 'H2') {
            var h2 = document.createElement('h2');
            h2.id = heading.id;
            h2.className = 'govuk-heading-m';
            h2.textContent = heading.textContent;
            heading.parentNode.replaceChild(h2, heading);
        } else if (!hasSearchCriteria && heading.tagName !== 'P') {
            var p = document.createElement('p');
            p.id = heading.id;
            p.className = 'govuk-body';
            p.textContent = heading.textContent;
            heading.parentNode.replaceChild(p, heading);
        }
    }
    
    // Update visibility of clear search criteria link
    var clearSearchCriteriaWrapper = document.getElementById('clear-search-criteria-wrapper');
    if (clearSearchCriteriaWrapper) {
        clearSearchCriteriaWrapper.style.display = hasSearchCriteria ? '' : 'none';
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
    var victimCheckboxes = document.querySelectorAll('.victim-checkbox');
    var areaCheckboxes = document.querySelectorAll('.area-checkbox');
    var serviceRadios = document.querySelectorAll('.service-radio');
    var victimCategoryCheckboxes = document.querySelectorAll('.victim-category-checkbox');
    
    // Get all checked filter values
    var selectedVlos = Array.from(vloCheckboxes)
        .filter(function(cb) { return cb.checked; })
        .map(function(cb) { return cb.getAttribute('data-label'); });
    
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
    
    // Determine if any immediate filters are active (Victim Liaison Officer, Victim, Category)
    var hasImmediateFilters = selectedVlos.length > 0 || selectedVictims.length > 0 || 
                              selectedVictimCategories.length > 0;
    
    // Determine if search criteria filters are active (Service, Area)
    var hasSearchCriteria = selectedAreas.length > 0 || selectedServices.length > 0;
    
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
        
        // Check Victim Liaison Officer filter
        if (selectedVlos.length > 0) {
            var vlo = getFieldValue('Victim Liaison Officer');
            var matchesVlo = selectedVlos.some(function(vlo) {
                // Remove "(you)" suffix from vlo label for matching
                var vloToMatch = vlo.replace(/\s*\(you\)\s*$/, '');
                return vlo.indexOf(vloToMatch) !== -1;
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
        
        
        // Show or hide the record
        record.style.display = shouldShow ? '' : 'none';
        if (shouldShow) {
            visibleCount++;
        }
    });
    
    // Show "no results" message if no victims match filters
    var noResultsMessage = document.getElementById('no-results-message');
    if (visibleCount === 0 && (selectedVlos.length > 0 || selectedVictims.length > 0 || selectedServices.length > 0 || 
                               selectedAreas.length > 0 || selectedVictimCategories.length > 0)) {
        if (!noResultsMessage) {
            noResultsMessage = document.createElement('div');
            noResultsMessage.id = 'no-results-message';
            noResultsMessage.className = 'govuk-inset-text';
            noResultsMessage.textContent = 'No results found. Check the case reference or search using different details.';
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
}

// Hide Service and Victim Liaison Officer rows when Onboarded value is "No"
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
        
        // Find and hide/show the Victim Liaison Officer row only
        var rows = record.querySelectorAll('.govuk-summary-list__row');
        rows.forEach(function(row) {
            var keyEl = row.querySelector('.govuk-summary-list__key');
            if (keyEl) {
                var fieldName = keyEl.textContent.trim();
                // Hide the Victim Liaison Officer row if Onboarded is "No", otherwise show it
                // Service row should always be visible
                if (fieldName === 'Victim Liaison Officer') {
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

// Render chips on page load
renderChips();
renderSearchCriteriaChips();

// Apply filters on page load if any are selected
applyVictimFilters();

// Hide Service row when Onboarded is "No" on page load
hideServiceRowWhenOnboardedNo();

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

// Add event listeners to filter checkboxes
// Victim Liaison Officer, Victim Category, and Onboarded apply immediately on change
// Service and Area only apply when Search button is clicked
(function() {
    var immediateFilterCheckboxes = document.querySelectorAll('.vlo-checkbox, .victim-checkbox, .victim-category-checkbox, .onboarded-checkbox');
    var searchCriteriaCheckboxes = document.querySelectorAll('.service-radio, .area-checkbox');
    
    // Immediate filters
    immediateFilterCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            var vloCheckboxes = document.querySelectorAll('.vlo-checkbox');
            var victimCheckboxes = document.querySelectorAll('.victim-checkbox');
            var areaCheckboxes = document.querySelectorAll('.area-checkbox');
            var serviceRadios = document.querySelectorAll('.service-radio');
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
                
                renderChipCategory(vloCheckboxes, 'Victim Liaison Officer');
                renderChipCategory(victimCheckboxes, 'Victim');
                renderChipCategory(victimCategoryCheckboxes, 'Victim category');
                renderChipCategory(onboardedCheckboxes, 'Onboarded');
                updateClearFiltersVisibility();
            };
            
            var updateClearFiltersVisibility = function() {
                var clearFiltersWrapper = document.getElementById('clear-filters-wrapper');
                var hasCheckedFilters = Array.from(vloCheckboxes).some(function (checkbox) {
                    return checkbox.checked;
                }) || Array.from(victimCheckboxes).some(function (checkbox) {
                    return checkbox.checked;
                }) || Array.from(victimCategoryCheckboxes).some(function (checkbox) {
                    return checkbox.checked;
                }) || Array.from(onboardedCheckboxes).some(function (checkbox) {
                    return checkbox.checked;
                });
                clearFiltersWrapper.style.display = hasCheckedFilters ? '' : 'none';
                
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
            };
            
            renderChips();
            applyVictimFilters();
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
                renderChips();
                renderSearchCriteriaChips();
                applyVictimFilters();
                return false;
            }, true);
        }
    }
    
    // Attach listener immediately and also on DOM ready to ensure it's set
    attachServiceAreaFormListener();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachServiceAreaFormListener);
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
window.renderSearchCriteriaChips = renderSearchCriteriaChips;

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
        renderChips();
        renderSearchCriteriaChips();
        updateClearFiltersVisibility();
        applyVictimFilters();
        hideServiceRowWhenOnboardedNo();
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
        
        // Update UI - render search criteria chips and apply filters
        renderSearchCriteriaChips();
        applyVictimFilters();
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
        // Render search criteria chips immediately
        if (window.renderSearchCriteriaChips) window.renderSearchCriteriaChips();
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
        if (window.renderSearchCriteriaChips) window.renderSearchCriteriaChips();
        if (window.applyVictimFilters) window.applyVictimFilters();
        if (window.renderChips) window.renderChips();
    }
    }
});
}

// Initialize accessible-autocomplete for Victim Liaison Officer filter
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
    console.error('Victim Liaison Officer autocomplete container not found');
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
    initializeVloAutocomplete();
    initializeVictimAutocomplete();
});
} else {
initializeAreaAutocomplete();
initializeVloAutocomplete();
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