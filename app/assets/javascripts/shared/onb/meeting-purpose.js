// Errors
function validateForm() {
    $('#error-form-group').removeClass('govuk-form-group--error');
    $('#error-message-1').remove();
    $('#error-summary').remove();
    $('#meeting-purpose-details').removeClass('govuk-textarea--error');

    var meetingPurpose = $('[name=meetingPurpose]');

    if (!meetingPurpose.is(':checked')) {
        $('#error-form-group').addClass('govuk-form-group--error');

        $('#radio-group').before('<p id="error-message-1" class="govuk-error-message"><span id="error-1"><span class="govuk-visually-hidden">Error:</span> Select the purpose of the meeting</span></p>');

        $('#myForm').before(
            '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li><a href="#error-1">Select the purpose of the meeting</a></li></ul></div></div>'
        );
        $('#error-summary').focus();

        return false;
    }

    if ($('#meeting-purpose-other').is(':checked') && $.trim($('#meeting-purpose-details').val()) === '') {
        $('#error-form-group').addClass('govuk-form-group--error');
        $('#meeting-purpose-details').addClass('govuk-textarea--error');

        $('#meeting-purpose-details').before('<p id="error-message-1" class="govuk-error-message"><span id="error-1"><span class="govuk-visually-hidden">Error:</span> Enter details for the meeting purpose</span></p>');

        $('#myForm').before(
            '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li><a href="#error-1">Enter details for the meeting purpose</a></li></ul></div></div>'
        );
        $('#error-summary').focus();

        return false;
    }

    return true;
}
