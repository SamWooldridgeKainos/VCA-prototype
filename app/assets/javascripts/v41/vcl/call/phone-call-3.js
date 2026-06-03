// Errors
function validateForm() {
  $('#error-form-group-1').removeClass('govuk-form-group--error');
  $('#error-form-group-2').removeClass('govuk-form-group--error');
  $('#error-form-group-3').removeClass('govuk-form-group--error');
  $('#error-form-group-4').removeClass('govuk-form-group--error');
  $('#phone-call-date-3').removeClass('govuk-input--error');
  $('#call-hour-3').removeClass('govuk-input--error');
  $('#call-minutes-3').removeClass('govuk-input--error');
  $('#error-form-group-2').removeClass('govuk-input--error');
  $('#error-form-group-3').removeClass('govuk-input--error');
  $('#error-message-1').remove();
  $('#error-message-2').remove();
  $('#error-message-3').remove();
  $('#error-message-4').remove();
  $('#error-message-1').html('');
  $('#error-message-2').html('');
  $('#error-message-3').html('');
  $('#error-message-4').html('');
  $('#error-summary').remove();
  $('#error-summary-list').html('');
  $('#error-list-item-1').html('');
  $('#error-list-item-2').html('');
  $('#error-list-item-3').html('');
  $('#error-list-item-4').html('');
  
  var phoneCallDate3 = document.forms["myForm"]["phoneCallDate3"].value;
  var callHour3 = document.forms["myForm"]["callHour3"].value;
  var callMinutes3 = document.forms["myForm"]["callMinutes3"].value;
  var victimInformed3 = $('[name=victimInformed3]');
  var callType3 = $('[name=callType3]');

  const callDate3Array = phoneCallDate3.split("/");
  var callDay3 = callDate3Array[0];
  var callMonth3 = callDate3Array[1];
  var callYear3 = callDate3Array[2];
  var newFormat = callYear3 + '-' + callMonth3 + '-' + callDay3;
  //alert('New format is ' + newFormat);

  if (phoneCallDate3 == "" || phoneCallDate3 == null || callHour3 == "" || callHour3 == null || callMinutes3 == "" || callMinutes3 == null ||victimInformed3 == "" || victimInformed3 == null || callType3 == "" || callType3 == null) {

    // Error summary
    $('#myForm').before(
      '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li id="error-list-item-1"></li><li id="error-list-item-2"></li><li id="error-list-item-3"></li><li id="error-list-item-4"></li></ul></div></div>'
    );
    $('#error-summary').focus();
  
    if (phoneCallDate3 == "" || phoneCallDate3 == null) {

      // Error form group styling
      $('#error-form-group-1').addClass('govuk-form-group--error');

      // Error message
      $('#phone-call-date-picker').before(
        '<p class="govuk-error-message" id="error-message-1"><span class="govuk-visually-hidden">Error:</span> Select or enter the date of call</p>'
      );

      // Error input field styling
      $('#phone-call-date-3').addClass('govuk-input--error');

      // Error summary
      $('#error-list-item-1').html('<a href="#error-message-1">Select or enter the date of call</a>');
    }

    if ((callHour3 == "" || callHour3 == null) && (callMinutes3 == "" || callMinutes3 == null)) {

      // Error form group styling
      $('#error-form-group-2').addClass('govuk-form-group--error');

      // Error message
      $('#call-time-3').before(
        '<p class="govuk-error-message" id="error-message-2"><span class="govuk-visually-hidden">Error:</span> Enter the time of call</p>'
      );

      // Error input field styling
      $('#call-hour-3').addClass('govuk-input--error');
      $('#call-minutes-3').addClass('govuk-input--error');

      // Error summary
      $('#error-list-item-2').html('<a href="#error-message-2">Enter the time of call</a>');
      
    } else if ((callHour3 == "" || callHour3 == null) && (callMinutes3 != "" || callMinutes3 != null)) {

      // Error form group styling
      $('#error-form-group-2').addClass('govuk-form-group--error');

      // Error message
      $('#call-time-3').before(
        '<p class="govuk-error-message" id="error-message-2"><span class="govuk-visually-hidden">Error:</span> Enter the hour for the time of call</p>'
      );

      // Error input field styling
      $('#call-hour-3').addClass('govuk-input--error');

      // Error summary
      $('#error-list-item-2').html('<a href="#error-message-2">Enter the hour for the time of call</a>');
      
    } else if ((callMinutes3 == "" || callMinutes3 == null) && (callHour3 != "" || callHour3 != null)) {

      // Error form group styling
      $('#error-form-group-2').addClass('govuk-form-group--error');

      // Error message
      $('#call-time-3').before(
        '<p class="govuk-error-message" id="error-message-2"><span class="govuk-visually-hidden">Error:</span> Enter the minutes for the time of call</p>'
      );

      // Error input field styling
      $('#call-minutes-3').addClass('govuk-input--error');

      // Error summary
      $('#error-list-item-2').html('<a href="#error-message-2">Enter the minutes for the time of call</a>');
    }

    if (callType3.is(":checked")) {
    } else {
      // Error form group styling
      $('#error-form-group-3').addClass('govuk-form-group--error');

      // Error message
      $('#call-type-radios').before('<p id="error-message-3" class="govuk-error-message"></p>');
      $('#error-message-3').html('<span id="error-message-3"><span class="govuk-visually-hidden">Error:</span> Select the call direction</span>');

      // Error summary
      $('#error-list-item-3').html('<a href="#error-message-3">Select the call direction</a>');
    }
    
    if (victimInformed3.is(":checked")) {
    } else {
      // Error form group styling
      $('#error-form-group-4').addClass('govuk-form-group--error');

      // Error message
      $('#victim-informed-radios').before('<p id="error-message-4" class="govuk-error-message"></p>');
      $('#error-message-4').html('<span id="error-message-4"><span class="govuk-visually-hidden">Error:</span> Select yes if the victim has been informed</span>');

      // Error summary
      $('#error-list-item-4').html('<a href="#error-message-4">Select yes if the victim has been informed</a>');
    }

    return false;
  }
}