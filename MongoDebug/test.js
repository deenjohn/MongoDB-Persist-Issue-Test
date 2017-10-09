var path = require("path");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// console.log(User);
var dbURI = "mongodb://localhost/User";

// dbURI, { useMongoClient: true }
mongoose.connect(dbURI, { useMongoClient: true });

mongoose.set("debug", true);

mongoose.connection
  .on("connected", function() {
    console.log("Mongoose default connection open to " + dbURI);
  })
  .on("error", function(err) {
    console.log("Mongoose default connection error: " + err);
  })
  .on("disconnected", function() {
    console.log("Mongoose default connection disconnected");
  });

process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

var User = require("./models/model.js");
var Deen = new User({
  displayName: "deen john",
  email: "dj.itbhu@gmail.com"
});

var promise = Deen.save();

promise.then(function(doc) {
  console.log(doc);
});

//console.log(res);
