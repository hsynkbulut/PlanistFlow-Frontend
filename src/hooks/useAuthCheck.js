import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

/**
 * Token varlığını ve geçerliliğini kontrol eden özel hook
 * @param {string} redirectTo - Token yoksa yönlendirilecek sayfa
 * @param {boolean} redirectIfFound - Token varsa yönlendirilecek mi? (opsiyonel)
 * @param {string} redirectIfFoundPath - Token varsa yönlendirilecek sayfa (opsiyonel)
 */
export const useAuthCheck = (
  redirectTo = '/login',
  redirectIfFound = false,
  redirectIfFoundPath = '/dashboard'
) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Token durumunu kontrol et
    const checkAuthStatus = () => {
      const isAuthenticated = authService.isAuthenticated();

      if (!isAuthenticated && redirectTo) {
        // Token yoksa belirtilen sayfaya yönlendir
        navigate(redirectTo);
      } else if (isAuthenticated && redirectIfFound) {
        // Token varsa ve redirectIfFound true ise, 
        // redirectIfFoundPath'e yönlendir (örn: login sayfasındaysa dashboard'a yönlendirme)
        navigate(redirectIfFoundPath);
      }

      setLoading(false);
    };

    checkAuthStatus();
  }, [navigate, redirectIfFound, redirectIfFoundPath, redirectTo]);

  return { loading };
};

export default useAuthCheck; 