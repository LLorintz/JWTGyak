import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 const {login,isAuthenticated} = useAuth()

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Bejelentkezési hiba');
      }

      const data = await response.json();
      if (data.success) {
        login(data.token)
        alert('Bejelentkezés sikeres, token elmentve.');
      }
     
    } catch (error) {
      alert('Hiba történt: ' + error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      login(token);
      
    }
  }, [isAuthenticated, login]);

  return (
    <div>
      <input
        type="text"
        placeholder="Felhasználónév"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Jelszó"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Bejelentkezés</button>
    </div>
  );
};
