import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './TerminalRenderer';
import './TerminalStyle.css';
import { StateManagerContextProvider } from './TerminalStateManager';
import { HandlerContextProvider } from './TerminalHandler';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StateManagerContextProvider>
      <HandlerContextProvider>
        <App />
      </HandlerContextProvider>
    </StateManagerContextProvider>
  </React.StrictMode>,
);
