// Errors
function validateForm() {
    var preferredName = document.forms["myForm"]["preferred-name"].value;
  
    if (preferredName == "" || preferredName == null) {
  
      // Error form group styling
      $('#error-form-group').addClass('govuk-form-group--error');
  
      // Error message
      $('#preferred-name').before(
        '<p class="govuk-error-message" id="error-1"><span class="govuk-visually-hidden">Error:</span> Enter their preferred name</p>'
        );

      // Error input field styling
      $('#preferred-name').addClass('govuk-input--error');
  
      // Error summary
      $('#myForm').before(
        '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li><a href="#error-1">Enter their preferred name</a></li></ul></div></div>'
        );
      $('#error-summary').focus();
  
      return false;
    }
  }
