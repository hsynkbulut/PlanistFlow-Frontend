import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input, Button, Alert } from '../components/ui';
import { FiUser, FiMail, FiLock, FiUserPlus, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const { register, isAuthenticated } = useAuth();
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
    } else if (formData.username.length < 3) {
      newErrors.username = 'Kullanıcı adı en az 3 karakter olmalıdır';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta adresi gerekli';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }
    
    if (!formData.password) {
      newErrors.password = 'Şifre gerekli';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifre onayı gerekli';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
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
        await register(formData.username, formData.email, formData.password);
        setRegistered(true);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || 
          'Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.'
        );
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  if (registered) {
    return (
      <div className="register-container">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="register-card animate-fadeIn">
          <div className="register-success">
            <div className="success-icon">
              <FiCheckCircle />
            </div>
            <h2>Kayıt Başarılı!</h2>
            <p>Hesabınız başarıyla oluşturuldu. Şimdi giriş yapabilirsiniz.</p>
            <Link to="/login">
              <Button variant="primary" fullWidth className="success-button mt-3">
                Giriş Sayfasına Git
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="register-container">
      <div className="shape-1"></div>
      <div className="shape-2"></div>
      <div className="register-card animate-fadeIn">
        <div className="register-header">
          <div className="register-logo">
            <div className="register-logo-icon">
              <FiCheckCircle className="register-logo-icon-inner" />
            </div>
          </div>
          <h1 className="register-title">Hesap Oluştur</h1>
          <p className="register-subtitle">Görev yönetimi sistemine kaydolun</p>
        </div>
        
        {errorMessage && (
          <Alert 
            type="error" 
            message={errorMessage} 
            onClose={() => setErrorMessage('')}
            className="mb-4"
          />
        )}
        
        <form onSubmit={handleSubmit} className="register-form">
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
              type="email"
              name="email"
              label="E-posta Adresi"
              placeholder="E-posta adresinizi girin"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={<FiMail />}
              autoComplete="email"
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
              autoComplete="new-password"
              required
            />
          </div>
          
          <div className="form-group">
            <Input
              type="password"
              name="confirmPassword"
              label="Şifre Onayı"
              placeholder="Şifrenizi tekrar girin"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              icon={<FiLock />}
              autoComplete="new-password"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            variant="primary" 
            size="lg"
            isLoading={isLoading}
            fullWidth
            className="register-button mt-4"
            icon={<FiUserPlus />}
          >
            Kayıt Ol
          </Button>
        </form>
        
        <div className="register-footer">
          <p>Zaten bir hesabınız var mı?</p>
          <Link to="/login">
            <Button variant="secondary" fullWidth icon={<FiArrowLeft />} className="login-link-button">
              Giriş Yap
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 