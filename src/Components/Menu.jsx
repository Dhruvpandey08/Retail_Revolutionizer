import React, { useState } from 'react';
import './Menu.css';

const Menu = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [Data,SetData] =  useState({})    


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid file format. Please upload a CSV file.');
    }
  };
  

  async function handlePrediction(e) {
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
      if (response.ok) 
      {
        const jsonString = await response.json();
        let values=jsonString.data;
        values = JSON.parse(values);
        SetData(values)
        console.log(values)
          for (const productName in values) {
            if (values.hasOwnProperty(productName)) {
                const product = values[productName];
                // console.log(productName);
                // console.log("   Old values:");
                // product.OldValue.forEach(value => console.log(`      ${value}`));
                // console.log("   New values (except null):");
                product.NewValue.forEach(value => {
                    if (value !== "null") {
                        // console.log(`      ${value}`);
                    }
            });
          }
        } 
      // console.log('Prediction data:', jsonString);
      } 
      else 
      {
        setErrorMessage('Prediction request failed.');
        // console.error('Prediction request failed.');
      }
    } catch (error) {
      setErrorMessage(`Error during prediction: ${error.message}`);
      // console.error('Error during prediction:', error);
    }
    finally {
      setLoading(false);
    }
  }

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
      <button onClick={handlePrediction} disabled={loading}>Get my Sales Prediction</button>
      {loading && <p>Loading...</p>}

      {!loading && Object.keys(Data).length > 0 ? (
        <>
          {Object.entries(Data).map(([productName, product]) => (
            <div key={productName}>
              <h2>{productName}</h2>
              <div className="new-values">
                {product.NewValue && product.NewValue.length > 0 ? (
                  product.NewValue
                    .filter(value => value !== 'null')
                    .map((value, index) => <span key={index}>{value} </span>)
                ) : (
                  <div>No new values found for this product.</div>
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>No data available</div>
      )}



    </div>
  );
};

export default Menu;

//Testing Purpose