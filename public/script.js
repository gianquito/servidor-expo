let socket = new WebSocket("ws://localhost:8080");

socket.onmessage = function(event) {
  var data = JSON.parse(event.data);
  //console.log(data);

  //itera por todas las claves del json
  Object.keys(data).forEach((key)=>{
  	if(key.toLocaleLowerCase().startsWith("auto")){
      //Autos
      if(data[key] == 1){
    	   document.getElementById(key).src = "assets/auto_prendido.png"
       }else{
         document.getElementById(key).src = "assets/auto_apagado.png"
       }
    }else if(key.toLocaleLowerCase().startsWith("semaforo")){
      //Semaforos
      switch (data[key]) {
        case "rojo":
          document.getElementById(key).children[0].style.background = "red";
          document.getElementById(key).children[1].style.background = "black";
          document.getElementById(key).children[2].style.background = "black";
          break;
        case "amarillo":
          document.getElementById(key).children[0].style.background = "black";
          document.getElementById(key).children[1].style.background = "yellow";
          document.getElementById(key).children[2].style.background = "black";
          break;
        case "verde":
          document.getElementById(key).children[0].style.background = "black";
          document.getElementById(key).children[1].style.background = "black";
          document.getElementById(key).children[2].style.background = "green";
          break;
      }
    }else if(key.toLocaleLowerCase() == "bici_posicion"){
      document.getElementById(key).style.left = data[key]+"%";
      document.getElementById(key).querySelector("span").innerHTML = data[key];
      //document.getElementById("bici-linea").style.width = data[key]*250/100+"px";
      document.getElementById("bici-linea").style.width = data[key]+"%";
    }else if(key.startsWith("Bici_led")){
      if(data[key] == 0){
        document.getElementById(key).style.background = "transparent";
        document.getElementById(key).style.boxShadow = "none";
      }else{
        document.getElementById(key).style.background = "yellow";
        document.getElementById(key).style.background = "1px 1px 8px 3px rgba(255,248,0,0.71)";
      }
    }else if(key.startsWith("Calle_luz")){
      if(data[key] == 0){
        document.getElementById(key).src = "assets/poste_apagado.jpg";
      }else{
        document.getElementById(key).src = "assets/poste_prendido.jpg";
      }
    }
  })
}

//camara
fetch(document.getElementById("camara").querySelector("iframe").src)
  .then(response => {
    document.getElementById("camara").style.display = "inline-block";
  }).catch(error => {
    document.getElementById("camara").style.display = "none";
  });

function enviar(datos){
  socket.send(datos);
}