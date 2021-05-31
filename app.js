
//varibales to build the endpoint
let startAddress; 
let destination;
let unit;
let travelMode;
let urlEndPoint;
const API_KEY = "API_KEY_COMES_HERE";

//function to get start address

function getStartAddress() {
    let userStartAddress = document.getElementById('start-address');
    startAddress = userStartAddress.value;
}

//function to get destination address

function getDestinationAddress(){
    let userDestination = document.getElementById('destination-address');
    destination = userDestination.value;
}

//get User prefered Unit system

function getUserUnit() {
    let userUnit = document.getElementById('units');
    unit = userUnit.value;
}

//get user Travel Mode

function getTravelMode(){
    let userTravelMode = document.getElementById('mode');
    travelMode = userTravelMode.value;

}

// run all the functions when the button is clicked

function getDetails() {
    getStartAddress();
    getDestinationAddress();
    getUserUnit();
    getTravelMode();
    // console.log(startAddress);
    urlEndPoint  = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${startAddress}&destinations=${destination}&units=${unit}&mode=${travelMode}&departure_time=now&key=${API_KEY}`;
    fetchDistanceDetails();
    // console.log(urlEndPoint);
}

//variables to store the output from json

let startingAddress;
let destinationAddress;
let dataRowsArray;
let travelDistance;
let travelTime;

//fetch the distance details

function fetchDistanceDetails() {
    fetch (urlEndPoint)
    .then (res => {
        return res.json()
    })
     
    .then (data => {

        //update the variables with new data fetched from json

        startingAddress = data.origin_addresses[0] ;
        destinationAddress = data.destination_addresses[0];
        dataRowsArray = data.rows[0].elements[0];
        travelDistance = dataRowsArray.distance.text;
        travelTime = dataRowsArray.duration.text;

          showDetails();
     });
}

//inject HTML

function showDetails() {
    let showDetailsDiv = document.getElementById('show-details');
    showDetailsDiv.innerHTML = `<p><strong>Starting Address:</strong> ${startingAddress}</p><p><strong>Destination:</strong> ${destinationAddress}</p><p><strong>Travel Time:</strong> ${travelTime}</p><p><strong>Distance:</strong> ${travelDistance}</p>`;
}


//add the Google Maps Places Autocomplete to fields with class 'autocomplete'.

let autocomplete;
let input;
let fields = new Array();
function initAutocomplete() {
  
    options = { types: ['geocode', 'establishment'], componentRestrictions: { country: "nz" } };

    
    input = document.getElementsByClassName('autocomplete');
    
    for (let i =0; i < input.length; i++) {
        fields[i] = input[i];
        autocomplete = new google.maps.places.Autocomplete(fields[i], options);
    }

}
