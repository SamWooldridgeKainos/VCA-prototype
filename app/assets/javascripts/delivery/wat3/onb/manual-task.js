// Error validation for manual task form (Task name and Due date fields)
function validateForm() {
    // Clear previous errors
    $('#error-summary').remove();
    $('.govuk-form-group--error').removeClass('govuk-form-group--error');
    $('.govuk-error-message').remove();
    $('.govuk-input--error').removeClass('govuk-input--error');
    
    var manualTaskNameInput = $('[name=manualTaskName]');
    var dueDateInput = $('[name=nextTaskDueDate]');
    var dueDateDatePicker = $('#next-task-due-date-picker');
    
    var errors = [];
    var hasError = false;
    
    // Validate task name
    if (manualTaskNameInput.val().trim() === '') {
        hasError = true;
        var manualTaskNameGroup = manualTaskNameInput.closest('.govuk-form-group');
        manualTaskNameGroup.addClass('govuk-form-group--error');
        manualTaskNameInput.addClass('govuk-input--error');
        
        manualTaskNameInput.before('<p id="error-message-task-name" class="govuk-error-message"></p>');
        $('#error-message-task-name').html('<span id="error-task-name"><span class="govuk-visually-hidden">Error:</span> Enter a task name</span>');
        
        errors.push('<li><a href="#error-task-name">Enter a task name</a></li>');
    }
    
    // Validate due date
    if (dueDateInput.val().trim() === '') {
        hasError = true;
        dueDateDatePicker.closest('.govuk-form-group').addClass('govuk-form-group--error');
        dueDateInput.addClass('govuk-input--error');
        
        dueDateDatePicker.before('<p id="error-message-due-date" class="govuk-error-message"></p>');
        $('#error-message-due-date').html('<span id="error-due-date"><span class="govuk-visually-hidden">Error:</span> Enter a due date</span>');
        
        errors.push('<li><a href="#error-due-date">Enter a due date</a></li>');
    }
    
    // Display error summary if there are errors
    if (hasError) {
        var errorSummaryHtml = '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1">' +
            '<h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2>' +
            '<div class="govuk-error-summary__body">' +
            '<ul class="govuk-list govuk-error-summary__list">' +
            errors.join('') +
            '</ul></div></div>';
        
        $('#h1-content').before(errorSummaryHtml);
        $('#error-summary').focus();
        
        return false;
    }
    
    return true;
}
