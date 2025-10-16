"use client";

import * as React from "react";
import { ToggleButton as MuiToggleButton, styled } from "@mui/material";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const StyledToggleButton = styled(MuiToggleButton)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
  border: 'none',
  '&.Mui-selected': {
    backgroundColor: 'var(--accent)',
    color: 'var(--accent-foreground)',
    '&:hover': {
      backgroundColor: 'var(--accent)',
    },
  },
  '&:hover': {
    backgroundColor: 'var(--muted)',
    color: 'var(--muted-foreground)',
  },
}));

interface ToggleProps {
  value?: string;
  selected?: boolean;
  onChange?: (event: React.MouseEvent<HTMLElement>, value: any) => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

function Toggle({
  className,
  variant,
  size,
  value = "toggle",
  selected,
  onChange,
  ...props
}: ToggleProps) {
  return (
    <StyledToggleButton
      value={value}
      selected={selected}
      onChange={onChange}
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
