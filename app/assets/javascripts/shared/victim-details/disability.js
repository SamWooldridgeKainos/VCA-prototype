// Errors for disability
function validateForm() {
  $('#error-form-group').removeClass('govuk-form-group--error');
  $('#details-yes-form-group').removeClass('govuk-form-group--error');
  $('#details-unknown-form-group').removeClass('govuk-form-group--error');
  $('#disability-details-yes, #disability-details-unknown').removeClass('govuk-textarea--error');
  $('#error-message-radio, #error-message-details, #error-summary').remove();

  var radioChecked = $('[name=victimDisability]').is(':checked');
  var selectedValue = $('[name=victimDisability]:checked').val();
  var errors = [];

  if (!radioChecked) {
    errors.push({ id: 'error-message-radio', href: '#error-message-radio', text: 'Select yes if the victim has a disability or access needs' });
  }

  if (radioChecked && (selectedValue === 'Yes' || selectedValue === 'Unknown')) {
    var detailsId = selectedValue === 'Yes' ? 'disability-details-yes' : 'disability-details-unknown';
    var detailsValue = $('#' + detailsId).val().trim();
    if (!detailsValue) {
      errors.push({ id: 'error-message-details', href: '#error-message-details', text: 'Enter details' });
    }
  }

  if (errors.length === 0) {
    // Remove name from the hidden textarea so only one value is submitted
    if (selectedValue === 'Yes') {
      $('#disability-details-unknown').removeAttr('name');
    } else if (selectedValue === 'Unknown') {
      $('#disability-details-yes').removeAttr('name');
    } else {
      // 'No' selected — clear details entirely
      $('#disability-details-yes').removeAttr('name');
      $('#disability-details-unknown').removeAttr('name');
      $('<input type="hidden" name="victimDisabilityDetails" value="">').appendTo('#myForm');
    }
    return true;
  }

  var listHtml = '';
  for (var i = 0; i < errors.length; i++) {
    listHtml += '<li><a href="' + errors[i].href + '">' + errors[i].text + '</a></li>';
  }

  $('#myForm').before(
    '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list">' + listHtml + '</ul></div></div>'
  );
  $('#error-summary').focus();

  if (!radioChecked) {
    $('#error-form-group').addClass('govuk-form-group--error');
    $('#radio-group').before('<p class="govuk-error-message" id="error-message-radio"><span class="govuk-visually-hidden">Error:</span> Select yes if the victim has a disability or access needs</p>');
  }

  if (radioChecked && (selectedValue === 'Yes' || selectedValue === 'Unknown')) {
    var formGroupId = selectedValue === 'Yes' ? '#details-yes-form-group' : '#details-unknown-form-group';
    var textareaId = selectedValue === 'Yes' ? '#disability-details-yes' : '#disability-details-unknown';
    var detailsVal = $(textareaId).val().trim();
    if (!detailsVal) {
      $(formGroupId).addClass('govuk-form-group--error');
      $(textareaId).addClass('govuk-textarea--error');
      $(textareaId).before('<p class="govuk-error-message" id="error-message-details"><span class="govuk-visually-hidden">Error:</span> Enter details</p>');
    }
  }

  return false;
}
