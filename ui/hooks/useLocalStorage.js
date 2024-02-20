import { useState } from 'react';

const useLocalStorage = (key, defaultTo) => {
  // Check if localStorage is available
  const isLocalStorageAvailable =
    typeof window !== 'undefined' && window.localStorage;

  // Retrieve the value from local storage or use the default value
  const storedValue = isLocalStorageAvailable
    ? localStorage.getItem(key)
    : null;
  const initial =
    storedValue === 'undefined' || storedValue === null
      ? defaultTo
      : JSON.parse(storedValue);

  // State to hold the current value
  const [value, setValue] = useState(initial);

  // Update local storage and state when the value changes
  const updateValue = newValue => {
    if (isLocalStorageAvailable) {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
    setValue(newValue);
  };

  return [value, updateValue];
};

export default useLocalStorage;
