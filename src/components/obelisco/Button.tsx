import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../ui/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-[#0072C6] text-white hover:bg-[#005a9e] active:bg-[#004d85] focus:ring-2 focus:ring-[#0072C6] focus:ring-offset-2',
      secondary: 'bg-[#5EC1F3] text-white hover:bg-[#4ab3e8] active:bg-[#36a5dd] focus:ring-2 focus:ring-[#5EC1F3] focus:ring-offset-2',
      outline: 'bg-transparent border border-[#0072C6] text-[#0072C6] hover:bg-[#0072C6] hover:text-white active:bg-[#005a9e] active:text-white focus:ring-2 focus:ring-[#0072C6] focus:ring-offset-2',
      danger: 'bg-[#DC3545] text-white hover:bg-[#c82333] active:bg-[#bd2130] focus:ring-2 focus:ring-[#DC3545] focus:ring-offset-2',
      link: 'bg-transparent text-[#0072C6] hover:text-[#005a9e] hover:underline active:text-[#004d85]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
