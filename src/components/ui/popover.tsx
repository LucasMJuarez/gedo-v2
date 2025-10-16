import * as React from "react";
import MuiPopover, { PopoverProps as MuiPopoverProps } from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import { cn } from "./utils";

const StyledPopover = styled(MuiPopover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    width: 288,
    padding: theme.spacing(2),
    borderRadius: 6,
    boxShadow: theme.shadows[8],
    border: `1px solid ${theme.palette.divider}`,
  },
}));

interface PopoverContextValue {
  open: boolean;
  anchorEl: HTMLElement | null;
  onOpenChange: (open: boolean) => void;
  setAnchorEl: (el: HTMLElement | null) => void;
}

const PopoverContext = React.createContext<PopoverContextValue | undefined>(undefined);

function usePopover() {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within a Popover");
  }
  return context;
}

interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Popover({ children, open: controlledOpen, defaultOpen, onOpenChange }: PopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen || false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const value = React.useMemo(
    () => ({ open, anchorEl, onOpenChange: handleOpenChange, setAnchorEl }),
    [open, anchorEl]
  );

  return (
    <PopoverContext.Provider value={value}>
      {children}
    </PopoverContext.Provider>
  );
}

interface PopoverTriggerProps {
  children: React.ReactElement;
  asChild?: boolean;
}

function PopoverTrigger({ children, asChild }: PopoverTriggerProps) {
  const { onOpenChange, setAnchorEl } = usePopover();

  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(e.currentTarget);
      onOpenChange(true);
      children.props.onClick?.(e);
    },
  });
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  side?: "top" | "bottom" | "left" | "right";
}

function PopoverContent({ 
  children, 
  className,
  align = "center",
  sideOffset = 4,
  side = "bottom"
}: PopoverContentProps) {
  const { open, anchorEl, onOpenChange } = usePopover();

  const anchorOrigin = {
    vertical: side === "top" ? "top" : side === "bottom" ? "bottom" : "center",
    horizontal: align === "start" ? "left" : align === "end" ? "right" : "center",
  } as const;

  const transformOrigin = {
    vertical: side === "top" ? "bottom" : side === "bottom" ? "top" : "center",
    horizontal: align === "start" ? "left" : align === "end" ? "right" : "center",
  } as const;

  return (
    <StyledPopover
      data-slot="popover-content"
      open={open}
      anchorEl={anchorEl}
      onClose={() => onOpenChange(false)}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      className={className}
    >
      {children}
    </StyledPopover>
  );
}

interface PopoverAnchorProps {
  children: React.ReactElement;
}

function PopoverAnchor({ children }: PopoverAnchorProps) {
  const { setAnchorEl } = usePopover();

  return React.cloneElement(children, {
    ref: (el: HTMLElement) => setAnchorEl(el),
  });
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
