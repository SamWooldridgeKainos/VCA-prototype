// Errors for victim representative
function validateForm() {
  $('#error-form-group-1').removeClass('govuk-form-group--error');
  $('#victim-representative-name').removeClass('govuk-input--error');
  $('#error-message-1, #error-summary').remove();

  var name = document.forms["myForm"]["victim-representative-name"].value.trim();

  if (name === "") {
    $('#myForm').before(
      '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li id="error-list-item-1"></li></ul></div></div>'
    );
    $('#error-summary').focus();

    $('#error-form-group-1').addClass('govuk-form-group--error');
    $('#victim-representative-name').before('<p class="govuk-error-message" id="error-message-1"><span class="govuk-visually-hidden">Error:</span> Enter the victim representative\'s name</p>');
    $('#victim-representative-name').addClass('govuk-input--error');
    $('#error-list-item-1').html('<a href="#error-message-1">Enter the victim representative\'s name</a>');

    return false;
  }
}
