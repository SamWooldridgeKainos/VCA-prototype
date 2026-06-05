// Errors
function validateForm() {

  $('#error-form-group-1').removeClass('govuk-form-group--error');
  $('#email-dispatch-date').removeClass('govuk-input--error');
  $('#error-message-1').remove();
  $('#error-message-1').html('');
  $('#error-form-group-2').removeClass('govuk-form-group--error');
  $('#error-message-2').remove();
  $('#error-message-2').html('');
  $('#error-summary').remove();
  $('#error-summary-list').html('');
  $('#error-list-item-1').html('');
  $('#error-list-item-2').html('');

  var emailDispatchDate = document.forms["myForm"]["email-dispatch-date"].value;
  var infoPackSentExists = document.querySelector('input[name="infoPackSent"]');
  var infoPackSent = document.querySelector('input[name="infoPackSent"]:checked');

  var hasErrors = false;
  var errorItems = [];

  if (emailDispatchDate == "" || emailDispatchDate == null) {
    $('#error-form-group-1').addClass('govuk-form-group--error');
    $('#email-dispatch-date-picker').before(
      '<p class="govuk-error-message" id="error-message-1"><span class="govuk-visually-hidden">Error:</span> Select or enter the date sent</p>'
    );
    $('#email-dispatch-date').addClass('govuk-input--error');
    errorItems.push({ id: 'error-message-1', text: 'Select or enter the date sent' });
    hasErrors = true;
  }

  if (infoPackSentExists && !infoPackSent) {
    $('#error-form-group-2').addClass('govuk-form-group--error');
    $('#error-form-group-2 .govuk-radios').before(
      '<p class="govuk-error-message" id="error-message-2"><span class="govuk-visually-hidden">Error:</span> Select yes if you sent the information pack to the victim</p>'
    );
    errorItems.push({ id: 'error-message-2', text: 'Select yes if you sent the information pack to the victim' });
    hasErrors = true;
  }

  if (hasErrors) {
    var listItems = '';
    for (var i = 0; i < errorItems.length; i++) {
      listItems += '<li><a href="#' + errorItems[i].id + '">' + errorItems[i].text + '</a></li>';
    }
    $('#myForm').before(
      '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list">' + listItems + '</ul></div></div>'
    );
    $('#error-summary').focus();
    return false;
  }
}
