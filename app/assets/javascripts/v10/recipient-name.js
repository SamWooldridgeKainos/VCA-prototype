// Errors
function validateForm() {
    $('#error-form-group-1').removeClass('govuk-form-group--error');
    $('#error-form-group-2').removeClass('govuk-form-group--error');
    $('#recipient-forename').removeClass('govuk-input--error');
    $('#recipient-surname').removeClass('govuk-input--error');
    $('#error-message-1').remove();
    $('#error-message-1').html('');
    $('#error-message-2').remove();
    $('#error-message-2').html('');
    $('#error-summary').remove();
    $('#error-summary-list').html('');
    $('#error-list-item-1').html('');
    $('#error-list-item-2').html('');

    var recipientForename = document.forms["myForm"]["recipientForename"].value;
    var recipientSurname = document.forms["myForm"]["recipientSurname"].value;
  
    if (recipientForename == "" || recipientForename == null || recipientSurname == "" || recipientSurname == null) {
      $('#myForm').before(
        '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul id="error-summary-list" class="govuk-list govuk-error-summary__list"><li id="error-list-item-1"></li><li id="error-list-item-2"></li></ul></div></div>'
      );
    
      // Blank fields
      if (recipientForename == "" || recipientForename == null) {
  
        // Error form group styling
        $('#error-form-group-1').addClass('govuk-form-group--error');
  
        // Error input field styling
        $('#recipient-forename').addClass('govuk-input--error');
  
        // Error message
        $('#recipient-forename-label').append('<p id="error-message-1" class="govuk-error-message"></p>');
        $('#error-message-1').html('<span id="error-1"><span class="govuk-visually-hidden">Error:</span> Enter the recipient\'s forename</span>');
  
        // Error summary
        $('#error-list-item-1').html('<a href="#error-1">Enter the recipient\'s forename</a>');
      }
  
      if (recipientSurname == "" || recipientSurname == null) {
  
        // Error form group styling
        $('#error-form-group-2').addClass('govuk-form-group--error');
  
        // Error input field styling
        $('#recipient-surname').addClass('govuk-input--error');
  
        // Error message
        $('#recipient-surname-label').append('<p id="error-message-2" class="govuk-error-message"></p>');
        $('#error-message-2').html('<span id="error-2"><span class="govuk-visually-hidden">Error:</span> Enter the recipient\'s surname</span>');
  
        // Error summary
        $('#error-list-item-2').html('<a href="#error-2">Enter the recipient\'s surname</a>');
      }
  
      $('#error-summary').focus();
  
      return false;
    }
  }