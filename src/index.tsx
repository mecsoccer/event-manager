import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StateProvider } from './global-store/popupContext';
import Alert from './components/popups/Alert';
import PageLoader from './components/popups/PageLoader';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  (
    <StateProvider>
      <App />
      <Alert />
      <PageLoader />
    </StateProvider>
  ),
  document.querySelector('#root')
);

const users = localStorage.getItem('users');

if (!users) {
  localStorage.setItem('users', JSON.stringify({
    users: {
      'marian@gmail.com': { firstName: 'Marian', lastName: 'Busoi', email: 'marian@gmail.com', password: 'sdfasdfsa', loggedIn: false },
    }
  }));
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
