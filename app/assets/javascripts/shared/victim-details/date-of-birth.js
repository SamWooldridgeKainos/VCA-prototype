// Errors for date of birth
function validateForm() {
  $('#error-form-group-dob').removeClass('govuk-form-group--error');
  $('#error-form-group-reason').removeClass('govuk-form-group--error');
  $('#dob-day, #dob-month, #dob-year').removeClass('govuk-input--error');
  $('#victim-dob-reason').removeClass('govuk-textarea--error');
  $('#error-message-dob').remove();
  $('#error-message-reason').remove();
  $('#error-summary').remove();

  var d = document.forms["myForm"]["dob-day"].value.trim();
  var m = document.forms["myForm"]["dob-month"].value.trim();
  var y = document.forms["myForm"]["dob-year"].value.trim();
  var reason = document.forms["myForm"]["victim-dob-reason"].value.trim();

  var errors = [];
  var dobMsg = null;

  if (d === "" || m === "" || y === "") {
    dobMsg = 'Enter a date of birth';
  } else if (!/^\d+$/.test(d) || !/^\d+$/.test(m) || !/^\d+$/.test(y) || +d < 1 || +d > 31 || +m < 1 || +m > 12 || y.length !== 4) {
    dobMsg = 'Date of birth must be a real date';
  }
  if (dobMsg) errors.push({id:'dob', msg: dobMsg});
  if (reason === "") errors.push({id:'reason', msg:'Enter the reason for changing the date of birth'});

  if (errors.length === 0) return true;

  var listHtml = '';
  errors.forEach(function(e) { listHtml += '<li><a href="#error-message-' + e.id + '">' + e.msg + '</a></li>'; });
  $('#myForm').before(
    '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list">' + listHtml + '</ul></div></div>'
  );
  $('#error-summary').focus();

  if (dobMsg) {
    $('#error-form-group-dob').addClass('govuk-form-group--error');
    $('#dob').before('<p class="govuk-error-message" id="error-message-dob"><span class="govuk-visually-hidden">Error:</span> ' + dobMsg + '</p>');
    $('#dob-day, #dob-month, #dob-year').addClass('govuk-input--error');
  }
  if (reason === "") {
    $('#error-form-group-reason').addClass('govuk-form-group--error');
    $('#victim-dob-reason').before('<p class="govuk-error-message" id="error-message-reason"><span class="govuk-visually-hidden">Error:</span> Enter the reason for changing the date of birth</p>');
    $('#victim-dob-reason').addClass('govuk-textarea--error');
  }

  return false;
}
