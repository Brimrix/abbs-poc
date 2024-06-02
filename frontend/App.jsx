import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CreateBill from './components/pages/CreateBill';

function App() {
  return (
    <div>
      {/* TODO: Move router to separate file */}
      <Router>
        <Routes>
          <Route path="/" Component={CreateBill} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
