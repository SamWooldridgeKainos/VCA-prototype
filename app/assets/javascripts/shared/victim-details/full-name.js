// Errors for full name
function validateForm() {
  var groups = ['title','forename','surname','reason'];
  groups.forEach(function(g) {
    $('#error-form-group-' + g).removeClass('govuk-form-group--error');
    $('#error-message-' + g).remove();
  });
  $('#victim-title, #victim-forename, #victim-surname').removeClass('govuk-input--error');
  $('#victim-full-name-reason').removeClass('govuk-textarea--error');
  $('#error-summary').remove();

  var title = document.forms["myForm"]["victim-title"].value.trim();
  var forename = document.forms["myForm"]["victim-forename"].value.trim();
  var surname = document.forms["myForm"]["victim-surname"].value.trim();
  var reason = document.forms["myForm"]["victim-full-name-reason"].value.trim();

  var errors = [];

  if (title === "") errors.push({id:'title', field:'#victim-title', textareaField:false, msg:'Enter the victim\'s title'});
  if (forename === "") errors.push({id:'forename', field:'#victim-forename', textareaField:false, msg:'Enter the victim\'s first name'});
  if (surname === "") errors.push({id:'surname', field:'#victim-surname', textareaField:false, msg:'Enter the victim\'s last name'});
  if (reason === "") errors.push({id:'reason', field:'#victim-full-name-reason', textareaField:true, msg:'Enter the reason for changing the full name'});

  if (errors.length === 0) return true;

  var listHtml = '';
  errors.forEach(function(e) {
    listHtml += '<li><a href="#error-message-' + e.id + '">' + e.msg + '</a></li>';
  });
  $('#myForm').before(
    '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list">' + listHtml + '</ul></div></div>'
  );
  $('#error-summary').focus();

  errors.forEach(function(e) {
    $('#error-form-group-' + e.id).addClass('govuk-form-group--error');
    $(e.field).before('<p class="govuk-error-message" id="error-message-' + e.id + '"><span class="govuk-visually-hidden">Error:</span> ' + e.msg + '</p>');
    $(e.field).addClass(e.textareaField ? 'govuk-textarea--error' : 'govuk-input--error');
  });

  return false;
}
