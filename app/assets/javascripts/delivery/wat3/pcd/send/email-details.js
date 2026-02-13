// Errors
function validateForm() {

  $('#error-form-group-1').removeClass('govuk-form-group--error');
  $('#email-dispatch-date').removeClass('govuk-input--error');
  $('#error-message-1').remove();
  $('#error-message-1').html('');
  $('#error-summary').remove();
  $('#error-summary-list').html('');
  $('#error-list-item-1').html('');

  var emailDispatchDate = document.forms["myForm"]["email-dispatch-date"].value;

  if (emailDispatchDate == "" || emailDispatchDate == null) {
    // Error form group styling
    $('#error-form-group-1').addClass('govuk-form-group--error');

    // Error message
    $('#email-dispatch-date-picker').before(
      '<p class="govuk-error-message" id="error-message-1"><span class="govuk-visually-hidden">Error:</span> Select or enter the date sent</p>'
    );

    // Error input field styling
    $('#email-dispatch-date').addClass('govuk-input--error');

    // Error summary
    $('#myForm').before(
      '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li id="error-list-item-1"></li><li id="error-list-item-2"></li><li id="error-list-item-3"></li><li id="error-list-item-4"></li></ul></div></div>'
    );
    $('#error-list-item-1').html('<a href="#error-message-1">Select or enter the date sent</a>');
    $('#error-summary').focus();

    return false;
  }
}
