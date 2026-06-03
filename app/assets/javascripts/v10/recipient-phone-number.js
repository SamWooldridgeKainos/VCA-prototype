// Errors
function validateForm() {
    var recipientPhoneNumber = document.forms["myForm"]["recipient-phone-number"].value;
  
    if (recipientPhoneNumber == "" || recipientPhoneNumber == null) {
  
      // Error form group styling
      $('#error-form-group').addClass('govuk-form-group--error');
  
      // Error message
      $('#recipient-phone-number').before(
        '<p class="govuk-error-message" id="error-1"><span class="govuk-visually-hidden">Error:</span> Enter the recipient’s phone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192</p>'
        );

      // Error input field styling
      $('#recipient-phone-number').addClass('govuk-input--error');
  
      // Error summary
      $('#myForm').before(
        '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li><a href="#error-1">Enter the recipient’s phone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192</a></li></ul></div></div>'
        );
      $('#error-summary').focus();
  
      return false;
    }
}