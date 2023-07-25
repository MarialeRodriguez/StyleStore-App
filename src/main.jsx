import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { StoreApp } from './StoreApp.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { AppTheme } from './theme/AppTheme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store } >
      <BrowserRouter>
        <AppTheme>
          <StoreApp />
          </AppTheme>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
