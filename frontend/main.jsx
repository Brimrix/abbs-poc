import 'vite/modulepreload-polyfill';

import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes/index'
import React from 'react';

const App = (children) => {
  return <>
    <React.StrictMode>
      <RouterProvider router={router}>
          {children}
      </RouterProvider>
    </React.StrictMode>
  </>
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
