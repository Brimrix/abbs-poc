import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CreateBill from './components/pages/CreateBill';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={CreateBill} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
