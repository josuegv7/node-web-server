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
    items:[{
      type: String,
      minlength: 1,
      trim: true
    }],
    // materials: [{
    //   type: String,
    //   minlength: 1,
    //   trim: true
    // }],
    status: {
      type: String,
      minlength: 1,
      trim: true,
      default: null
    },
    project_startDate:{
      type: Date,
      default: null
    },
    project_completedDate: {
      type: Date,
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
