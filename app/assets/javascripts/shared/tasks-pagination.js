// Tasks page pagination
// Depends on: pagination.js (PaginationCore)
// Depends on globals: searchFormSubmitted
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
        PaginationCore.updatePaginationPages(totalPages);

        // Show page 1 by default after recalculation
        showPage(1, totalPages);
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

        // Update results count text
        var resultsCountTop = document.getElementById('results-count');
        var firstResult = startIndex + 1;
        var lastResult = Math.min(endIndex, visibleRecords.length);
        var resultsText = 'Showing results ' + firstResult + ' to ' + lastResult + ' of ' + visibleRecords.length + ' total results';
        if (resultsCountTop) resultsCountTop.textContent = resultsText;

        // Scroll to top of results (skip during initial page setup)
        if (initialSetupComplete) {
            var heading = document.getElementById('main-heading');
            if (heading) {
                heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    // Initialize pagination listeners
    function init() {
        PaginationCore.setupPaginationListeners(showPage);
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
