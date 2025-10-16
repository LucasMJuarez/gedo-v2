import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../ui/utils';

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizes = {
      sm: 'w-4 h-4 border-2',
      md: 'w-8 h-8 border-3',
      lg: 'w-12 h-12 border-4',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-block rounded-full border-[#E5E5E5] border-t-[#0072C6] animate-spin',
          sizes[size],
          className
        )}
        role="status"
        aria-label="Cargando"
        {...props}
      >
        <span className="sr-only">Cargando...</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
