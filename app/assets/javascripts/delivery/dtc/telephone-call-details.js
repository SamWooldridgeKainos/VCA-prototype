// Errors
function validateForm() {
  $('#error-form-group-1').removeClass('govuk-form-group--error');
  $('#error-form-group-3').removeClass('govuk-form-group--error');
  $('#error-message-1').remove();
  $('#error-message-3').remove();
  $('#error-message-1').html('');
  $('#error-message-3').html('');
  $('#error-summary').remove();
  $('#error-summary-list').html('');
  $('#error-list-item-1').html('');
  $('#error-list-item-3').html('');
  
  var telephoneCallDate = document.forms["myForm"]["telephone-call-date"].value;
  var victimInformed = $('[name=victimInformed]');

  if (telephoneCallDate == "" || telephoneCallDate == null) {

    // Error form group styling
    $('#error-form-group-1').addClass('govuk-form-group--error');

    // Error message
    $('#telephone-call-date-picker').before(
      '<p class="govuk-error-message" id="error-1"><span class="govuk-visually-hidden">Error:</span> Select or enter the date of call</p>'
      );

    // Error input field styling
    $('#telephone-call-date').addClass('govuk-input--error');

    // Error summary
    $('#myForm').before(
      '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li><a href="#error-1">Select or enter the date of call</a></li></ul></div></div>'
      );
    $('#error-summary').focus();

    return false;
  }

  if (victimInformed.is(":checked")) {
    return true;
  } else {
    // Error form group styling
    $('#error-form-group-3').addClass('govuk-form-group--error');

    // Error message
    $('#radio-group').before('<p id="error-message-3" class="govuk-error-message"></p>');
    $('#error-message-3').html('<span id="error-3"><span class="govuk-visually-hidden">Error:</span> Select yes if the victim has been informed</span>');

    // Error summary
    $('#myForm').before(
        '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li><a href="#error-3">Select yes if the victim has been informed</a></li></ul></div></div>'
    );
    $('#error-summary').focus();

    return false;
    }
  }