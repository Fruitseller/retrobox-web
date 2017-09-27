import Rebase from 're-base';
import firebase from 'firebase';
import config from './firebaseConfig';

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export { app, base };
