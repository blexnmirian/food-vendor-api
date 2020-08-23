const express = require('express');
const router = express.Router();
const passport = require('passport');
const vendorController = require('../controllers/vendorController')


//register vendor
router.post('/register', vendorController.registerVendor);

//get vendor by email and compare the password
router.post('/login', vendorController.authenticateVendor);

//get authenticated vendor profile
router.get('/profile', passport.authenticate('jwt', {session: false}), vendorController.getAuthVendor );

module.exports = router;