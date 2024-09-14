// src/App.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Select, MenuItem, IconButton, Button, Checkbox, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import "./App.css";

function Parameters() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState({});
  const [removedIssues, setRemovedIssues] = useState({}); // To keep track of removed issue types
  const [selectedIssue, setSelectedIssue] = useState({}); // To track selected issue to add back
  const [solutions, setSolutions] = useState({}); // State to store solutions for each issue
  const [selectedSolutions, setSelectedSolutions] = useState({}); // Track selected solutions for each issue

  useEffect(() => {
    axios.get(`http://localhost:8000/api/parameters/${templateId}`)
      .then(response => {
        setCategories(response.data);
        initializeRemovedIssues(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, [templateId]);

  const initializeRemovedIssues = (data) => {
    const initialRemoved = {};
    Object.keys(data).forEach(category => {
      initialRemoved[category] = [];
    });
    setRemovedIssues(initialRemoved);
  };

  const handleRemoveIssueType = (category2, issueType) => {
    setCategories(prevCategories => {
      const updatedIssues = prevCategories[category2].filter(issue => issue !== issueType);
      return { ...prevCategories, [category2]: updatedIssues };
    });
    setRemovedIssues(prevRemoved => ({
      ...prevRemoved,
      [category2]: [...prevRemoved[category2], issueType]
    }));
  };

  const handleAddIssueType = (category2) => {
    if (!selectedIssue[category2]) return; // Don't add if no issue is selected
    setCategories(prevCategories => {
      return { ...prevCategories, [category2]: [...prevCategories[category2], selectedIssue[category2]] };
    });
    setRemovedIssues(prevRemoved => ({
      ...prevRemoved,
      [category2]: prevRemoved[category2].filter(issue => issue !== selectedIssue[category2])
    }));
    setSelectedIssue(prevSelected => ({ ...prevSelected, [category2]: '' })); // Clear the selected issue
  };

  const handleSelectChange = (category2, value) => {
    setSelectedIssue(prevSelected => ({ ...prevSelected, [category2]: value }));
  };

  const fetchSolutions = (issueType) => {
    axios.get(`http://localhost:8000/api/solutions/${issueType}`)
      .then(response => {
        setSolutions(prevSolutions => ({ ...prevSolutions, [issueType]: response.data }));
      })
      .catch(error => {
        console.error('Error fetching solutions:', error);
      });
  };

  const handleSolutionSelect = (issueType, selected, isChecked) => {
      setSelectedSolutions((prevSel) => ({
        ...prevSel,
        [issueType]: isChecked ? [...(Array.isArray(prevSel[issueType]) ? prevSel[issueType]: []), selected] : prevSel[issueType].filter((el) => el !== selected),
    }));
  };

  const handleSubmit = async () => {
    const allSolutions = Object.values(selectedSolutions).flat();
    const uniqueSolutions = [...new Set(allSolutions)];
    try {
      const response = await axios.post('http://localhost:8000/api/post-solutions', {
        solutions: uniqueSolutions,
        templateid: templateId
      }
      );
      if (response.status === 200) {
        alert('Solutions submitted successfully!');
        navigate(`/budgeting-framework/${templateId}`);
      } else {
        alert('Failed to submit solutions');
      }
    } catch (error) {
      console.error('Error submitting solutions:', error);
      alert('An error occurred while submitting solutions');
    }
    //console.log(Object.keys(selectedSolutions));
    //navigate(`/budgeting-framework/${templateId}`);
  };

  return (
    <div className="container">
      {Object.entries(categories).map(([category2, issueTypes]) => (
        <Accordion key={category2}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{category2}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {issueTypes.map(issueType => (
              <div key={issueType} className="issue-type-container">
                <Select 
                  value={issueType} 
                  className="issue-type-dropdown"  
                  onOpen={() => fetchSolutions(issueType)}
                >
                  <MenuItem value={issueType} className="menu-item">
                    {issueType}
                  </MenuItem>
                </Select>
                <IconButton onClick={() => handleRemoveIssueType(category2, issueType)}>
                  <DeleteIcon />
                </IconButton>
                {solutions[issueType] && (
                  <Select
                    multiple
                    value={selectedSolutions[issueType] || []}
                    renderValue={(selected) => selected.join(', ')}
                    className="solution-multiselect"
                  >
                    {Object.entries(solutions[issueType]).map(([issue, sols]) => 
                    <div>
                      {sols.map(sol => (
                        <MenuItem key={sol.solution_fid} value={sol.solution_name}>
                        <input type="checkbox" checked={selectedSolutions[issue]?.includes(sol.solution_name) || false} value={sol.solution_name} onChange={(e) => handleSolutionSelect(issue, e.target.value, e.target.checked)}/>
                        <ListItemText primary={sol.solution_name} />
                      </MenuItem>
                      ))}
                    </div>
                    )}
                  </Select>
                )}
              </div>
            ))}
            {/* Show dropdown with removed issues for re-adding */}
            {removedIssues[category2] && removedIssues[category2].length > 0 && (
              <div className="add-issue-container">
                <Select
                  value={selectedIssue[category2] || ""}
                  onChange={(e) => handleSelectChange(category2, e.target.value)}
                  displayEmpty
                  className="add-issue-dropdown"
                >
                  <MenuItem value="" disabled>Select issue to add back</MenuItem>
                  {removedIssues[category2].map(issue => (
                    <MenuItem key={issue} value={issue}>
                      {issue}
                    </MenuItem>
                  ))}
                </Select>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleAddIssueType(category2)}
                  className="add-issue-button"
                  startIcon={<AddIcon />}
                  disabled={!selectedIssue[category2]} // Disable button if no issue is selected
                >
                  Add
                </Button>
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
      <button className="view" onClick={handleSubmit}>Submit</button>
    </div>
  );
}
export default Parameters;