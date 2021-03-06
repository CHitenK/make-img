import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
// import 'antd/dist/antd.css'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router basename='/make-img'>
    <App />
  </Router>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
//  *8208 rewrite or internal redirection cycle while internally redirecting to "/make-img/index.html", 
// client: 219.137.73.228, server: chimke.cn, request: "GET /make-img/ HTTP/1.1", host: "chimke.cn"
// 
