var config = {
  apiKey: "AIzaSyDBAkRiAzvTBGWgzIQtN7OJuBLPYsOa6l8",
  authDomain: "myproject-f847e.firebaseapp.com",
  databaseURL: "https://myproject-f847e.firebaseio.com",
  projectId: "myproject-f847e",
  storageBucket: "myproject-f847e.appspot.com",
  messagingSenderId: "446420655227"
};
firebase.initializeApp(config);
var database = firebase.database();

// 2. Button for adding Trains
$("#add-employee-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#employee-name-input").val().trim();
  var destName = $("#destination-input").val().trim();
  var empStart = moment($("#start-input").val().trim(), "hh:mm").format("X");
  var freQuency = $("#frequency-input").val().trim();

  var newEmp = {
    name: trainName,
    destination: destName,
    start: empStart,
    frequency: freQuency
  };

  database.ref().push(newEmp);

  console.log(newEmp.name);
  console.log(newEmp.destination);
  console.log(newEmp.start);
  console.log(newEmp.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
  event.preventDefault();

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destName = childSnapshot.val().destination;
  var empStart = childSnapshot.val().start;
  var freQuency = childSnapshot.val().frequency;
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  console.log(trainName);
  console.log(destName);
  console.log(empStart);
  console.log(freQuency);

  var empStartconverted = moment(empStart, "HH:mm").subtract(1, "years");
  console.log(empStartconverted);


  // Calculate the diff between time of first train and current time
  var diFerence = moment().diff(moment(empStartconverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diFerence);

  // Time apart (remainder)
  var Remainder = diFerence % freQuency;
  console.log(Remainder);

  var MinutesAway = freQuency - Remainder;
  console.log(MinutesAway);

  var NextArrival = moment().add(MinutesAway, "minutes");
  console.log(moment(NextArrival).format("hh:mm"));





  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destName),
    $("<td>").text(freQuency),
    $("<td>").text(NextArrival),
    $("<td>").text(MinutesAway),
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});

  // Example Time Math