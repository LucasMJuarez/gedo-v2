import * as React from "react";
import MuiDialog, { DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { XIcon } from "lucide-react";
import { cn } from "./utils";

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 8,
    padding: theme.spacing(3),
    maxWidth: 512,
    width: 'calc(100% - 2rem)',
    margin: theme.spacing(2),
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(2),
  top: theme.spacing(2),
  opacity: 0.7,
  transition: 'opacity 0.2s',
  '&:hover': {
    opacity: 1,
  },
  '& svg': {
    width: 16,
    height: 16,
  },
}));

// Context for managing dialog state
interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | undefined>(undefined);

function useDialog() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a Dialog");
  }
  return context;
}

// Main Dialog component
interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

function Dialog({ children, open: controlledOpen, defaultOpen, onOpenChange, modal = true }: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  }, [controlledOpen, onOpenChange]);

  const value = React.useMemo(
    () => ({ open, onOpenChange: handleOpenChange }),
    [open, handleOpenChange]
  );

  return (
    <DialogContext.Provider value={value}>
      {children}
    </DialogContext.Provider>
  );
}

// Trigger component
interface DialogTriggerProps {
  children: React.ReactElement;
  asChild?: boolean;
}

function DialogTrigger({ children, asChild }: DialogTriggerProps) {
  const { onOpenChange } = useDialog();

  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      onOpenChange(true);
      children.props.onClick?.(e);
    },
  });
}

// Portal component (not needed for MUI but kept for API compatibility)
interface DialogPortalProps {
  children: React.ReactNode;
}

function DialogPortal({ children }: DialogPortalProps) {
  return <>{children}</>;
}

// Close component
interface DialogCloseProps {
  children?: React.ReactElement;
  asChild?: boolean;
}

function DialogClose({ children, asChild }: DialogCloseProps) {
  const { onOpenChange } = useDialog();

  if (!children) {
    return null;
  }

  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      onOpenChange(false);
      children.props.onClick?.(e);
    },
  });
}

// Overlay component (handled by MUI's Backdrop)
interface DialogOverlayProps {
  className?: string;
}

function DialogOverlay({ className }: DialogOverlayProps) {
  return null; // MUI handles this internally
}

// Content component
interface DialogContentProps {
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

function DialogContent({ className, children, showCloseButton = true }: DialogContentProps) {
  const { open, onOpenChange } = useDialog();

  return (
    <StyledDialog
      data-slot="dialog"
      open={open}
      onClose={() => onOpenChange(false)}
      className={className}
    >
      {showCloseButton && (
        <CloseButton
          onClick={() => onOpenChange(false)}
          aria-label="Close"
        >
          <XIcon />
        </CloseButton>
      )}
      {children}
    </StyledDialog>
  );
}

// Header component
interface DialogHeaderProps {
  className?: string;
  children: React.ReactNode;
}

function DialogHeader({ className, children }: DialogHeaderProps) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left mb-4", className)}
    >
      {children}
    </div>
  );
}

// Footer component
interface DialogFooterProps {
  className?: string;
  children: React.ReactNode;
}

function DialogFooter({ className, children }: DialogFooterProps) {
  return (
    <MuiDialogActions
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end pt-4", className)}
    >
      {children}
    </MuiDialogActions>
  );
}

// Title component
interface DialogTitleProps {
  className?: string;
  children: React.ReactNode;
}

function DialogTitle({ className, children }: DialogTitleProps) {
  return (
    <MuiDialogTitle
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold p-0", className)}
    >
      {children}
    </MuiDialogTitle>
  );
}

// Description component
interface DialogDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

function DialogDescription({ className, children }: DialogDescriptionProps) {
  return (
    <div
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
    >
      {children}
    </div>
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
