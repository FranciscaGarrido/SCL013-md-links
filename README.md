# Md Links


## 1. Librería Md Links

Md Links es una librería que permite al usuario analizar archivos con extensión .md (archivos markdown) para conocer el estado de los enlaces presentes en cada archivo verificando si estos se encuentran funcionales o dañados. El resultado se visualiza en la terminal.

## 2. Diagrama de flujo

![Diagrama de flujo](https://i.ibb.co/PG908mC/diagrama-de-flujo.jpg)

## 3. Guía de uso

### Instalación
* Instalar previamente npm y Node.js en tu computador.

* Ejecuta el siguiente comando en la terminal.
```js
$ npm install pamelanancupil/SCL013-md-links 
```

### Uso

* Para hacer uso de la librería ejecuta el siguiente comando en la terminal de tu archivo.
```js
$ node md-links tuarchivo.md
```
* Para ver el total de links y total de links únicos ejecuta el siguiente comando en la terminal.
```js
$ node md-links tuarchivo.md -validate
```
* Para ver el estado de tus links ejecuta el siguiente comando en la terminal.
```js
$ node md-links tuarchivo.md -stats
```
* Para ver estadísticas de tus links ejecuta el siguiente comando en la terminal.
```js
$ node md-links tuarchivo.md -s -v
```

### Resultados
* Si pasamos la opción -validate o -v, el módulo debe hacer una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como ok.

![Validate](https://i.ibb.co/qRRzCwQ/v.jpg)

Vemos que el output en este caso incluye el símbolo ok o fail, así como el status de la respuesta recibida a la petición HTTP a dicha URL.

* Si pasamos la opción -stats o -s el output (salida) será un texto con estadísticas básicas sobre los links.

![Stats](https://i.ibb.co/nzbwdTP/s.jpg)

* También podemos combinar -stats y -validate o -s y -v para obtener estadísticas que necesiten de los resultados de la validación.

![validate y stats](https://i.ibb.co/JFzD6tG/s-v.jpg)

