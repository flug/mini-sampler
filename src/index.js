import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Player from './Player';
import * as serviceWorker from './serviceWorker';
import { createGlobalStyle } from 'styled-components'
import './fonts.css'
const GlobalStyle = createGlobalStyle`
  body {
    background-color: hsl(212, 13%, 10%);
    font-family: 'ubuntu medium';
    background-image: url("/background.png") ; 
    background-repeat: no-repeat; 
    background-position: 50% -15% ; 
  }
  * {
    box-sizing: border-box;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Player />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
