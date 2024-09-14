// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Parameters from './Parameters';
import BudgetingFramework from './BudgetingFramework';
import Template from './Template';

function App() {
  return (
      <Router>
        <NavBar />
        <div className="app-container">
          <div className="content">
            <Routes>
              <Route path="/" element={<Template />}></Route>
              <Route path="/parameters/:templateId" element={<Parameters />}></Route>
              <Route path="/budgeting-framework/:templateId" element={<BudgetingFramework />}></Route>
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
