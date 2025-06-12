const Badge = ({
  children,
  variant = 'primary',
  pill = false,
  outline = false,
  className = '',
  ...props
}) => {

  const baseClass = 'badge';
  const variantClass = `badge-${variant}`;
  const pillClass = pill ? 'badge-pill' : '';
  const outlineClass = outline ? 'badge-outline' : '';
  const badgeClass = `${baseClass} ${variantClass} ${pillClass} ${outlineClass} ${className}`.trim();
  
  return (
    <span className={badgeClass} {...props}>
      {children}
    </span>
  );
};

export default Badge; 