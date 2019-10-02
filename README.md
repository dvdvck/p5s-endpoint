# Segumiento de Pumabús 
Consulta a los datos de seguimiento de autobuses de pumabús.

## Ejecución 

Renombrar el archivo `.env.example` a `.env` y colocar las credenciales de autenticación:
`EMAIL` 
`PASSWORD`

En línea de comandos:
```
$ npm install
$ node -r dotenv/config index.js
```


## Estructura del paquete de dato

```
sn
position [latitud, longitud]
geohash [nueve caracteres]
speed [km/h]
height [m]
accuracy
  horizontal [m]
  vertical [m]
  pdop
date
  emitted
  received
  diff [ms]
energy
  amper [mA]
  batt  [mV]
  temp  [ºC]
fix
  ok
  type
  dgnss
reception
  numSV
  rsrp
  rsrq
```

Descripción de trama:

`sn` Identificador del elemento IoT

`date.emitted` Marca de tiempo en la que se generó el paquete

`date.received` Marca de tiempo cuando se ubicó por primera vez en el servidor

`date.diff` Lapso entre la fecha en que se generó la trama y el reconocimiento en el servidor

`fix.ok` La posición cumple con la precisión requerida

`fix.type` Cuando el fix involucra es 3D -> 3, cuando es estimada la altitud -> 2

`fix.dgnss` Correcciones diferenciales aplicadas del sistema aumentado -> 2

`reception.numSV` Número de satelites usados en la solución de posición

`reception.rsrp` Intensidad de la potencia de recepcion [-152 -44]

`reception.rsrq` Calidad de la potencia de recepcion [-30 -3]
