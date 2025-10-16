"use client";

import * as React from "react";
import { Popover as MuiPopover, Paper, styled } from "@mui/material";

import { cn } from "./utils";

// Context for managing hover card state
type HoverCardContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
};

const HoverCardContext = React.createContext<HoverCardContextValue | null>(null);

function useHoverCard() {
  const context = React.useContext(HoverCardContext);
  if (!context) {
    throw new Error("HoverCard components must be used within HoverCard");
  }
  return context;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '16rem',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  backgroundColor: 'var(--popover)',
  color: 'var(--popover-foreground)',
  border: '1px solid var(--border)',
}));

interface HoverCardProps {
  openDelay?: number;
  closeDelay?: number;
  children: React.ReactNode;
}

function HoverCard({ openDelay = 700, closeDelay = 300, children }: HoverCardProps) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const openTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    if (newOpen) {
      openTimeoutRef.current = setTimeout(() => {
        setOpen(true);
      }, openDelay);
    } else {
      closeTimeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, closeDelay);
    }
  }, [openDelay, closeDelay]);

  React.useEffect(() => {
    return () => {
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <HoverCardContext.Provider value={{ open, onOpenChange: handleOpenChange, anchorEl, setAnchorEl }}>
      <div data-slot="hover-card">{children}</div>
    </HoverCardContext.Provider>
  );
}

interface HoverCardTriggerProps {
  asChild?: boolean;
  children: React.ReactElement;
}

function HoverCardTrigger({ asChild, children }: HoverCardTriggerProps) {
  const { onOpenChange, setAnchorEl } = useHoverCard();

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    onOpenChange(true);
  };

  const handleMouseLeave = () => {
    onOpenChange(false);
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
        child.props.onMouseEnter?.(e);
        handleMouseEnter(e);
      },
      onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
        child.props.onMouseLeave?.(e);
        handleMouseLeave();
      },
    });
  }

  return (
    <div 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      data-slot="hover-card-trigger"
    >
      {children}
    </div>
  );
}

interface HoverCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
  children: React.ReactNode;
}

function HoverCardContent({ 
  className, 
  align = "center", 
  sideOffset = 4, 
  children,
  ...props 
}: HoverCardContentProps) {
  const { open, anchorEl, onOpenChange } = useHoverCard();

  const anchorOrigin = {
    vertical: 'bottom' as const,
    horizontal: align === 'start' ? 'left' as const : align === 'end' ? 'right' as const : 'center' as const,
  };

  const transformOrigin = {
    vertical: 'top' as const,
    horizontal: align === 'start' ? 'left' as const : align === 'end' ? 'right' as const : 'center' as const,
  };

  return (
    <MuiPopover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      onClose={() => onOpenChange(false)}
      disableRestoreFocus
      slotProps={{
        paper: {
          onMouseEnter: () => onOpenChange(true),
          onMouseLeave: () => onOpenChange(false),
        },
      }}
      sx={{
        pointerEvents: 'none',
        '& .MuiPaper-root': {
          pointerEvents: 'auto',
          marginTop: `${sideOffset}px`,
        },
      }}
    >
      <StyledPaper 
        data-slot="hover-card-content" 
        className={className}
        {...props}
      >
        {children}
      </StyledPaper>
    </MuiPopover>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
