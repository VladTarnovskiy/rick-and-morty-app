import React from 'react';
import ReactDOM from 'react-dom/client';
// import { App } from './App';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
      {/* <BrowserRouter >
        <App />
      </BrowserRouter> */}
    </ErrorBoundary>
  </React.StrictMode>
);
