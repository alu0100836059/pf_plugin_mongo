#!/usr/bin/env node
var express = require('express');
var app = express()
var path = require('path');
var fs= require('fs-extra');
var ejs=require('ejs');
var child = require("child_process");

//DIRECTORIO CON TEMPLATES
// app.set('views', path.join(__dirname, 'template'));
// app.set('view engine', 'ejs');

//MINIMIST
var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);

// console.log("argv_ ",argv._);//los que no tienen opcion asociada
// console.log("argv ",argv);
// console.log("nombre "+argv.autor);
// console.log("url "+argv.url);
// console.log("wiki "+argv.wiki);
// console.log("version "+argv.version);
// console.log("email "+argv.email);
function estructura(directorio){
      //CREACION DE LOS DIRECTORIOS TXT, SCRIPTS, Y LA CARPETA A GENERAR
      //creamos el directorio raiz

      var direct = process.cwd() + directorio;
      console.log("VARIABLE DIRECTORIO "+direct);

             //Creamos el directorio
             fs.mkdirsSync(directorio);

      // fs.createDir(path.join(process.cwd(), directorio), function(err){
      //   if(err)
      //     console.log(err);
    	// });
      //creamos el directorio txt
      // fs.createDir(path.join(process.cwd(), directorio , 'txt'), function(err){
      //   if(err)
      //     console.log(err);
    	// });
    	// //creamos el directorio scripts
    	// fs.createDir(path.join(process.cwd(), directorio , 'scripts'), function(err){
      //   if(err)
      //     console.log(err);
    	// });

      //Creamos una copia de los scripts
      console.log("LLEGOOOOOOOOOOO SCRIPTS");
             fs.copy(path.join(__dirname, '..', 'scripts') , path.join(direct, `${directorio}`,'scripts'), function(err){
                 if(err) return console.error(err)
             });
             console.log("LLEGOOOOOOOOOOO TXT");
             //Creamos una copia de los txt
             fs.copy(path.join(__dirname, '..', 'txt') , path.join(direct, `${directorio}`,'txt'), function(err){
                 if(err) return console.error(err)
             });

      //COPIAMOS NUESTROS ARCHIVOS AL NUEVO DIRECTORIO
    	//copiamos lo que hay en txt y lo ponemos en el txt creado
      // fs.copyDir(path.join(__dirname, '..', 'txt'), path.join(process.cwd(), dir , 'txt'), function (err) {
      // 	if (err)
      //     console.error(err)
    	// });
      // //copiamos lo que hay en scripts y lo ponemos en el spripts creado
      // fs.copyDir(path.join(__dirname, '..', 'scripts'), path.join(process.cwd(), dir , 'scripts'), function (err) {
      // 	if (err)
      //     console.error(err)
    	// });
      //copiamos gulpfile
      console.log("LLEGOOOOOOOOOOO GULPFILE");
      fs.copy(path.join(__dirname,'..','gulpfile.js'), path.join(process.cwd(), directorio , 'gulpfile.js'),function(err){
        if(err)
          console.log(err);
      });
      //copiamos el book
      console.log("LLEGOOOOOOOOOOO BOOK");
      fs.copy(path.join(__dirname,'..','book.json'),path.join(process.cwd(), directorio , 'book.json'),function(err){
        if(err)
        console.log(err);
      });
console.log("LLEGOOOOOOOOOOO APP");
      //copiamos server.js
      fs.copy(path.join(__dirname,'..','app.js'),path.join(process.cwd(), directorio , 'app.js'),function(err){
        if(err)
        console.log(err);
      });
console.log("SALGO");

       //
      //        //Creamos una copia de los scripts
      //        fs.copy(path.join(__dirname, '../template-iaas', 'scripts') , path.join(direct, `${argv.d}`,'scripts'), function(err){
      //            if(err) return console.error(err)
      //        });
      //        //Creamos una copia de los txt
      //        fs.copy(path.join(__dirname, '../template-iaas', 'txt') , path.join(direct, `${argv.d}`,'txt'), function(err){
      //            if(err) return console.error(err)
      //        });
      //        //Creamos una copia de Readme
      //        fs.copy(path.join(__dirname, '../template-iaas', 'README.md') , path.join(direct, `${argv.d}`,'README.md'), function(err){
      //            if(err) return console.error(err)
      //        });
      //        //Creamos gulpfile
      //        fs.copy(path.join(__dirname, '../template-iaas', 'gulpfile.js') , path.join(direct, `${argv.d}`,'gulpfile.js'), function(err){
      //            if(err) return console.error(err)
      //        });
      //        //Creamos book.json
      //        fs.copy(path.join(__dirname, '../template-iaas', 'book.json') , path.join(direct, `${argv.d}`,'book.json'), function(err){
      //            if(err) return console.error(err)
      //        });
      //        //Creamos server
      //        fs.copy(path.join(__dirname, '../template-iaas', 'app.js') , path.join(direct, `${argv.d}`,'app.js'), function(err){
      //            if(err) return console.error(err)

}




if(argv.h || argv.help){

    //MENU
    console.log("gitbook-start [OPTIONS]\n"+
    "--autor: autor del libro a crear node gitbook-star -a AutorDelLibro\n"+
    "--email: email de contacto del usuario\n"+
    "--version: version repositorio github contra el que se va a trabajar -r github.com/repo.git\n"+
    "--url: repositorio github contra el que se va a trabajar -r github.com/repo.git\n"+
    "--wiki: direccion web de la wiki en github -w github.com/repo.wiki.git\n"+
    "--directorio: nombre del directorio a crear\n"+
    "--help: muestra ayuda sobre las opciones disponibles\n"+
    "--deploy: Deploy en IaaS(iaas.ull.es)"+
    "--iaasIP: Direccion de la maquina virtual\n"+
    "--iaaspath: Repositorio que va a contener el libro en iaas\n");


}else{
  if(!argv.iaasIP || !argv.iaaspath || !argv.deploy ){
               console.log("Falta el argumento IP, path o directorio");
  }else{
    if(argv.deploy){
                 if(!argv.directorio){//Si especificas deploy solo

                             estructura("Estructura_del_book");

                             child.exec('npm install --save-dev gitbook-start-plugin-iaas-ull-es-noejaco2017 ', function(error, stdout, stderr){
                               if(error)
                                 console.log(error)

                               console.log(stderr);
                               console.log(stdout);
                             })

                             //añadir las tareas al gulp
                             var iaas = require(path.join(__dirname,'../..','gitbook-start-plugin-iaas-ull-es-noejaco2017 ','linea-comando-iaas '));
                             iaas.initialize("Estructura_del_book");


                             //renderizando package.json con opciones de iaas
                             ejs.renderFile(path.join(__dirname,'./template_npm','template','package.ejs'),{ direccionip:argv.iaasIP,direccionpath:argv.iaaspath},
                               function(err,data){
                                   if(err) {
                                       console.error(err);
                                   }
                                   if(data) {
                                       fs.writeFile(path.join(process.cwd(),"Estructura_del_book",'package.json'), data);
                                   }
                               });
               }else if(argv.directorio){

                 estructura(argv.directorio);
                      console.log("Despues de crear estructura");
                         child.exec('npm install --save-dev gitbook-start-plugin-iaas-ull-es-noejaco2017', function(error, stdout, stderr){
                           if(error)
                             console.log(error)

                           console.log(stderr);
                           console.log(stdout);
                         })

                         console.log("TAREA GULP");
                         //añadir las tareas al gulp
                         var iaas = require(path.join(__dirname,'../..','gitbook-start-plugin-iaas-ull-es-noejaco2017','linea-comando-iaas'));
                         iaas.initialize(directorio);

                         console.log("LLEGOOOOOOOOOOO PACKAGE");
                         //renderizando package.json con opciones de iaas
                         ejs.renderFile(path.join(__dirname,'./template_npm','template','package.ejs'),{ nombre:argv.name, num:argv.version, direcciongit:argv.url, direccionwiki:argv.wiki, autor:argv.autor, email:argv.email,direccionip:argv.iaasIP,direccionpath:argv.iaaspath},
                           function(err,data){
                               if(err) {
                                   console.error(err);
                               }
                               if(data) {
                                   fs.writeFile(path.join(process.cwd(),directorio,'package.json'), data);
                               }
                           });
              }else{
                  console.log("ELSE DENTRO NO HA INTRODUCIDO OPCIONES VALIDAS DE DEPLOY");
              }
      }else{
             console.log("ELSE FUERA NO HA INTRODUCIDO OPCIONES VALIDAS DE DEPLOY");
     }
   }
}
            //    var direct = process.cwd() + '/template-iaas/';
             //
            //        //Creamos el directorio
            //        fs.mkdirsSync(direct + argv.d);
             //
            //        //Creamos una copia de los scripts
            //        fs.copy(path.join(__dirname, '../template-iaas', 'scripts') , path.join(direct, `${argv.d}`,'scripts'), function(err){
            //            if(err) return console.error(err)
            //        });
            //        //Creamos una copia de los txt
            //        fs.copy(path.join(__dirname, '../template-iaas', 'txt') , path.join(direct, `${argv.d}`,'txt'), function(err){
            //            if(err) return console.error(err)
            //        });
            //        //Creamos una copia de Readme
            //        fs.copy(path.join(__dirname, '../template-iaas', 'README.md') , path.join(direct, `${argv.d}`,'README.md'), function(err){
            //            if(err) return console.error(err)
            //        });
            //        //Creamos gulpfile
            //        fs.copy(path.join(__dirname, '../template-iaas', 'gulpfile.js') , path.join(direct, `${argv.d}`,'gulpfile.js'), function(err){
            //            if(err) return console.error(err)
            //        });
            //        //Creamos book.json
            //        fs.copy(path.join(__dirname, '../template-iaas', 'book.json') , path.join(direct, `${argv.d}`,'book.json'), function(err){
            //            if(err) return console.error(err)
            //        });
            //        //Creamos server
            //        fs.copy(path.join(__dirname, '../template-iaas', 'app.js') , path.join(direct, `${argv.d}`,'app.js'), function(err){
            //            if(err) return console.error(err)
            //        });
            //        ejs.renderFile(path.join(__dirname, '../template-iaas', 'package.ejs'),{direccionip:argv.iaasIP,direccionpath:argv.iaaspath},function(err, result) {
            //                         // render on success
             //
            //                                 if (!err) {
            //                                     // result.nombre=argv.name;
            //                                     // result.direcciongit=argv.url;
            //                                     // result.direccionwiki='argv.wiki';
            //                                      console.log(result);
            //                                          //CREAMOS EL PACKAGE.JSON del template
            //                                             //var write=fs.writeFile("./template/package.json",result, (err) =>
             //
            //                                              fs.writeFile(path.join(direct, `${argv.d}`, 'package.json'), result);
            //                                                     if (err) throw err;
            //                                                     console.log('CREADO PACKAGE.JSON');
             //
            //                                 }
            //                                 // render or error
            //                                 else {
            //                                          console.log('Error renderFile(package.ejs)');
            //                                          console.log(err);
            //                                 }
            //                          });
            //                          milib.deploy(argv.iaasIP,argv.iaaspath);
//               }
// }
//EJS RENDERFILE cargamos la plantilla
// var direct = process.cwd() + '/template_npm/';
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
//     //Creamos una copia de app.js
//     fs.copy(path.join(__dirname, '../template', 'app.js') , path.join(direct, `${argv.directorio}`,'app.js'), function(err){
//         if(err) return console.error(err)
//     });
//     //Creamos una copia de book.json
//     fs.copy(path.join(__dirname, '../template', 'book.json') , path.join(direct, `${argv.directorio}`,'book.json'), function(err){
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




// if(argv.h || argv.help){
//     //MENU
//     console.log("gitbook-start-iaas [OPTIONS]\n"+
//     "--iaasIP: Direccion de la maquina virtual\n"+
//     "--iaaspath: Repositorio que va a contener el libro en iaas\n"+
//     "--d: Crea la estructura del directorio\n");
//
// }else{
//             if(!argv.iaasIP || !argv.iaaspath || !argv.d ){
//               console.log("Falta el argumento IP, path o directorio");
//             }else{
//               var direct = process.cwd() + '/template-iaas/';
//
//                   //Creamos el directorio
//                   fs.mkdirsSync(direct + argv.d);
//
//                   //Creamos una copia de los scripts
//                   fs.copy(path.join(__dirname, '../template-iaas', 'scripts') , path.join(direct, `${argv.d}`,'scripts'), function(err){
//                       if(err) return console.error(err)
//                   });
//                   //Creamos una copia de los txt
//                   fs.copy(path.join(__dirname, '../template-iaas', 'txt') , path.join(direct, `${argv.d}`,'txt'), function(err){
//                       if(err) return console.error(err)
//                   });
//                   //Creamos una copia de Readme
//                   fs.copy(path.join(__dirname, '../template-iaas', 'README.md') , path.join(direct, `${argv.d}`,'README.md'), function(err){
//                       if(err) return console.error(err)
//                   });
//                   //Creamos gulpfile
//                   fs.copy(path.join(__dirname, '../template-iaas', 'gulpfile.js') , path.join(direct, `${argv.d}`,'gulpfile.js'), function(err){
//                       if(err) return console.error(err)
//                   });
//                   //Creamos book.json
//                   fs.copy(path.join(__dirname, '../template-iaas', 'book.json') , path.join(direct, `${argv.d}`,'book.json'), function(err){
//                       if(err) return console.error(err)
//                   });
//                   //Creamos server
//                   fs.copy(path.join(__dirname, '../template-iaas', 'app.js') , path.join(direct, `${argv.d}`,'app.js'), function(err){
//                       if(err) return console.error(err)
//                   });
//                   ejs.renderFile(path.join(__dirname, '../template-iaas', 'package.ejs'),{direccionip:argv.iaasIP,direccionpath:argv.iaaspath},function(err, result) {
//                                    // render on success
//
//                                            if (!err) {
//                                                // result.nombre=argv.name;
//                                                // result.direcciongit=argv.url;
//                                                // result.direccionwiki='argv.wiki';
//                                                 console.log(result);
//                                                     //CREAMOS EL PACKAGE.JSON del template
//                                                        //var write=fs.writeFile("./template/package.json",result, (err) =>
//
//                                                         fs.writeFile(path.join(direct, `${argv.d}`, 'package.json'), result);
//                                                                if (err) throw err;
//                                                                console.log('CREADO PACKAGE.JSON');
//
//                                            }
//                                            // render or error
//                                            else {
//                                                     console.log('Error renderFile(package.ejs)');
//                                                     console.log(err);
//                                            }
//                                     });
//                                     milib.deploy(argv.iaasIP,argv.iaaspath);
//             }
// }
