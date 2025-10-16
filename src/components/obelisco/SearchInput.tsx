import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../ui/utils';
import { Search } from 'lucide-react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C6C6C] pointer-events-none" />
        <input
          ref={ref}
          type="search"
          className={cn(
            'w-full pl-11 pr-3 py-2 rounded border bg-white text-[#1D1D1B] placeholder:text-[#6C6C6C]',
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
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
