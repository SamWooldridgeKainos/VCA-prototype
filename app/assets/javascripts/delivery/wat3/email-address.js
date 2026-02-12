// Errors
function validateForm() {
  $('#error-form-group-1').removeClass('govuk-form-group--error');
  $('#error-form-group-2').removeClass('govuk-form-group--error');
  $('#victim-email-address').removeClass('govuk-input--error');
  $('#victim-email-address-reason').removeClass('govuk-input--error');
  $('#error-message-1').remove();
  $('#error-message-2').remove();
  $('#error-message-1').html('');
  $('#error-message-2').html('');
  $('#error-summary').remove();
  $('#error-summary-list').html('');
  $('#error-list-item-1').html('');
  $('#error-list-item-2').html('');

  var victimEmailAddress = document.forms["myForm"]["victim-email-address"].value;
  var victimEmailAddressReason = document.forms["myForm"]["victim-email-address-reason"].value;

  if (victimEmailAddress == "" || victimEmailAddress == null || victimEmailAddressReason == "" || victimEmailAddressReason == null) {

    // Error summary
    $('#myForm').before(
      '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li id="error-list-item-1"></li><li id="error-list-item-2"></li></ul></div></div>'
    );
    $('#error-summary').focus();

    if (victimEmailAddress == "" || victimEmailAddress == null) {

      // Error form group styling
      $('#error-form-group-1').addClass('govuk-form-group--error');

      // Error message
      $('#victim-email-address').before(
        '<p class="govuk-error-message" id="error-message-1"><span class="govuk-visually-hidden">Error:</span> Enter the victim\'s email address in the correct format, like name@example.com</p>'
      );

      // Error input field styling
      $('#victim-email-address').addClass('govuk-input--error');

      // Error summary
      $('#error-list-item-1').html('<a href="#error-message-1">Enter the victim\'s email address in the correct format, like name@example.com</a>');
    }

    if (victimEmailAddressReason == "" || victimEmailAddressReason == null) {

      // Error form group styling
      $('#error-form-group-2').addClass('govuk-form-group--error');

      // Error message
      $('#victim-email-address-reason').before(
        '<p class="govuk-error-message" id="error-message-2"><span class="govuk-visually-hidden">Error:</span> Enter the reason for changing the victim\'s email address</p>'
      );

      // Error input field styling
      $('#victim-email-address-reason').addClass('govuk-input--error');

      // Error summary
      $('#error-list-item-2').html('<a href="#error-message-2">Enter the reason for changing the victim\'s email address</a>');
    }

    return false;
  }
}