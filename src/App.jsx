import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LayoutMain from '@/components/LayoutMain';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={LayoutMain} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
