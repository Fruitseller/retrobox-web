import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import App from './App';
import { init as firebaseInit } from './firebase';
import registerServiceWorker from './registerServiceWorker';

firebaseInit();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
