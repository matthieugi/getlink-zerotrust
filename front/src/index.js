import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {  initializeIcons, ThemeProvider } from "@fluentui/react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./components/authConfig"

initializeIcons();
const msalInstance = new PublicClientApplication(msalConfig);

console.log(msalConfig)

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
    <ThemeProvider><App /></ThemeProvider>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
