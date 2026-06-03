// Errors
function validateForm() {
    $('#error-form-group').removeClass('govuk-form-group--error');
    $('#not-contacted-reason').removeClass('govuk-textarea--error');
    $('#error-message-1').remove();
    $('#error-summary').remove();

    var reason = $('#not-contacted-reason').val();

    if (reason && reason.trim().length > 0) {
        return true;
    } else {
        // Error form group styling
        $('#error-form-group').addClass('govuk-form-group--error');

        // Error message
        $('#not-contacted-reason').before('<p id="error-message-1" class="govuk-error-message"></p>');
        $('#error-message-1').html('<span id="error-1"><span class="govuk-visually-hidden">Error:</span> Enter a reason for not contacting the victim</span>');

        // Error textarea styling
        $('#not-contacted-reason').addClass('govuk-textarea--error');

        // Error summary
        $('#myForm').before(
            '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li><a href="#error-1">Enter a reason for not contacting the victim</a></li></ul></div></div>'
        );
        $('#error-summary').focus();

        return false;
    }
}
