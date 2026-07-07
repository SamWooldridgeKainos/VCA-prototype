// Validation for Family Liaison Officer contact form
function validateForm() {
  // Allow delete submissions to bypass required field validation.
  if (document.activeElement && document.activeElement.classList && document.activeElement.classList.contains('govuk-button--warning')) {
    return true;
  }

  // Reset all error states
  $('#error-form-group-name').removeClass('govuk-form-group--error');
  $('#error-form-group-email').removeClass('govuk-form-group--error');
  $('#error-form-group-telephone').removeClass('govuk-form-group--error');
  $('#flo-name').removeClass('govuk-input--error');
  $('#flo-email').removeClass('govuk-input--error');
  $('#flo-telephone').removeClass('govuk-input--error');
  $('#error-message-name').remove();
  $('#error-message-email').remove();
  $('#error-message-telephone').remove();
  $('#error-summary').remove();

  var name = document.forms['myForm']['familyLiaisonOfficerName'].value.trim();
  var email = document.forms['myForm']['familyLiaisonOfficerEmailAddress'].value.trim();
  var telephone = document.forms['myForm']['familyLiaisonOfficerPhoneNumber'].value.trim();

  var hasErrors = false;
  var errorItems = '';

  if (!name) {
    hasErrors = true;
    errorItems += '<li><a href="#flo-name">Enter the name</a></li>';
    $('#error-form-group-name').addClass('govuk-form-group--error');
    $('#flo-name').addClass('govuk-input--error').before(
      '<p class="govuk-error-message" id="error-message-name"><span class="govuk-visually-hidden">Error:</span> Enter a name</p>'
    );
  }

  if (!email) {
    hasErrors = true;
    errorItems += '<li><a href="#flo-email">Enter an email address</a></li>';
    $('#error-form-group-email').addClass('govuk-form-group--error');
    $('#flo-email').addClass('govuk-input--error').before(
      '<p class="govuk-error-message" id="error-message-email"><span class="govuk-visually-hidden">Error:</span> Enter an email address</p>'
    );
  }

  if (!telephone) {
    hasErrors = true;
    errorItems += '<li><a href="#flo-telephone">Enter a telephone number</a></li>';
    $('#error-form-group-telephone').addClass('govuk-form-group--error');
    $('#flo-telephone').addClass('govuk-input--error').before(
      '<p class="govuk-error-message" id="error-message-telephone"><span class="govuk-visually-hidden">Error:</span> Enter a telephone number</p>'
    );
  }

  if (hasErrors) {
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
