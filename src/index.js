import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import styled, { createGlobalStyle } from 'styled-components'
import './fonts.css'

import MiniSampler from './MiniSampler';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: hsl(212, 13%, 10%);
    font-family: 'ubuntu medium';
    background-image: url("/background.png") ; 
    background-repeat: no-repeat; 
    background-position: 50% -15% ; 
    margin: 0; 
  }
  * {
    box-sizing: border-box;
  }
`


ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <MiniSampler />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
