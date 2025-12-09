const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  
  name : {
    type : String,
    required : true,
    unique : true
  },
  description : {
    type : String
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Project", projectSchema);
