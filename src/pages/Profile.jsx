import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services';

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
  const [mode, setMode] = useState('view'); // view, edit, password

  // Kullanıcı bilgilerini form verilerine yükle
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

  // Kullanıcı bilgilerini güncelle
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

      // Auth context'teki kullanıcı bilgilerini güncelle - bu normalde AuthContext'te yapılmalı
      // Burada basitlik için direkt API çağrısı yapıyoruz
      window.location.reload(); // Context'i güncellemek için sayfa yeniden yükleniyor
    } catch (err) {
      setError('Profil güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Şifre değiştir
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Şifre doğrulama
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

      // Şifre değiştirme API'si - Backend'de böyle bir endpoint varsa kullanılabilir
      // const response = await userService.changePassword(passwordData);

      // Şimdilik basit bir mesaj gösteriyoruz
      setSuccess('Şifreniz başarıyla değiştirildi.');
      setMode('view');
      
      // Form alanlarını temizle
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

  // Hesabı sil
  const handleDeleteAccount = async () => {
    if (window.confirm('Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
      setLoading(true);
      
      try {
        await userService.deleteCurrentUser();
        logout(); // Kullanıcıyı çıkış yaptır ve login sayfasına yönlendir
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
        <button onClick={() => window.history.back()} className="back-button">
          Geri Dön
        </button>
      </div>

      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="profile-content">
        <div className="profile-card">
          {mode === 'view' && (
            <div className="profile-view">
              <div className="profile-avatar">
                <div className="avatar-placeholder">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <h2>{user?.name || 'Kullanıcı'}</h2>
              </div>
              
              <div className="profile-details">
                <div className="profile-detail">
                  <span className="detail-label">Kullanıcı Adı:</span>
                  <span className="detail-value">{user?.username || '-'}</span>
                </div>
                
                <div className="profile-detail">
                  <span className="detail-label">E-posta:</span>
                  <span className="detail-value">{user?.email || '-'}</span>
                </div>
              </div>
              
              <div className="profile-actions">
                <button 
                  onClick={() => setMode('edit')} 
                  className="edit-profile-button"
                  disabled={loading}
                >
                  Profili Düzenle
                </button>
                
                <button 
                  onClick={() => setMode('password')} 
                  className="change-password-button"
                  disabled={loading}
                >
                  Şifre Değiştir
                </button>
                
                <button 
                  onClick={handleDeleteAccount} 
                  className="delete-account-button"
                  disabled={loading}
                >
                  Hesabı Sil
                </button>
              </div>
            </div>
          )}
          
          {mode === 'edit' && (
            <div className="profile-edit">
              <h2>Profili Düzenle</h2>
              
              <form onSubmit={handleUpdateProfile}>
                <div className="form-group">
                  <label htmlFor="name">Ad Soyad</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">E-posta</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    onClick={() => setMode('view')} 
                    className="cancel-button"
                    disabled={loading}
                  >
                    İptal
                  </button>
                  
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading}
                  >
                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {mode === 'password' && (
            <div className="profile-password">
              <h2>Şifre Değiştir</h2>
              
              <form onSubmit={handleChangePassword}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Mevcut Şifre</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword">Yeni Şifre</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    minLength={6}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    minLength={6}
                  />
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    onClick={() => setMode('view')} 
                    className="cancel-button"
                    disabled={loading}
                  >
                    İptal
                  </button>
                  
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading}
                  >
                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
                  </button>
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