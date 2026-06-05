// Errors for category
function validateForm() {
  $('#error-form-group').removeClass('govuk-form-group--error');
  $('#error-message-checkbox, #error-summary').remove();

  var checked = $('[name=victimCategory]:checked').length > 0;

  if (checked) return true;

  $('#myForm').before(
    '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li><a href="#error-message-checkbox">Select which categories apply to the victim</a></li></ul></div></div>'
  );
  $('#error-summary').focus();

  $('#error-form-group').addClass('govuk-form-group--error');
  $('#checkbox-group').before('<p class="govuk-error-message" id="error-message-checkbox"><span class="govuk-visually-hidden">Error:</span> Select which categories apply to the victim</p>');

  return false;
}
