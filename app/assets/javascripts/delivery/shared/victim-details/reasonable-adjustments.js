// Errors for reasonable adjustments
function validateForm() {
  $('#error-form-group-1').removeClass('govuk-form-group--error');
  $('#reasonable-adjustments').removeClass('govuk-textarea--error');
  $('#error-message-1, #error-summary').remove();

  var value = document.forms["myForm"]["reasonable-adjustments"].value.trim();

  if (value === "") {
    $('#myForm').before(
      '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li id="error-list-item-1"></li></ul></div></div>'
    );
    $('#error-summary').focus();

    $('#error-form-group-1').addClass('govuk-form-group--error');
    $('#reasonable-adjustments').before('<p class="govuk-error-message" id="error-message-1"><span class="govuk-visually-hidden">Error:</span> Enter reasonable adjustments</p>');
    $('#reasonable-adjustments').addClass('govuk-textarea--error');
    $('#error-list-item-1').html('<a href="#error-message-1">Enter reasonable adjustments</a>');

    return false;
  }
}
