import React, { useState } from 'react';

export const ApiHandler: React.FC = () => {
  const [data, setData] = useState<any>(null);

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('JWT');
  
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  
    const response = await fetch(url, { ...options, headers });
    
    // Várjuk a válasz JSON-t
    const result = await response.json();
    console.log(result); // Most a helyes JSON adatot írjuk ki
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return result;
  };

  const handleFetch = async () => {
    try {
      const result = await fetchWithAuth('http://localhost:3000/accounts/johnDoe');
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleFetch}>API hívás</button>
      <pre>{data ? JSON.stringify(data, null, 2) : 'Nincs betöltött adat'}</pre>
    </div>
  );
};
