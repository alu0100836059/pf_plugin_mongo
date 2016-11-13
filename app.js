"use strict";
var express = require('express');
var app = express();
var path = require('path');
//var expressLayouts = require('express-ejs-layouts');
var exec = require('child_process').exec;

// ### Jaco 12/11
var passport = require('passport'),
// OAuthStrategy = require('passport-oauth').OAuthStrategy;
// Comprobar el nombre de la estrategia y su compatibilidad
// con la nueva versión de la API de github v3.0
var Strategy = require('passport-github').Strategy;

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/github/return'
},
function(accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
}));

// Configurando sesión persistente
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});



// Inicializando passport y restaurando estado de autenticación si es que
// existe alguno a través de session
app.use(passport.initialize());
app.use(passport.session());
// ###



app.set('port', (process.env.PORT || 8080));
//app.use(expressLayouts);
app.use(express.static(path.join(__dirname,'gh-pages')))



app.get('/',function(req, res){
  res.send('index');
});

// este lo hace bien
//app.get('/get', function(request, response){
//
//   exec("ls", (err, stdout, stderr) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(stdout);
//     return;
//   });
//   return;
// });

app.post('/sync',function(req,res){
  // Probando con el clone en el directorio actual
  // exec("git clone git@github.com:ULL-ESIT-SYTW-1617/practica-despliegues-en-iaas-y-heroku-noejaco2017.git .", (err, stdout, stderr) => {
  //   if (err) {
  //      console.log("HA OCURRIDO UN ERROR");
  //     console.error(err);
  //     return;
  //   }
  //   console.log("Después del pull de heroku");
  //   console.log(stdout);
  //   return;
  // });


    console.log("Antes de la funcion");
    function puts(err,stdout,stderr){
      if(err)
      console.log("HA OCURRIDO UN ERROR"+err);
      }
      //proceso.exec('git clone git@github.com:ULL-ESIT-SYTW-1617/practica-despliegues-en-iaas-y-heroku-noejaco2017.git',puts);
      exec('git pull git@github.com:ULL-ESIT-SYTW-1617/practica-despliegues-en-iaas-y-heroku-noejaco2017 .',puts);
      //response.redirect('/');

      console.log("Después del pull de heroku");

});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

module.exports = app;
