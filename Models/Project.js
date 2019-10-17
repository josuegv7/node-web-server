var mongoose = require('mongoose');


var Project = mongoose.model('Project', {
  name:{
    type:String,
    required: true,
    minlength: 1,
    trim:true
  },
  tools:{
    type: String,
    minlength: 1,
    trim:true
  },
  materials:{
    type: String,
    minlength: 1,
    trim:true
  },
  status:{
    type: String,
    minlength: 1,
    trim:true
  },
  completed: {
      type:Boolean,
      default: false
  },
  completedOn:{
    type: Number,
    default: null
  }
});

module.exports={Project}
