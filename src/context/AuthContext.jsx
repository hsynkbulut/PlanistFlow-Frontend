import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import userService from '../services/userService';
import { isTokenExpired } from '../utils/tokenUtils';

// Context oluştur
const AuthContext = createContext(null);

// AuthProvider bileşeni
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sayfa yüklendiğinde token varsa kullanıcı bilgilerini al
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        // Token varsa ve geçerliyse, kullanıcı bilgilerini al
        if (authService.isAuthenticated()) {
          // Token'ın süresinin dolup dolmadığını kontrol et
          const token = authService.getToken();
          if (!isTokenExpired(token)) {
            const userData = await userService.getCurrentUser();
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            // Token süresi dolmuşsa çıkış yap
            authService.logout();
            setIsAuthenticated(false);
            setError('Oturum süreniz doldu. Lütfen tekrar giriş yapın.');
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
        // Hata durumunda çıkış yap
        authService.logout();
        setIsAuthenticated(false);
        setError('Oturum kontrolü sırasında bir hata oluştu. Lütfen tekrar giriş yapın.');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Kullanıcı girişi
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

  // Kullanıcı kaydı
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

  // Kullanıcı çıkışı
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Context değerlerini sağla
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

// Custom hook oluştur
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 