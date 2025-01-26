import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // useAuth hook importálása

const requireAuth = (ComposedComponent: React.ComponentType<any>) => {
  return () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); // useAuth hook használata

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/');
      }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
      return null;
    }

    return <ComposedComponent />;
  };
};

export default requireAuth;