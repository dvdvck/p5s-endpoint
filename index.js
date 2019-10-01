'use strict';
/**
Consulta de la traza mas reciente registrado.
Salta las trazas que se generaron antes de la ultima traza recibida.
*/

const fb = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const retrieve = ()=>{
  console.log('retrieve traces');
  let rawRef = fb.firestore().collection('raw');
  //filtar los utlimos emitidos
  let lastemitted = 0;
  let current = rawRef.orderBy('date.received', 'desc').limit(1);

  let unsub = current.onSnapshot(qss =>{
    qss.docChanges().forEach(change =>{
      const packet = change.doc.data();

      let emitted = packet.date.emitted.toMillis();
      if(lastemitted < emitted){
        lastemitted = emitted;
      }
      else{
        return; //paquete retrasado
      }
      let d = new Date(emitted);
      console.log(d.toLocaleString(), packet.position.latitude, packet.position.longitude);
    });
  }, console.error);

  process.on("exit", ()=>{
    unsub();
  });
}

const config = require("./config");
fb.initializeApp(config);
  

let p = new Promise((res, rej)=>{
  fb.auth().onAuthStateChanged(user =>{
    if(user){
      console.log("user authenticated", user.uid, user.email);
      res();
    }
  });
});
p.then(retrieve);

const email = process.env.EMAIL;
const pass = process.env.PASSWORD;
fb.auth().signInWithEmailAndPassword(email, pass).catch(console.error);
