// Errors
function validateForm() {
    $('#error-form-group-1').removeClass('govuk-form-group--error');
    $('#error-form-group-2').removeClass('govuk-form-group--error');
    $('#prosecutor-forename').removeClass('govuk-input--error');
    $('#prosecutor-surname').removeClass('govuk-input--error');
    $('#error-message-1').remove();
    $('#error-message-1').html('');
    $('#error-message-2').remove();
    $('#error-message-2').html('');
    $('#error-summary').remove();
    $('#error-summary-list').html('');
    $('#error-list-item-1').html('');
    $('#error-list-item-2').html('');

    var prosecutorForename = document.forms["myForm"]["prosecutorForename"].value;
    var prosecutorSurname = document.forms["myForm"]["prosecutorSurname"].value;
  
    if (prosecutorForename == "" || prosecutorForename == null || prosecutorSurname == "" || prosecutorSurname == null) {
      $('#myForm').before(
        '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul id="error-summary-list" class="govuk-list govuk-error-summary__list"><li id="error-list-item-1"></li><li id="error-list-item-2"></li></ul></div></div>'
      );
    
      // Blank fields
      if (prosecutorForename == "" || prosecutorForename == null) {
  
        // Error form group styling
        $('#error-form-group-1').addClass('govuk-form-group--error');
  
        // Error input field styling
        $('#prosecutor-forename').addClass('govuk-input--error');
  
        // Error message
        $('#prosecutor-forename-label').append('<p id="error-message-1" class="govuk-error-message"></p>');
        $('#error-message-1').html('<span id="error-1"><span class="govuk-visually-hidden">Error:</span> Enter the prosecutor\'s forename</span>');
  
        // Error summary
        $('#error-list-item-1').html('<a href="#error-1">Enter the prosecutor\'s forname</a>');
      }
  
      if (prosecutorSurname == "" || prosecutorSurname == null) {
  
        // Error form group styling
        $('#error-form-group-2').addClass('govuk-form-group--error');
  
        // Error input field styling
        $('#prosecutor-surname').addClass('govuk-input--error');
  
        // Error message
        $('#prosecutor-surname-label').append('<p id="error-message-2" class="govuk-error-message"></p>');
        $('#error-message-2').html('<span id="error-2"><span class="govuk-visually-hidden">Error:</span> Enter the prosecutor\'s surname</span>');
  
        // Error summary
        $('#error-list-item-2').html('<a href="#error-2">Enter the prosecutor\'s surname</a>');
      }
  
      $('#error-summary').focus();
  
      return false;
    }
  }