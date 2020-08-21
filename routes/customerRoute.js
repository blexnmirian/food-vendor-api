const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Customer = require('../model/customerModel');
const config = require('../config/secrete');

//register customer
router.post('/register', (req, res)=>{
 let newCustomer = new Customer({
   firstname:req.body.firstname,
   lastname: req.body.lastname,
   email: req.body.email,
   password: req.body.password,
   phoneNumber: req.body.phoneNumber
 });
 Customer.addCustomer(newCustomer, (err, customer)=>{
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
})

//get customer by email and compare the password
router.post('/login', (req, res)=> {
  const email = req.body.email;
  const password = req.body.password;

  Customer.getCustomerByEmail(email, (err, customer)=>{
    if(err) throw err;
    if(!customer){
      return res.json({
        success: false,
        message: "Customer not found.",
      });
    }
    Customer.comparePassword(password, customer.password, (err, isMatch)=>{
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({
          type: "customer",
          data:{
            _id: customer._id,
            firstname: customer.firstname,
            lastname: customer.lastname,
            email: customer.email,
            password: customer.password,
            phoneNumber: customer.phoneNumber
          },
        },
            config.secret, {
              expiresIn : 604800 // for 1 week in milliseconds
            }
        );
        return res.json({
          success:true,
          token: "JWT " + token
        });
      }
      else{
        return res.json({
          success:true,
          message: "Wrong Password "
        });
      }
    })
  })
});

// get authenticated customer profile 

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res)=>{
  return res.json(
  req.user
  );
})

module.exports = router;