import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import userService from '../services/userService';
import { isTokenExpired } from '../utils/tokenUtils';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        if (authService.isAuthenticated()) {
          const token = authService.getToken();
          if (!isTokenExpired(token)) {
            const userData = await userService.getCurrentUser();
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            authService.logout();
            setIsAuthenticated(false);
            setError('Oturum süreniz doldu. Lütfen tekrar giriş yapın.');
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
        authService.logout();
        setIsAuthenticated(false);
        setError('Oturum kontrolü sırasında bir hata oluştu. Lütfen tekrar giriş yapın.');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login(username, password);
      
      if (response && response.token) {
        const userData = await userService.getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (err) {
      setError('Kullanıcı adı veya şifre hatalı.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.register(userData);
      return response;
    } catch (err) {
      setError('Kayıt işlemi sırasında bir hata oluştu.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 