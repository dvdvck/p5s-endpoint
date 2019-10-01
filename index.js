/**
Consulta de la traza mas reciente registrado.
Salta las trazas que se generaron antes de la ultima traza recibida.
*/

const firebase = require("firebase");
const config = require("./config");
  
firebase.initializeApp(config);

const db = firebase.firestore();


let rawRef = db.collection('raw');
//filtar los utlimos emitidos
let lastemitted :number = 0;
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

console.log("listening updates");