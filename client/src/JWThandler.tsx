import { useState } from "react";
import {jwtDecode, JwtPayload } from 'jwt-decode';



export const JwtHandler: React.FC = () => {
 
  const [jwt, setJwt] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<JwtPayload | null>(null);
  const [status, setStatus] = useState<string>('');

  const handleSaveJWT = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'johnDoe', password: 'password' }),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        localStorage.setItem('JWT', data.token);
  
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error fetching JWT:', error);
    }
  };

  const handleLoadJWT = () => {
    const savedJwt = localStorage.getItem('JWT');
    setJwt(savedJwt);
  };

  const decodeJwt = () => {
    const token = localStorage.getItem('JWT');
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      setDecodedToken(decoded);
    } else {
      alert('Nincs elmentett token!');
    }
  };

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true;
  
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem('JWT');
    if (token && !isTokenExpired(token)) {
      setStatus('A token érvényes.');
    } else {
      setStatus('A token lejárt.');
    }
  };

  

  return (
    <div>
      <button onClick={handleSaveJWT}>JWT mentése</button>
      <button onClick={handleLoadJWT}>JWT betöltése</button>
      <button onClick={decodeJwt}>JWT dekódolása</button>
      <button onClick={checkTokenExpiration}>Token lejáratának ellenőrzése</button>
      <p>{jwt && jwt}</p>    
      <pre>{decodedToken ? JSON.stringify(decodedToken, null, 2) : 'Nincs dekódolt JWT'}</pre>
      <p>{status}</p>
    </div>
  );
};
