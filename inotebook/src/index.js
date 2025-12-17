import React from 'react';
import ReactDOM from 'react-dom/client';
import Alertstate from './Contexts/Alertstate';
import Loadingbarstate from './Contexts/loadingbarstate';


import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Loadingbarstate>
  <Alertstate>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Alertstate>
  </Loadingbarstate>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
