const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var toolSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
    },
    price: {
      type: String,
      minlength: 1,
      trim: true
    },
    _creator: {
      type: mongoose.Schema.Types.ObjectId,
      require: true
    }
  }
);



// Export Tool Object Model:

var Tool = mongoose.model("Tool", toolSchema);
module.exports = { Tool };
