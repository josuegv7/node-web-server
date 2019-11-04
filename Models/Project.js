var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
    },
    tools: {
      type: String,
      minlength: 1,
      trim: true
    },
    materials: {
      type: String,
      minlength: 1,
      trim: true
    },
    status: {
      type: String,
      minlength: 1,
      trim: true,
      default: null
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedOn: {
      type: Number,
      default: null
    },
    _creator: {
      type: mongoose.Schema.Types.ObjectId,
      require: true
    }
  }
);


// Export Project Object Model:

var Project = mongoose.model('Project', projectSchema);
module.exports = { Project }
