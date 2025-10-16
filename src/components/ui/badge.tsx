import * as React from "react";
import { Chip as MuiChip, styled } from "@mui/material";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const StyledChip = styled(MuiChip, {
  shouldForwardProp: (prop) => prop !== 'customVariant',
})<{ customVariant?: "default" | "secondary" | "destructive" | "outline" }>(({ theme, customVariant }) => ({
  height: 'auto',
  fontSize: '0.75rem',
  fontWeight: 500,
  padding: '0.125rem 0.5rem',
  width: 'fit-content',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  borderRadius: theme.shape.borderRadius,
  
  ...(customVariant === 'default' && {
    backgroundColor: 'var(--primary)',
    color: 'var(--primary-foreground)',
    border: 'transparent',
    '&:hover': {
      backgroundColor: 'var(--primary)',
      opacity: 0.9,
    },
  }),
  
  ...(customVariant === 'secondary' && {
    backgroundColor: 'var(--secondary)',
    color: 'var(--secondary-foreground)',
    border: 'transparent',
    '&:hover': {
      backgroundColor: 'var(--secondary)',
      opacity: 0.9,
    },
  }),
  
  ...(customVariant === 'destructive' && {
    backgroundColor: 'var(--destructive)',
    color: 'white',
    border: 'transparent',
    '&:hover': {
      backgroundColor: 'var(--destructive)',
      opacity: 0.9,
    },
  }),
  
  ...(customVariant === 'outline' && {
    backgroundColor: 'transparent',
    color: 'var(--foreground)',
    border: '1px solid var(--input)',
    '&:hover': {
      backgroundColor: 'var(--accent)',
      color: 'var(--accent-foreground)',
    },
  }),
}));

interface BadgeProps {
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  asChild?: boolean;
  children: React.ReactNode;
}

function Badge({
  className,
  variant = "default",
  asChild = false,
  children,
  ...props
}: BadgeProps) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(badgeVariants({ variant }), className),
      'data-slot': 'badge',
      ...props,
    } as any);
  }

  return (
    <StyledChip
      label={children}
      customVariant={variant}
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
