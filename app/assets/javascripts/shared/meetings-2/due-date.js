// Validation for the not guilty plea date field on the meetings-2 due-date page.
// Two scenarios: mandatory field, and the date must be in the past.
function validateForm() {
    // Clear previous errors
    $('#error-form-group').removeClass('govuk-form-group--error');
    $('#error-message-1').remove();
    $('#ngp-date').removeClass('govuk-input--error');
    $('#error-summary').remove();

    var dateValue = document.getElementById('ngp-date').value;
    var dateDatePicker = $('#ngp-date-picker');
    var errorMessage = validateDate(dateValue);

    if (errorMessage) {
        // Error form group styling
        $('#error-form-group').addClass('govuk-form-group--error');

        // Error message below the label, before the date picker
        dateDatePicker.before('<p id="error-message-1" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> ' + errorMessage + '</p>');

        // Error input field styling
        $('#ngp-date').addClass('govuk-input--error');

        // Error summary at the top
        $('form').before(
            '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li><a href="#ngp-date">' + errorMessage + '</a></li></ul></div></div>'
        );
        $('#error-summary').focus();

        return false;
    }

    return true;
}

function validateDate(dateString) {
    // Mandatory field
    if (!dateString || dateString.trim() === '') {
        return 'Enter the date the defendant pleaded not guilty';
    }

    // Check format (DD/MM/YYYY)
    var datePattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    var match = dateString.match(datePattern);

    if (!match) {
        return 'Enter the date in the correct format, like 20/08/2026';
    }

    var day = parseInt(match[1], 10);
    var month = parseInt(match[2], 10);
    var year = parseInt(match[3], 10);

    // Check valid month
    if (month < 1 || month > 12) {
        return 'Enter a real date';
    }

    // Check valid day for month
    var daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return 'Enter a real date';
    }

    // Must be today or in the past
    var inputDate = new Date(year, month - 1, day);
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate > today) {
        return 'The date the defendant pleaded not guilty must be today or in the past';
    }

    return null; // No error
}
