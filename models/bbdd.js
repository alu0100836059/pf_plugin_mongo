var util = require('util');
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// Introducido para mLab
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

// URI de nuestra aplicacion en Heroku. Mirar apuntes
// var mongodbUri = 'mongodb://heroku_xmctthpj:s1kgd3jt1aogoahshmrsmjr1qn@ds119508.mlab.com:19508/heroku_xmctthpj';
//
// mongoose.connect(mongodbUri, options);
// var conn = mongoose.connection;
//
// conn.on('error', console.error.bind(console, 'connection error:'));
//
// conn.once('open', function() {
///////////////////// Hasta aquí lo puesto para mLab


// Antes de mLab
mongoose.connect('mongodb://localhost/lista_usuarios', function(err, res) {
      if(err) {
          console.log('ERROR: connecting to Database MongoDB. ' + err);
      }else{
    console.log("Conexion con exito a MONGO DATA BASE");
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

// chequea si el  password es valido
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

// Introducido para mLab
// });
///////// Hasta aquí para mLab
