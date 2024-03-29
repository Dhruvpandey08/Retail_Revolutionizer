import React, { useState } from 'react';
import SalesPredictionOutput from './SalesPredictionOutput';
import './Menu.css';

const Menu = () => {
  const [showSalesPrediction, setShowSalesPrediction] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState({});
  const [popupVisible, setPopupVisible] = useState(false); // State to control the visibility of the popup modal

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid file format. Please upload a CSV file.');
    }
  };

  const handlePrediction = async (e) => {
    e.preventDefault();

    if (!csvFile) {
      setErrorMessage('No CSV file selected.');
      return;
    }
    const formData = new FormData();
    formData.append('file', csvFile);

    setLoading(true);

    try {
      const response = await fetch('https://backendserver-pfj1.onrender.com/data', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const jsonString = await response.json();
        const values = JSON.parse(jsonString.data);
        setData(values);
        setShowSalesPrediction(true);
        setPopupVisible(true); // Show the popup modal after data is fetched
      } else {
        setErrorMessage('Prediction request failed.');
      }
    } catch (error) {
      setErrorMessage(`Error during prediction: ${error.message}`);
    } finally {
      setLoading(false);
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
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
      <button onClick={handlePrediction} disabled={loading}>
        Get my Sales Prediction
      </button>
      {loading && <p>Loading...</p>}

      {/* Popup Modal */}
      {popupVisible && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setPopupVisible(false)}>&times;</span>
            <SalesPredictionOutput Data={Data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
