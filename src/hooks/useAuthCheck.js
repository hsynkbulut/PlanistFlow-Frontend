import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export const useAuthCheck = (
  redirectTo = '/login',
  redirectIfFound = false,
  redirectIfFoundPath = '/dashboard'
) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const isAuthenticated = authService.isAuthenticated();

      if (!isAuthenticated && redirectTo) {
        navigate(redirectTo);
      } else if (isAuthenticated && redirectIfFound) {
        navigate(redirectIfFoundPath);
      }

      setLoading(false);
    };

    checkAuthStatus();
  }, [navigate, redirectIfFound, redirectIfFoundPath, redirectTo]);

  return { loading };
};

export default useAuthCheck; 