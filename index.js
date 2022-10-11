const path = require('path');
const ip = require('ip');
const express = require('express');
var server = require('ws').Server;

var s = new server ({ port: 8080 });
s.on('connection', function(ws) {
  ws.on('message', function(message) {
    s.clients.forEach(function each(client) {
      //broadcast message to all clients except sender
      if (client !== ws){
        client.send(message.toString());
      }
    });
    console.log("Recibido: "+message.toString())
  });
  ws.on('close', function(){
    console.log("Cliente desconectado");
  });
  console.log("Cliente conectado");
  /*setTimeout(()=> { ws.send(JSON.stringify({'Semaforo1': 'rojo',
                                            'Semaforo2': 'amarillo',
                                            'Auto1_luzH': 1,
                                            'Auto2_luzH': 1,
                                            'Auto3_luzH': 0,
                                            'Auto4_luzH': 1,
                                            'Auto1_luzV': 1,
                                            'Auto2_luzV': 1,
                                            'Auto3_luzV': 0,
                                            'Auto4_luzV': 1,
                                            'Bici_posicion': 10
                                          })) },1000)*/
  setInterval(()=> ws.send(JSON.stringify(test())),1000)

});

let lastPos = 0;
const semaforo_valores = ['rojo','amarillo','verde'];
function test(){
  if(lastPos == 100){
    lastPos = 0;
  }
  lastPos++;
  return {'Semaforo1': semaforo_valores[Math.floor(Math.random()*semaforo_valores.length)],
    'Semaforo2': semaforo_valores[Math.floor(Math.random()*semaforo_valores.length)],
    'Auto1_luzH': Math.floor(Math.random() * 2),
    'Auto2_luzH': Math.floor(Math.random() * 2),
    'Auto3_luzH': Math.floor(Math.random() * 2),
    'Auto4_luzH': Math.floor(Math.random() * 2),
    'Auto1_luzV': Math.floor(Math.random() * 2),
    'Auto2_luzV': Math.floor(Math.random() * 2),
    'Auto3_luzV': Math.floor(Math.random() * 2),
    'Auto4_luzV': Math.floor(Math.random() * 2),
    'Bici_posicion': lastPos,
    'Bici_led1': 1,
    'Bici_led2': 1,
    'Bici_led3': 0,
    'Bici_led4': 0,
    'Bici_led5': 0,
    'Calle_luz1': 0,
    'Calle_luz2': 1,
    'Calle_luz3': 0,
    'Calle_luz4': 0,
    'Calle_luz5': 1,
    'Calle_luz6': 1,
    'Calle_luz7': 1,
  }
}

const app = express();

app.use(express.static('public'));


app.listen(80, () => {
  console.log('Servidor web activo http://'+ip.address()+':80');
})
