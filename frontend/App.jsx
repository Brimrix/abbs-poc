import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes/index';
import '@/src/index.css';

const App = (children) => {
    return <RouterProvider router={router}>
            {children}
        </RouterProvider>
}

export default App
