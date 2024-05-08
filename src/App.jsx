import React from "react";
import Layout from "./Components/Layout";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const App = () => {
 
  return (
    <div >
      <Router>
        <Routes>

          <Route path="/"  Component= {Layout} />
         

        </Routes>
      </Router>
    </div>
  );
};

export default App;
