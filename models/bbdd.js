// app/models/user.js
// load the things we need

var util = require('util');
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

mongoose.connect('mongodb://localhost/lista', function(err, res) {  
      if(err) {
          console.log('ERROR: connecting to Database. ' + err);
      }
    console.log("Conexion con exito a MONGO DATA BASE")
});

// define the schema for our user model
var userSchema = mongoose.Schema({
        email : String,
        password : String
   });


// genera hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// chequea si el  password es validp
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User  = mongoose.model('User', userSchema);

var hash = userSchema.methods.generateHash("alu123");
//var pass = bcrypt.compareSync("veggies", hash);
    var user_prueba = new User({
        "email": "alu0100622492",
        "password": "alu123"

    });

  var user1 = user_prueba.save(function (err) {
    if (err) { console.log(`Hubieron errores al guardar user:\n${err}`); return err; }
    console.log(`Saved: ${user_prueba}`);
  });
  
  Promise.all([user1]).then( function(value){ 
    console.log(util.inspect(value, {depth: null}));  
    //mongoose.connection.close(); 
  });
  
module.exports = mongoose.model('User', userSchema);  