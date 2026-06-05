// Errors
function validateForm() {
    // Reset errors
    $('#error-form-group, #details-form-group').removeClass('govuk-form-group--error');
    $('#translator-needed-details').removeClass('govuk-textarea--error');
    $('#error-message-1, #error-message-details, #error-summary').remove();

    var translatorNeeded = $('[name=translatorNeeded]');
    var radioChecked = translatorNeeded.is(':checked');
    var yesChecked = $('#translator-needed-yes').is(':checked');
    var detailsValue = $.trim($('#translator-needed-details').val() || '');
    var detailsEmpty = yesChecked && detailsValue === '';

    if (radioChecked && !detailsEmpty) {
        return true;
    }

    var summaryItems = '';

    if (!radioChecked) {
        $('#error-form-group').addClass('govuk-form-group--error');
        $('#radio-group').before('<p id="error-message-1" class="govuk-error-message"><span id="error-1"><span class="govuk-visually-hidden">Error:</span> Select yes if they need a translator</span></p>');
        summaryItems += '<li><a href="#error-1">Select yes if they need a translator</a></li>';
    }

    if (detailsEmpty) {
        var $detailsGroup = $('#translator-needed-details').closest('.govuk-form-group').attr('id', 'details-form-group');
        $detailsGroup.addClass('govuk-form-group--error');
        $('#translator-needed-details').addClass('govuk-textarea--error');
        $('#translator-needed-details').before('<p id="error-message-details" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Enter translator details</p>');
        summaryItems += '<li><a href="#translator-needed-details">Enter translator details</a></li>';
    }

    $('#myForm').before(
        '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list">' + summaryItems + '</ul></div></div>'
    );
    $('#error-summary').focus();

    return false;
}
