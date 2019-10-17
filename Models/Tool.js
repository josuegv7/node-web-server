var mongoose = require('mongoose');


var Tool = mongoose.model('Tool', {
  name:{
    type:String,
    required: true,
    minlength: 1,
    trim:true
  },
  price:{
    type: String,
    minlength: 1,
    trim:true
  }
});



module.exports={Tool}
