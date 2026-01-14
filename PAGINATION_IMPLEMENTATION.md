# Pagination Component Implementation

## Overview
A GOV.UK Design System compliant Pagination component has been successfully added to the Victims page with 5 results per page.

## Implementation Details

### 1. **HTML Structure** (`app/views/delivery/wat2/victims.html`)
- Added semantic `<nav>` element with `aria-label="Results pagination"`
- Implemented Previous/Next navigation buttons with SVG arrows
- Created numbered page links (1, 2, 3) representing the three victim pages
- All components follow GOV.UK Design System accessibility guidelines

### 2. **Styling** (`app/assets/sass/patterns/_pagination.scss`)
Created a new pagination pattern file with:
- **Responsive Layout**: Flex-based layout that adapts from mobile to desktop
- **Hover States**: Proper link hover styling with background color changes
- **Focus States**: 3px solid focus outline for accessibility
- **Current Page Indicator**: Highlighted background color for active page
- **Mobile-Optimized**: Titles hidden on small screens, displayed on larger screens
- **Icon Support**: Properly sized and colored navigation arrows

Key CSS classes implemented:
- `.govuk-pagination` - Main container
- `.govuk-pagination__list` - Flex container for layout
- `.govuk-pagination__item` - Page number items
- `.govuk-pagination__link` - Interactive links
- `.govuk-pagination__item--current` - Active page styling
- `.govuk-pagination__link--prev/next` - Previous/Next buttons
- `.govuk-pagination__icon` - Navigation arrow icons
- `.govuk-pagination__link-title` - Responsive text labels

### 3. **JavaScript Functionality** (`app/views/delivery/wat2/victims.html`)
Implemented pagination logic that:
- **Shows 5 results per page**: Each `.victims-page` div displays a single page worth of victims
- **Page Navigation**: Click on page numbers or Previous/Next buttons to navigate
- **Smooth Scrolling**: Automatically scrolls to the results section when changing pages
- **Dynamic UI Updates**: 
  - Updates active page indicator
  - Toggles Previous/Next button visibility appropriately
  - Manages `aria-current="page"` attribute for accessibility

### 4. **Accessibility Features**
- Semantic HTML5 `<nav>` element
- ARIA labels and current page indicators
- Keyboard navigation support
- Focus management with visible focus outlines
- Proper color contrast ratios
- Screen reader friendly markup

### 5. **Data Structure**
The victims are organized into three pages with 5 results each:
- **Page 1**: ADAMS Helen, BAKER David, GARCIA Rosita, LEE Michelle, CLARK Matthew
- **Page 2**: ADAMS Helen, PRICE Vincent
- **Page 3**: STEWART Angela, WHITE Barbara, KELLY Paul, RYAN Nancy, MOORE Margaret, GREEN Anthony, LEWIS Paul, WALKER Jessica, GARCIA Manuel

## Files Modified/Created
1. **Created**: `app/assets/sass/patterns/_pagination.scss`
2. **Modified**: `app/assets/sass/application.scss` (added pagination import)
3. **Modified**: `app/views/delivery/wat2/victims.html` (added pagination HTML and JavaScript)

## Compliance
✅ GOV.UK Design System guidelines
✅ WCAG 2.1 AA accessibility standards
✅ Responsive design (mobile-first)
✅ 5 results per paginated page
✅ Smooth user experience with proper focus management
