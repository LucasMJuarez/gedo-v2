import { forwardRef, InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className="flex items-center">
        <input
          type="checkbox"
          id={checkboxId}
          ref={ref}
          className={`
            w-4 h-4 
            text-[#0072C6] 
            border-[#D8D8D8] 
            rounded 
            focus:ring-2 
            focus:ring-[#0072C6] 
            focus:ring-offset-2
            cursor-pointer
            ${className}
          `}
          {...props}
        />
        {label && (
          <label 
            htmlFor={checkboxId} 
            className="ml-2 text-[#1D1D1B] cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
