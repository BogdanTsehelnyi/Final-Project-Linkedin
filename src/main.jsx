import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import store from './redux/store.js';
import { ThemeProvider } from "./context/contextTheme/ContextTheme";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ThemeProvider>
        <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
  </Provider>
);