// Errors for correspondence-language
function validateForm() {
  $('#error-form-group').removeClass('govuk-form-group--error');
  $('#error-form-group-language').removeClass('govuk-form-group--error');
  $('#other-language').removeClass('govuk-input--error');
  $('#error-message-radio, #error-message-language, #error-summary').remove();

  var radioChecked = $('[name=victimCorrespondenceLanguage]').is(':checked');
  var selectedValue = $('[name=victimCorrespondenceLanguage]:checked').val();
  var otherLanguage = $('#other-language').val().trim();

  if (radioChecked && (selectedValue !== 'Other' || otherLanguage !== '')) return true;

  var listHtml = '';
  if (!radioChecked) listHtml += '<li><a href="#error-message-radio">Select a preferred correspondence language</a></li>';
  if (radioChecked && selectedValue === 'Other' && otherLanguage === '') listHtml += '<li><a href="#error-message-language">Enter a language</a></li>';

  $('#myForm').before(
    '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list">' + listHtml + '</ul></div></div>'
  );
  $('#error-summary').focus();

  if (!radioChecked) {
    $('#error-form-group').addClass('govuk-form-group--error');
    $('#radio-group').before('<p class="govuk-error-message" id="error-message-radio"><span class="govuk-visually-hidden">Error:</span> Select a preferred correspondence language</p>');
  }

  if (radioChecked && selectedValue === 'Other' && otherLanguage === '') {
    $('#error-form-group-language').addClass('govuk-form-group--error');
    $('#other-language').before('<p class="govuk-error-message" id="error-message-language"><span class="govuk-visually-hidden">Error:</span> Enter a language</p>');
    $('#other-language').addClass('govuk-input--error');
  }

  return false;
}
