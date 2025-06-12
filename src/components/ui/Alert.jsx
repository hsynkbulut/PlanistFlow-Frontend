import { useState } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';


const Alert = ({ 
  variant = 'info', 
  title,
  children, 
  dismissible = false,
  onDismiss,
  className = '',
  ...props 
}) => {
  const [dismissed, setDismissed] = useState(false);
  
  if (dismissed) {
    return null;
  }
  
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <FiCheckCircle className="alert-icon" />;
      case 'warning':
      case 'error':
        return <FiAlertCircle className="alert-icon" />;
      case 'info':
      default:
        return <FiInfo className="alert-icon" />;
    }
  };
  
  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  };
  
  const baseClass = 'alert';
  const variantClass = `alert-${variant}`;
  const alertClass = `${baseClass} ${variantClass} ${className}`.trim();
  
  return (
    <div className={alertClass} role="alert" {...props}>
      <div className="alert-content">
        {getIcon()}
        <div className="alert-text">
          {title && <div className="alert-title">{title}</div>}
          {children}
        </div>
      </div>
      
      {dismissible && (
        <button 
          type="button" 
          className="alert-close-button" 
          onClick={handleDismiss}
          aria-label="Kapat"
        >
          <FiX />
        </button>
      )}
    </div>
  );
};

export default Alert; 