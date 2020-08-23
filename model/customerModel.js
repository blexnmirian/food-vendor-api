const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const CustomerSchema = mongoose.Schema({
  firstname:{
    type:String,
    required: true
  },

  lastname:{
    type:String,
    required: true
  },

  email: {
    type:String,
    unique:true,
    index:true,
    required: true,

  },

  password: {
    type:String,
    required: true
  },

  phoneNumber:{
    type:String,
    required: true
  },
  
  dateTimeCreated: {
    type: Date,
    default: Date.now
  }
});

CustomerSchema.plugin(uniqueValidator);
 module.exports = mongoose.model('Customer', CustomerSchema);



