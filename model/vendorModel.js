const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const VendorSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },

  email:{
    type: String,
    unique: true,
    index: true,
    required: true
  },

  password:{
    type: String,
    required: true
  },

phoneNumber: {
  type: String,
  required: true
},
dateTimeCreated: {
  type: Date,
  default: Date.now
}
});

VendorSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Vendor', VendorSchema);

