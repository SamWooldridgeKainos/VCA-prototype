// Errors for previous-convictions
function validateForm() {
  $('#error-form-group').removeClass('govuk-form-group--error');
  $('#error-message-radio, #error-summary').remove();

  var radioChecked = $('[name=victimPreviousConvictions]').is(':checked');

  if (radioChecked) return true;

  var listHtml = '<li><a href="#error-message-radio">Select yes if the victim has any previous convictions</a></li>';

  $('#myForm').before(
    '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list">' + listHtml + '</ul></div></div>'
  );
  $('#error-summary').focus();

  $('#error-form-group').addClass('govuk-form-group--error');
  $('#radio-group').before('<p class="govuk-error-message" id="error-message-radio"><span class="govuk-visually-hidden">Error:</span> Select yes if the victim has any previous convictions</p>');

  return false;
}
