const Container = ({
  children,
  fluid = false,
  className = '',
  size = 'md',
  ...props
}) => {

  const baseClass = 'container';
  const fluidClass = fluid ? 'container-fluid' : '';
  const sizeClass = size !== 'md' ? `container-${size}` : '';
  const containerClass = `${baseClass} ${fluidClass} ${sizeClass} ${className}`.trim();
  
  return (
    <div className={containerClass} {...props}>
      {children}
    </div>
  );
};

export default Container; 