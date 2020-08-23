const Vendor = require('../model/vendorModel');
const bcrypt = require('bcryptjs');

//find vendor by id
module.exports.getVendorById = function(id, callback){
  Vendor.findById(id, callback);
}

//find the vendor by email
module.exports.getVendorByEmail = function(email, callback){
  const query = {
    email
  }
  Vendor.findOne(query, callback)
}

//to register a vendor
module.exports.addVendor = function(newVendor, callback){
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newVendor.password, salt, (err, hash)=>{
      if(err){
        console.log(err)
      }
      newVendor.password = hash;
      newVendor.save(callback);
    })
  })
}

//compare password
module.exports.comparePassword = function(password, hash, callback){
  bcrypt.compare(password, hash, (err, isMatch)=>{
    if(err){
      console.log(err);
    }
    callback(null, isMatch);
  })
}