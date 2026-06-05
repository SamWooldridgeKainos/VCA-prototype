// Errors for address
function validateForm() {
  ['line1','line2','line3','postcode','reason'].forEach(function(g){
    $('#error-form-group-' + g).removeClass('govuk-form-group--error');
    $('#error-message-' + g).remove();
  });
  $('#address-line-1, #postcode').removeClass('govuk-input--error');
  $('#address-reason').removeClass('govuk-textarea--error');
  $('#error-summary').remove();

  var line1 = document.forms["myForm"]["address-line-1"].value.trim();
  var postcode = document.forms["myForm"]["postcode"].value.trim();
  var reason = document.forms["myForm"]["address-reason"].value.trim();

  var errors = [];
  if (line1 === '') errors.push({id:'line1', sel:'#address-line-1', cls:'govuk-input--error', msg:'Enter the first line of the address'});
  if (postcode === '') errors.push({id:'postcode', sel:'#postcode', cls:'govuk-input--error', msg:'Enter a postcode'});
  if (reason === '') errors.push({id:'reason', sel:'#address-reason', cls:'govuk-textarea--error', msg:'Enter the reason for changing the address'});

  if (errors.length === 0) return true;

  var listHtml = '';
  errors.forEach(function(e){ listHtml += '<li><a href="#error-message-' + e.id + '">' + e.msg + '</a></li>'; });
  $('#myForm').before(
    '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list">' + listHtml + '</ul></div></div>'
  );
  $('#error-summary').focus();
  errors.forEach(function(e){
    $('#error-form-group-' + e.id).addClass('govuk-form-group--error');
    $(e.sel).before('<p class="govuk-error-message" id="error-message-' + e.id + '"><span class="govuk-visually-hidden">Error:</span> ' + e.msg + '</p>');
    $(e.sel).addClass(e.cls);
  });

  return false;
}
