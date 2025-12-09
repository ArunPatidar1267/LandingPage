const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  
  email : {
    type : String,
    required : true,
    unique : true
  },
  isSubscribed : {
    type : Boolean,
    required : true
  }
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
