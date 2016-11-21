// ###############################################INQUIRER AND CREDENTIAL (MIRA SI EL PASSWORD INTORDUCIDO ES IGUAL AL EXISTENTE)


// var inquirer = require('inquirer');
// var credential = require('credential'),
//   pw = credential(),
//   pass = 'chuchu';
//
// pw.hash(pass, function (err, hash) {
//   if (err) { throw err; }
//   console.log('Store the password hash:\n', hash);
//   var questions = [{ message: "Enter your password", type: 'password', name: 'password'}];
//   inquirer.prompt(questions).then(function (userInput) {
//     console.log(userInput);
//     var userPass = userInput.password;
//     console.log(userPass);
//     pw.verify(hash, userPass, function (err, isValid) {
//       var msg;
//       if (err) { throw err; }
//       msg = isValid ? 'Passwords match!' : 'Wrong password.';
//       console.log(msg);
//     });
//   });
// });
//
// //################################################################# BCRYPT MIRA SI NUESTRA CLAVE COINCIDE Y DEVUELVE UN BOOLEANO
//
// var bcrypt = require("bcrypt-nodejs");
//
// /*
//   * hashSync(data, salt)
//     - data - [REQUIRED] - the data to be encrypted.
//     - salt - [REQUIRED] - the salt to be used in encryption.
// */
// var hash = bcrypt.hashSync("bacon");
//
// /*
//   * compareSync(data, encrypted)
//     - data - [REQUIRED] - data to compare.
//     - encrypted - [REQUIRED] - data to be compared to.
// */
// var ra = bcrypt.compareSync("bacon", hash); // true
// console.log(ra);
// var wa = bcrypt.compareSync("veggies", hash); // false
// console.log(wa);
//
// // Asynchronous
//
// /*
//   * hash(data, salt, progress, cb)
//     - data - [REQUIRED] - the data to be encrypted.
//     - salt - [REQUIRED] - the salt to be used to hash the password.
//     - progress - a callback to be called during the hash calculation to signify progress
//     - callback - [REQUIRED] - a callback to be fired once the data has been encrypted.
//     - error - First parameter to the callback detailing any errors.
//     - result - Second parameter to the callback providing the encrypted form.
// */
// bcrypt.hash("bacon", null, null, function(err, hash) {
//   /*
//     * compare(data, encrypted, cb)
//       - data - [REQUIRED] - data to compare.
//       - encrypted - [REQUIRED] - data to be compared to.
//       - callback - [REQUIRED] - a callback to be fired once the data has been compared.
//       - error - First parameter to the callback detailing any errors.
//       - result - Second parameter to the callback providing whether the data and encrypted forms match [true | false].
//   */
//   bcrypt.compare("bacon", hash, function(err, res) {
//     console.log(res); // res == true
//   });
//
//   bcrypt.compare("veggies", hash, function(err, res) {
//     console.log(res); // res = false
//   });
// });



//########################################################################DROPBOX

var Dropbox = require('dropbox');
    var fs = require('fs');
    var prompt = require('prompt');

    prompt.start();

    prompt.get({
      properties: {
        accessToken: {
          description: 'Please enter an API V2 access token'
        },
        sharedLink: {
          description: 'Please enter a shared link to a file'
        }
      }
    }, function (error, result) {

      var dbx = new Dropbox({ accessToken: result.accessToken });
      console.log("VALOR RESULT"+result.accessToken+"///////////////"+result.sharedLink);
      dbx.sharingGetSharedLinkFile({ url: result.sharedLink })
        .then(function (data) {
          console.log("DATA NAME Y DATA FILEBINARY"+data.name+"/////////////////7" + data.fileBinary);
          fs.writeFile(data.name, data.fileBinary, 'binary', function (err) {
            if (err) { throw err; }
            console.log('File: ' + data.name + ' saved.');
          });
        })
        .catch(function (err) {
          throw err;
        });
    });
