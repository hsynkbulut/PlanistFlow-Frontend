import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services';
import { Button, Input, Alert, Avatar } from '../components/ui';
import { FiUser, FiMail, FiLock, FiEdit, FiKey, FiTrash2, FiSave, FiX, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('view'); 

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const userData = {
        name: formData.name,
        email: formData.email
      };

      const updatedUser = await userService.updateCurrentUser(userData);
      setSuccess('Profil bilgileriniz başarıyla güncellendi.');
      setMode('view');

      window.location.reload(); 
    } catch (err) {
      setError('Profil güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Yeni şifreler eşleşmiyor.');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      setLoading(false);
      return;
    }

    try {
      const passwordData = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      };

      setSuccess('Şifreniz başarıyla değiştirildi.');
      setMode('view');
      
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError('Şifre değiştirilirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Password change error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
      setLoading(true);
      
      try {
        await userService.deleteCurrentUser();
        logout(); 
      } catch (err) {
        setError('Hesap silinirken bir hata oluştu.');
        console.error('Account deletion error:', err);
        setLoading(false);
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profil Bilgilerim</h1>
      </div>

      {success && (
        <Alert 
          type="success" 
          message={success} 
          onClose={() => setSuccess(false)}
          className="mb-4"
        />
      )}
      
      {error && (
        <Alert 
          type="error" 
          message={error} 
          onClose={() => setError(null)}
          className="mb-4" 
        />
      )}

      <div className="profile-content">
        <div className="profile-card">
          {mode === 'view' && (
            <div className="profile-view">
              <div className="profile-details">
                <div className="profile-detail">
                  <FiUser className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Kullanıcı Adı</span>
                    <span className="detail-value">{user?.username || 'hsynkbulut'}</span>
                  </div>
                </div>
                
                <div className="profile-detail">
                  <FiMail className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">E-posta Adresi</span>
                    <span className="detail-value">{user?.email || 'hsyn.kbulut@gmail.com'}</span>
                  </div>
                </div>
                
                <div className="profile-detail">
                  <FiCalendar className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Kayıt Tarihi</span>
                    <span className="detail-value">{new Date().toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}</span>
                  </div>
                </div>
              </div>
              
              <div className="profile-actions">
                <div className="profile-actions-row">
                  <Button 
                    variant="primary" 
                    icon={<FiEdit />}
                    onClick={() => setMode('edit')} 
                    disabled={loading}
                    className="profile-edit-btn"
                  >
                    Profili Düzenle
                  </Button>
                  
                  <Button 
                    variant="info" 
                    icon={<FiKey />}
                    onClick={() => setMode('password')} 
                    disabled={loading}
                    className="profile-password-btn"
                  >
                    Şifre Değiştir
                  </Button>
                </div>
                
                <div className="profile-actions-divider">
                  <span className="divider-text">Tehlikeli İşlemler</span>
                </div>
                
                <Button 
                  variant="danger" 
                  icon={<FiTrash2 />}
                  onClick={handleDeleteAccount} 
                  disabled={loading}
                  className="profile-delete-btn"
                >
                  Hesabı Sil
                </Button>
              </div>
            </div>
          )}
          
          {mode === 'edit' && (
            <div className="profile-edit">
              <h2 className="section-title">Profili Düzenle</h2>
              
              <form onSubmit={handleUpdateProfile}>
                <div className="form-group">
                  <Input
                    type="text"
                    name="name"
                    label="Ad Soyad"
                    placeholder="Adınızı ve soyadınızı girin"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    icon={<FiUser />}
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
                    disabled={loading}
                    icon={<FiMail />}
                    required
                  />
                </div>
                
                <div className="form-actions">
                  <Button 
                    type="button" 
                    variant="light"
                    onClick={() => setMode('view')} 
                    disabled={loading}
                    icon={<FiX />}
                    className="cancel-btn"
                  >
                    İptal
                  </Button>
                  
                  <Button 
                    type="submit" 
                    variant="primary"
                    isLoading={loading}
                    icon={<FiSave />}
                    className="save-btn"
                  >
                    Kaydet
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {mode === 'password' && (
            <div className="profile-password">
              <h2 className="section-title">Şifre Değiştir</h2>
              
              <form onSubmit={handleChangePassword}>
                <div className="form-group">
                  <Input
                    type="password"
                    name="currentPassword"
                    label="Mevcut Şifre"
                    placeholder="Mevcut şifrenizi girin"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    disabled={loading}
                    icon={<FiLock />}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <Input
                    type="password"
                    name="newPassword"
                    label="Yeni Şifre"
                    placeholder="Yeni şifrenizi girin"
                    value={formData.newPassword}
                    onChange={handleChange}
                    disabled={loading}
                    icon={<FiLock />}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <Input
                    type="password"
                    name="confirmPassword"
                    label="Şifre Tekrar"
                    placeholder="Yeni şifrenizi tekrar girin"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    icon={<FiLock />}
                    required
                  />
                </div>
                
                <div className="form-actions">
                  <Button 
                    type="button" 
                    variant="light"
                    onClick={() => setMode('view')} 
                    disabled={loading}
                    icon={<FiX />}
                    className="cancel-btn"
                  >
                    İptal
                  </Button>
                  
                  <Button 
                    type="submit" 
                    variant="primary"
                    isLoading={loading}
                    icon={<FiSave />}
                    className="save-btn"
                  >
                    Kaydet
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 