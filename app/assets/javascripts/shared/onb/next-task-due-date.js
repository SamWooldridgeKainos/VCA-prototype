// Error validation for next task due date field
function validateForm() {
    // Clear previous errors
    $('#error-form-group').removeClass('govuk-form-group--error');
    $('#error-message-1').remove();
    $('#next-task-due-date').removeClass('govuk-input--error');
    $('#error-summary').remove();
    $('#error-summary-list').html('');
    $('#error-list-item-1').html('');
    
    var dueDateInput = $('[name=nextTaskDueDate]');
    var dueDateDatePicker = $('#next-task-due-date-picker');

    if (dueDateInput.val().trim() === '') {
        // Error form group styling
        $('#error-form-group').addClass('govuk-form-group--error');

        // Error message below the input field
        dueDateDatePicker.before('<p id="error-message-1" class="govuk-error-message"></p>');
        $('#error-message-1').html('<span id="error-1"><span class="govuk-visually-hidden">Error:</span> Enter a due date</span>');

        // Error input field styling
        $('#next-task-due-date').addClass('govuk-input--error');

        // Error summary at the top
        $('form').before(
            '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li id="error-list-item-1"><a href="#error-1">Enter a due date</a></li></ul></div></div>'
        );
        $('#error-summary').focus();

        return false;
    } else {
        return true;
    }
}
