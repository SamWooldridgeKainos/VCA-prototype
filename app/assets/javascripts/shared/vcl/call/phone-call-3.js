// Errors
function validateForm() {
  $('#error-form-group-1').removeClass('govuk-form-group--error');
  $('#error-form-group-2').removeClass('govuk-form-group--error');
  $('#error-form-group-3').removeClass('govuk-form-group--error');
  $('#error-form-group-4').removeClass('govuk-form-group--error');
  $('#error-form-group-5').removeClass('govuk-form-group--error');
  $('#error-form-group-6').removeClass('govuk-form-group--error');
  $('#phone-call-date-3').removeClass('govuk-input--error');
  $('#call-hour-3').removeClass('govuk-input--error');
  $('#call-minutes-3').removeClass('govuk-input--error');
  $('#error-form-group-2').removeClass('govuk-input--error');
  $('#error-form-group-3').removeClass('govuk-input--error');
  $('#error-message-1').remove();
  $('#error-message-2').remove();
  $('#error-message-3').remove();
  $('#error-message-4').remove();
  $('#error-message-5').remove();
  $('#error-message-6').remove();
  $('#error-message-1').html('');
  $('#error-message-2').html('');
  $('#error-message-3').html('');
  $('#error-message-4').html('');
  $('#error-message-5').html('');
  $('#error-message-6').html('');
  $('#error-summary').remove();
  $('#error-summary-list').html('');
  $('#error-list-item-1').html('');
  $('#error-list-item-2').html('');
  $('#error-list-item-3').html('');
  $('#error-list-item-4').html('');
  $('#error-list-item-5').html('');
  $('#error-list-item-6').html('');
  
  var vclCallDate3 = document.forms["myForm"]["vclCallDate3"].value;
  var vclCallHour3 = document.forms["myForm"]["vclCallHour3"].value;
  var vclCallMinutes3 = document.forms["myForm"]["vclCallMinutes3"].value;
  var vclVictimInformed3 = $('[name=vclVictimInformed3]');
  var vclCallType3 = $('[name=vclCallType3]');
  var vclSurveyInterviewDiscussed3 = $('[name=vclSurveyInterviewDiscussed3]');

  const callDate3Array = vclCallDate3.split("/");
  var callDay3 = callDate3Array[0];
  var callMonth3 = callDate3Array[1];
  var callYear3 = callDate3Array[2];
  var newFormat = callYear3 + '-' + callMonth3 + '-' + callDay3;
  //alert('New format is ' + newFormat);

  if (vclCallDate3 == "" || vclCallDate3 == null || vclCallHour3 == "" || vclCallHour3 == null || vclCallMinutes3 == "" || vclCallMinutes3 == null ||vclVictimInformed3 == "" || vclVictimInformed3 == null || vclCallType3 == "" || vclCallType3 == null || ($('#support-signposted-checkboxes').length && !$('[name=vclSupportSignposted3]').is(':checked')) || ($('#survey-interview-radios').length && !vclSurveyInterviewDiscussed3.is(':checked'))) {

    // Error summary
    $('#myForm').before(
      '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li id="error-list-item-1"></li><li id="error-list-item-2"></li><li id="error-list-item-3"></li><li id="error-list-item-4"></li><li id="error-list-item-5"></li><li id="error-list-item-6"></li></ul></div></div>'
    );
    $('#error-summary').focus();
  
    if (vclCallDate3 == "" || vclCallDate3 == null) {

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

    if ((vclCallHour3 == "" || vclCallHour3 == null) && (vclCallMinutes3 == "" || vclCallMinutes3 == null)) {

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
      
    } else if ((vclCallHour3 == "" || vclCallHour3 == null) && (vclCallMinutes3 != "" || vclCallMinutes3 != null)) {

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
      
    } else if ((vclCallMinutes3 == "" || vclCallMinutes3 == null) && (vclCallHour3 != "" || vclCallHour3 != null)) {

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

    if (vclCallType3.is(":checked")) {
    } else {
      // Error form group styling
      $('#error-form-group-3').addClass('govuk-form-group--error');

      // Error message
      $('#call-type-radios').before('<p id="error-message-3" class="govuk-error-message"></p>');
      $('#error-message-3').html('<span id="error-message-3"><span class="govuk-visually-hidden">Error:</span> Select the call direction</span>');

      // Error summary
      $('#error-list-item-3').html('<a href="#error-message-3">Select the call direction</a>');
    }
    
    if (vclVictimInformed3.is(":checked")) {
    } else {
      // Error form group styling
      $('#error-form-group-4').addClass('govuk-form-group--error');

      // Error message
      $('#victim-informed-radios').before('<p id="error-message-4" class="govuk-error-message"></p>');
      $('#error-message-4').html('<span id="error-message-4"><span class="govuk-visually-hidden">Error:</span> Select yes if the victim has been informed</span>');

      // Error summary
      $('#error-list-item-4').html('<a href="#error-message-4">Select yes if the victim has been informed</a>');
    }

    if ($('#support-signposted-checkboxes').length && !$('[name=vclSupportSignposted3]').is(':checked')) {
      // Error form group styling
      $('#error-form-group-5').addClass('govuk-form-group--error');

      // Error message
      $('#support-signposted-checkboxes').before('<p id="error-message-5" class="govuk-error-message"></p>');
      $('#error-message-5').html('<span id="error-message-5"><span class="govuk-visually-hidden">Error:</span> Select the support you signposted to victim</span>');

      // Error summary
      $('#error-list-item-5').html('<a href="#error-message-5">Select the support you signposted to victim</a>');
    }

    if ($('#survey-interview-radios').length && !vclSurveyInterviewDiscussed3.is(":checked")) {
      // Error form group styling
      $('#error-form-group-6').addClass('govuk-form-group--error');

      // Error message
      $('#survey-interview-radios').before('<p id="error-message-6" class="govuk-error-message"></p>');
      $('#error-message-6').html('<span id="error-message-6"><span class="govuk-visually-hidden">Error:</span> Select yes if the survey interview was discussed with the victim</span>');

      // Error summary
      $('#error-list-item-6').html('<a href="#error-message-6">Select yes if the survey interview was discussed with the victim</a>');
    }

    return false;
  }
}