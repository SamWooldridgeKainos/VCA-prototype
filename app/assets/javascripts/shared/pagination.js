// Shared pagination core functions
// Used by both victims-pagination.js and tasks-pagination.js
window.PaginationCore = (function() {

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
                ellipsisItem.textContent = '\u22EF'; // Midline horizontal ellipsis (GOV.UK standard)
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

    // Set up pagination link event listeners using event delegation
    function setupPaginationListeners(showPageFn) {
        var paginationList = document.querySelector('.govuk-pagination__list');
        var prevButton = document.getElementById('pagination-prev');
        var nextButton = document.getElementById('pagination-next');

        if (paginationList) {
            paginationList.addEventListener('click', function(e) {
                var link = e.target.closest('.govuk-pagination__link');
                if (link) {
                    e.preventDefault();
                    var pageNum = parseInt(link.getAttribute('data-page'));
                    if (!isNaN(pageNum)) {
                        showPageFn(pageNum);
                    }
                }
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                var pageNum = parseInt(this.getAttribute('data-page'));
                if (!isNaN(pageNum)) {
                    showPageFn(pageNum);
                }
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                var pageNum = parseInt(this.getAttribute('data-page'));
                if (!isNaN(pageNum)) {
                    showPageFn(pageNum);
                }
            });
        }
    }

    return {
        getPagesToShow: getPagesToShow,
        updatePaginationPages: updatePaginationPages,
        setupPaginationListeners: setupPaginationListeners
    };
})();
