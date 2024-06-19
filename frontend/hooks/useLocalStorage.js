import { useState } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      return value
        ? JSON.parse(value)
        : localStorage.setItem(key, JSON.stringify(defaultValue));
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });
  const setLocalStorageStateValue = (valueOrFn) => {
    const newValue = typeof valueOrFn === Function ? valueOrFn(localStorageValue) : valueOrFn;
    localStorage.setItem(key, JSON.stringify(newValue));
    setLocalStorageValue(newValue);
  };
  return [localStorageValue, setLocalStorageStateValue];
};

export default useLocalStorage;
