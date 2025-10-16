"use client";

import * as React from "react";
import { Collapse as MuiCollapse, type CollapseProps as MuiCollapseProps } from "@mui/material";

// Context for managing collapsible state
type CollapsibleContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null);

function useCollapsible() {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error("Collapsible components must be used within Collapsible");
  }
  return context;
}

interface CollapsibleProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Collapsible({ 
  open: controlledOpen, 
  onOpenChange, 
  defaultOpen = false, 
  children 
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  
  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
    if (!isControlled) {
      setUncontrolledOpen(newOpen);
    }
  }, [isControlled, onOpenChange]);

  return (
    <CollapsibleContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      <div data-slot="collapsible">{children}</div>
    </CollapsibleContext.Provider>
  );
}

interface CollapsibleTriggerProps {
  asChild?: boolean;
  children: React.ReactElement;
}

function CollapsibleTrigger({ asChild, children }: CollapsibleTriggerProps) {
  const { open, onOpenChange } = useCollapsible();
  
  const handleClick = () => {
    onOpenChange(!open);
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e);
        handleClick();
      },
      'aria-expanded': open,
    } as any);
  }

  return (
    <button 
      onClick={handleClick} 
      aria-expanded={open}
      data-slot="collapsible-trigger"
    >
      {children}
    </button>
  );
}

interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function CollapsibleContent({ children, ...props }: CollapsibleContentProps) {
  const { open } = useCollapsible();

  return (
    <MuiCollapse 
      in={open} 
      data-slot="collapsible-content"
      {...props}
    >
      <div>{children}</div>
    </MuiCollapse>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
