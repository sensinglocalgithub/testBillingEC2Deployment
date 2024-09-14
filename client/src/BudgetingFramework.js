// src/pages/BudgetingFramework.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BudgetingFramework() {
  const { templateId } = useParams(); // Retrieve the template ID from the URL
  const [solutions, setSolutions] = useState([]);
  const [accordions, setAccordions] = useState([{ id: 1, selectedSolution: '' }]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/budgetingsolutions`)
      .then(response => {
        setSolutions(response.data);
      })
      .catch(error => {
        console.error('Error fetching solutions:', error);
      });
  });

  const handleAccordionAdd = () => {
    setAccordions([...accordions, { id: accordions.length + 1, selectedSolution: '' }]);
  };

  const handleAccordionDelete = (id) => {
    setAccordions(accordions.filter(accordion => accordion.id !== id));
  };

  const handleSolutionChange = (id, value) => {
    setAccordions(accordions.map(accordion =>
      accordion.id === id ? { ...accordion, selectedSolution: value } : accordion
    ));
  };

  return (
    <div>
      <h1>Budgeting Framework</h1>
      {accordions.map((accordion, index) => (
        <div key={accordion.id} className="solution-accordion">
          <select
            value={accordion.selectedSolution}
            onChange={(e) => handleSolutionChange(accordion.id, e.target.value)}
          >
            <option value="">Select a solution</option>
            {solutions.map((solution, idx) => (
              <option key={idx} value={solution}>{solution}</option>
            ))}
          </select>
          <button onClick={() => handleAccordionDelete(accordion.id)}>Delete</button>
        </div>
      ))}
      <button classname="accordion-button" onClick={handleAccordionAdd}>Add Solution Accordion</button>
    </div>
  );
}

export default BudgetingFramework;
