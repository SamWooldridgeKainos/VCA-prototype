// Validation for Bereaved family member's relationship form
function validateForm() {
  // Reset error states
  $('#error-form-group').removeClass('govuk-form-group--error');
  $('#event-name').removeClass('govuk-input--error');
  $('#error-message-relationship').remove();
  $('#error-summary').remove();

  var relationship = document.forms['myForm']['fmRelationship'].value.trim();

  if (!relationship) {
    $('#error-form-group').addClass('govuk-form-group--error');
    $('#event-name').addClass('govuk-input--error').before(
      '<p class="govuk-error-message" id="error-message-relationship"><span class="govuk-visually-hidden">Error:</span> Enter their relationship to the victim</p>'
    );
    $('#myForm').before(
      '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary">' +
        '<h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2>' +
        '<div class="govuk-error-summary__body">' +
          '<ul class="govuk-list govuk-error-summary__list"><li><a href="#event-name">Enter their relationship to the victim</a></li></ul>' +
        '</div>' +
      '</div>'
    );
    $('#error-summary').focus();
    return false;
  }
}
