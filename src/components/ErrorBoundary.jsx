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
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
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

    return this.props.children;
  }
}

export default ErrorBoundary; 