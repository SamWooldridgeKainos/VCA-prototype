var locations = new Array();
locations[0] = "Aylesbury Crown Court";
locations[1] = "Basildon Crown Court";
locations[2] = "Birmingham Crown Court";
locations[3] = "Bolton Crown Court";
locations[4] = "Bournemouth Crown Court";
locations[5] = "Bradford Crown Court";
locations[6] = "Bristol Crown Court";
locations[7] = "Burnley Crown Court";
locations[8] = "Caernarfon Crown Court";
locations[9] = "Cambridge Crown Court";
locations[10] = "Canterbury Crown Court";

const offences = [
    'Obstruct person acting in execution of the regulations',
    'Fail to comply with an animal by-product requirement',
    'Intentionally obstruct an authorised person',
    'Fail to give to an authorised person information / assistance / provide facilities that person may require',
    'Knowingly / recklessly give false / misleading information to an authorised person'
  ]


const myObj = {
    name: "John",
    age: 30,
    cars: [
            {name:"Ford", models:["Fiesta", "Focus", "Mustang"]},
            {name:"BMW", models:["320", "X3", "X5"]},
            {name:"Fiat", models:["500", "Panda"]}
        ]
}

accessibleAutocomplete({
    element: document.querySelector('#my-autocomplete-container'),
    id: 'my-autocomplete', // To match it to the existing <label>.
    source: offences
})

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '/' + mm + '/' + yyyy;

document.getElementById("charge-date").setAttribute("data-max-date", formattedToday);