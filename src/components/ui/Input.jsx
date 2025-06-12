import { forwardRef } from 'react';

const Input = forwardRef(({ 
  type = 'text',
  id,
  name,
  value,
  onChange,
  label,
  required = false,
  placeholder = '',
  error = false,
  errorText = '',
  helperText = '',
  disabled = false,
  className = '',
  ...props 
}, ref) => {
  
  const inputClass = `form-input ${error ? 'form-input-error' : ''} ${className}`.trim();
  
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClass}
        required={required}
        {...props}
      />
      
      {error && errorText && (
        <p className="error-text">{errorText}</p>
      )}
      
      {helperText && !error && (
        <p className="helper-text">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 