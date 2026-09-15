// Validation for Bereaved family member's name form
function validateForm() {
  // Reset all error states
  $('#error-form-group').removeClass('govuk-form-group--error');
  $('#first-name').removeClass('govuk-input--error');
  $('#last-name').removeClass('govuk-input--error');
  $('#error-message-first-name').remove();
  $('#error-message-last-name').remove();
  $('#error-summary').remove();

  var firstName = document.forms['myForm']['fmFirstName'].value.trim();
  var lastName = document.forms['myForm']['fmLastName'].value.trim();

  var hasErrors = false;
  var errorItems = '';

  if (!firstName) {
    hasErrors = true;
    errorItems += '<li><a href="#first-name">Enter a first name</a></li>';
    $('#first-name').addClass('govuk-input--error').before(
      '<p class="govuk-error-message" id="error-message-first-name"><span class="govuk-visually-hidden">Error:</span> Enter a first name</p>'
    );
  }

  if (!lastName) {
    hasErrors = true;
    errorItems += '<li><a href="#last-name">Enter a last name</a></li>';
    $('#last-name').addClass('govuk-input--error').before(
      '<p class="govuk-error-message" id="error-message-last-name"><span class="govuk-visually-hidden">Error:</span> Enter a last name</p>'
    );
  }

  if (hasErrors) {
    $('#error-form-group').addClass('govuk-form-group--error');
    $('#myForm').before(
      '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary">' +
        '<h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2>' +
        '<div class="govuk-error-summary__body">' +
          '<ul class="govuk-list govuk-error-summary__list">' + errorItems + '</ul>' +
        '</div>' +
      '</div>'
    );
    $('#error-summary').focus();
    return false;
  }
}
