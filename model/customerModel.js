const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

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
const Customer = module.exports = mongoose.model('User', CustomerSchema);


//find user by id
module.exports.getCustomerById = function(id, callback ){
  Customer.findById(id, callback);
}

//find the user by username
module.exports.getCustomerByEmail = function(email, callback){
  const query = {
    email
  }
  Customer.findOne(query, callback)
}


//to register a user
module.exports.addCustomer = function(newCustomer, callback){
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newCustomer.password, salt, (err, hash) => {
      if(err) {
        console.log(err)
      }
      newCustomer.password = hash;
      newCustomer.save(callback);
    })
  })
}

//compare password
module.exports.comparePassword = function(password, hash, callback){
  bcrypt.compare(password, hash, (err, isMatch)=>{
    if(err) {
      console.log(err);
    }
    callback(null, isMatch);
  })
}




