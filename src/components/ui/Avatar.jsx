const Avatar = ({ 
  src, 
  alt = '',
  name = '',
  size = 'md',
  status,
  className = '',
  onClick,
  ...props 
}) => {

  const baseClass = 'avatar';
  const sizeClass = `avatar-${size}`;
  const clickableClass = onClick ? 'avatar-clickable' : '';
  const avatarClass = `${baseClass} ${sizeClass} ${clickableClass} ${className}`.trim();
  
  const getInitials = () => {
    if (!name) return '';
    
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div 
      className={avatarClass} 
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt || name} className="avatar-image" />
      ) : (
        <div className="avatar-initials">{getInitials()}</div>
      )}
      
      {status && (
        <span className={`avatar-status avatar-status-${status}`} />
      )}
    </div>
  );
};

export default Avatar; 