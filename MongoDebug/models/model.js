/**
 * Created by My Laptop on 10/9/2017.
 */
var mongoose = require("mongoose");
Schema = mongoose.Schema;

var UserSchema = Schema({
  displayName: {
    type: String
  },
  email: {
    type: String
  }
});

module.exports = mongoose.model("User", UserSchema);
