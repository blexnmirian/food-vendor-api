const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const passport = require('passport');
const path = require('path');
const dotenv = require('dotenv');


//requiring files
dotenv.config({path: './config.env'})
const config = require('./config/secrete');


// connecting to databse 
mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, ()=>console.log(`Db connected to ${process.env.DATABASE_LOCAL}`));

// Defining the middle wares 
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session())

app.get('/', (req, res)=>{
  return res.json({
    message: "This is food vendor api application"
  })
})

//Create a custom middleware function
const checkUserType = function(req, res, next){
  const userType = req.originalUrl.split('/')[2];
  //bringing in the passport authentication strategy
  require('./config/passport')(userType, passport);

  next();
}

app.use(checkUserType)



const Customers = require('./routes/customerRoute')
app.use('/api/customers', Customers);

const Vendor = require('./routes/vendorRoute')
app.use('/api/vendor', Vendor);

// Defining the port 
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))