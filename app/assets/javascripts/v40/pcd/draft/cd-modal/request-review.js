$(document).ready(function() {
    var reviewerLevel = $('input:radio[name="reviewerLevel"]');

    $("#d-request-conditional").hide();
    $("#b3-request-conditional").hide();
    $("#b2-request-conditional").hide();

    $(reviewerLevel).change(function(){
        if($(this).is(":checked")){
            if($('#d-request').is(':checked')) {
                $("#b3-request-conditional").hide();
                $("#b2-request-conditional").hide();
                $("#d-request-conditional").show();
            }

            if($('#b3-request').is(':checked')) {
                $("#d-request-conditional").hide();
                $("#b2-request-conditional").hide();
                $("#b3-request-conditional").show();
            }

            if($('#b2-request').is(':checked')) {
                $("#d-request-conditional").hide();
                $("#b3-request-conditional").hide();
                $("#b2-request-conditional").show();
            }
        }
    });
});