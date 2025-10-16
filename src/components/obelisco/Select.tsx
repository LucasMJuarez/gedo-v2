import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '../ui/utils';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            'w-full px-3 py-2 pr-10 rounded border bg-white text-[#1D1D1B] appearance-none cursor-pointer',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-[#0072C6] focus:border-[#0072C6]',
            'disabled:bg-[#F5F5F5] disabled:cursor-not-allowed disabled:text-[#B3B3B3]',
            error 
              ? 'border-[#DC3545] focus:ring-[#DC3545] focus:border-[#DC3545]' 
              : 'border-[#D8D8D8] hover:border-[#B3B3B3]',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6C6C] pointer-events-none" />
      </div>
    );
  }
);

Select.displayName = 'Select';
