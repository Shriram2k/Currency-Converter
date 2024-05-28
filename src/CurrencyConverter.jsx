import React, { useEffect, useState } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState({});

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        let url = `https://v6.exchangerate-api.com/v6/5e0d981b4e16354e96c00ee6/latest/${fromCurrency}`;
        const response = await axios.get(url);
        setExchangeRate(response.data.conversion_rates[toCurrency]);
      } catch (error) {
        console.error("Error Fetching exchange rates:", error);
      }
    };
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  const amountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };
  const handleFromCurrency = (e) => {
    setFromCurrency(e.target.value);
  };
  const handleToCurrency = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="box"></div>
        <div className="data">
          <h1>Currency Converter</h1>
        </div>
        <div className="input-container">
          <label htmlFor="amount" id="amt">
            Amount:
          </label>
          <input type="number" value={amount} onChange={amountChange} />
          <br />
          <br />
          <label htmlFor="fromCurrency">From Currency:</label>
          <select
            name="fromCurrency"
            value={fromCurrency}
            onChange={handleFromCurrency}
          >
            <option value="USD">USD - United States Dollars</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japaness Yen</option>
            <option value="AUD">AUD - Australian Dollars</option>
            <option value="CAD">CAD - Canadian Dollars</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="toCurrency">To Currency:</label>
          <select
            name="toCurrency"
            value={toCurrency}
            onChange={handleToCurrency}
          >
            <option value="USD">USD - United States Dollars</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japaness Yen</option>
            <option value="AUD">AUD - Australian Dollars</option>
            <option value="CAD">CAD - Canadian Dollars</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
        </div>
        <div className="result">
          <p>
            {" "}
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}{" "}
          </p>
          <footer>Designed by <a href="https://www.instagram.com/shriramkrishnan" >Shriram</a></footer>
        </div>
      </div>
      
    </>
  );
};

export default CurrencyConverter;
