// Victims page pagination
// Depends on: pagination.js (PaginationCore)
(function() {
    var RESULTS_PER_PAGE = 10;

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
        PaginationCore.updatePaginationPages(totalPages);

        // Show page 1 by default after recalculation
        showPage(1, totalPages);
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

        // Hide all records (both filtered and non-filtered) and their parent wrappers
        victimRecords.forEach(function(record) {
            record.style.display = 'none';
            // Also hide parent wrapper div if it has govuk-!-margin-bottom-9 class
            var parentWrapper = record.parentElement;
            if (parentWrapper && parentWrapper.classList.contains('govuk-!-margin-bottom-9')) {
                parentWrapper.style.display = 'none';
            }
        });

        // Show only records for current page
        for (var i = startIndex; i < endIndex && i < visibleRecords.length; i++) {
            visibleRecords[i].style.display = '';
            // Also show parent wrapper div if it has govuk-!-margin-bottom-9 class
            var parentWrapper = visibleRecords[i].parentElement;
            if (parentWrapper && parentWrapper.classList.contains('govuk-!-margin-bottom-9')) {
                parentWrapper.style.display = '';
            }
            // Also ensure parent victims-page is visible
            var parentPage = visibleRecords[i].closest('.victims-page');
            if (parentPage) {
                parentPage.style.display = '';
            }
        }

        // Update pagination with ellipsis pattern for current page
        PaginationCore.updatePaginationPages(totalPages, pageNumber);

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

        // Scroll to top of results (skip during initial page setup)
        if (initialSetupComplete) {
            var container = document.getElementById('victims-container');
            if (container) {
                container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    // Initialize pagination listeners
    function init() {
        PaginationCore.setupPaginationListeners(showPage);

        // Only show pagination if there are multiple pages AND results are visible
        var pageItems = document.querySelectorAll('.govuk-pagination__item');
        var victimContainer = document.getElementById('victims-container');
        var containerVisible = victimContainer && victimContainer.style.display !== 'none';
        if (pageItems.length > 1 && containerVisible) {
            var paginationNav = document.querySelector('.govuk-pagination');
            if (paginationNav) {
                paginationNav.style.display = '';
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Make functions available globally
    window.recalculatePagination = recalculatePagination;
    window.showPage = showPage;
    window.updatePaginationPages = PaginationCore.updatePaginationPages;

})();
