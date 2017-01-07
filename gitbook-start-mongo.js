#! /usr/bin/env node

var path = require('path');
var child = require("child_process");
var fs = require('fs-extra');
var prompt = require("prompt");
var heroku = require('heroku-client');





function initialize(directorio) {

     var contenido ='\ngulp.task("deploy-heroku-mongo", function () {'+
        '\n\tvar heroku = require("gitbook-start-mongo-noejaco");'+
        '\n\tvar url = paquete.repository.url;'+
        '\n\n\heroku.deploy();'+
        '\n});\n\n';

     fs.copy(path.join(process.cwd(),'node_modules','gitbook-start-mongo-noejaco','app.js'),path.join(process.cwd()+"/"+directorio, 'app.js'),function(err){
        if(err)
        console.log(err);
        console.log("Se ha copiado app.js");
     });

     fs.copy(path.join(process.cwd(),'node_modules','gitbook-start-mongo-noejaco','views'),path.join(process.cwd()+"/"+directorio, 'views'),function(err){
        if(err)
        console.log(err);
     });

     // Copiando la carpeta public con los estilos personalizados
     fs.copy(path.join(process.cwd(),'node_modules','gitbook-start-mongo-noejaco','public'),path.join(process.cwd()+"/"+directorio, 'public'),function(err){
        if(err)
        console.log(err);
     });
     // Copiando el contenido necesario para la base de datos
     // Carpeta models con bbdd.js
     fs.copy(path.join(process.cwd(),'node_modules','gitbook-start-mongo-noejaco','models'), path.join(process.cwd()+"/"+directorio, 'models'), function(err){
       if(err)
       console.log(err);
     });

     // Carpeta data con las bases de datos administradas
     // Posible problema cantidad de datos JS FATAL ERROR bad allocation
     //fs.copy(path.join(process.cwd(),'node_modules','gitbook-start-mongo-noejaco','data'), path.join(process.cwd()+"/"+directorio, 'data'), function(err){
       //if(err)
       //console.log(err);
     //});

     // Archivo mongod para la puesta en marcha de la bbdd
     fs.copy(path.join(process.cwd(),'node_modules','gitbook-start-mongo-noejaco','mongod'),path.join(process.cwd()+"/"+directorio, 'mongod'),function(err){
         if(err)
         console.log(err);
      });


    //añadimos la tarea
    fs.writeFileSync(path.resolve(process.cwd()+"/"+directorio,'gulpfile.js'), contenido,  {'flag':'a'},  function(err) {
        if (err) {
        console.error(err);
        }
    });

    // Procfile para heroku
    fs.copy(path.join(process.cwd(),'node_modules','gitbook-start-mongo-noejaco','Procfile'),path.join(process.cwd()+"/"+directorio, 'Procfile'),function(err){
        if(err)
        console.log(err);
     });

    //datos_usuario(directorio);

};


//

//
function deploy() {



    console.log("Comenzando el deploy en HEROKU");



    child.exec('git add --all ; git commit -m "first push heroku"; git push heroku master;', function(error, stdout, stderr){
        if(error)
          console.log(error)
        console.log(stderr);
        console.log(stdout);
      });



};

module.exports = {
  initialize,
  deploy
}
