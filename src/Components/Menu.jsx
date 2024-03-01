import React, { useState } from 'react';
import './Menu.css'; 


const Menu = () => {
  const [csvFile, setCsvFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
    } else {
      console.log('Invalid file format. Please upload a CSV file.');
    }
  };

  const handlePrediction = () => {
    if (csvFile) {
        console.log('CSV File:', csvFile);
      alert('Prediction Logic: Replace this with your ML prediction logic');
    } else {
      console.log('No CSV file selected.');
    }
  };

  return (
    <div className="menu">
      <h1>Weekly Sales Prediction Menu</h1>
      <div className="file-input">
        <label htmlFor="csvFile">Upload your sales CSV File Here:</label>
        <input
          type="file"
          id="csvFile"
          accept=".csv"
          onChange={handleFileChange}
        />
      </div>
      <button onClick={handlePrediction}>Get my Sales Prediction</button>
    </div>
  );
};

export default Menu;
