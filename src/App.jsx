import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CreateBill from './components/pages/CreateBill';
import Dashboard from './components/pages/Dashboard'
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={CreateBill} />
          <Route path="/dashboard" Component={Dashboard} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
