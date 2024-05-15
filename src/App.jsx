import React from "react";
import LayoutMain from './Components/LayoutMain'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const App = () => {
  // New App Configurations
 
  return (
    <div >
      <Router>
        <Routes>

          <Route path="/"  Component= {LayoutMain} />
         

        </Routes>
      </Router>
    </div>
  );
};

export default App;
