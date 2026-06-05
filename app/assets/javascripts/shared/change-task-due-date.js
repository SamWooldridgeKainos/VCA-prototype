// Validation for change task due date form
function validateForm() {
  // Clear previous errors
  $('#error-form-group-1').removeClass('govuk-form-group--error');
  $('#error-form-group-2').removeClass('govuk-form-group--error');
  $('#task-due-date').removeClass('govuk-input--error');
  $('#reason-for-due-date-change').removeClass('govuk-textarea--error');
  $('#error-message-1').remove();
  $('#error-message-2').remove();
  $('#error-summary').remove();

  var taskDueDate = document.getElementById('task-due-date').value;
  var reasonForChange = document.getElementById('reason-for-due-date-change').value;

  var hasErrors = false;
  var dateError = validateDate(taskDueDate);

  if (dateError || reasonForChange.trim() === '') {
    hasErrors = true;

    // Create error summary
    var errorSummaryHtml = '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary">' +
      '<h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2>' +
      '<div class="govuk-error-summary__body">' +
      '<ul class="govuk-list govuk-error-summary__list" id="error-summary-list">' +
      '<li id="error-list-item-1"></li>' +
      '<li id="error-list-item-2"></li>' +
      '</ul></div></div>';

    $('h1').before(errorSummaryHtml);
    $('#error-summary').focus();

    // Date validation error
    if (dateError) {
      $('#error-form-group-1').addClass('govuk-form-group--error');
      $('#task-due-date').addClass('govuk-input--error');
      
      $('#task-due-date').closest('.moj-datepicker').before(
        '<p class="govuk-error-message" id="error-message-1"><span class="govuk-visually-hidden">Error:</span> ' + dateError + '</p>'
      );
      
      $('#error-list-item-1').html('<a href="#task-due-date">' + dateError + '</a>');
    }

    // Reason for change validation error
    if (reasonForChange.trim() === '') {
      $('#error-form-group-2').addClass('govuk-form-group--error');
      $('#reason-for-due-date-change').addClass('govuk-textarea--error');
      
      $('#reason-for-due-date-change').before(
        '<p class="govuk-error-message" id="error-message-2"><span class="govuk-visually-hidden">Error:</span> Enter the reason for changing the due date</p>'
      );
      
      $('#error-list-item-2').html('<a href="#reason-for-due-date-change">Enter the reason for changing the due date</a>');
    }

    return false;
  }

  return true;
}

function validateDate(dateString) {
  // Check if empty
  if (!dateString || dateString.trim() === '') {
    return 'Enter the due date';
  }

  // Check format (DD/MM/YYYY)
  var datePattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  var match = dateString.match(datePattern);

  if (!match) {
    return 'Enter the due date in the correct format, like 17/05/2025';
  }

  var day = parseInt(match[1], 10);
  var month = parseInt(match[2], 10);
  var year = parseInt(match[3], 10);

  // Check valid month
  if (month < 1 || month > 12) {
    return 'Enter a valid month';
  }

  // Check valid day for month
  var daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return 'Enter a valid day';
  }

  // Check date is not in the past
  var inputDate = new Date(year, month - 1, day);
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  if (inputDate < today) {
    return 'The due date must be today or in the future';
  }

  // Check date is not a weekend
  var dayOfWeek = inputDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return 'The due date must be a working day (not a weekend)';
  }

  return null; // No error
}
