// Errors
function validateForm() {
    $('#error-form-group-1').removeClass('govuk-form-group--error');
    $('#error-form-group-2').removeClass('govuk-form-group--error');
    $('#error-message-1').remove();
    $('#error-message-1').html('');
    $('#error-summary').remove();
    $('#error-summary-list').html('');
    $('#error-list-item-1').html('');
    
    var preferredCorrespondenceLanguage = $('[name=preferredCorrespondenceLanguage]');

    if (preferredCorrespondenceLanguage.is(":checked")) {

        var selectedValue = $('[name=preferredCorrespondenceLanguage]:checked').val();

        if (selectedValue === "English" || selectedValue === "Welsh") {
            return true;
        }

        var preferredCorrespondenceLanguageOtherText = document.forms["myForm"]["preferred-correspondence-language-other-text-input"].value;
  
        if (preferredCorrespondenceLanguageOtherText == "" || preferredCorrespondenceLanguageOtherText == null) {
            
            // Error form group styling
            $('#error-form-group-2').addClass('govuk-form-group--error');
        
            // Error message
            $('#preferred-correspondence-language-other-text-input').before(
                '<p class="govuk-error-message" id="error-1"><span class="govuk-visually-hidden">Error:</span> Enter their preferred correspondence language</p>'
                );

            // Error input field styling
            $('#preferred-correspondence-language-other-text-input').addClass('govuk-input--error');
        
            // Error summary
            $('#myForm').before(
                '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="govuk-error-summary"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li><a href="#error-1">Enter their preferred correspondence language</a></li></ul></div></div>'
                );
            $('#error-summary').focus();
        
            return false;

        } else {
            return true;
        }

    } else {
        // Error form group styling
        $('#error-form-group-1').addClass('govuk-form-group--error');

        // Error message
        $('#radio-group').before('<p id="error-message-1" class="govuk-error-message"></p>');
        $('#error-message-1').html('<span id="error-1"><span class="govuk-visually-hidden">Error:</span> Select their preferred correspondence language</span>');

        // Error summary
        $('#myForm').before(
            '<div id="error-summary" class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1"><h2 class="govuk-error-summary__title" id="error-summary-title">There is a problem</h2><div class="govuk-error-summary__body"><ul class="govuk-list govuk-error-summary__list"><li><a href="#error-1">Select their preferred correspondence language</a></li></ul></div></div>'
        );
        $('#error-summary').focus();

        return false;
    }
}
