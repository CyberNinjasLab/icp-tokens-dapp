import { useState } from 'react';

const useLocalStorage = (key, defaultTo) => {
  // Retrieve the value from local storage or use the default value
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : defaultTo;

  // State to hold the current value
  const [value, setValue] = useState(initial);

  // Update local storage and state when the value changes
  const updateValue = newValue => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, updateValue];
};

export default useLocalStorage;
