import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../ui/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full px-3 py-2 rounded border bg-white text-[#1D1D1B] placeholder:text-[#6C6C6C]',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-[#0072C6] focus:border-[#0072C6]',
          'disabled:bg-[#F5F5F5] disabled:cursor-not-allowed disabled:text-[#B3B3B3]',
          error 
            ? 'border-[#DC3545] focus:ring-[#DC3545] focus:border-[#DC3545]' 
            : 'border-[#D8D8D8] hover:border-[#B3B3B3]',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
