import { useState } from 'react';
import { Link } from 'react-router-dom';

const Help = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  // Yardım içeriği bölümlerini değiştirmek için
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="help-container">
      <div className="help-header">
        <h1>Yardım ve Kullanım Kılavuzu</h1>
        <Link to="/dashboard" className="back-link">
          Görevlere Dön
        </Link>
      </div>

      <div className="help-content">
        <div className="help-sidebar">
          <h3>İçindekiler</h3>
          <ul className="help-menu">
            <li 
              className={activeSection === 'getting-started' ? 'active' : ''}
              onClick={() => handleSectionChange('getting-started')}
            >
              Başlangıç
            </li>
            <li 
              className={activeSection === 'tasks' ? 'active' : ''}
              onClick={() => handleSectionChange('tasks')}
            >
              Görev Yönetimi
            </li>
            <li 
              className={activeSection === 'account' ? 'active' : ''}
              onClick={() => handleSectionChange('account')}
            >
              Hesap Yönetimi
            </li>
            <li 
              className={activeSection === 'statistics' ? 'active' : ''}
              onClick={() => handleSectionChange('statistics')}
            >
              İstatistikler
            </li>
            <li 
              className={activeSection === 'faq' ? 'active' : ''}
              onClick={() => handleSectionChange('faq')}
            >
              Sık Sorulan Sorular
            </li>
          </ul>
        </div>

        <div className="help-main">
          {activeSection === 'getting-started' && (
            <div className="help-section">
              <h2>Başlangıç</h2>
              <p>Görev Yönetim uygulamamıza hoş geldiniz! Bu uygulama ile görevlerinizi kolayca takip edebilir, düzenleyebilir ve organize edebilirsiniz.</p>
              
              <h3>Hızlı Başlangıç Adımları</h3>
              <ol>
                <li>
                  <strong>Kayıt Olma:</strong> Uygulamayı kullanmak için önce kayıt olun veya giriş yapın.
                </li>
                <li>
                  <strong>Görev Ekleme:</strong> Dashboard üzerindeki "Yeni Görev Ekle" butonunu kullanarak yeni görevler oluşturun.
                </li>
                <li>
                  <strong>Görevleri Düzenleme:</strong> Görev kartlarındaki düzenleme simgesine tıklayarak görevlerinizi güncelleyin.
                </li>
                <li>
                  <strong>Görevleri Tamamlama:</strong> Görevleri tamamladığınızda, görev kartındaki onay kutusunu işaretleyin.
                </li>
                <li>
                  <strong>Görevleri Filtreleme:</strong> Filtreleme seçeneklerini kullanarak istediğiniz görevleri kolayca bulun.
                </li>
              </ol>
            </div>
          )}

          {activeSection === 'tasks' && (
            <div className="help-section">
              <h2>Görev Yönetimi</h2>
              
              <h3>Görev Ekleme</h3>
              <p>Yeni bir görev eklemek için:</p>
              <ol>
                <li>Dashboard sayfasındaki "Yeni Görev Ekle" butonuna tıklayın.</li>
                <li>Görev başlığı ve açıklamasını girin.</li>
                <li>Gerekli bilgileri doldurduktan sonra "Kaydet" butonuna tıklayın.</li>
              </ol>
              
              <h3>Görev Düzenleme</h3>
              <p>Mevcut bir görevi düzenlemek için:</p>
              <ol>
                <li>Düzenlemek istediğiniz görevin sağ üst köşesindeki düzenleme simgesine tıklayın.</li>
                <li>Değiştirmek istediğiniz bilgileri güncelleyin.</li>
                <li>Değişiklikleri kaydetmek için "Güncelle" butonuna tıklayın.</li>
              </ol>
              
              <h3>Görev Tamamlama</h3>
              <p>Bir görevi tamamlandı olarak işaretlemek için, görev kartındaki onay kutusunu işaretleyin. Tamamlanan görevler farklı bir şekilde görüntülenir.</p>
              
              <h3>Görev Silme</h3>
              <p>Bir görevi silmek için:</p>
              <ol>
                <li>Silmek istediğiniz görevin sağ üst köşesindeki silme simgesine tıklayın.</li>
                <li>Onay mesajında "Evet, Sil" butonuna tıklayın.</li>
              </ol>
              
              <h3>Görevleri Filtreleme ve Sıralama</h3>
              <p>Görevlerinizi filtrelemek ve sıralamak için:</p>
              <ul>
                <li>Durum filtreleme: Tamamlanan, yapılacak veya tüm görevleri görüntüleyin.</li>
                <li>Metin araması: İstediğiniz metni içeren görevleri bulun.</li>
                <li>Sıralama: Görevlerinizi başlık, açıklama veya durum bazında sıralayın.</li>
              </ul>
            </div>
          )}

          {activeSection === 'account' && (
            <div className="help-section">
              <h2>Hesap Yönetimi</h2>
              
              <h3>Profil Bilgilerini Görüntüleme</h3>
              <p>Profil bilgilerinizi görüntülemek için, üst menüde "Profil" butonuna tıklayın.</p>
              
              <h3>Profil Düzenleme</h3>
              <p>Profil bilgilerinizi düzenlemek için:</p>
              <ol>
                <li>Profil sayfasına gidin.</li>
                <li>"Profili Düzenle" butonuna tıklayın.</li>
                <li>İsim, e-posta gibi bilgilerinizi güncelleyin.</li>
                <li>Değişiklikleri kaydetmek için "Güncelle" butonuna tıklayın.</li>
              </ol>
              
              <h3>Şifre Değiştirme</h3>
              <p>Şifrenizi değiştirmek için:</p>
              <ol>
                <li>Profil sayfasına gidin.</li>
                <li>"Şifre Değiştir" bölümüne geçin.</li>
                <li>Mevcut şifrenizi ve yeni şifrenizi girin.</li>
                <li>"Şifreyi Güncelle" butonuna tıklayın.</li>
              </ol>
              
              <h3>Hesap Silme</h3>
              <p>Hesabınızı silmek için:</p>
              <ol>
                <li>Profil sayfasına gidin.</li>
                <li>"Hesabı Sil" bölümüne geçin.</li>
                <li>Hesabınızı silmek istediğinizi onaylamak için şifrenizi girin.</li>
                <li>"Hesabı Sil" butonuna tıklayın.</li>
              </ol>
              <p className="warning-text">Dikkat: Hesap silme işlemi geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir.</p>
            </div>
          )}

          {activeSection === 'statistics' && (
            <div className="help-section">
              <h2>İstatistikler</h2>
              
              <p>İstatistikler sayfası, görevlerinizle ilgili genel bir bakış sunar.</p>
              
              <h3>İstatistik Türleri</h3>
              <ul>
                <li><strong>Toplam Görev:</strong> Sahip olduğunuz toplam görev sayısı.</li>
                <li><strong>Tamamlanan:</strong> Tamamladığınız görevlerin sayısı.</li>
                <li><strong>Bekleyen:</strong> Henüz tamamlanmamış görevlerin sayısı.</li>
                <li><strong>Son 7 Gün:</strong> Son bir hafta içinde eklenen görevlerin sayısı.</li>
              </ul>
              
              <h3>Grafikler</h3>
              <p>İstatistikler sayfasında, görevlerinizin durumunu gösteren grafikler bulunur:</p>
              <ul>
                <li><strong>Tamamlanma Oranı:</strong> Tamamlanan görevlerin toplam görevlere oranını gösterir.</li>
                <li><strong>Görev Dağılımı:</strong> Tamamlanan ve bekleyen görevlerin dağılımını görsel olarak gösterir.</li>
              </ul>
              
              <h3>İpuçları</h3>
              <p>İstatistikler sayfasında, verimlilik ve görev yönetimi konusunda size özel ipuçları bulunur. Bu ipuçları, görev tamamlama oranınıza göre kişiselleştirilir.</p>
            </div>
          )}

          {activeSection === 'faq' && (
            <div className="help-section">
              <h2>Sık Sorulan Sorular</h2>
              
              <div className="faq-item">
                <h3>Şifremi unuttum, ne yapabilirim?</h3>
                <p>Giriş sayfasındaki "Şifremi Unuttum" bağlantısına tıklayarak şifre sıfırlama işlemini başlatabilirsiniz. E-posta adresinize bir sıfırlama bağlantısı gönderilecektir.</p>
              </div>
              
              <div className="faq-item">
                <h3>Görevlerim otomatik olarak kaydediliyor mu?</h3>
                <p>Hayır, görevlerinizde yaptığınız değişiklikleri kaydetmek için mutlaka "Kaydet" veya "Güncelle" butonlarına tıklamanız gerekir.</p>
              </div>
              
              <div className="faq-item">
                <h3>Silinen görevleri geri alabilir miyim?</h3>
                <p>Hayır, silinen görevler kalıcı olarak silinir ve geri alınamaz. Bir görevi silmeden önce emin olun.</p>
              </div>
              
              <div className="faq-item">
                <h3>Görevlerime başka cihazlardan erişebilir miyim?</h3>
                <p>Evet, hesabınızla herhangi bir cihazdan uygulamaya giriş yaparak görevlerinize erişebilirsiniz.</p>
              </div>
              
              <div className="faq-item">
                <h3>Görevlerim için hatırlatıcı ayarlayabilir miyim?</h3>
                <p>Şu anda hatırlatıcı özelliği bulunmamaktadır, ancak gelecek güncellemelerde eklenecektir.</p>
              </div>
              
              <div className="faq-item">
                <h3>Daha fazla yardıma ihtiyacım var, nasıl iletişim kurabilirim?</h3>
                <p>Yardım almak için support@taskmanagement.com adresine e-posta gönderebilirsiniz.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Help; 