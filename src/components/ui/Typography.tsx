interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export function OutlineText({ children, className = '' }: TextProps) {
  return (
    <span className={`outline-text ${className}`}>
      {children}
    </span>
  );
}

export function GradientText({ children, className = '' }: TextProps) {
  return (
    <span className={`gradient-text ${className}`}>
      {children}
    </span>
  );
}