const jwt = require('jsonwebtoken');
const Vendor = require('../model/vendorModel');
const VendorLogic = require('../config/vendorLogic')
const config = require('../config/secrete');

const registerVendor = (req, res)=>{
  let newVendor = new Vendor({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber
  });

  VendorLogic.addVendor(newVendor, (err, vendor)=>{
    if(err){
      console.log(err)
      let message = '';
      if(err.errors.email) message = "Email already exist";
      return res.json({
        success: false,
        message
      })
    }else{
      return res.json({
        success: true,
        message: "Registration is successful"
      })
    }
  })
}

const authenticateVendor = (req, res)=>{
  const email = req.body.email;
  const password = req.body.password;

  VendorLogic.getVendorByEmail(email, (err, vendor)=>{
    if(err) throw err;
    if(!vendor){
      return res.json({
        success: false,
        message: "Vendor not found",
      })
    }
    VendorLogic.comparePassword(password, vendor.password, (err, isMatch)=>{
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({
          type: "vendor",
          data:{
            _id: vendor._id,
            name: vendor.name,
            email: vendor.email,
            password: vendor.password,
            phoneNumber: vendor.phoneNumber
          },
        },
        config.secret, {
          expiresIn : 604800 //for 1 week in milliseconds
        }
        );
        return res.json({
          success: true,
          token: "JWT " + token
        });
      }else{
        return res.json({
          success: true,
          message: "Wrong Password"
        })
      }
    })
  })
}

const getAuthVendor = (req, res)=>{
  return res.json(
    req.user
  );
}


module.exports = {
  registerVendor,
  authenticateVendor,
  getAuthVendor
}
