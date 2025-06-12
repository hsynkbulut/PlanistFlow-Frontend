import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Korumalı rotalar için bileşen
const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Kimlik doğrulama durumu yükleniyorsa yükleniyor mesajı göster
  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute; 