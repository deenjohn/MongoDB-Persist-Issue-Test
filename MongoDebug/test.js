var path = require("path");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var dbURI = "mongodb://localhost/User";


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
  email: "test@gmail.com"
});

var promise = Deen.save();


promise.then(function(doc) {
  console.log("After save");
  console.log(doc.displayName); 
  var query = User.findOne({ displayName: "deen john" });
  query.exec(function(err, person) {
    if (err) return handleError(err);
    console.log(person);
  });
});

// Above code works fine from Mongoose side
/*

> node test.js

Mongoose default connection open to mongodb://localhost/User
Mongoose: users.insert({ displayName: 'deen john', email: 'dj.itbhu@gmail.com', _
id: ObjectId("59dbc3e86798531df4725827"), __v: 0 })

After save
deen john
Mongoose: users.findOne({ displayName: 'deen john' }, { fields: {} })
{ _id: 59dbaec3ff448a1924a3a9c2,
  displayName: 'deen john',
  email: 'dj.itbhu@gmail.com',
  __v: 0 }

*/
// but doesn't persist in local mongodb
// in mongoDB shell
// > show dbs 
// > use User
// > db.User.count()   gives 0
// >  db.User.find()   show nothing 



