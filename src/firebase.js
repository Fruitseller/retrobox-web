import * as firebase from 'firebase';
let database;
export const init = () => {
  let config = {
    apiKey: 'AIzaSyBv2fwnIwQT39paxU_AsUShYE4KMqPyySw',
    authDomain: 'retrobox-6c2ba.firebaseapp.com',
    databaseURL: 'https://retrobox-6c2ba.firebaseio.com',
    projectId: 'retrobox-6c2ba',
    storageBucket: '',
    messagingSenderId: '916971129194'
  };
  firebase.initializeApp(config);
  database = firebase.database();
};
