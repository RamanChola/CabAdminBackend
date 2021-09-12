const express = require("express");
const app = express();
const port = 8000;
const admin = require("firebase-admin");
var cors = require("cors");
app.use(cors());
var serviceAccount = require("./cabservice-a37a0-firebase-adminsdk-vjigh-bd4e7f86ad.json");

app.use(express.json());

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://cabservice-a37a0-default-rtdb.firebaseio.com/",
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  var db = admin.database();
  var ref = db.ref("users/");
  ref.once("value", function (snapshot) {
    res.send(snapshot.val());
  });
});

app.get("/rides/", (req, res) => {
  var db = admin.database();
  var ref = db.ref(`rides/`);
  ref.once("value", function (snapshot) {
    res.send(snapshot.val());
  });
});

app.get("/rides/:uid/tripStatus", (req, res) => {
  const uid = req.params.uid;
  var db = admin.database();
  var ref = db.ref(`rides/${uid}/tripStatus/`);
  ref.once("value", function (snapshot) {
    res.send(snapshot.val());
  });
});

app.post("/rides/:uid/tripStatus/book/:rideid", (req, res) => {
  var db = admin.database();
  const uid = req.params.uid;
  const rideId = req.params.rideid;
  var ref = db.ref(`rides/${uid}/tripStatus/${rideId}`);
  ref
    .update({
      status: "Booked",
    })
    .then(() => {
      res.send("updated");
    });
});
app.post("/rides/:uid/tripStatus/decline/:rideid", (req, res) => {
  var db = admin.database();
  const uid = req.params.uid;
  const rideId = req.params.rideid;
  var ref = db.ref(`rides/${uid}/tripStatus/${rideId}`);
  ref
    .update({
      status: "Declined",
    })
    .then(() => {
      res.send("updated");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
