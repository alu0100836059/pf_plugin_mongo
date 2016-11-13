"use strict";
var express = require('express');
var app = express();
var path = require('path');
//var expressLayouts = require('express-ejs-layouts');
var exec = require('child_process').exec;

// ### Jaco 12/11
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
// variable para acceder a nuestra confi de auth
// Areglar referencia a config/auth
// AQUI: var configAuth = './config/auth'
// configuracion estrategia facebook
// passport.use(new FacebookStrategy({
//     clientID: configAuth.facebookAuth.clientID,
//     clientSecret: configAuth.facebookAuth.clientSecret,
//     callbackURL: configAuth.facebookAuth.callbackURL
//   },
passport.use(new FacebookStrategy({
    clientID: '200574843726334',
    clientSecret: 'c98159896fea62a6238dad8001b66b88',
    callbackURL: 'http://localhost:8080/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));




// OAuthStrategy = require('passport-oauth').OAuthStrategy;
// Comprobar el nombre de la estrategia y su compatibilidad
// con la nueva versión de la API de github v3.0
// ------- Comentado por cambio hacia una autenticacion a
// ------- través de facebook API -------------------
// var Strategy = require('passport-github').Strategy;
//
// passport.use(new Strategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: 'http://localhost:3000/login/github/return'
// },
// // Pasaremos aquí la referencia a nuestro token!?!?
// function(accessToken, refreshToken, profile, cb) {
//   return cb(null, profile);
// }));
//
// // Configurando sesión persistente
// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });
//
// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });
//
//
//
//
// ###



app.set('port', (process.env.PORT || 8080));
//app.use(expressLayouts);
app.use(express.static(path.join(__dirname,'gh-pages')))
// // ###
// // app.use(require('morgan')('combined'));
// app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// // Inicializando passport y restaurando estado de autenticación si es que
// // existe alguno a través de session
// app.use(passport.initialize());
// app.use(passport.session());
// // ###

app.get('/',function(req, res){
  res.send('index');
});

// ### Definiendo rutas autenticación github
// app.get('/',
//   function(req, res) {
//     res.render('home', { user: req.user });
//   });
//
// app.get('/login',
//   function(req, res){
//     res.render('login');
//   });
//
// app.get('/login/github',
//   passport.authenticate('github'));
//
// app.get('/login/github/return',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });
//
// app.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function(req, res){
//     res.render('profile', { user: req.user });
// });
// ###

// ### TEMA FACEBOOK
// Añadimos al final el tema del scope:email para otorgar permisos en la
// obtención del email que nos servira para nuestra base de datos futura.
app.get('/auth/facebook', passport.authenticate('facebook', {scope: ["email"]}));

app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { successRedirect: '/',
                                            failureRedirect: '/login'}));



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
