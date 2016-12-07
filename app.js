"use strict";
var express = require('express');
var app = express();
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var exec = require('child_process').exec;
var passport = require('passport');
var session = require('express-session');
var DropboxStrategy = require('passport-dropbox').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var github = require('octonode');
var url=require('url');

//#################### LOCAL STRATEGY WITH MONGODB
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'sesion', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/public', express.static(__dirname+'/public'));

passport.serializeUser(function(user, done) {
    console.log("SERIALIZER USER"+user);
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log("DESERIALIZER USER"+user);
      done(null, user);
});

var User = require('./models/bbdd.js');

passport.use(new LocalStrategy(function(username, password, done) {
process.nextTick(function() {
      // Auth Check Logic
      console.log("LLEGAMOS A LA FUNCION LOCAL");
      console.log("USERNAME"+username);
      console.log("PASS"+password);

      User.findOne({ 'email' :  username }, function(err, user) {
        console.log("Usuario dentro de findone: "+user);
        if (err){
            console.log("Ha ocurrido un error");
              return done(err);
        }
        // check to see if theres already a user with that email
        if (!user) {
          // return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          console.log("EL USUARIO NO EXISTE EN MONGO");
          return done(null,false);}

        if (!user.validPassword(password)) {
          console.log("LA CONTRASEÑA NO COINCIDE");
          return done(null, false);}

          console.log("EL USUARIO EXISTE Y TODO HA IDO CORRECTO");
          return done(null, user);
        });
    });
}));


app.get('/',
  function(req, res) {
    console.log("RENDERIZO HOME "+ req.user);
    res.render('home', { user: req.user });
});

//DEVUELVE LA PAGINA
app.get('/login',
  function(req, res){
    console.log("RENDERIZO LOGIN");
    res.render('login');
});


app.get('/registro',
  function(req, res){
    res.render('registro');
});

app.post('/registro', function(req, res, next){

  var pssw = req.body.password_reg;
  var name = req.body.username_reg;
  var newUser = new User();
  newUser.email = name;
  newUser.password = newUser.generateHash(pssw);//Generamos la contraseña con bcryptnodejs

  newUser.save(function(err) {
      if (err)
          throw err;
  });

  res.redirect('/login');
});

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/loginFailure', function(req, res, next) {
    res.send('Failed to authenticate');
});

app.get('/login/password', function(req, res, next) {
    res.render('cambio_pass');
});

app.post('/login/password', function(req, res, next) {
  var new_pass = req.body.password_new;
  var new_pass_2 = req.body.password_new_2;
  var name = req.body.username;

  console.log("Estamos en /login/password:::\n");
  console.log("new_pass: " + new_pass);
  console.log("\nnew_pass_2: " + new_pass_2);
  console.log("\nNombre: " + name);

  if(new_pass == new_pass_2){

    User.findOne({'email': name}, function(err, user){
      // encripta ok
      var hash_2 = bcrypt.hashSync(new_pass);
      console.log("\n\nContraseña antigua: "+ user.password);
      console.log("\n\nContraseña antigua hasheada antes update: "+ hash_2);

      if (err){
        res.redirect('/err');
      }
      user.password = hash_2;
      user.save(function(err) {
        if (err) throw err;

        console.log("\n\nModificada contraseña: "+ user)
      });
    });
    res.redirect('/login');
    }
    else
    res.redirect('/err');
});

app.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

app.get('/err', function(req, res){
  res.render('err');
});

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    console.log("RENDERIZO PROFILE");
    console.log("EMAIL"+req.user.email);
    console.log("ID"+req.user._id);
    res.render('profile',{id: req.user._id, username: req.user.email});
});

var port = process.env.PORT || 8080;
var ip = process.env.IP || '0.0.0.0';
var addr = `${ip}:${port}`;
//app.set('port', (process.env.PORT || 8080));



app.listen(port,ip,function(){
    console.log(`chat server listening at ${addr,ip}`);
});
module.exports = app;
