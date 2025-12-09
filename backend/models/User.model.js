const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
  },
  name : {
    type : String,
  },
  description : {
    type : String
  },
  image: {
    type: String,
  },
  designation: {
    type: String,
  },
  userType : {
    type : String,
    enum : ["admin", "client", "user"],
  },
  mobile : {
    type : String,
  },
  city : {
      type : String,
    },
});

module.exports = mongoose.model("User", userSchema);
