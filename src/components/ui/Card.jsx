const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false,
  clickable = false,
  onClick,
  ...props 
}) => {

  const baseClass = 'card';
  const variantClass = variant !== 'default' ? `card-${variant}` : '';
  const hoverClass = hover ? 'card-hover' : '';
  const clickableClass = clickable ? 'card-clickable' : '';
  const cardClass = `${baseClass} ${variantClass} ${hoverClass} ${clickableClass} ${className}`.trim();
  
  return (
    <div 
      className={cardClass} 
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card; 