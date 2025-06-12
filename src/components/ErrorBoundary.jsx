import { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Bir sonraki render'da hata gösterme UI'ı göstermek için state'i güncelliyoruz
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Hata bilgilerini bileşen state'ine kaydediyoruz
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Hatayı bir hata raporlama servisine gönderebilirsiniz
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Özel hata UI'ı render ediyoruz
      return (
        <div className="error-boundary">
          <div className="error-container">
            <h2>Bir Şeyler Yanlış Gitti</h2>
            <p>Üzgünüz, uygulama bir hatayla karşılaştı.</p>
            
            <div className="error-actions">
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-primary"
              >
                Sayfayı Yenile
              </button>
              
              <Link to="/dashboard" className="btn btn-outline-secondary ml-2">
                Ana Sayfaya Dön
              </Link>
            </div>
            
            {/* Geliştirme ortamında hata detaylarını gösteriyoruz */}
            {process.env.NODE_ENV === 'development' && (
              <div className="error-details">
                <h3>Hata Detayları:</h3>
                <p>{this.state.error && this.state.error.toString()}</p>
                <h4>Bileşen Stack:</h4>
                <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Eğer hata yoksa normal children'ları render ediyoruz
    return this.props.children;
  }
}

export default ErrorBoundary; 