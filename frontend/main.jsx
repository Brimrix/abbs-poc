import 'vite/modulepreload-polyfill';

import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes/index'
import React from 'react';
import { CookiesProvider } from "react-cookie";


const App = (children) => {
  return <>
     <CookiesProvider>
     <React.StrictMode>
      <RouterProvider router={router}>
        {children}
      </RouterProvider>
    </React.StrictMode>
     </CookiesProvider>

  </>
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
