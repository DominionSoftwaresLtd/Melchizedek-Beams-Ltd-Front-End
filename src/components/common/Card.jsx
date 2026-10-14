const Card = ({
  children,
  className = '',
  hoverable = true,
  padding = true,
  ...props
}) => {
  return (
    <div
      className={`card ${hoverable ? 'hover:shadow-lg' : ''} ${padding ? 'p-6' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
