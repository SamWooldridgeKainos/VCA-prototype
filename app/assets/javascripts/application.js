//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
  
  // function reformatDateString(s) {
  //   var b = s.split(/\D/);
  //   return b.reverse().join('-');
  // }

  // let firstHearingDate = document.forms["myForm"]["firstHearingDate"].value;
  // let fullestDate = reformatDateString(firstHearingDate)
  // console.log("fullestDate: " + fullestDate); // 2014-12-25
})

// window.onload = function() {
//   let firstHearingDate = "1/1/1979" // document.forms["myForm"]["firstHearingDate"].value;
//   console.log("firstHearingDate: " + firstHearingDate);
//   let [day, month, year] = firstHearingDate.split('/')

//   if (month < 10) {
//     month = "0" + month
//   }
  
//   const date = new Date(Date.UTC(+year, +month - 1, +day));
//   // Results below assume UTC timezone - your results may vary

//   // Specify default date formatting for language with a fallback language (in this case Indonesian)
//   console.log("en-GB: " + new Intl.DateTimeFormat(["ban", "id"]).format(date));
//   // Expected output: "20/12/2020"

//   // Specify date and time format using "style" options (i.e. full, long, medium, short)
//   let firstHearingFullDayDate = new Intl.DateTimeFormat("en-GB", { dateStyle: "full"}).format(date)

//   console.log( "en-GB (long): " + 
//     new Intl.DateTimeFormat("en-GB", {
//       dateStyle: "full"
//     }).format(date)
//   );
//   // Expected output: "Sunday, 20 December 2020 at 14:23:16 GMT+11"

//   document.getElementById('fullestDateSpan').innerHTML = firstHearingFullDayDate
// }