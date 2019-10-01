# Segumiento de Pumabús 
Consulta a los datos de seguimiento de autobuses de pumabús.

## Ejecución 

Variables de entorno en el archivo .env
EMAIL
PASSWORD

``
npm install
$ node -r dotenv/config index.js
``


##Estructura del paquete de datos
sn [serial number]
position
geohash
speed
height

accuracy
  horizontal
  pdop
  vertical

date
  diff
  emitted
  received

energy
  amper
  batt
  temp

fix
  dgnss
  ok
  type

reception
  numSV
  rsrp
  rsrq
