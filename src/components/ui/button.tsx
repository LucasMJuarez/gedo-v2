import * as React from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const StyledButton = styled(MuiButton)<{ 
  variant?: string; 
  customSize?: string;
}>(({ theme, variant: muiVariant, customSize }) => {
  const baseStyles = {
    textTransform: 'none' as const,
    fontSize: '0.875rem',
    fontWeight: 500,
    borderRadius: 6,
    gap: theme.spacing(2),
    transition: 'all 0.2s',
    
    '&.Mui-disabled': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
    
    '& svg': {
      pointerEvents: 'none',
      flexShrink: 0,
      width: 16,
      height: 16,
    },
  };

  // Size styles
  const sizeStyles = {
    default: {
      height: 36,
      padding: '8px 16px',
    },
    sm: {
      height: 32,
      padding: '4px 12px',
    },
    lg: {
      height: 40,
      padding: '8px 24px',
    },
    icon: {
      height: 36,
      width: 36,
      padding: 8,
      minWidth: 36,
    },
  };

  return {
    ...baseStyles,
    ...(customSize && sizeStyles[customSize as keyof typeof sizeStyles]),
  };
});

interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    // If asChild, render children directly with cloned props
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        className: cn(buttonVariants({ variant, size, className })),
        ref,
      } as any);
    }

    // Map custom variants to MUI variants
    const muiVariant = 
      variant === "default" ? "contained" :
      variant === "destructive" ? "contained" :
      variant === "outline" ? "outlined" :
      variant === "ghost" || variant === "link" ? "text" :
      "contained";

    return (
      <StyledButton
        ref={ref}
        data-slot="button"
        variant={muiVariant}
        customSize={size}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
