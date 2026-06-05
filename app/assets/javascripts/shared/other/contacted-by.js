// Errors
function validateForm() {
    $('#error-form-group-1').removeClass('govuk-form-group--error');
    $('#error-form-group-2').removeClass('govuk-form-group--error');
    $('#error-message-1').remove();
    $('#error-message-1').html('');
    $('#error-summary').remove();
    $('#error-summary-list').html('');
    $('#error-list-item-1').html('');
    $('#other-contact-method').removeClass('govuk-input--error');

    var contactedBy = $('[name=contactedBy]');
    var otherSelected = $('#contacted-by-other').is(':checked');
    var otherContactMethod = $('#other-contact-method').val();

    var hasError = false;

    if (!contactedBy.is(':checked')) {
        hasError = true;

        // Error form group styling
        $('#error-form-group-1').addClass('govuk-form-group--error');

        // Error message
        $('#radio-group').before('<p id="error-message-1" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Select how you communicated with the victim</p>');

        // Error summary
        $('#myForm').before(
            '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li><a href="#error-message-1">Select how you communicated with the victim</a></li></ul></div></div>'
        );
        $('#error-summary').focus();

        return false;
    }

    if (otherSelected && (otherContactMethod == '' || otherContactMethod == null)) {
        hasError = true;

        // Error form group styling
        $('#error-form-group-2').addClass('govuk-form-group--error');

        // Error input field styling
        $('#other-contact-method').addClass('govuk-input--error');

        // Error message
        $('#other-contact-method').before('<p id="error-message-1" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Enter the contact method</p>');

        // Error summary
        $('#myForm').before(
            '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li><a href="#error-message-1">Enter the contact method</a></li></ul></div></div>'
        );
        $('#error-summary').focus();

        return false;
    }

    return true;
}
