const Loading = ({
  size = 'md',
  variant = 'primary',
  text = 'Yükleniyor...',
  fullPage = false,
  className = '',
  ...props
}) => {

  const baseClass = 'loading';
  const sizeClass = `loading-${size}`;
  const variantClass = `loading-${variant}`;
  const fullPageClass = fullPage ? 'loading-fullpage' : '';
  const loadingClass = `${baseClass} ${sizeClass} ${variantClass} ${fullPageClass} ${className}`.trim();
  
  return (
    <div className={loadingClass} {...props}>
      <div className="loading-spinner"></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading; 