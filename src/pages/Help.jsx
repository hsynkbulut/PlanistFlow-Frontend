import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { FiArrowLeft, FiHelpCircle, FiList, FiUser, FiPieChart, FiHelpCircle as FiQuestion } from 'react-icons/fi';
import './Help.css';

const Help = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const navigate = useNavigate();

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="help-container">
      <div className="help-header">
        <h1>Yardım ve Kullanım Kılavuzu</h1>
        <Button 
          variant="light" 
          onClick={() => navigate('/dashboard')} 
          icon={<FiArrowLeft />}
        >
          Görevlere Dön
        </Button>
      </div>

      <div className="help-content">
        <div className="help-sidebar">
          <Card className="help-menu-card">
            <h3 className="menu-title">İçindekiler</h3>
            <ul className="help-menu">
              <li 
                className={`menu-item ${activeSection === 'getting-started' ? 'active' : ''}`}
                onClick={() => handleSectionChange('getting-started')}
              >
                <FiHelpCircle className="menu-icon" />
                <span>Başlangıç</span>
              </li>
              <li 
                className={`menu-item ${activeSection === 'tasks' ? 'active' : ''}`}
                onClick={() => handleSectionChange('tasks')}
              >
                <FiList className="menu-icon" />
                <span>Görev Yönetimi</span>
              </li>
              <li 
                className={`menu-item ${activeSection === 'account' ? 'active' : ''}`}
                onClick={() => handleSectionChange('account')}
              >
                <FiUser className="menu-icon" />
                <span>Hesap Yönetimi</span>
              </li>
              <li 
                className={`menu-item ${activeSection === 'statistics' ? 'active' : ''}`}
                onClick={() => handleSectionChange('statistics')}
              >
                <FiPieChart className="menu-icon" />
                <span>İstatistikler</span>
              </li>
              <li 
                className={`menu-item ${activeSection === 'faq' ? 'active' : ''}`}
                onClick={() => handleSectionChange('faq')}
              >
                <FiQuestion className="menu-icon" />
                <span>Sık Sorulan Sorular</span>
              </li>
            </ul>
          </Card>
        </div>

        <div className="help-main">
          <Card className="help-content-card">
            {activeSection === 'getting-started' && (
              <div className="help-section">
                <h2>PlanistFlow</h2>
                <div className="section-divider"></div>
                
                <p>PlanistFlow uygulamamıza hoş geldiniz! Bu uygulama ile görevlerinizi kolayca takip edebilir, düzenleyebilir ve organize edebilirsiniz.</p>
                
                <h3>Hızlı Başlangıç Adımları</h3>
                <ol className="help-steps">
                  <li className="help-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <strong>Kayıt Olma:</strong> Uygulamayı kullanmak için önce kayıt olun veya giriş yapın.
                    </div>
                  </li>
                  <li className="help-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <strong>Görev Ekleme:</strong> Dashboard üzerindeki "Yeni Görev Ekle" butonunu kullanarak yeni görevler oluşturun.
                    </div>
                  </li>
                  <li className="help-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <strong>Görevleri Düzenleme:</strong> Görev kartlarındaki düzenleme simgesine tıklayarak görevlerinizi güncelleyin.
                    </div>
                  </li>
                  <li className="help-step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <strong>Görevleri Tamamlama:</strong> Görevleri tamamladığınızda, görev kartındaki onay kutusunu işaretleyin.
                    </div>
                  </li>
                  <li className="help-step">
                    <div className="step-number">5</div>
                    <div className="step-content">
                      <strong>Görevleri Filtreleme:</strong> Filtreleme seçeneklerini kullanarak istediğiniz görevleri kolayca bulun.
                    </div>
                  </li>
                </ol>
              </div>
            )}

            {activeSection === 'tasks' && (
              <div className="help-section">
                <h2>Görev Yönetimi</h2>
                <div className="section-divider"></div>
                
                <div className="help-topic">
                  <h3>Görev Ekleme</h3>
                  <p>Yeni bir görev eklemek için:</p>
                  <ol className="help-list">
                    <li>Dashboard sayfasındaki "Yeni Görev Ekle" butonuna tıklayın.</li>
                    <li>Görev başlığı ve açıklamasını girin.</li>
                    <li>Gerekli bilgileri doldurduktan sonra "Kaydet" butonuna tıklayın.</li>
                  </ol>
                </div>
                
                <div className="help-topic">
                  <h3>Görev Düzenleme</h3>
                  <p>Mevcut bir görevi düzenlemek için:</p>
                  <ol className="help-list">
                    <li>Düzenlemek istediğiniz görevin sağ üst köşesindeki düzenleme simgesine tıklayın.</li>
                    <li>Değiştirmek istediğiniz bilgileri güncelleyin.</li>
                    <li>Değişiklikleri kaydetmek için "Güncelle" butonuna tıklayın.</li>
                  </ol>
                </div>
                
                <div className="help-topic">
                  <h3>Görev Tamamlama</h3>
                  <p>Bir görevi tamamlandı olarak işaretlemek için, görev kartındaki onay kutusunu işaretleyin. Tamamlanan görevler farklı bir şekilde görüntülenir.</p>
                </div>
                
                <div className="help-topic">
                  <h3>Görev Silme</h3>
                  <p>Bir görevi silmek için:</p>
                  <ol className="help-list">
                    <li>Silmek istediğiniz görevin sağ üst köşesindeki silme simgesine tıklayın.</li>
                    <li>Onay mesajında "Evet, Sil" butonuna tıklayın.</li>
                  </ol>
                </div>
                
                <div className="help-topic">
                  <h3>Görevleri Filtreleme ve Sıralama</h3>
                  <p>Görevlerinizi filtrelemek ve sıralamak için:</p>
                  <ul className="help-list">
                    <li><strong>Durum filtreleme:</strong> Tamamlanan, yapılacak veya tüm görevleri görüntüleyin.</li>
                    <li><strong>Metin araması:</strong> İstediğiniz metni içeren görevleri bulun.</li>
                    <li><strong>Sıralama:</strong> Görevlerinizi başlık, açıklama veya durum bazında sıralayın.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'account' && (
              <div className="help-section">
                <h2>Hesap Yönetimi</h2>
                <div className="section-divider"></div>
                
                <div className="help-topic">
                  <h3>Profil Bilgilerini Görüntüleme</h3>
                  <p>Profil bilgilerinizi görüntülemek için, üst menüde kullanıcı adınıza tıklayın ve açılan menüden "Profil"i seçin.</p>
                </div>
                
                <div className="help-topic">
                  <h3>Profil Düzenleme</h3>
                  <p>Profil bilgilerinizi düzenlemek için:</p>
                  <ol className="help-list">
                    <li>Profil sayfasına gidin.</li>
                    <li>"Profili Düzenle" butonuna tıklayın.</li>
                    <li>İsim, e-posta gibi bilgilerinizi güncelleyin.</li>
                    <li>Değişiklikleri kaydetmek için "Kaydet" butonuna tıklayın.</li>
                  </ol>
                </div>
                
                <div className="help-topic">
                  <h3>Şifre Değiştirme</h3>
                  <p>Şifrenizi değiştirmek için:</p>
                  <ol className="help-list">
                    <li>Profil sayfasına gidin.</li>
                    <li>"Şifre Değiştir" butonuna tıklayın.</li>
                    <li>Mevcut şifrenizi ve yeni şifrenizi girin.</li>
                    <li>"Kaydet" butonuna tıklayın.</li>
                  </ol>
                </div>
                
                <div className="help-topic">
                  <h3>Hesap Silme</h3>
                  <p>Hesabınızı silmek için:</p>
                  <ol className="help-list">
                    <li>Profil sayfasına gidin.</li>
                    <li>"Hesabı Sil" butonuna tıklayın.</li>
                    <li>Silme işlemini onaylayın.</li>
                  </ol>
                  <div className="warning-box">
                    <p>Dikkat: Hesap silme işlemi geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir.</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'statistics' && (
              <div className="help-section">
                <h2>İstatistikler</h2>
                <div className="section-divider"></div>
                
                <p>İstatistikler sayfası, görevlerinizle ilgili genel bir bakış sunar.</p>
                
                <div className="help-topic">
                  <h3>İstatistik Türleri</h3>
                  <ul className="help-list">
                    <li><strong>Toplam Görev:</strong> Sahip olduğunuz toplam görev sayısı.</li>
                    <li><strong>Tamamlanan:</strong> Tamamladığınız görevlerin sayısı.</li>
                    <li><strong>Bekleyen:</strong> Henüz tamamlanmamış görevlerin sayısı.</li>
                    <li><strong>Son 7 Gün:</strong> Son bir hafta içinde eklenen görevlerin sayısı.</li>
                  </ul>
                </div>
                
                <div className="help-topic">
                  <h3>Grafikler</h3>
                  <p>İstatistikler sayfasında, görevlerinizin durumunu gösteren grafikler bulunur:</p>
                  <ul className="help-list">
                    <li><strong>Tamamlanma Oranı:</strong> Tamamlanan görevlerin toplam görevlere oranını gösterir.</li>
                    <li><strong>Görev Dağılımı:</strong> Tamamlanan ve bekleyen görevlerin dağılımını görsel olarak gösterir.</li>
                  </ul>
                </div>
                
                <div className="help-topic">
                  <h3>İpuçları</h3>
                  <p>İstatistikler sayfasında, verimlilik ve PlanistFlow konusunda size özel ipuçları bulunur. Bu ipuçları, görev tamamlama oranınıza göre kişiselleştirilir.</p>
                </div>
              </div>
            )}

            {activeSection === 'faq' && (
              <div className="help-section">
                <h2>Sık Sorulan Sorular</h2>
                <div className="section-divider"></div>
                
                <div className="faq-list">
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
                    <p>Yardım almak için support@planistflow.com adresine e-posta gönderebilirsiniz.</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help; 