"use client";

import * as React from "react";
import {
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogContentText as MuiDialogContentText,
  DialogActions as MuiDialogActions,
  Button as MuiButton,
  Backdrop,
  styled,
  type DialogProps as MuiDialogProps,
} from "@mui/material";

import { cn } from "./utils";
import { buttonVariants } from "./button";

// Context for managing alert dialog state
type AlertDialogContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(null);

function useAlertDialog() {
  const context = React.useContext(AlertDialogContext);
  if (!context) {
    throw new Error("Alert dialog components must be used within AlertDialog");
  }
  return context;
}

// Styled components
const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    maxWidth: '32rem',
    width: '100%',
    padding: theme.spacing(3),
    gap: theme.spacing(2),
    borderRadius: theme.shape.borderRadius * 2,
  },
}));

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
}));

interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function AlertDialog({ open: controlledOpen, onOpenChange, children }: AlertDialogProps) {
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

  return (
    <AlertDialogContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

interface AlertDialogTriggerProps {
  asChild?: boolean;
  children: React.ReactElement;
}

function AlertDialogTrigger({ asChild, children }: AlertDialogTriggerProps) {
  const { onOpenChange } = useAlertDialog();
  
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

// Portal component (kept for API compatibility)
function AlertDialogPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Overlay component (kept for API compatibility)
function AlertDialogOverlay({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return null; // MUI Dialog handles backdrop internally
}

interface AlertDialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function AlertDialogContent({ className, children, ...props }: AlertDialogContentProps) {
  const { open, onOpenChange } = useAlertDialog();

  return (
    <StyledDialog
      open={open}
      onClose={() => onOpenChange(false)}
      BackdropComponent={StyledBackdrop}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      data-slot="alert-dialog-content"
      {...props}
    >
      {children}
    </StyledDialog>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

interface AlertDialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

function AlertDialogTitle({ className, children, ...props }: AlertDialogTitleProps) {
  return (
    <MuiDialogTitle
      id="alert-dialog-title"
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    >
      {children}
    </MuiDialogTitle>
  );
}

interface AlertDialogDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function AlertDialogDescription({ className, children, ...props }: AlertDialogDescriptionProps) {
  return (
    <MuiDialogContentText
      id="alert-dialog-description"
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    >
      {children}
    </MuiDialogContentText>
  );
}

interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function AlertDialogAction({ className, onClick, children, ...props }: AlertDialogActionProps) {
  const { onOpenChange } = useAlertDialog();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    onOpenChange(false);
  };

  return (
    <button
      className={cn(buttonVariants(), className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

interface AlertDialogCancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function AlertDialogCancel({ className, onClick, children, ...props }: AlertDialogCancelProps) {
  const { onOpenChange } = useAlertDialog();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    onOpenChange(false);
  };

  return (
    <button
      className={cn(buttonVariants({ variant: "outline" }), className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
