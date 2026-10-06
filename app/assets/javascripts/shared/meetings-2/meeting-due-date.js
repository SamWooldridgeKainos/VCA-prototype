// Validation for the meetings-2 meeting-due-date page.
// The radio question is mandatory. If "By another date" is selected, the
// conditional date field is also mandatory.
function validateForm() {
    // Clear previous errors
    $('#error-form-group-1').removeClass('govuk-form-group--error');
    $('#error-form-group-2').removeClass('govuk-form-group--error');
    $('#error-message-1').remove();
    $('#error-message-2').remove();
    $('#meeting-due-date').removeClass('govuk-input--error');
    $('#error-summary').remove();

    var selectedOption = $('[name=meetingDueOption]:checked').val();
    var dueDateValue = document.getElementById('meeting-due-date').value;

    var optionError = null;
    var dateError = null;

    // The radio question is mandatory
    if (!selectedOption) {
        optionError = 'Select when the offer is due for the CPS pre-trial meeting';
    } else if (selectedOption === 'other-date' && dueDateValue.trim() === '') {
        // Conditional date field is mandatory when "By another date" is chosen
        dateError = 'Enter the meeting offer due date';
    }

    if (optionError || dateError) {
        // Error summary at the top
        var summaryItems = '';
        if (optionError) {
            summaryItems += '<li><a href="#meeting-due-plea">' + optionError + '</a></li>';
        }
        if (dateError) {
            summaryItems += '<li><a href="#meeting-due-date">' + dateError + '</a></li>';
        }

        $('form').before(
            '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list">' + summaryItems + '</ul></div></div>'
        );
        $('#error-summary').focus();

        // Radio question error
        if (optionError) {
            $('#error-form-group-1').addClass('govuk-form-group--error');
            $('#ngp-date-hint1').after('<p id="error-message-1" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> ' + optionError + '</p>');
        }

        // Conditional date field error
        if (dateError) {
            $('#error-form-group-2').addClass('govuk-form-group--error');
            $('#meeting-due-date').addClass('govuk-input--error');
            $('#meeting-due-date-picker').before('<p id="error-message-2" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> ' + dateError + '</p>');
        }

        return false;
    }

    return true;
}
