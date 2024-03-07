import React, { useState } from 'react';
import './Menu.css'; 


const Menu = () => {
  var formData = new FormData()
  const [csvFile, setCsvFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
    } else {
      console.log('Invalid file format. Please upload a CSV file.');
    }
  };

  async function handlePrediction (e){
      e.preventDefault();
      formData.append("file",csvFile)
      console.log(formData)
      const response =  await fetch('https://backendserver-pfj1.onrender.com/data',{
      method: 'POST',
      body: formData
      })
      const data=await response.json()
      console.log(data)
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
