import React, { useState } from 'react';
import { GeneralContext } from './General.Context';

const GeneralContextProvider = ({ children }) => {
  const [identity, setIdentity] = useState(233456);

  // Define the formatPrice function here
  const formatPrice = (value) => {
    let result = value;

    if (value === 0) {
      return value + ' ICP'; // Assuming you want to keep the "ICP" suffix
    }

    if (value === null) {
      return '';
    }

    if (value >= 1 && value < 10) {
      result = parseFloat(value).toFixed(4);
    } else if (value >= 10 && value <= 200) {
      result = parseFloat(value).toFixed(2);
    } else if (value > 200) {
      result = parseFloat(value).toFixed(0);
    } else {
      let matches = value.toString().match(/0\.(0*?[1-9]{1})(\d{0,2})/);
      result = matches ? matches[0] : value.toString();

      if (/0\.0{4,}/.test(result)) {
        result = result.replace(/0\.0{4,}/, '0.0...0');
      }
    }

    result = result.toLocaleString() + ' ICP';

    return result;
  };

  const formatTotalSupply = (data) => {
    return  Math.round(data.total_supply / Math.pow(10, data.decimals)).toLocaleString();
  }

  const parseTimestampToUnix = (timestampStr) => {
    // Assuming the input format is "YYYY-MM-DD HH:MM:SS" and should be treated as UTC
    // Convert the timestamp string into a format recognized as UTC by JavaScript Date parsing
    const utcTimestampStr = timestampStr.replace(' ', 'T') + 'Z'; // Convert to ISO 8601 format in UTC
    return Math.floor(Date.parse(utcTimestampStr) / 1000);
  };

  const calculatePrecisionAndMinMove = (min) => {
    // Case 1: min >= 1
    if (min >= 1) {
      return { precision: null, minMove: null };
    }
  
    const minStr = min.toString();
    const decimalIndex = minStr.indexOf('.');
  
    if (decimalIndex === -1) {
      // No decimal point found, treat as whole number
      return { precision: null, minMove: null };
    }
  
    // Count digits after decimal point until a non-zero digit is encountered for the second time
    let nonZeroCount = 0;
    let precision = 0; // Initialize precision
    for (let i = decimalIndex + 1; i < minStr.length; i++) {
      if (minStr[i] !== '0') {
        nonZeroCount++;
        if (nonZeroCount === 2) {
          // Include this digit in the count
          precision = i - decimalIndex;
          break;
        }
      }
      if (nonZeroCount < 2) {
        // Continue counting if we haven't hit the second non-zero digit
        precision = i - decimalIndex + 1;
      }
    }
  
    // Calculate minMove
    const minMove = 1 / Math.pow(10, precision);
  
    return { precision, minMove };
  }

  const formatDateBasedOnInterval = (timestamp, interval) => {
    const date = new Date(timestamp * 1000); // Convert UNIX timestamp to milliseconds
  
    // Function to pad numbers to two digits
    const pad = (num) => num.toString().padStart(2, '0');
  
    let formattedDate;
    
    switch (interval) {
      case '1h':
        // Format: YYYY-MM-DD HH:mm (UTC)
        formattedDate = `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} UTC`;
        break;
      case '1d':
        // Format: YYYY-MM-DD (UTC)
        formattedDate = `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} UTC`;
        break;
      case '1w':
        // Format: YYYY-MM-DD (UTC) - adding day of the week if needed could complicate it due to UTC conversion
        formattedDate = `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} UTC`;
        break;
      default:
        // Default to full date and time in UTC
        formattedDate = `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} UTC`;
        break;
    }
  
    return formattedDate;
  };

  const getTokenName = (tokenData) => {
    return tokenData.display_name !== null ? tokenData.display_name : tokenData.name;
  }

  
  const contextValues = {
      identity,
      setIdentity,
      formatPrice,
      formatTotalSupply,
      parseTimestampToUnix,
      calculatePrecisionAndMinMove,
      formatDateBasedOnInterval,
      getTokenName
  }

  return (
    <GeneralContext.Provider value={contextValues}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;