const JwtStrategy = require('passport-jwt').Strategy;
const ExtratcJwt = require('passport-jwt').ExtractJwt;
const Customer = require('../model/customerModel');
const config = require('../config/secrete');

//to authenticate the customer by jwt strategy
module.exports = (passport)=>{
  let opts = {};
  opts.jwtFromRequest = ExtratcJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
    Customer.getCustomerById(jwt_payload.data._id, (err, customer)=>{
      if(err) return done(err, false);
      if(customer) return done(null, customer);
      return done(null, false);
    })
  }))
}