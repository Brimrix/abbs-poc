// add the beginning of your app entry
import 'vite/modulepreload-polyfill';

import ReactDOM from 'react-dom/client';
import App from '@/App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import { BillProvider } from '@/context/BillContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BillProvider>
    <App />
  </BillProvider>,
);
