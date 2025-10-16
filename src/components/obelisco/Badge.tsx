import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../ui/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'info', children, ...props }, ref) => {
    const variants = {
      info: 'bg-[#E3F2FD] text-[#0072C6] border-[#0072C6]/30',
      success: 'bg-[#E8F5E9] text-[#2E7D32] border-[#5CB615]/30',
      warning: 'bg-[#FFF3E0] text-[#E65100] border-[#F59C00]/30',
      danger: 'bg-[#FFEBEE] text-[#C62828] border-[#DC3545]/30',
      neutral: 'bg-[#F5F5F5] text-[#6C6C6C] border-[#D8D8D8]',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
