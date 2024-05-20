import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import { BillProvider } from './context/BillContext.jsx';
import { ImageProvider } from './context/ImageContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(

<ImageProvider>
<BillProvider>

  <App />

</BillProvider>     
</ImageProvider>


 
)
