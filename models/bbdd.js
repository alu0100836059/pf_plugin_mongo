// app/models/user.js
// load the things we need

var util = require('util');
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

mongoose.connect('mongodb://localhost/lista_usuarios', function(err, res) {  
      if(err) {
          console.log('ERROR: connecting to Database MongoDB. ' + err);
      }else{
    console.log("Conexion con exito a MONGO DATA BASE")
      }
});

// define the schema for our user model
var userSchema = mongoose.Schema({
        email : String,
        password : String
  });


// genera hash
userSchema.methods.generateHash = function(password) {
  // return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  return bcrypt.hashSync(password);
};

// chequea si el  password es validp
userSchema.methods.validPassword = function(password) {
    console.log("COMPARAMOS"+bcrypt.compareSync(password, this.password));
    return bcrypt.compareSync(password, this.password);
};

const User  = mongoose.model('User', userSchema);

var hash = userSchema.methods.generateHash("alu123");
var hash2 = userSchema.methods.generateHash("1234pepe");
//var pass = bcrypt.compareSync("veggies", hash);

    var user_prueba = new User({
        "email": "alu0100622492",
        "password": hash

    });

    var user_prueba_jaco = new User({
        "email": "JacoboRG",
        "password": hash2
    });
    
  var user1 = user_prueba.save(function (err) {
    if (err) { console.log(`Hubieron errores al guardar user:\n${err}`); return err; }
    console.log(`Saved: ${user_prueba}`);
  });
  
  
  
  var user2 = user_prueba_jaco.save(function (err) {
    if (err) { console.log(`Hubieron errores al guardar usuario jaco:\n${err}`); return err; }
    console.log(`Saved: ${user_prueba_jaco}`);
  });
  
  
  
  Promise.all([user1],[user2]).then( function(value){ 
    console.log(util.inspect(value, {depth: null}));  
    //mongoose.connection.close(); 
  });
  
module.exports = mongoose.model('User', userSchema);  








/////////////////////// Jaco ////////////////////////////


// var util = require('util');
// var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');



// mongoose.connect('mongodb://localhost/usuarios');

// var db = mongoose.connection;

// db.on('error', console.error);
// db.once('open', function() {
//   // Create your schemas and models here.
//   var userSchema = new mongoose.Schema({
//         email : String,
//         password : String
//   });
   
//   var User  = mongoose.model('User', userSchema);
   
//   // genera hash
//     userSchema.methods.generateHash = function(password) {
//   // return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//   return bcrypt.hashSync(password);
//     };

//     // chequea si el  password es validp
//     userSchema.methods.validPassword = function(password) {
//     console.log("COMPARAMOS"+bcrypt.compareSync(password, this.password));
//     return bcrypt.compareSync(password, this.password);
//     };



//     var hash = userSchema.methods.generateHash("alu123");
//     var hash2 = userSchema.methods.generateHash("1234pepe");
//     //var pass = bcrypt.compareSync("veggies", hash);

//     var user_prueba = new User({
//         "email": "alu0100622492",
//         "password": hash

//     });

//     var user_prueba_jaco = new User({
//         "email": "JacoboRG",
//         "password": hash2
//     });
    
//     var user1 = user_prueba.save(function (err) {
//     if (err) { console.log(`Hubieron errores al guardar user:\n${err}`); return err; }
//     console.log(`Saved: ${user_prueba}`);
//     });
    
//     var user2 = user_prueba_jaco.save(function (err) {
//     if (err) { console.log(`Hubieron errores al guardar usuario jaco:\n${err}`); return err; }
//     console.log(`Saved: ${user_prueba_jaco}`);
//     });
    
//     Promise.all([user1],[user2]).then( function(value){ 
//     console.log(util.inspect(value, {depth: null}));  
//     //mongoose.connection.close(); 
//     });
    
//     module.exports = mongoose.model('User', userSchema);
// });
/////////////////jaco 2 /////

// var util = require('util');
// var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');



// mongoose.connect('mongodb://localhost/usuarios');

// var Schema = mongoose.Schema;

// // create a schema
// var userSchema = new Schema({
//   email : String,
//   password : String
//   });




//   // genera hash
//   userSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password);
//     };

//     // chequea si el  password es validp
//     userSchema.methods.validPassword = function(password) {
//     console.log("COMPARAMOS"+bcrypt.compareSync(password, this.password));
//     return bcrypt.compareSync(password, this.password);
//     };



//     var hash = userSchema.methods.generateHash("alu123");
//     var hash2 = userSchema.methods.generateHash("1234pepe");
//     //var pass = bcrypt.compareSync("veggies", hash
    
//         // the schema is useless so far
// // we need to create a model using it
// var User = mongoose.model('User', userSchema);

// // make this available to our users in our Node applications
// module.exports = User;

//     var user_prueba = new User({
//         "email": "alu0100622492",
//         "password": hash

//     });

//     var user_prueba_jaco = new User({
//         "email": "JacoboRG",
//         "password": hash2
//     });
    
//     var user1 = user_prueba.save(function (err) {
//     if (err) { console.log(`Hubieron errores al guardar user:\n${err}`); return err; }
//     console.log(`Saved: ${user_prueba}`);
//     });
    
//     var user2 = user_prueba_jaco.save(function (err) {
//     if (err) { console.log(`Hubieron errores al guardar usuario jaco:\n${err}`); return err; }
//     console.log(`Saved: ${user_prueba_jaco}`);
//     });
    
//     // Promise.all([user1],[user2]).then( function(value){ 
//     // console.log(util.inspect(value, {depth: null}));  
//     // //mongoose.connection.close(); 
//     // });
    



///////////////

// mongoose.connect('mongodb://localhost/lista_usuarios', function(err, res) {  
//       if(err) {
//           console.log('ERROR: connecting to Database MongoDB. ' + err);
//       }else{
//     console.log("Conexion con exito a MONGO DATA BASE")
//       }
// });

// // define the schema for our user model
// var userSchema = mongoose.Schema({
//         email : String,
//         password : String
//   });


// // genera hash
// userSchema.methods.generateHash = function(password) {
//   // return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//   return bcrypt.hashSync(password);
// };

// // chequea si el  password es validp
// userSchema.methods.validPassword = function(password) {
//     console.log("COMPARAMOS"+bcrypt.compareSync(password, this.password));
//     return bcrypt.compareSync(password, this.password);
// };

// const User  = mongoose.model('User', userSchema);

// var hash = userSchema.methods.generateHash("alu123");
// var hash2 = userSchema.methods.generateHash("1234pepe");
// //var pass = bcrypt.compareSync("veggies", hash);

//     var user_prueba = new User({
//         "email": "alu0100622492",
//         "password": hash

//     });

//     var user_prueba_jaco = new User({
//         "email": "JacoboRG",
//         "password": hash2
//     });
    
//   var user1 = user_prueba.save(function (err) {
//     if (err) { console.log(`Hubieron errores al guardar user:\n${err}`); return err; }
//     console.log(`Saved: ${user_prueba}`);
//   });
  
  
  
//   var user2 = user_prueba_jaco.save(function (err) {
//     if (err) { console.log(`Hubieron errores al guardar usuario jaco:\n${err}`); return err; }
//     console.log(`Saved: ${user_prueba_jaco}`);
//   });
  
  
  
//   Promise.all([user1],[user2]).then( function(value){ 
//     console.log(util.inspect(value, {depth: null}));  
//     //mongoose.connection.close(); 
//   });
  
// module.exports = mongoose.model('User', userSchema);  