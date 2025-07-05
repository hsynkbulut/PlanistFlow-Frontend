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
      style={size === 'sm' ? {
        background: 'linear-gradient(135deg, #7c3aed 60%, #4f46e5 100%)',
        color: '#fff',
        fontWeight: 700,
        borderRadius: '50%',
        boxShadow: '0 2px 8px rgba(80,80,180,0.10)',
        width: '2.25rem',
        height: '2.25rem',
        minWidth: '2.25rem',
        minHeight: '2.25rem',
        aspectRatio: '1/1',
        border: '2px solid #e0e7ff',
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      } : {}}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt || name} className="avatar-image" />
      ) : (
        <div 
          className="avatar-initials"
          style={{
            background: 'none',
            border: 'none',
            boxShadow: 'none',
            width: 'auto',
            height: 'auto',
            minWidth: 0,
            minHeight: 0,
            aspectRatio: 'auto',
            fontSize: '1.2em',
            fontWeight: 700,
            letterSpacing: '1px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >{getInitials()}</div>
      )}
      
      {status && (
        <span className={`avatar-status avatar-status-${status}`} />
      )}
    </div>
  );
};

export default Avatar; 