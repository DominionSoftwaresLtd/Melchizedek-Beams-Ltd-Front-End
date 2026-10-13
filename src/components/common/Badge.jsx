const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-neutral text-white',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-primary',
    accent: 'bg-accent text-white',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
