import React, { useEffect, useState } from 'react';
import { GeneralContext } from './General.Context';

const GeneralContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState('usd'); // Default currency is USD
  const [theme, setTheme] = useState('light');  // Default to light

  useEffect(() => {
      // Check local storage for theme
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
          setTheme(storedTheme);
      }
  }, []);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const toggleTheme = () => {
    const newValue = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newValue);
    setTheme(newValue);
  };

  useEffect(() => {
    // Set the class on the <html> element based on the theme
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [theme]);

  // Define the formatPrice function here
  const formatPrice = value => {
    let result = value;

    if (value === 0) {
      return showPriceCurrency(value); // Assuming you want to keep the "ICP" suffix
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
      const matches = value.toString().match(/0\.(0*?[1-9]{1})(\d{0,2})/);
      result = matches ? matches[0] : value.toString();

      if (/0\.0{4,}/.test(result)) {
        result = result.replace(/0\.0{4,}/, '0.0...0');
      }
    }

    result = showPriceCurrency(result.toLocaleString());

    return result;
  };

  const showPriceCurrency = (price, hardcodedCurrency = null) => {
    if(!hardcodedCurrency) {
      hardcodedCurrency = currency;
    }

    let priceAndCurrency = price;

    switch(hardcodedCurrency.toLowerCase()) {
      case 'icp':
        priceAndCurrency = price + ' ICP';
        break;
      case 'usd':
        priceAndCurrency = '$' + price;
        break;
    }

    return priceAndCurrency;
  }

  function roundPrice(price, toLocaleString = true) {
      const absolutePrice = Math.abs(price); // Use absolute value for comparison
      let roundedPrice;

      if (absolutePrice >= 1000) {
          roundedPrice = price.toFixed(0);
      } else if (absolutePrice >= 10) {
          roundedPrice = price.toFixed(1);
      } else if (absolutePrice >= 1) {
          roundedPrice = price.toFixed(2);
      } else if (absolutePrice >= 0.1) {
          roundedPrice = price.toFixed(2);
      } else if (absolutePrice >= 0.01) {
          roundedPrice = price.toFixed(3);
      } else if (absolutePrice >= 0.001) {
          roundedPrice = price.toFixed(4);
      } else if (absolutePrice >= 0.0001) {
          roundedPrice = price.toFixed(5);
      } else if (absolutePrice >= 0.00001) {
          roundedPrice = price.toFixed(6);
      } else if (absolutePrice >= 0.000001) {
          roundedPrice = price.toFixed(7);
      } else {
          return price.toString(); // For very small numbers, return the full string of the original price
      }

      roundedPrice = parseFloat(roundedPrice); // Removes trailing zeros and retains the sign
      
      return toLocaleString && absolutePrice > 10 ? roundedPrice.toLocaleString() : roundedPrice; 
  }

  const formatTotalSupply = (data) => {
    return  Math.round(data.total_supply / Math.pow(10, data.decimals)).toLocaleString();
  }
  const parseTimestampToUnix = (timestampStr) => {
    // Assuming the input format is "YYYY-MM-DD HH:MM:SS" and should be treated as UTC
    // Convert the timestamp string into a format recognized as UTC by JavaScript Date parsing
    const utcTimestampStr = timestampStr.replace(' ', 'T') + 'Z'; // Convert to ISO 8601 format in UTC
    return Math.floor(Date.parse(utcTimestampStr) / 1000);
  };

  const calculatePrecisionAndMinMove = min => {
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
  };

  function prepareChartData(data) {
    // Sort data by time in ascending order
    const sortedData = data.sort((a, b) => a.time - b.time);
  
    // Remove duplicates based on time
    const uniqueData = sortedData.filter((value, index, self) => 
      index === 0 || value.time !== self[index - 1].time
    );
  
    return uniqueData;
  }

  function formatUnixTimestampToDate(timestampBigInt, short = false) {
      // Convert BigInt to a number, ensuring compatibility with date operations
      const timestamp = Number(timestampBigInt);
    
      // Create a date object from the Unix timestamp (converted to milliseconds)
      const date = new Date(timestamp * 1000);
    
      if (short) {
          // Define formatting options for the short date format
          const shortDateOptions = {
              month: 'short', // Abbreviated month name
              day: 'numeric', // Numeric day
              year: '2-digit', // 2-digit year
              hour: 'numeric', // Numeric hour
              minute: 'numeric', // Numeric minute
              hour12: true // Use 12-hour time format
          };

          return date.toLocaleString('en-US', shortDateOptions);
      } else {
          // Define formatting options for the regular date format
          const regularDateOptions = {
              month: 'long', // Full name of the month
              day: 'numeric', // Numeric day
              year: 'numeric', // Numeric year
              hour: 'numeric', // Numeric hour
              minute: 'numeric', // Numeric minute
              hour12: true // Use 12-hour time format
          };

          return date.toLocaleString('en-US', regularDateOptions);
      }
  }

  const formatDateBasedOnInterval = (timestamp, interval) => {
    const date = new Date(timestamp * 1000); // Convert UNIX timestamp to milliseconds

    // Function to pad numbers to two digits
    const pad = num => num.toString().padStart(2, '0');

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

  const getTokenName = tokenData => {
    return tokenData.display_name !== null
      ? tokenData.display_name
      : tokenData.name;
  };

  function parseTokensByCanisterId(tokenArray) {
    const parsedTokens = {};
  
    tokenArray.forEach(token => {
      const { canister_id } = token;  // Extract canister_id for use as key
      parsedTokens[canister_id] = { ...token };  // Copy entire token object including canister_id
    });
  
    return parsedTokens;
  }

  const contextValues = {
      currency,
      theme,
      toggleTheme,
      setCurrency,
      showPriceCurrency,
      formatPrice,
      formatTotalSupply,
      roundPrice,
      parseTimestampToUnix,
      calculatePrecisionAndMinMove,
      formatDateBasedOnInterval,
      formatUnixTimestampToDate,
      getTokenName,
      parseTokensByCanisterId,
      prepareChartData,
  }

  return (
    <GeneralContext.Provider value={contextValues}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
