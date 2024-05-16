import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import { BillProvider } from './context/BillContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

<BillProvider>

  <App />

</BillProvider>     


 
)
