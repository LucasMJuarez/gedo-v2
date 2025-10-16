import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../ui/utils';
import { CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, dismissible, onDismiss, children, ...props }, ref) => {
    const variants = {
      info: {
        bg: 'bg-[#E3F2FD]',
        border: 'border-[#0072C6]/20',
        text: 'text-[#0061A4]',
        icon: Info,
      },
      success: {
        bg: 'bg-[#E8F5E9]',
        border: 'border-[#5CB615]/30',
        text: 'text-[#2E7D32]',
        icon: CheckCircle,
      },
      warning: {
        bg: 'bg-[#FFF3E0]',
        border: 'border-[#F59C00]/30',
        text: 'text-[#E65100]',
        icon: AlertTriangle,
      },
      danger: {
        bg: 'bg-[#FFEBEE]',
        border: 'border-[#DC3545]/30',
        text: 'text-[#C62828]',
        icon: XCircle,
      },
    };

    const config = variants[variant];
    const Icon = config.icon;

    return (
      <div
        ref={ref}
        className={cn(
          'p-4 rounded border flex items-start gap-3 shadow-sm',
          config.bg,
          config.border,
          className
        )}
        role="alert"
        {...props}
      >
        <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', config.text)} />
        <div className={cn('flex-1', config.text)}>
          {title && <p className="mb-1">{title}</p>}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className={cn('flex-shrink-0 hover:opacity-70 transition-opacity', config.text)}
            aria-label="Cerrar"
          >
            <XCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
