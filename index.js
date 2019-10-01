'use strict';
/**
Consulta de la traza mas reciente registrado.
Salta las trazas que se generaron antes de la ultima traza recibida.
*/

const fb = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const retrieve = ()=>{
  console.log('retreive traces');
  let rawRef = fb.firestore().collection('raw');
  //filtar los utlimos emitidos
  let lastemitted = 0;
  let current = rawRef.orderBy('date.received', 'desc').limit(1);

  let unsub = current.onSnapshot(qss =>{
    qss.docChanges().forEach(change =>{
      const packet = change.doc.data();
      if(lastemitted < packet.date.emitted){
        lastemitted = packet.date.emitted;
      }
      else{
        return; //packet atrasado
      }

      console.log(change.type, packet);
    });
  }, error =>{
    console.error(error);
  });

  process.on("exit", ()=>{
    unsub();
  });
}

const config = require("./config");
fb.initializeApp(config);
  

let p = new Promise((res, rej)=>{
  fb.auth().onAuthStateChanged(credential =>{
    console.log("user authenticated", credential.operationType);
    res();
  });
});
p.then(retrieve);

const email = process.env.EMAIL;
const pass = process.env.PASSWORD;
fb.auth().signInWithEmailAndPassword(email, pass).catch(console.error);
