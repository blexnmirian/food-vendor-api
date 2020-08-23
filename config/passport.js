const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const VendorLogic = require('../config/vendorLogic');
const CustomerLogic = require('../config/customerLogic')
const config = require('../config/secrete');

//to authenticate the customer by jwt strategy
module.exports = (userType, passport)=>{
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
    // console.log(jwt_payload)
   if(userType === 'vendor'){
    VendorLogic.getVendorById(jwt_payload.data._id, (err, vendor)=>{
      if(err) return done(err, false);
      if(vendor) return done(null, vendor);
      return done(null, false);
    })
   }
   
   if(userType === 'customer'){
    CustomerLogic.getCustomerById(jwt_payload.data._id, (err, customer)=>{
      if(err) return done(err, false);
      if(customer) return done(null, customer);
      return done(null, false);
    })
   }
  }))
}