// Comentado, incluido en fs-extra
// var fs = require('fs');

var path = require('path');
var child = require("child_process");

// Comentado fs_extended porque no encuentra el módulo: deprecated!?
// var fs_extended = require('fs-extended');

var fs = require('fs-extra');

var prompt = require("prompt");
var heroku = require('heroku-client');





function initialize(directorio) {


    console.log("\n============ Generando tarea gulp ============")
    console.log("\nEspere mientras el proceso termina ...")

    var contenido = `gulp.task("deploy-heroku-oauth" ,function(){
            var heroku = require("gitbook-start-mongo-noejaco");
            heroku.deploy();
     });`;

     fs.copySync(path.join(process.cwd(),'node_modules','gitbook-start-mongo-noejaco','app.js'),path.join(process.cwd()+"/"+directorio, 'app.js'),function(err){
        if(err)
        console.log(err);
        console.log("Se ha copiado app.js");
     });

     fs.copySync(path.join(process.cwd(),'node_modules','gitbook-start-mongo-noejaco','views'),path.join(process.cwd()+"/"+directorio, 'views'),function(err){
        if(err)
        console.log(err);
     });

     // Copiando el contenido necesario para la base de datos
     // Carpeta models con bbdd.js
     fs.copySync(path.join(process.cwd(),'node_modules','gitbook-start-mongo-noejaco','models'), path.join(process.cwd()+"/"+directorio, 'models'), function(err){
       if(err)
       console.log(err);
     });

     // Carpeta data con las bases de datos administradas
     fs.copySync(path.join(process.cwd(),'node_modules','gitbook-start-mongo-noejaco','data'), path.join(process.cwd()+"/"+directorio, 'data'), function(err){
       if(err)
       console.log(err);
     });

     // Archivo mongod para la puesta en marcha de la bbdd
     fs.copySync(path.join(process.cwd(),'node_modules','gitbook-start-mongo-noejaco','mongod'),path.join(process.cwd()+"/"+directorio, 'mongod'),function(err){
         if(err)
         console.log(err);
      });


    //añadimos la tarea
    fs.writeFileSync(path.resolve(process.cwd()+"/"+directorio,'gulpfile.js'), contenido,  {'flag':'a'},  function(err) {
        if (err) {
        console.error(err);
        }
    });

    fs.copySync(path.join(process.cwd(),'node_modules','gitbook-start-mongo-noejaco','Procfile'),path.join(process.cwd()+"/"+directorio, 'Procfile'),function(err){
        if(err)
        console.log(err);
     });

    datos_usuario_token(directorio);

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


function datos_usuario_token(directorio){
     //pedimos por pantall el nombre de la app y el token
      var git = require('simple-git')(path.join(process.cwd()));
      //console.log("hfhfhfhfhf   " + path.join(process.cwd()));
       prompt.get([{
              name: 'nombre_app',
              required: true
            },{
              name: 'token_app',
              required: true
            },{
                name: 'repositorio'
            },{
                name: 'id_client',
                require: true
            },{
                name: 'secret_client',
                require: true

            },{
                name: 'organizacion',
                require: true

            }], function (err, result) {
            //
            // Log the results.
            //
            console.log('Sus datos son:');
            console.log('  nombre: ' + result.nombre_app);
            console.log('  token: ' + result.token_app);
            console.log('  repositorio: ' + result.repositorio);
            console.log('  id_client: ' + result.id_client);
            console.log('  secret_client: ' + result.secret_client);
            console.log('  organizacion ' + result.organizacion);

            //variable con el contenido de config.json
            var json = '{\n "Heroku":{\n\t"nombre_app": "'+result.nombre_app+'",\n\t "token_app": "'+result.token_app+'"\n\t}\n}';
            var configuracion = '{\n "Config":{\n\t"nombre_app": "'+result.nombre_app+'",\n\t "id_client": "'+result.id_client+'",\n\t "secret_client": "'+result.secret_client+'",\n\t "organizacion": "'+result.organizacion+'"\n\t}\n}';


            fs.mkdirSync(path.join(process.cwd(), ".token_heroku"));
            fs.writeFileSync(path.join(process.cwd(),".token_heroku","token.json"),json);
            fs.writeFileSync(path.join(process.cwd()+"/"+directorio,"aplicacion.json"),configuracion);

            var token = require(path.join(process.cwd(), ".token_heroku","token.json"));
            var pack= require(path.join(process.cwd(), 'package.json'));

            var her = new heroku({ token : token.Heroku.token_app });

                her.post('/apps', {body: {name: token.Heroku.nombre_app}} ).then(app => {

                    //git.init().addRemote('heroku', result.repositorio).add('.').commit('Primer commit').push('heroku','master');



                });

          });

}

module.exports = {
  initialize,
  deploy
}
