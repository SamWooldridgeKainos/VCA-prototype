// Errors
function validateForm() {
    $('#error-form-group').removeClass('govuk-form-group--error');
    $('#error-message-1').remove();
    $('#error-message-1').html('');
    $('#error-summary').remove();
    $('#error-summary-list').html('');
    $('#error-list-item-1').html('');
    
    var stoppedCharge = $('[name=stoppedCharge]');

    if (stoppedCharge.is(":checked")) {
        return true;
    } else {
        // Error form group styling
        $('#error-form-group').addClass('govuk-form-group--error');

        // Error message
        $('#radio-group').before('<p id="error-message-1" class="govuk-error-message"></p>');
        $('#error-message-1').html('<span id="error-1"><span class="govuk-visually-hidden">Error:</span> Select why the charge was stopped</span>');

        // Error summary
        $('#myForm').before(
            '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li><a href="#error-1">Select why the charge was stopped</a></li></ul></div></div>'
        );
        $('#error-summary').focus();

        return false;
    }
}