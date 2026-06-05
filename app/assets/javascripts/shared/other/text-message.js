// Errors
function validateForm() {
    $('#error-form-group-1').removeClass('govuk-form-group--error');
    $('#error-form-group-2').removeClass('govuk-form-group--error');
    $('#error-form-group-3').removeClass('govuk-form-group--error');
    $('#error-form-group-4').removeClass('govuk-form-group--error');
    $('#error-form-group-5').removeClass('govuk-form-group--error');
    $('#error-form-group-6').removeClass('govuk-form-group--error');
    $('#error-form-group-7').removeClass('govuk-form-group--error');
    $('#other-text-message-date').removeClass('govuk-input--error');
    $('#other-text-message-hour').removeClass('govuk-input--error');
    $('#other-text-message-minutes').removeClass('govuk-input--error');
    $('#other-individual-name').removeClass('govuk-input--error');
    $('#other-individual-role').removeClass('govuk-input--error');
    $('#purpose-of-communication').removeClass('govuk-textarea--error');
    $('#error-message-1').remove();
    $('#error-message-2').remove();
    $('#error-message-3').remove();
    $('#error-message-4').remove();
    $('#error-message-5').remove();
    $('#error-message-6').remove();
    $('#error-message-7').remove();
    $('#error-summary').remove();

    var otherTextMessageDate = $('#other-text-message-date').val();
    var otherTextMessageHour = $('#other-text-message-hour').val();
    var otherTextMessageMinutes = $('#other-text-message-minutes').val();
    var otherTextMessageType = $('[name=otherTextMessageType]');
    var otherIndividual = $('[name=otherIndividual]');
    var purposeOfCommunication = $('#purpose-of-communication').val();

    var errors = [];

    if (otherTextMessageDate == '' || otherTextMessageDate == null) {
        // Error form group styling
        $('#error-form-group-1').addClass('govuk-form-group--error');

        // Error input field styling
        $('#other-text-message-date').addClass('govuk-input--error');

        // Error message
        $('#other-text-message-date-hint').after('<p id="error-message-1" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Enter the date of text message</p>');

        errors.push('<li><a href="#error-message-1">Enter the date of text message</a></li>');
    }



    if (!otherTextMessageType.is(':checked')) {
        // Error form group styling
        $('#error-form-group-3').addClass('govuk-form-group--error');

        // Error message
        $('#other-text-type-radios').before('<p id="error-message-3" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Select the direction of text message</p>');

        errors.push('<li><a href="#error-message-3">Select the direction of text message</a></li>');
    }

    if (!otherIndividual.is(':checked')) {
        // Error form group styling
        $('#error-form-group-4').addClass('govuk-form-group--error');

        // Error message
        $('#other-individual-radios').before('<p id="error-message-4" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Select the person contacted</p>');

        errors.push('<li><a href="#error-message-4">Select the person contacted</a></li>');
    }

    if ($('#other-individual-other').is(':checked')) {
        var otherIndividualName = $('#other-individual-name').val();
        var otherIndividualRole = $('#other-individual-role').val();

        if (otherIndividualName == '' || otherIndividualName == null) {
            // Error input field styling
            $('#other-individual-name').addClass('govuk-input--error');

            // Error form group styling
            $('#error-form-group-6').addClass('govuk-form-group--error');

            // Error message
            $('#other-individual-name').before('<p id="error-message-6" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Enter the name of the person contacted</p>');

            errors.push('<li><a href="#error-message-6">Enter the name of the person contacted</a></li>');
        }

        if (otherIndividualRole == '' || otherIndividualRole == null) {
            // Error input field styling
            $('#other-individual-role').addClass('govuk-input--error');

            // Error form group styling
            $('#error-form-group-7').addClass('govuk-form-group--error');

            // Error message
            $('#other-individual-role').before('<p id="error-message-7" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Enter the role of the person contacted</p>');

            errors.push('<li><a href="#error-message-7">Enter the role of the person contacted</a></li>');
        }
    }

    if (purposeOfCommunication == '' || purposeOfCommunication == null) {
        // Error form group styling
        $('#error-form-group-5').addClass('govuk-form-group--error');

        // Error textarea styling
        $('#purpose-of-communication').addClass('govuk-textarea--error');

        // Error message
        $('#purpose-of-communication').before('<p id="error-message-5" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Enter the purpose of text message</p>');

        errors.push('<li><a href="#error-message-5">Enter the purpose of text message</a></li>');
    }

    if (errors.length > 0) {
        // Error summary
        $('#myForm').before(
            '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list">' + errors.join('') + '</ul></div></div>'
        );
        $('#error-summary').focus();

        return false;
    }

    return true;
}
