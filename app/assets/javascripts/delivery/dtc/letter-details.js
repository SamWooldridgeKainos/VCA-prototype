// Errors
function validateForm() {
    var letterDispatchDate = document.forms["myForm"]["letter-dispatch-date"].value;
  
    if (letterDispatchDate == "" || letterDispatchDate == null) {
  
      // Error form group styling
      $('#error-form-group').addClass('govuk-form-group--error');
  
      // Error message
      $('#letter-dispatch-date-picker').before(
        '<p class="govuk-error-message" id="error-1"><span class="govuk-visually-hidden">Error:</span> Select or enter the date of dispatch</p>'
        );

      // Error input field styling
      $('#letter-dispatch-date').addClass('govuk-input--error');
  
      // Error summary
      $('#myForm').before(
        '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li><a href="#error-1">Select or enter the date of dispatch</a></li></ul></div></div>'
        );
      $('#error-summary').focus();
  
      return false;
    }
  }