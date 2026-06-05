// Errors for telephone number
function validateForm() {
  ['home','mobile','work','reason'].forEach(function(g){
    $('#error-form-group-' + g).removeClass('govuk-form-group--error');
    $('#error-message-' + g).remove();
  });
  $('#home-phone, #mobile-phone, #work-phone').removeClass('govuk-input--error');
  $('#telephone-reason').removeClass('govuk-textarea--error');
  $('#error-summary').remove();

  var home = document.forms["myForm"]["home-phone"].value.trim();
  var mobile = document.forms["myForm"]["mobile-phone"].value.trim();
  var work = document.forms["myForm"]["work-phone"].value.trim();
  var reason = document.forms["myForm"]["telephone-reason"].value.trim();

  var errors = [];

  if (home === '' && mobile === '' && work === '') {
    errors.push({id:'home', sel:'#home-phone', cls:'govuk-input--error', msg:'Enter at least one telephone number'});
  } else {
    var phoneRe = /^[0-9\s+()-]{7,}$/;
    if (home !== '' && !phoneRe.test(home)) errors.push({id:'home', sel:'#home-phone', cls:'govuk-input--error', msg:'Enter a valid home telephone number'});
    if (mobile !== '' && !phoneRe.test(mobile)) errors.push({id:'mobile', sel:'#mobile-phone', cls:'govuk-input--error', msg:'Enter a valid mobile telephone number'});
    if (work !== '' && !phoneRe.test(work)) errors.push({id:'work', sel:'#work-phone', cls:'govuk-input--error', msg:'Enter a valid work telephone number'});
  }
  if (reason === '') errors.push({id:'reason', sel:'#telephone-reason', cls:'govuk-textarea--error', msg:'Enter the reason for changing the telephone number'});

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
