#!/bin/sh
echo "Abriendo script ssh pull"
CMDDESC='Genera pull a la maquina iaas'

ssh -t usuario@172.42.2.3 '/src/chuchu;git pull origin master'
