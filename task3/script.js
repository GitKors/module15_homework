const url = "wss://echo-ws-service.herokuapp.com";
const divGeo = document.querySelector(".div-geo");
const divIn = document.querySelector(".div-in");
const divOut = document.querySelector(".div-out");
const btnGeo = document.querySelector('.j-btn-geo');
const btnSend = document.querySelector('.j-btn-send');

const websocket = new WebSocket(url);
    websocket.onopen = () => {console.log("CONNECTED")};
    websocket.onclose = () => {console.log("DISCONNECTED")}

function sentMessage(message) {
    let textMessage = document.createElement('div');
    textMessage.className = "message";
    textMessage.innerHTML = `Сообщение отправителя: ${message}`;
    divIn.insertAdjacentElement('beforeEnd', textMessage);

    websocket.send(message);
  
    websocket.onmessage = function(evt) {
    let responseMessage = document.createElement('div');
    responseMessage.className = "message-response";
    responseMessage.innerHTML = `Сообщение от  сервера: ${evt.data}`;
    divOut.insertAdjacentElement('beforeEnd', responseMessage);
}
}

function geoLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      console.log(`https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`);

      let textMessage = document.createElement('div');
      textMessage.className = "message";
      textMessage.innerHTML = `<a href="https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}" target="_blank">Гео-локация</a>`;
      divIn.insertAdjacentElement('beforeEnd', textMessage);

      let noneMessage = document.createElement('div');
      noneMessage.className = "none-message";
      noneMessage.innerHTML = ``;
      divOut.insertAdjacentElement('beforeEnd', noneMessage);
    });
   
  }
   else {
      console.log('Geolocation не поддерживается вашим браузером');
  }
}

btnSend.addEventListener('click', () => {
    let message = document.querySelector('.input1').value;
    sentMessage(message);
})

btnGeo.addEventListener('click', geoLocation);