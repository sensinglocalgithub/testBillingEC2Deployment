//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Network response was not');
        }
        const result = await response.json();
        setData(result);
        console.log(result);
        //        <img src={logo} className="App-logo" alt="logo" />
      } catch (error) {
        setError(error);
      }finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;
  return (
    <div className="App">
      <header className="App-header">
        <h1>Issues</h1>
        <p>FID-Test: {data.fid}</p>
        <p>Issue Type: {data.issue_type}</p>
        <p>Category 2: {data.category2}</p>
        <p>Category 1: {data.category1}</p>
        <p>Type: {data.type}</p>
      </header>
    </div>
  );
}

export default App;
