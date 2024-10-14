// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Parameters from './Parameters';
import BudgetingFramework from './BudgetingFramework';
import Template from './Template';
import LoginPage from './LoginPage';
import { UserProvider } from './UserContext';
import Authenticate from './Authenticate';

function App() {
  return (
    <UserProvider>
      <Router>
        <NavBar />
        <div className="app-container">
          <div className="content">
            <Routes>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/" element={<Authenticate><Template /></Authenticate>}></Route>
              <Route path="/parameters/:templateId" element={<Authenticate><Parameters /></Authenticate>}></Route>
              <Route path="/budgeting-framework/:templateId" element={<Authenticate><BudgetingFramework /></Authenticate>}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>      
  );
}

export default App;