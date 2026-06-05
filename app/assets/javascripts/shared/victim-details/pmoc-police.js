// Errors for pmoc-police
function validateForm() {
  $('#error-form-group').removeClass('govuk-form-group--error');
  $('#error-form-group-reason').removeClass('govuk-form-group--error');
  $('#pmoc-police-reason').removeClass('govuk-textarea--error');
  $('#error-message-radio, #error-message-reason, #error-summary').remove();

  var radioChecked = $('[name=pmocPolice]').is(':checked');
  var reason = $('#pmoc-police-reason').val().trim();

  if (radioChecked && reason !== '') return true;

  var listHtml = '';
  if (!radioChecked) listHtml += '<li><a href="#error-message-radio">Select a preferred method of contact for police</a></li>';
  if (reason === '') listHtml += '<li><a href="#error-message-reason">Enter the reason for changing the preferred method of contact for police</a></li>';

  $('#myForm').before(
    '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list">' + listHtml + '</ul></div></div>'
  );
  $('#error-summary').focus();

  if (!radioChecked) {
    $('#error-form-group').addClass('govuk-form-group--error');
    $('#radio-group').before('<p class="govuk-error-message" id="error-message-radio"><span class="govuk-visually-hidden">Error:</span> Select a preferred method of contact for police</p>');
  }

  if (reason === '') {
    $('#error-form-group-reason').addClass('govuk-form-group--error');
    $('#pmoc-police-reason').before('<p class="govuk-error-message" id="error-message-reason"><span class="govuk-visually-hidden">Error:</span> Enter the reason for changing the preferred method of contact for police</p>');
    $('#pmoc-police-reason').addClass('govuk-textarea--error');
  }

  return false;
}
