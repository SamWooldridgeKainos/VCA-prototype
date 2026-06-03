$(document).ready(function(){
    var d = new Date();
    let n = d.toLocaleTimeString('it-IT');

    $("#save-draft-modal").hide();
    $("#delete-draft-modal").hide();
    $("#request-review-modal").hide();
    $("#send-to-cms-modal").hide();

    $("#save-draft-button").click(function(){
        $("#save-draft-modal").show();
        $("#save-draft-modal-close").focus();
    });

    $("#save-draft-modal-close").click(function(){
        location.reload();
        $("#save-draft-modal").hide();
        $("#save-draft-button").focus();
    });

    $("#delete-draft-button").click(function(){
        $("#delete-draft-modal").show();
        $("#delete-draft-modal-close").focus();
    });

    $("#delete-draft-modal-close").click(function(){
        $("#delete-draft-modal").hide();
        $("#delete-button").focus();
    });

    $("#delete-draft-modal-cancel").click(function(){
        $("#delete-draft-modal").hide();
        $("#delete-button").focus();
    });

    $("#request-review-button").click(function(){
        $("#request-review-modal").show();
        $("#request-review-modal-close").focus();
    });

    $("#request-review-modal-close").click(function(){
        $("#request-review-modal").hide();
        $("#request-review-button").focus();
    });

    $("#request-review-modal-cancel").click(function(){
        $("#request-review-modal").hide();
        $("#request-review-button").focus();
    });

    $("#send-to-cms-button").click(function(){
        $("#send-to-cms-modal").show();
        $("#send-to-cms-modal-close").focus();
    });

    $("#send-to-cms-modal-close").click(function(){
        $("#send-to-cms-modal").hide();
        $("#send-to-cms-button").focus();
    });

    $("#send-to-cms-modal-cancel").click(function(){
        $("#send-to-cms-modal").hide();
        $("#send-to-cms-button").focus();
    });
});