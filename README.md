#
# Práctica: Nueva funcionalidad para el paquete NPM plugins


![imagen1][logo]
[logo]: https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQmTdns2SIHRywqRrwjOmWCewbAPJKjv5s_iblApWlTryhkwB1n

### Requisitos

Descripción

El objetivo de esta práctica es extender el package NodeJS publicado en npm en una práctica anterior con una nueva funcionalidad que permita
* Obtener el email y el nombre del autor
* Crear el repositorio del libro en GitHub
* Hacer un push del repositorio inicial para actualizar los ficheros necesarios al repositorio del libro en la máquina virtual.

## Enlace a github gh-pages
[gh-pages](https://ull-esit-sytw-1617.github.io/tareas-iniciales-noejaco2017/)

## Enlace a gitbook
[gitbook](https://alu0100836059.gitbooks.io/apuntessytw/content/)

## Enlace a npm
[npm](https://www.npmjs.com/package/gitbook-start-team-noejaco2017)

## Enlace al paquete npm iaas
[npm-plugin-iaas](https://www.npmjs.com/package/gitbook-start-plugin-iaas-ull-es-noejaco2017)

## Enlace a la aplicación desplegada en heroku
[heroku](https://herokuiaass.herokuapp.com/)



# Instalación de plugin npm iaas

## Instalar nuestro paquete NPM
_npm install -g gitbook-start-plugin-iaas-ull-es-noejaco2017_

## Ejecutar nuestro paquete
_gitbook-start-iaas --iaasIP 172.42.2.3 --iaaspath /src/chuchu -d caca_

## Manual de ayuda
_gitbook-start --h || --help_
````````````````````
gitbook-start-iaas [OPTIONS]
--iaasIP: Direccion de la maquina virtual
--iaaspath: repositorio que va a contener el libro en iaas
--d: directorio a crear con el nombre que quiera
````````````````````


# Instalación

## Instalar nuestro paquete NPM
_npm install -g gitbook-start-team-noejaco2017_

## Ejecutar nuestro paquete
_gitbook-start --autor juanito --url juanito@ull.edu.es --wiki wiki@ull.es --email github@github.es --version 1.0.1 --directorio chuchu_

## Manual de ayuda
_gitbook-start --h || --help_
````````````````````
gitbook-start [OPTIONS]
--autor: autor del libro a crear node gitbook-star -a AutorDelLibro
--email: email de contacto del usuario
--version: version repositorio github contra el que se va a trabajar -r github.com/repo.git
--url: repositorio github contra el que se va a trabajar -r github.com/repo.git
--wiki: direccion web de la wiki en github -w github.com/repo.wiki.git
--directorio: nombre del directorio a crear
--help: muestra ayuda sobre las opciones disponibles
````````````````````
### Comandos para crear nuestro modulo en NPM

* npm adduser (añade nuestro paquete)
* npm publish(publica nuestro paquete)
* Tener en cuenta que cada vez que se publique cambiar version package.json

### Carpeta bin y template
* En nuestra carpeta /bin contiene los archivos para las funciones que podremos ejecutar desde la linea de comandos del cliente npm
* En nuestra carpeta /template tendremos el directorio a crear en gh-pages
*  index.js que sirve de atajo al script principal de nuestra aplicación

### Ejecutar nuestro script linea-comando-npm
_node bin/linea-comando-npm.js --autor juanito --url juanito@ull.edu.es --wiki wiki@ull.es --email github@github.es --version 1.0.1 --directorio chuchu_
