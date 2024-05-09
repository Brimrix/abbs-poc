import React from "react";
import Layout_Grid from './Components/Layout_Grid'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const App = () => {
  // New App Configurations
 
  return (
    <div >
      <Router>
        <Routes>

          <Route path="/"  Component= {Layout_Grid} />
         

        </Routes>
      </Router>
    </div>
  );
};

export default App;
