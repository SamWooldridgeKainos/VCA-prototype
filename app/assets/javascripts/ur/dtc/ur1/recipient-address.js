// Errors
function validateForm() {
    $('#error-form-group-1').removeClass('govuk-form-group--error');
    $('#error-form-group-2').removeClass('govuk-form-group--error');
    $('#error-form-group-3').removeClass('govuk-form-group--error');
    $('#recipient-address-line-1').removeClass('govuk-input--error');
    $('#recipient-address-town').removeClass('govuk-input--error');
    $('#recipient-address-postcode').removeClass('govuk-input--error');
    $('#error-message-1').remove();
    $('#error-message-1').html('');
    $('#error-message-2').remove();
    $('#error-message-2').html('');
    $('#error-message-3').remove();
    $('#error-message-3').html('');
    $('#error-summary').remove();
    $('#error-summary-list').html('');
    $('#error-list-item-1').html('');
    $('#error-list-item-2').html('');
    $('#error-list-item-3').html('');

    var recipientAddressLine1 = document.forms["myForm"]["recipientAddressLine1"].value;
    var recipientAddressTown = document.forms["myForm"]["recipientAddressTown"].value;
    var recipientAddressPostcode = document.forms["myForm"]["recipientAddressTown"].value;
  
    if (recipientAddressLine1 == "" || recipientAddressLine1 == null || recipientAddressTown == "" || recipientAddressTown == null || recipientAddressPostcode == "" || recipientAddressPostcode == null) {
      $('#myForm').before(
        '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul id="error-summary-list" class="govuk-list govuk-error-summary__list"><li id="error-list-item-1"></li><li id="error-list-item-2"></li><li id="error-list-item-3"></li></ul></div></div>'
      );
    
      // Blank fields
      if (recipientAddressLine1 == "" || recipientAddressLine1 == null) {
  
        // Error form group styling
        $('#error-form-group-1').addClass('govuk-form-group--error');
  
        // Error input field styling
        $('#recipient-address-line-1').addClass('govuk-input--error');
  
        // Error message
        $('#recipient-address-line-1-label').append('<p id="error-message-1" class="govuk-error-message"></p>');
        $('#error-message-1').html('<span id="error-1"><span class="govuk-visually-hidden">Error:</span> Enter recipient\'s address line 1, typically the building and the street</span>');
  
        // Error summary
        $('#error-list-item-1').html('<a href="#error-1">Enter recipient\'s address line 1, typically the building and the street</a>');
      }
  
      if (recipientAddressTown == "" || recipientAddressTown == null) {
  
        // Error form group styling
        $('#error-form-group-2').addClass('govuk-form-group--error');
  
        // Error input field styling
        $('#recipient-address-town').addClass('govuk-input--error');
  
        // Error message
        $('#recipient-address-town-label').append('<p id="error-message-2" class="govuk-error-message"></p>');
        $('#error-message-2').html('<span id="error-2"><span class="govuk-visually-hidden">Error:</span> Enter the recipient\'s town or city</span>');
  
        // Error summary
        $('#error-list-item-2').html('<a href="#error-2">Enter the recipient\'s town or city</a>');
      }

      if (recipientAddressPostcode == "" || recipientAddressPostcode == null) {
  
        // Error form group styling
        $('#error-form-group-3').addClass('govuk-form-group--error');
  
        // Error input field styling
        $('#recipient-address-postcode').addClass('govuk-input--error');
  
        // Error message
        $('#recipient-address-postcode-label').append('<p id="error-message-3" class="govuk-error-message"></p>');
        $('#error-message-3').html('<span id="error-3"><span class="govuk-visually-hidden">Error:</span> Enter the recipient\'s postcode</span>');
  
        // Error summary
        $('#error-list-item-3').html('<a href="#error-3">Enter the recipient\'s postcode</a>');
      }
  
      $('#error-summary').focus();
  
      return false;
    }
  }