import { forwardRef, InputHTMLAttributes } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className = '', id, ...props }, ref) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className="flex items-center">
        <input
          type="radio"
          id={radioId}
          ref={ref}
          className={`
            w-4 h-4 
            text-[#0072C6] 
            border-[#D8D8D8] 
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
            htmlFor={radioId} 
            className="ml-2 text-[#1D1D1B] cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
