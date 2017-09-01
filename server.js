// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var port = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Reservations (DATA)

var reservations = [];
var waitlist = [];

// Routes
// =============================================================
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// app.get('*', function(req, res) {
//     res.redirect('/');
// });

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

// app.get("/api/:tables?", function(req, res) {
//   var chosen = req.params.tables;

//   if (chosen) {
//     console.log(chosen);
//     return res.json(reservations);
    

//     // for (var i = 0; i < reservations.length; i++) {
//     //   if (chosen === reservations[i].customerID) {
//     //     return res.json(reservations[i]);
//     //   }
//     // }
//     // for (var i = 0; i < waitlist.length; i++) {
//     // 	if (chosen === waitlist[i].customerID) {
//     // 		return res.json(waitlist[i]);
//     // 	}
//     // }
//   }

  
// });

app.get("/api/tables", function(req, res) {
	res.json(reservations);
});

app.get("/api/reserve", function(req, res) {
	res.json(waitlist);
});


// Create New Reservation - takes in JSON input
app.post("/api/new", function(req, res) {
  var newReservation = req.body;
  
  console.log(newReservation);

  if (reservations.length < 5) {
  	reservations.push(newReservation);
  }
  else {
  	waitlist.push(newReservation);
  }
  

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});