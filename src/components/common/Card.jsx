const Card = ({ 
  children, 
  className = '', 
  hoverable = true,
  padding = true,
  ...props 
}) => {
  const baseStyles = 'card';
  const hoverStyles = hoverable ? 'hover:shadow-xl' : '';
  const paddingStyles = padding ? 'p-6' : '';

  return (
    <div 
      className={`${baseStyles} ${hoverStyles} ${paddingStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
