import React, { useState } from "react";
import {
    Button,
    MenuItem,
    Select,
    IconButton,
    FormControl,
    InputLabel,
    Stepper,
    Step,
    StepLabel,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import './styling/Sync.css';  // Importing the custom CSS

const steps = ["Validate data", "Start sync", "Initiate budgeting"];

const Sync = () => {

  const [activeStep, setActiveStep] = useState(-1)
  const [rows, setRows] = useState([
    { ward: "Ward 23, Padaranayapura", fileName: "" },
    { ward: "Ward 4, Padaranayapura", fileName: "" },
  ]);

  const handleAddMore = () => {
    setRows([...rows, { ward: "", fileName: "" }]);
  };

  const handleChangeWard = (index, event) => {
    const newRows = [...rows];
    newRows[index].ward = event.target.value;
    setRows(newRows);
  };

  const handleFileUpload = (index, event) => {
    const newRows = [...rows];
    newRows[index].fileName = event.target.files[0]?.name || "";
    setRows(newRows);
  };

  const UploadProject = () => {
    return (
        <div className="ward-container">
        {rows.map((row, index) => (
          <div className="ward-row" key={index}>
            <FormControl className="ward-select">
              <InputLabel>Ward</InputLabel>
              <Select
                value={row.ward}
                onChange={(event) => handleChangeWard(index, event)}
              >
                <MenuItem value="Ward 23, Padaranayapura">
                  Ward 23, Padaranayapura
                </MenuItem>
                <MenuItem value="Ward 4, Padaranayapura">
                  Ward 4, Padaranayapura
                </MenuItem>
              </Select>
            </FormControl>

            <Button variant="outlined" className="file-button" component="label">
              {row.fileName ? row.fileName : "View name of file"}
              <input
                type="file"
                hidden
                onChange={(event) => handleFileUpload(index, event)}
              />
            </Button>

            <IconButton className="delete-icon">
              <CloseIcon />
            </IconButton>
          </div>
        ))}

        {/* Add more button */}
        <Button
          startIcon={<AddCircleOutlineIcon />}
          className="add-more-button"
          onClick={handleAddMore}
        >
          Add more
        </Button>
      </div>
    )
  }

  const onClickButton = () => {
    setActiveStep(activeStep + 1)
  }

  return (
    <div className="container">
      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Buttons */}
      <div className="button-container">
        <Button variant="contained" className="validate-button" onClick={onClickButton} endIcon={<ArrowForwardIcon />}>
          {activeStep < 0  ? 'Validate data' : (activeStep === 0 ? 'Start Sync' : 'Initiate Budgeting')}
        </Button>
        <Button variant="outlined" className="cancel-button" startIcon={<CloseIcon />}>
          Cancel
        </Button>
      </div>
    
        { activeStep == 0 && <UploadProject />}
        {activeStep == 1 && (
        <div className="table-container">
          <h3>Data updated: 2 wards</h3>
          <h3>Data blocked: 2 wards</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ward no.</TableCell>
                <TableCell>Previous sync</TableCell>
                <TableCell>Current sync</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Ward 1</TableCell>
                <TableCell>AN_KO_W1_v1</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ward 2</TableCell>
                <TableCell>AN_KO_W2_v1</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ward 3</TableCell>
                <TableCell>AN_KO_W3_v1</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ward 4</TableCell>
                <TableCell>AN_KO_W4_v1</TableCell>
                <TableCell>-</TableCell>
                <TableCell>+2%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ward 23</TableCell>
                <TableCell>-</TableCell>
                <TableCell>AN_KO_W23_v1</TableCell>
                <TableCell>+100%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ward 45</TableCell>
                <TableCell>Blocked</TableCell>
                <TableCell>Blocked</TableCell>
                <TableCell>Blocked</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ward 74</TableCell>
                <TableCell>Blocked</TableCell>
                <TableCell>Blocked</TableCell>
                <TableCell>Blocked</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
      
    </div>
  );
};

export default Sync;
