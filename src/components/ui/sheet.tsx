"use client";

import * as React from "react";
import {
  Drawer as MuiDrawer,
  IconButton,
  Typography,
  styled,
  type DrawerProps as MuiDrawerProps,
} from "@mui/material";
import { XIcon } from "lucide-react";

import { cn } from "./utils";

// Context for managing sheet state
type SheetContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side: "top" | "right" | "bottom" | "left";
};

const SheetContext = React.createContext<SheetContextValue | null>(null);

function useSheet() {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error("Sheet components must be used within Sheet");
  }
  return context;
}

// Styled components
const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'side',
})<{ side: "top" | "right" | "bottom" | "left" }>(({ theme, side }) => ({
  '& .MuiDrawer-paper': {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    ...(side === 'right' || side === 'left' ? {
      width: '75%',
      maxWidth: '24rem',
      [theme.breakpoints.up('sm')]: {
        maxWidth: '24rem',
      },
    } : {
      height: 'auto',
    }),
  },
}));

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Sheet({ open: controlledOpen, onOpenChange, children }: SheetProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  
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

  // Default side is right
  const [side, setSide] = React.useState<"top" | "right" | "bottom" | "left">("right");

  return (
    <SheetContext.Provider value={{ open, onOpenChange: handleOpenChange, side }}>
      {children}
    </SheetContext.Provider>
  );
}

interface SheetTriggerProps {
  asChild?: boolean;
  children: React.ReactElement;
}

function SheetTrigger({ asChild, children }: SheetTriggerProps) {
  const { onOpenChange } = useSheet();
  
  const handleClick = () => {
    onOpenChange(true);
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e);
        handleClick();
      },
    });
  }

  return <div onClick={handleClick}>{children}</div>;
}

interface SheetCloseProps {
  asChild?: boolean;
  children: React.ReactElement;
}

function SheetClose({ asChild, children }: SheetCloseProps) {
  const { onOpenChange } = useSheet();
  
  const handleClick = () => {
    onOpenChange(false);
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e);
        handleClick();
      },
    });
  }

  return <button onClick={handleClick}>{children}</button>;
}

// Portal component (kept for API compatibility)
function SheetPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Overlay component (kept for API compatibility)
function SheetOverlay({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return null; // MUI Drawer handles backdrop internally
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

function SheetContent({ className, children, side = "right", ...props }: SheetContentProps) {
  const context = useSheet();
  const { open, onOpenChange } = context;

  // Update the side in context
  React.useEffect(() => {
    (context as any).side = side;
  }, [side, context]);

  return (
    <StyledDrawer
      anchor={side}
      open={open}
      onClose={() => onOpenChange(false)}
      side={side}
      data-slot="sheet-content"
      {...props}
    >
      <div className={cn("flex flex-col gap-4", className)}>
        {children}
        <IconButton
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 opacity-70 hover:opacity-100"
          size="small"
          aria-label="Close"
        >
          <XIcon className="size-4" />
        </IconButton>
      </div>
    </StyledDrawer>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

interface SheetTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

function SheetTitle({ className, children, ...props }: SheetTitleProps) {
  return (
    <Typography
      variant="h6"
      component="h2"
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    >
      {children}
    </Typography>
  );
}

interface SheetDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

function SheetDescription({ className, children, ...props }: SheetDescriptionProps) {
  return (
    <Typography
      variant="body2"
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    >
      {children}
    </Typography>
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
