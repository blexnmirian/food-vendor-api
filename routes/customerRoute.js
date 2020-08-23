const express = require('express');
const router = express.Router();
const passport = require('passport');
const customerController = require('../controllers/customerController');


//register customer
router.post('/register', customerController.registerCustomer)

//get customer by email and compare the password
router.post('/login', customerController.authenticateCustomer);


// get authenticated customer profile 
router.get('/profile', passport.authenticate('jwt', {session: false}), customerController. getAuthCustomer)

module.exports = router;