
const Customer = require('../model/customerModel')
const bcrypt = require('bcryptjs');



//find customer by id
module.exports.getCustomerById = function(id, callback ){
  Customer.findById(id, callback);
}

//find the customer by email
module.exports.getCustomerByEmail = function(email, callback){
  const query = {
    email
  }
  Customer.findOne(query, callback)
}


//to register a customer
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


