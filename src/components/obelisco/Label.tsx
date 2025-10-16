import { LabelHTMLAttributes, forwardRef } from 'react';
import { cn } from '../ui/utils';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'block text-sm text-[#1D1D1B] mb-1.5',
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-[#DC3545] ml-1">*</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';
