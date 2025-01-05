interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gradient' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ variant = 'gradient', size = 'md', children, className = '', ...props }: ButtonProps) {
  const baseStyles = "relative font-bold tracking-[0.15em] transition-all duration-300 rounded-full";
  const sizeStyles = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-12 py-4 text-xl"
  };
  const variantStyles = {
    gradient: "gradient-button text-white",
    outline: "border-2 border-white/20 hover:border-white/40 text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}