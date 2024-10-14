// src/pages/Template.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './App.css'

function Template() {
  const [city, setCity] = useState('');
  const [templateId, setTemplateId] = useState('');
  const navigate = useNavigate();
  const tableData = [
    { siNo: 1, templateId: 'Template1', lastModified: '10/10/2024', signOffBy: 'System', mappedToCity: 'Bengaluru' },
    { siNo: 2, templateId: 'Template2', lastModified: '07/10/2024', signOffBy: 'System', mappedToCity: 'Kochi' },
  ];

  const handleViewEditClick = () => {
    if (templateId) {
      // Navigate to the Parameters page with the template ID in the route
      navigate(`/parameters/${templateId}`);
    } else {
      alert('Please select a template.');
    }
  };

  return (
    <div className='container'>
      <label>
        Select City:
        <select className='templateselect' value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select City</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Kochi">Kochi</option>
          {/* Add more cities as needed */}
        </select>
      </label>
      <div className='template-container-parent'>
        <div className="template-container">
        <button className="view" onClick={handleViewEditClick}>View / Set Up Template</button>
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
        </div>
        <div className="template-container">
          <button className="view">Initiate Budgeting</button>
        </div>
      </div>
      <div className='template-table'>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>SI No.</TableCell>
            <TableCell>Template ID</TableCell>
            <TableCell>Last Modified</TableCell>
            <TableCell>Sign off by</TableCell>
            <TableCell>Mapped to City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.siNo}>
              <TableCell>{row.siNo}</TableCell>
              <TableCell>{row.templateId}</TableCell>
              <TableCell>{row.lastModified}</TableCell>
              <TableCell>{row.signOffBy}</TableCell>
              <TableCell>{row.mappedToCity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </div>
  );
}

export default Template;
