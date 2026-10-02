// Validation for the CPS pre-trial meeting offer due date field on the
// meetings-2 change-meeting-due-date page. Scenario: mandatory field.
function validateForm() {
    // Clear previous errors
    $('#error-form-group-1').removeClass('govuk-form-group--error');
    $('#error-form-group-2').removeClass('govuk-form-group--error');
    $('#error-message-1').remove();
    $('#error-message-2').remove();
    $('#meeting-due-date').removeClass('govuk-input--error');
    $('#reason-for-change').removeClass('govuk-textarea--error');
    $('#error-summary').remove();

    var dateValue = document.getElementById('meeting-due-date').value;
    var reasonForChange = document.getElementById('reason-for-change').value;
    var dateDatePicker = $('#meeting-due-date-picker');
    var dateError = validateDate(dateValue);
    var reasonError = null;

    if (!reasonForChange || reasonForChange.trim() === '') {
        reasonError = 'Enter the reason for changing the meeting offer due date';
    }

    if (dateError || reasonError) {
        var summaryItems = '';
        if (dateError) {
            summaryItems += '<li><a href="#meeting-due-date">' + dateError + '</a></li>';
        }
        if (reasonError) {
            summaryItems += '<li><a href="#reason-for-change">' + reasonError + '</a></li>';
        }

        // Error summary at the top
        $('form').before(
            '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list">' + summaryItems + '</ul></div></div>'
        );
        $('#error-summary').focus();

        if (dateError) {
            // Error form group styling
            $('#error-form-group-1').addClass('govuk-form-group--error');

            // Error message below the label, before the date picker
            dateDatePicker.before('<p id="error-message-1" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> ' + dateError + '</p>');

            // Error input field styling
            $('#meeting-due-date').addClass('govuk-input--error');
        }

        if (reasonError) {
            // Error form group and textarea styling
            $('#error-form-group-2').addClass('govuk-form-group--error');
            $('#reason-for-change').addClass('govuk-textarea--error');

            // Error message below the label, before the textarea
            $('#reason-for-change').before('<p id="error-message-2" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> ' + reasonError + '</p>');
        }

        return false;
    }

    return true;
}

function validateDate(dateString) {
    // Mandatory field
    if (!dateString || dateString.trim() === '') {
        return 'Enter the CPS pre-trial meeting offer due date';
    }

    // Check format (DD/MM/YYYY)
    var datePattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    var match = dateString.match(datePattern);

    if (!match) {
        return 'The CPS pre-trial meeting offer due date must be a real date';
    }

    var day = parseInt(match[1], 10);
    var month = parseInt(match[2], 10);
    var year = parseInt(match[3], 10);

    // Check valid month
    if (month < 1 || month > 12) {
        return 'The CPS pre-trial meeting offer due date must be a real date';
    }

    // Check valid day for month
    var daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return 'The CPS pre-trial meeting offer due date must be a real date';
    }

    return null; // No error
}
