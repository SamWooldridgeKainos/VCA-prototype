// Errors
function validateForm() {
    $('#error-form-group-1').removeClass('govuk-form-group--error');
    $('#error-form-group-2').removeClass('govuk-form-group--error');
    $('#error-form-group-3').removeClass('govuk-form-group--error');
    $('#error-form-group-4').removeClass('govuk-form-group--error');
    $('#follow-up-call-date').removeClass('govuk-input--error');
    $('#follow-up-call-hour').removeClass('govuk-input--error');
    $('#follow-up-call-minutes').removeClass('govuk-input--error');
    $('#error-message-1').remove();
    $('#error-message-2').remove();
    $('#error-message-3').remove();
    $('#error-message-4').remove();
    $('#error-summary').remove();

    var callDate = $('#follow-up-call-date').val();
    var callHour = $('#follow-up-call-hour').val();
    var callMinutes = $('#follow-up-call-minutes').val();
    var callType = $('[name=followUpCallType]');
    var victimInformed = $('[name=followUpVictimInformed]');

    var errors = [];

    if (callDate == '' || callDate == null) {
        // Error form group styling
        $('#error-form-group-1').addClass('govuk-form-group--error');

        // Error input field styling
        $('#follow-up-call-date').addClass('govuk-input--error');

        // Error message
        $('#follow-up-call-date-hint').after('<p id="error-message-1" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Enter the date of call</p>');

        errors.push('<li><a href="#error-message-1">Enter the date of call</a></li>');
    }

    if ((callHour == '' || callHour == null) && (callMinutes == '' || callMinutes == null)) {
        // Error form group styling
        $('#error-form-group-2').addClass('govuk-form-group--error');

        // Error input field styling
        $('#follow-up-call-hour').addClass('govuk-input--error');
        $('#follow-up-call-minutes').addClass('govuk-input--error');

        // Error message
        $('#follow-up-call-time-hint').after('<p id="error-message-2" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Enter the time of call</p>');

        errors.push('<li><a href="#error-message-2">Enter the time of call</a></li>');

    } else if ((callHour == '' || callHour == null) && (callMinutes != '' && callMinutes != null)) {
        // Error form group styling
        $('#error-form-group-2').addClass('govuk-form-group--error');

        // Error input field styling
        $('#follow-up-call-hour').addClass('govuk-input--error');

        // Error message
        $('#follow-up-call-time-hint').after('<p id="error-message-2" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Enter the hour for the time of call</p>');

        errors.push('<li><a href="#error-message-2">Enter the hour for the time of call</a></li>');

    } else if ((callMinutes == '' || callMinutes == null) && (callHour != '' && callHour != null)) {
        // Error form group styling
        $('#error-form-group-2').addClass('govuk-form-group--error');

        // Error input field styling
        $('#follow-up-call-minutes').addClass('govuk-input--error');

        // Error message
        $('#follow-up-call-time-hint').after('<p id="error-message-2" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Enter the minutes for the time of call</p>');

        errors.push('<li><a href="#error-message-2">Enter the minutes for the time of call</a></li>');
    }

    if (!callType.is(':checked')) {
        // Error form group styling
        $('#error-form-group-3').addClass('govuk-form-group--error');

        // Error message
        $('#follow-up-call-type-radios').before('<p id="error-message-3" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Select the direction of call</p>');

        errors.push('<li><a href="#error-message-3">Select the direction of call</a></li>');
    }

    if (!victimInformed.is(':checked')) {
        // Error form group styling
        $('#error-form-group-4').addClass('govuk-form-group--error');

        // Error message
        $('#follow-up-victim-informed-radios').before('<p id="error-message-4" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span> Select whether you were able to inform the victim of the decision</p>');

        errors.push('<li><a href="#error-message-4">Select whether you were able to inform the victim of the decision</a></li>');
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
