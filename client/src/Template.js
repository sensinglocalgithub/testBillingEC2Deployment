// src/pages/Template.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'

function Template() {
  const [city, setCity] = useState('');
  const [templateId, setTemplateId] = useState('');
  const navigate = useNavigate();

  const handleViewEditClick = () => {
    if (templateId) {
      // Navigate to the Parameters page with the template ID in the route
      navigate(`/parameters/${templateId}`);
    } else {
      alert('Please select a template.');
    }
  };

  return (
    <div className="template-container">
      <h1>Template</h1>
      <label className='templatelabel'>
        Select City:
        <select className='templateselect' value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select City</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Kochi">Kochi</option>
          {/* Add more cities as needed */}
        </select>
      </label>
      <br />
      <label className='templatelabel'>
        Select Template:
        <select className='templateselect' value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
          <option value="">Select Template</option>
          <option value="1">Template 1</option>
          <option value="2">Template 2</option>
          {/* Add more templates as needed */}
        </select>
      </label>
      <br />
      <button className="view" onClick={handleViewEditClick}>View/Edit Template</button>
    </div>
  );
}

export default Template;
