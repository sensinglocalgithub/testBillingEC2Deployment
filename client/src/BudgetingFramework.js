// src/pages/BudgetingFramework.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Select from "react-select";

import "./App.css";

function BudgetingFramework() {
  const { templateId } = useParams(); // Retrieve the template ID from the URL
  const [solutions, setSolutions] = useState([]);
  const [qualifiers, setQualifiers] = useState([]);
  const [cards, setCards] = useState([{ id: 1, selectedSolution: '' }]); 
  const [isCardOpen, setIsCardOpen] = useState({});
  const [selectedLanduse, setSelectedLanduse] = useState([]);
  const [selectedNorms, setSelectedNorms] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/budgetingsolutions`)
      .then(response => {
        setSolutions(response.data);
      })
      .catch(error => {
        console.error('Error fetching solutions:', error);
      });
  });

  const fetchQualifiers = (templateId) => {
    axios.get(`http://localhost:8000/api/qualifiers/${templateId}`)
      .then(response => {
        setQualifiers(response.data);
      })
      .catch(error => {
        console.error('Error fetching solutions:', error);
      });
  }

  const handleCardToggle = (id) => {
    setIsCardOpen(prevState => ({
      ...prevState,
      [id]: !prevState[id],  // Toggle the state for this card
    }));
  };

  const handleSolutionChange = (id, value) => {
    setCards(cards.map(card => card.id === id ? { ...card, selectedSolution: value } : card));
    fetchQualifiers(templateId);
  };

  const handleCardAdd = () => {
    setCards([...cards, { id: cards.length + 1, selectedSolution: '' }]);
  };

  const handleCardDelete = (id) => {
    setCards(cards.filter(card => card.id !== id));  // Remove the card with the matching id
  };

  const handleLanduseChange = (selectedOptions) => {
    setSelectedLanduse(selectedOptions.map((option) => option.value))
  }

  const handleNormChange = (selectedOptions) => {
    setSelectedNorms(selectedOptions.map((option) => option.value));
  }

  return (
    <div>
      <h1>Budgeting Framework</h1>
      {cards.map(card => (
        <div key={card.id} className="card">
          <div className="card-header" onClick={() => handleCardToggle(card.id)}>
            <span>Select Solution</span>
            <select
              value={card.selectedSolution}
              onChange={(e) => handleSolutionChange(card.id, e.target.value)}
            >
              <option value="">Select a solution</option>
              {solutions.map((solution, idx) => (
                <option key={idx} value={solution}>{solution}</option>
              ))}
            </select>
            <button 
              className="delete-button" 
              onClick={(e) => {
                e.stopPropagation(); // Prevent toggling when clicking delete
                handleCardDelete(card.id);
              }}
            >
              Delete
            </button>
          </div>
          <div className={`card-body ${isCardOpen[card.id] ? 'expanded' : ''}`}>
          {qualifiers.filter((qual) => qual.qualifier_name === "Landuse Applicability").map(qual => (
            <div className="qualifier-row">
              <label>{qual.qualifier_name}: </label>
              <Select 
                isMulti
                options={qual.qualifier_options.map(qoption => ({
                  value: qoption,
                  label: qoption
                }))}
                onChange={(e) => handleLanduseChange(e)}
              />
            </div>
          ))}
          {selectedLanduse.map(landuse => (
            <div className='landuse-qualifiers'>
              <h3>{landuse}</h3>
              {qualifiers.filter((qual) => qual.qualifier_name !== "Landuse Applicability").map(qual => (
                <div className="qualifier-row">
                  <label className='qualifier-name'>{qual.qualifier_name}: </label>
                  {qual.ismultiple ? (
                    <div>
                      {qual.qualifier_name === "Application Norms" ? (
                        <div className='application-norms'>
                          <Select 
                            isMulti
                            options={qual.qualifier_options.map(qoption => ({
                              value: qoption,
                              label: qoption
                            }))}
                            onChange={handleNormChange}
                          />
                            {selectedNorms.map(norm => (
                              <div className='norms'>
                                <span className='norm-name'>{norm}</span>
                                <input className='norm-input' type="text" placeholder={`Input for ${norm}`} />
                              </div>
                            ))}
                        </div>
                      ): (
                    <Select 
                      isMulti
                      options={qual.qualifier_options.map(qoption => ({
                        value: qoption,
                        label: qoption
                      }))}
                    />
                    )}
                    </div>
                  ) : (
                  <div className='qualifier-options'>
                  <Select
                    options=
                      {qual.qualifier_options.map(qoption => ({
                        value: qoption,
                        label: qoption
                      }))}
                    className='qualifier-row-select'
                  />
                  <input className="qualifier-value" type="text"></input>
                  </div>
                  )}
                </div>
              ))}
            </div>
          ))}
          </div>
        </div>
      ))}
      <button className="add-solution-button" onClick={handleCardAdd}>Add Solution</button>
    </div>
  );
}

export default BudgetingFramework;
