import * as React from "react";
import MuiTooltip, { TooltipProps as MuiTooltipProps } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { cn } from "./utils";

const StyledTooltip = styled(({ className, ...props }: MuiTooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '0.75rem',
    borderRadius: 6,
    padding: '6px 12px',
    maxWidth: 'fit-content',
  },
  '& .MuiTooltip-arrow': {
    color: theme.palette.primary.main,
  },
}));

// Provider component for compatibility (MUI doesn't need provider)
interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
}

function TooltipProvider({ children, delayDuration = 0 }: TooltipProviderProps) {
  return <>{children}</>;
}

// Main Tooltip wrapper component
interface TooltipProps {
  children: React.ReactElement[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
}

function Tooltip({ children, open, defaultOpen, onOpenChange, delayDuration = 0 }: TooltipProps) {
  const [trigger, content] = React.Children.toArray(children) as React.ReactElement[];
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return React.cloneElement(content, {
    ...content.props,
    open: isOpen,
    onOpen: () => handleOpenChange(true),
    onClose: () => handleOpenChange(false),
    enterDelay: delayDuration,
    children: trigger,
  });
}

// Trigger component (just passes through children)
interface TooltipTriggerProps {
  children: React.ReactElement;
  asChild?: boolean;
}

function TooltipTrigger({ children, asChild }: TooltipTriggerProps) {
  return children;
}

// Content component
interface TooltipContentProps {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

function TooltipContent({
  children,
  className,
  sideOffset = 4,
  side = "top",
  align = "center",
  ...props
}: TooltipContentProps) {
  return (
    <StyledTooltip
      data-slot="tooltip-content"
      title={children}
      arrow
      placement={side}
      className={className}
      {...props}
    >
      <span />
    </StyledTooltip>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
