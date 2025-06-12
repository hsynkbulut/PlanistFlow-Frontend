import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input, Button, Alert } from '../components/ui';
import { FiMail, FiLock, FiLogIn, FiUser, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Kullanıcı adı gerekli';
    }
    
    if (!formData.password) {
      newErrors.password = 'Şifre gerekli';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      setErrorMessage('');
      
      try {
        await login(formData.username, formData.password);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || 
          'Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.'
        );
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  return (
    <div className="login-container">
      <div className="shape-1"></div>
      <div className="shape-2"></div>
      <div className="login-card animate-fadeIn">
        <div className="login-header">
          <div className="login-logo">
            <div className="login-logo-icon">
              <FiCheckCircle className="login-logo-icon-inner" />
            </div>
          </div>
          <h1 className="login-title">Hoş Geldiniz</h1>
          <p className="login-subtitle">Görev yönetimi sistemine giriş yapın</p>
        </div>
        
        {errorMessage && (
          <Alert 
            type="error" 
            message={errorMessage} 
            onClose={() => setErrorMessage('')}
            className="mb-4"
          />
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <Input
              type="text"
              name="username"
              label="Kullanıcı Adı"
              placeholder="Kullanıcı adınızı girin"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              icon={<FiUser />}
              autoComplete="username"
              required
            />
          </div>
          
          <div className="form-group">
            <Input
              type="password"
              name="password"
              label="Şifre"
              placeholder="Şifrenizi girin"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={<FiLock />}
              autoComplete="current-password"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            variant="primary" 
            size="lg"
            isLoading={isLoading}
            fullWidth
            className="login-button mt-4"
            icon={<FiLogIn />}
          >
            Giriş Yap
          </Button>
        </form>
        
        <div className="login-footer">
          <p>Hesabınız yok mu?</p>
          <Link to="/register">
            <Button variant="secondary" fullWidth icon={<FiArrowRight />} className="register-link-button">
              Kayıt Ol
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 