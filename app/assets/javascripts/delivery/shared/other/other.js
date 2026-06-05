// Errors
function validateForm() {
    $('#error-form-group-1').removeClass('govuk-form-group--error');
    $('#error-form-group-2').removeClass('govuk-form-group--error');
    $('#error-form-group-3').removeClass('govuk-form-group--error');
    $('#error-form-group-4').removeClass('govuk-form-group--error');
    $('#error-form-group-5').removeClass('govuk-form-group--error');
    $('#error-form-group-6').removeClass('govuk-form-group--error');
    $('#error-form-group-7').removeClass('govuk-form-group--error');
    $('#other-comms-date').removeClass('govuk-input--error');
    $('#other-comms-hour').removeClass('govuk-input--error');
    $('#other-comms-minutes').removeClass('govuk-input--error');
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

    var otherCommsDate = $('#other-comms-date').val();
    var otherCommsHour = $('#other-comms-hour').val();
    var otherCommsMinutes = $('#other-comms-minutes').val();
    var otherCommsType = $('[name=otherCommsType]');
    var otherIndividual = $('[name=otherIndividual]');
    var purposeOfCommunication = $('#purpose-of-communication').val();

    var errors = [];

    if (otherCommsDate == '' || otherCommsDate == null) {
        // Error form group styling
        $('#error-form-group-1').addClass('govuk-form-group--error');

        // Error input field styling
        $('#other-comms-date').addClass('govuk-input--error');

        // Error message
        $('#other-comms-date-hint').after('<p id="error-message-1" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Enter the date of communication</p>');

        errors.push('<li><a href="#error-message-1">Enter the date of communication</a></li>');
    }



    if (!otherCommsType.is(':checked')) {
        // Error form group styling
        $('#error-form-group-3').addClass('govuk-form-group--error');

        // Error message
        $('#other-comms-type-radios').before('<p id="error-message-3" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Select the direction of communication</p>');

        errors.push('<li><a href="#error-message-3">Select the direction of communication</a></li>');
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
        $('#purpose-of-communication').before('<p id="error-message-5" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Enter the purpose of communication</p>');

        errors.push('<li><a href="#error-message-5">Enter the purpose of communication</a></li>');
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
