// Errors
function validateForm() {
    $('#error-form-group-1').removeClass('govuk-form-group--error');
    $('#error-form-group-2').removeClass('govuk-form-group--error');
    $('#oic-surname').removeClass('govuk-input--error');
    $('#oic-collar-number').removeClass('govuk-input--error');
    $('#error-message-1').remove();
    $('#error-message-1').html('');
    $('#error-message-2').remove();
    $('#error-message-2').html('');
    $('#error-summary').remove();
    $('#error-summary-list').html('');
    $('#error-list-item-1').html('');
    $('#error-list-item-2').html('');

    var oicSurname = document.forms["myForm"]["oicSurname"].value;
    var oicCollarNumber = document.forms["myForm"]["oicCollarNumber"].value;
  
    if (oicSurname == "" || oicSurname == null || oicSurname == "" || oicSurname == null) {
      $('#myForm').before(
        '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul id="error-summary-list" class="govuk-list govuk-error-summary__list"><li id="error-list-item-1"></li><li id="error-list-item-2"></li></ul></div></div>'
      );
    
      // Blank fields
      if (oicSurname == "" || oicSurname == null) {
  
        // Error form group styling
        $('#error-form-group-1').addClass('govuk-form-group--error');
  
        // Error input field styling
        $('#oic-forename').addClass('govuk-input--error');
  
        // Error message
        $('#oic-surname-label').append('<p id="error-message-1" class="govuk-error-message"></p>');
        $('#error-message-1').html('<span id="error-1"><span class="govuk-visually-hidden">Error:</span> Enter the officer in charge\'s surname</span>');
  
        // Error summary
        $('#error-list-item-1').html('<a href="#error-1">Enter the officer in charge\'s surname</a>');
      }
  
      if (oicCollarNumber == "" || oicCollarNumber == null) {
  
        // Error form group styling
        $('#error-form-group-2').addClass('govuk-form-group--error');
  
        // Error input field styling
        $('#oic-collar-number').addClass('govuk-input--error');
  
        // Error message
        $('#oic-collar-number-label').append('<p id="error-message-2" class="govuk-error-message"></p>');
        $('#error-message-2').html('<span id="error-2"><span class="govuk-visually-hidden">Error:</span> Enter the officer in charge\'s collar number</span>');
  
        // Error summary
        $('#error-list-item-2').html('<a href="#error-2">Enter the officer in charge\'s collar number</a>');
      }
  
      $('#error-summary').focus();
  
      return false;
    }
  }