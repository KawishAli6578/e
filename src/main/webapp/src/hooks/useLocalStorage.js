import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

const parsableValue = (data) => {
  try {
    const parsedValue = JSON.parse(data);
    return parsedValue;
  } catch (err) {
    return data;
  }
};

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null;

    return storedValue === null ? defaultValue : parsableValue(storedValue);
  });

  useEffect(() => {
    const listener = (e) => {
      if (typeof window !== 'undefined' && e.storageArea === localStorage && e.key === key) {
        setValue(e.newValue ? parsableValue(e.newValue) : e.newValue);
      }
    };
    window.addEventListener('storage', listener);

    return () => {
      window.removeEventListener('storage', listener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage = (newValue) => {
    setValue((currentValue) => {
      const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;
      if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(result));
      return result;
    });
  };

  return [value, setValueInLocalStorage];
}
