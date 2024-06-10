import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";
import router from '@/routes/index';
import '@/src/index.css';

const App = (children) => {
    return <>
        <React.StrictMode>
            <RouterProvider router={router}>
                <CookiesProvider>
                    {children}
                </CookiesProvider>
            </RouterProvider>
        </React.StrictMode>
    </>
}

export default App
