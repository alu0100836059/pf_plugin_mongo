var express = require('express');
var app = express()
var path = require('path');
var fs= require('fs-extra');
var ejs=require('ejs');

//DIRECTORIO CON TEMPLATES
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'ejs');

//MINIMIST
var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);


if(argv.h || argv.help){
    //MENU
    console.log("gitbook-start-iaas [OPTIONS]\n"+
    "--iaasIP: Direccion de la maquina virtual\n"+
    "--iaaspath: repositorio que va a contener el libro en iaas\n"+
    "--d: directorio a crear con el nombre que quiera\n");

}else{
            if(!argv.iaasIP || !argv.iaaspath || !argv.d ){
              console.log("Falta el argumento IP, path o directorio");
            }else{
              var direct = process.cwd() + '/template-iaas/';

                  //Creamos el directorio
                  fs.mkdirsSync(direct + argv.d);

                  //Creamos una copia de los scripts
                  fs.copy(path.join(__dirname, '../template-iaas', 'scripts') , path.join(direct, `${argv.d}`,'scripts'), function(err){
                      if(err) return console.error(err)
                  });
                  //Creamos una copia de los txt
                  fs.copy(path.join(__dirname, '../template-iaas', 'txt') , path.join(direct, `${argv.d}`,'txt'), function(err){
                      if(err) return console.error(err)
                  });
                  //Creamos una copia de Readme
                  fs.copy(path.join(__dirname, '../template-iaas', 'README.md') , path.join(direct, `${argv.d}`,'README.md'), function(err){
                      if(err) return console.error(err)
                  });
                  //Creamos gulpfile
                  fs.copy(path.join(__dirname, '../template-iaas', 'gulpfile.js') , path.join(direct, `${argv.d}`,'gulpfile.js'), function(err){
                      if(err) return console.error(err)
                  });



                  //Creamos el packeage.json a traves de la plantilla
                  ejs.renderFile(path.join(__dirname, '../template-iaas', 'package.ejs'),{direccionip:argv.iaasIP,direccionpath:argv.iaaspath},function(err, result) {
                 // render on success

                         if (!err) {
                             // result.nombre=argv.name;
                             // result.direcciongit=argv.url;
                             // result.direccionwiki='argv.wiki';
                              console.log(result);
                                  //CREAMOS EL PACKAGE.JSON del template
                                     //var write=fs.writeFile("./template/package.json",result, (err) => {
                                      fs.writeFile(path.join(direct, `${argv.d}`, 'package.json'), result);
                                             if (err) throw err;
                                             console.log('CREADO PACKAGE.JSON');

                         }
                         // render or error
                         else {
                                  console.log('Error renderFile(package.ejs)');
                                  console.log(err);
                         }
                  });
            }
}
//EJS RENDERFILE cargamos la plantilla
// var direct = process.cwd() + '/template/';
//
//     //Creamos el directorio
//     fs.mkdirsSync(direct + argv.directorio);
//
//     //Creamos una copia de los scripts
//     fs.copy(path.join(__dirname, '../template', 'scripts') , path.join(direct, `${argv.directorio}`,'scripts'), function(err){
//         if(err) return console.error(err)
//     });
//     //Creamos una copia de los txt
//     fs.copy(path.join(__dirname, '../template', 'txt') , path.join(direct, `${argv.directorio}`,'txt'), function(err){
//         if(err) return console.error(err)
//     });
//     //Creamos una copia de Readme
//     fs.copy(path.join(__dirname, '../template', 'README.md') , path.join(direct, `${argv.directorio}`,'README.md'), function(err){
//         if(err) return console.error(err)
//     });
//     //Creamos gulpfile
//     fs.copy(path.join(__dirname, '../template', 'gulpfile.js') , path.join(direct, `${argv.directorio}`,'gulpfile.js'), function(err){
//         if(err) return console.error(err)
//     });
//
//
//
//     //Creamos el packeage.json a traves de la plantilla
//     ejs.renderFile(path.join(__dirname, '../template', 'package.ejs'),{nombre:argv.name, num:argv.version, direcciongit:argv.url, direccionwiki:argv.wiki, autor:argv.autor, email:argv.email},function(err, result) {
//    // render on success
//
//            if (!err) {
//                // result.nombre=argv.name;
//                // result.direcciongit=argv.url;
//                // result.direccionwiki='argv.wiki';
//                 console.log(result);
//                     //CREAMOS EL PACKAGE.JSON del template
//                        //var write=fs.writeFile("./template/package.json",result, (err) => {
//                         fs.writeFile(path.join(direct, `${argv.directorio}`, 'package.json'), result);
//                                if (err) throw err;
//                                console.log('CREADO PACKAGE.JSON');
//
//            }
//            // render or error
//            else {
//                     console.log('Error renderFile(package.ejs)');
//                     console.log(err);
//            }
//     });
//}
