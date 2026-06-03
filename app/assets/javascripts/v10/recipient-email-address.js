// Errors
function validateForm() {
    var recipientEmailAddress = document.forms["myForm"]["recipient-email-address"].value;
  
    if (recipientEmailAddress == "" || recipientEmailAddress == null) {
  
      // Error form group styling
      $('#error-form-group').addClass('govuk-form-group--error');
  
      // Error message
      $('#recipient-email-address').before(
        '<p class="govuk-error-message" id="error-1"><span class="govuk-visually-hidden">Error:</span> Enter the recipient\'s email address in the correct format, like name@example.com</p>'
        );

      // Error input field styling
      $('#recipient-email-address').addClass('govuk-input--error');
  
      // Error summary
      $('#myForm').before(
        '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li><a href="#error-1">Enter the recipient\'s email address in the correct format, like name@example.com</a></li></ul></div></div>'
        );
      $('#error-summary').focus();
  
      return false;
    }
  }