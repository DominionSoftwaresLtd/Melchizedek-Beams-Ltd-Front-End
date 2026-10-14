const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default:   'bg-neutral/10 text-neutral',
    primary:   'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    teal:      'bg-accent text-primary',
    gold:      'bg-secondary/10 text-secondary-dark',
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
