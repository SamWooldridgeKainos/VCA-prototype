$(document).ready(function() {
    let callDate1 = "11/11/2024";
    // alert('callDate1: ' + callDate1);

    const callDate1Array = callDate1.split("/");
    let callDay1 = callDate1Array[0];
    let callMonth1 = callDate1Array[1];
    let callYear1 = callDate1Array[2];

    var newFormat = callYear1 + '-' + callMonth1 + '-' + callDay1;
    //alert(callDate1 + ' becomes ' + newFormat);
});