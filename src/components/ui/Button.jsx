import { forwardRef } from 'react';

const Button = forwardRef(({ 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  fullWidth = false, 
  disabled = false, 
  children, 
  className = '',
  type = 'button',
  icon = null,
  isLoading = false,
  ...props 
}, ref) => {

  const baseClass = 'button';
  const variantClass = `button-${variant}`;
  const sizeClass = `button-${size}`;
  const widthClass = fullWidth ? 'button-full-width' : '';
  const loadingClass = isLoading ? 'button-loading' : '';
  const buttonClass = `${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${loadingClass} ${className}`.trim();
  
  return (
    <button
      ref={ref}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading ? (
        <span className="button-spinner"></span>
      ) : (
        <>
          {icon && <span className="button-icon">{icon}</span>}
          {children && <span className="button-text">{children}</span>}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button; 