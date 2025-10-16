"use client";

import * as React from "react";
import { 
  ToggleButtonGroup as MuiToggleButtonGroup,
  ToggleButton as MuiToggleButton,
  styled 
} from "@mui/material";
import { type VariantProps } from "class-variance-authority";

import { cn } from "./utils";
import { toggleVariants } from "./toggle";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

const StyledToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
  width: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  '& .MuiToggleButton-root': {
    border: 'none',
    borderLeft: '1px solid transparent',
    '&:first-of-type': {
      borderLeft: 'none',
    },
  },
  '&[data-variant="outline"]': {
    '& .MuiToggleButton-root': {
      borderLeft: '1px solid var(--input)',
      '&:first-of-type': {
        borderLeft: 'none',
      },
    },
  },
}));

const StyledToggleButton = styled(MuiToggleButton)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  flex: 1,
  flexShrink: 0,
  borderRadius: 0,
  boxShadow: 'none',
  '&:first-of-type': {
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
  },
  '&:last-of-type': {
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
  },
  '&:focus, &:focus-visible': {
    zIndex: 10,
  },
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

interface ToggleGroupProps {
  type?: "single" | "multiple";
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

function ToggleGroup({
  className,
  variant,
  size,
  children,
  type = "single",
  value,
  onValueChange,
  ...props
}: ToggleGroupProps) {
  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string | string[]) => {
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <StyledToggleButtonGroup
      value={value}
      onChange={handleChange}
      exclusive={type === "single"}
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group",
        variant === "outline" && "shadow-xs",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </StyledToggleButtonGroup>
  );
}

interface ToggleGroupItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  value,
  ...props
}: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <StyledToggleButton
      value={value}
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </StyledToggleButton>
  );
}

export { ToggleGroup, ToggleGroupItem };
