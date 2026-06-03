// Errors
function validateForm() {
  $('#error-form-group-1').removeClass('govuk-form-group--error');
  $('#error-form-group-2').removeClass('govuk-form-group--error');
  $('#error-form-group-3').removeClass('govuk-form-group--error');
  $('#text-message-date').removeClass('govuk-input--error');
  $('#text-message-hour').removeClass('govuk-input--error');
  $('#text-message-minutes').removeClass('govuk-input--error');
  $('#second-call-hour').removeClass('govuk-input--error');
  $('#second-call-minutes').removeClass('govuk-input--error');
  $('#error-message-1').remove();
  $('#error-message-2').remove();
  $('#error-message-3').remove();
  $('#error-message-1').html('');
  $('#error-message-2').html('');
  $('#error-message-3').html('');
  $('#error-summary').remove();
  $('#error-summary-list').html('');
  $('#error-list-item-1').html('');
  $('#error-list-item-2').html('');
  $('#error-list-item-3').html('');
  
  var textMessageDate = document.forms["myForm"]["textMessageDate"].value;
  var textMessageHour = document.forms["myForm"]["textMessageHour"].value;
  var textMessageMinutes = document.forms["myForm"]["textMessageMinutes"].value;
  var secondCallHour = document.forms["myForm"]["secondCallHour"].value;
  var secondCallMinutes = document.forms["myForm"]["secondCallMinutes"].value;
  var thirdCallHour = document.forms["myForm"]["thirdCallHour"].value;
  var thirdCallMinutes = document.forms["myForm"]["thirdCallMinutes"].value;

  if (textMessageDate == "" || textMessageDate == null || textMessageHour == "" || textMessageHour == null || textMessageMinutes == "" || textMessageMinutes == null || secondCallHour == "" || secondCallHour == null || secondCallMinutes == "" || secondCallMinutes == null || thirdCallHour == "" || thirdCallHour == null || thirdCallMinutes == "" || thirdCallMinutes == null) {

    // Error summary
    $('#myForm').before(
      '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li id="error-list-item-1"></li><li id="error-list-item-2"></li><li id="error-list-item-3"></li></ul></div></div>'
    );
    $('#error-summary').focus();
  
    if (textMessageDate == "" || textMessageDate == null) {

      // Error form group styling
      $('#error-form-group-1').addClass('govuk-form-group--error');

      // Error message
      $('#text-message-date-picker').before(
        '<p class="govuk-error-message" id="error-message-1"><span class="govuk-visually-hidden">Error:</span> Select or enter the date of the text message</p>'
      );

      // Error input field styling
      $('#text-message-date').addClass('govuk-input--error');

      // Error summary
      $('#error-list-item-1').html('<a href="#error-message-1">Select or enter the date of the text message</a>');
    }

    if ((textMessageHour == "" || textMessageHour == null) && (textMessageMinutes == "" || textMessageMinutes == null)) {

      // Error form group styling
      $('#error-form-group-2').addClass('govuk-form-group--error');

      // Error message
      $('#text-message-time').before(
        '<p class="govuk-error-message" id="error-message-2"><span class="govuk-visually-hidden">Error:</span> Enter the time of the text message</p>'
      );

      // Error input field styling
      $('#text-message-hour').addClass('govuk-input--error');
      $('#text-message-minutes').addClass('govuk-input--error');

      // Error summary
      $('#error-list-item-2').html('<a href="#error-message-2">Enter the time of the text message</a>');
      
    } else if ((textMessageHour == "" || textMessageHour == null) && (textMessageMinutes != "" || textMessageMinutes != null)) {

      // Error form group styling
      $('#error-form-group-2').addClass('govuk-form-group--error');

      // Error message
      $('#text-message-time').before(
        '<p class="govuk-error-message" id="error-message-2"><span class="govuk-visually-hidden">Error:</span> Enter the hour of the text message</p>'
      );

      // Error input field styling
      $('#text-message-hour').addClass('govuk-input--error');

      // Error summary
      $('#error-list-item-2').html('<a href="#error-message-2">Enter the hour of the text message</a>');
      
    } else if ((textMessageMinutes == "" || textMessageMinutes == null) && (textMessageHour != "" || textMessageHour != null)) {

      // Error form group styling
      $('#error-form-group-2').addClass('govuk-form-group--error');

      // Error message
      $('#text-message-time').before(
        '<p class="govuk-error-message" id="error-message-2"><span class="govuk-visually-hidden">Error:</span> Enter the minutes of the text message</p>'
      );

      // Error input field styling
      $('#text-message-minutes').addClass('govuk-input--error');

      // Error summary
      $('#error-list-item-2').html('<a href="#error-message-2">Enter the minutes of the text message</a>');
    }

    if ((secondCallHour == "" || secondCallHour == null) && (secondCallMinutes == "" || secondCallMinutes == null)) {

      // Error form group styling
      $('#error-form-group-3').addClass('govuk-form-group--error');

      // Error message
      $('#second-call-time').before(
        '<p class="govuk-error-message" id="error-message-3"><span class="govuk-visually-hidden">Error:</span> Enter the time of the second call attempt</p>'
      );

      // Error input field styling
      $('#second-call-hour').addClass('govuk-input--error');
      $('#second-call-minutes').addClass('govuk-input--error');

      // Error summary
      $('#error-list-item-3').html('<a href="#error-message-3">Enter the time of the second call attempt</a>');
      
    } else if ((secondCallHour == "" || secondCallHour == null) && (secondCallMinutes != "" || secondCallMinutes != null)) {

      // Error form group styling
      $('#error-form-group-3').addClass('govuk-form-group--error');

      // Error message
      $('#second-call-time').before(
        '<p class="govuk-error-message" id="error-message-3"><span class="govuk-visually-hidden">Error:</span> Enter the hour of the second call</p>'
      );

      // Error input field styling
      $('#second-call-hour').addClass('govuk-input--error');

      // Error summary
      $('#error-list-item-3').html('<a href="#error-message-3">Enter the hour of the second call</a>');
      
    } else if ((secondCallMinutes == "" || secondCallMinutes == null) && (secondCallHour != "" || secondCallHour != null)) {

      // Error form group styling
      $('#error-form-group-3').addClass('govuk-form-group--error');

      // Error message
      $('#second-call-time').before(
        '<p class="govuk-error-message" id="error-message-3"><span class="govuk-visually-hidden">Error:</span> Enter the minutes of the second call</p>'
      );

      // Error input field styling
      $('#second-call-minutes').addClass('govuk-input--error');

      // Error summary
      $('#error-list-item-3').html('<a href="#error-message-3">Enter the minutes of the second call</a>');
    }

    return false;
  }
}