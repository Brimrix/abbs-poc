import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CreateBill from '@/components/pages/CreateBill';
import Dashboard from '@/components/pages/Dashboard';
import Customer from '@/components/pages/customer/Customer';
function App() {
  return (
    <div>
      {/* TODO: Move router to separate file */}
      <Router>
        <Routes>
          <Route path="/" Component={CreateBill} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/customers" Component={Customer} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;