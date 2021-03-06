# Práctica: LocalStrategy y base de datos


![imagen1][logo]
[logo]: https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQmTdns2SIHRywqRrwjOmWCewbAPJKjv5s_iblApWlTryhkwB1n

![imagen2][logo2]
[logo2]: http://1.bp.blogspot.com/-FagQLEI_Zhc/VnAzE9L8e3I/AAAAAAAAAFk/DWPqvL0ZXo8/s1600/mongodb.jpg



## Descripción de la práctica
El servidor proveído por el plugin (iaas o heroku) deberá autenticar al lector del libro usando LocalStrategy y una base de datos en la que se guarda información acerca de los usuarios.
Se utilizará projects de Github en el seguimiento y desarrollo de esta práctica.
_Nota: Se hará uso de la base de datos ___MongoDB____


#### Paquetes necesarios
  * Plugin principal
    * [instalación](https://www.npmjs.com/package/gitbook-start-plugin-general-noejaco17)
  * Node.js
  * npm
  * MongoDB:
    * [tuto-instalación-ubuntu](http://www.mongodbspain.com/es/2014/08/30/install-mongodb-on-ubuntu-14-04/)
    * [tuto-instalación-windows](http://es.slideshare.net/MarcoAntonioTuzCastillo/manual-de-como-instalar-mongo-db-en-windows)

### Pasos a seguir:

#### Instalación del plugin
Una vez instalado el paquete principal, deberemos proveer al mismo de un package.json, para ello escribiremos en consola:
~~~
npm init -y
~~~
Esto nos generará un package.json, con la opción -y evitamos tener que interactuar con el prompt de npm puesto que en este caso no necesitamos configuración ninguna.

Llegados a este punto ya podemos comenzar con la instalación del plugin dedicado a LocalStrategy y MongoDB, lo haremos mediante el siguiente comando:
~~~
[sudo] npm i[nstall] --save gitbook-start-mongo-noejaco
~~~

Finalizada la instalación podremos ya ejecutar la opción --mongodb de nuestro paquete principal. Para ello escribimos en consola el siguiente comando:
~~~
gitbook-start --mongodb mongo --directorio nombre_directorio --heroku nombre_app
~~~
Cuando acabe presionaremos la tecla intro y la aplicación nos pedirá por consola los datos de nuestra aplicación así como los de github.
Una vez introducidos se nos habrá creado el directorio con nombre: nombre_directorio. Deberemos acceder a él (cd nombre_directorio) e instalar los paquetes necesarios a través de:
~~~
npm i[nstall]
~~~

___Nota___: En caso de dar problemas de no encontrar los módulos debido a un conflicto de paquetes, ejecutar su instalación manualmente- Esto puede suceder con un número muy reducido de paquetes. Para su instalación:
~~~
npm install --save nombre_paquete
~~~

Finalizada la instalación tendremos lo necesario para arrancar nuestra aplicación mediante:

Node, de forma local:
~~~
node app.js
~~~

A continuación en el navegador accedemos a: localhost:8080

Heroku:
~~~
gulp deploy-heroku-oauth
~~~

A continuación nos dirigimos a la página oficial de Heroku y accedemos a nuestra aplicación.




### MongoDB with c9



MongoDB is preinstalled in your workspace. To run MongoDB, run the following below (passing the correct parameters to it). Mongodb data will be stored in the folder data.
$ mkdir data
$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
$ chmod a+x mongod
$ ./mongod -> Dejamos ejecutando la BBDD
Abrir la base de datos
$ mongo (show db)(use lista)(show collections)






## Enlaces:
##### Enlace al libro desplegado en gh-pages
[gh-pages](https://ull-esit-sytw-1617.github.io/tareas-iniciales-noejaco2017/)

##### Enlace a gitbook
[gitbook](https://alu0100836059.gitbooks.io/apuntes_sytw_16_17/content/)

##### Enlace a npm gitbook-start-2.0
[npm-gitbook-start](https://www.npmjs.com/package/gitbook-start-team-noejaco2017-2.0)

##### Enlace a npm plugin Heroku
[npm-heroku](https://www.npmjs.com/package/gitbook-start-plugin-heroku-noejaco2017)

##### Enlace al paquete npm iaas
[npm-plugin-iaas](https://www.npmjs.com/package/gitbook-start-plugin-iaas-ull-es-noejaco2017)

##### Enlace a la aplicación desplegada en heroku
[heroku](https://herokuiaass.herokuapp.com/)



## Autores
[Noé Campos](http://dsi1516.github.io/Practica1/)

[Jacobo](http://alu0100836059.github.io/pagina_personal/)
