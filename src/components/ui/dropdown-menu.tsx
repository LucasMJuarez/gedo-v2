import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import { styled } from "@mui/material/styles";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { cn } from "./utils";

// Styled components for customization
const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(0.5),
    minWidth: 128,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  },
}));

const StyledMenuItem = styled(MenuItem)<{ inset?: boolean; variant?: string }>(({ theme, inset, variant }) => ({
  fontSize: '0.875rem',
  paddingLeft: inset ? theme.spacing(4) : theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  ...(variant === 'destructive' && {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.main + '1A', // 10% opacity
    },
  }),
}));

// Context for managing menu state
interface DropdownMenuContextValue {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | undefined>(undefined);

function useDropdownMenu() {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("useDropdownMenu must be used within a DropdownMenu");
  }
  return context;
}

// Main DropdownMenu component
interface DropdownMenuProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function DropdownMenu({ children, open: controlledOpen, onOpenChange }: DropdownMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = controlledOpen ?? Boolean(anchorEl);

  const handleOpen = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    onOpenChange?.(true);
  }, [onOpenChange]);

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const value = React.useMemo(
    () => ({ open, anchorEl, onClose: handleClose, onOpen: handleOpen }),
    [open, anchorEl, handleClose, handleOpen]
  );

  return (
    <DropdownMenuContext.Provider value={value}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

// Portal component (not needed for MUI but kept for API compatibility)
function DropdownMenuPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Trigger component
interface DropdownMenuTriggerProps {
  children: React.ReactElement;
  asChild?: boolean;
}

function DropdownMenuTrigger({ children, asChild }: DropdownMenuTriggerProps) {
  const { onOpen } = useDropdownMenu();

  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      onOpen(e);
      children.props.onClick?.(e);
    },
  });
}

// Content component
interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
}

function DropdownMenuContent({ 
  children, 
  className,
  align = "start",
  ...props 
}: DropdownMenuContentProps) {
  const { open, anchorEl, onClose } = useDropdownMenu();

  return (
    <StyledMenu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: align === 'end' ? 'right' : align === 'center' ? 'center' : 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: align === 'end' ? 'right' : align === 'center' ? 'center' : 'left',
      }}
      className={className}
      {...props}
    >
      {children}
    </StyledMenu>
  );
}

// Group component
interface DropdownMenuGroupProps {
  children: React.ReactNode;
}

function DropdownMenuGroup({ children }: DropdownMenuGroupProps) {
  return <MenuList disablePadding>{children}</MenuList>;
}

// Item component
interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
  variant?: "default" | "destructive";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
}

function DropdownMenuItem({ 
  children, 
  className, 
  inset, 
  variant = "default",
  onClick,
  ...props 
}: DropdownMenuItemProps) {
  const { onClose } = useDropdownMenu();

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    onClick?.(event);
    onClose();
  };

  return (
    <StyledMenuItem
      onClick={handleClick}
      className={className}
      inset={inset}
      variant={variant}
      {...props}
    >
      {children}
    </StyledMenuItem>
  );
}

// CheckboxItem component
interface DropdownMenuCheckboxItemProps {
  children: React.ReactNode;
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

function DropdownMenuCheckboxItem({ 
  children, 
  className,
  checked = false,
  onCheckedChange,
  ...props 
}: DropdownMenuCheckboxItemProps) {
  return (
    <StyledMenuItem
      onClick={() => onCheckedChange?.(!checked)}
      className={className}
      {...props}
    >
      <ListItemIcon>
        <Checkbox
          checked={checked}
          disableRipple
          size="small"
          sx={{ padding: 0 }}
        />
      </ListItemIcon>
      <ListItemText>{children}</ListItemText>
    </StyledMenuItem>
  );
}

// RadioGroup component (wrapper)
interface DropdownMenuRadioGroupProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

const DropdownMenuRadioContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

function DropdownMenuRadioGroup({ children, value, onValueChange }: DropdownMenuRadioGroupProps) {
  return (
    <DropdownMenuRadioContext.Provider value={{ value, onValueChange }}>
      <MenuList disablePadding>{children}</MenuList>
    </DropdownMenuRadioContext.Provider>
  );
}

// RadioItem component
interface DropdownMenuRadioItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
  disabled?: boolean;
}

function DropdownMenuRadioItem({ 
  children, 
  className,
  value,
  ...props 
}: DropdownMenuRadioItemProps) {
  const { value: selectedValue, onValueChange } = React.useContext(DropdownMenuRadioContext);
  const checked = value === selectedValue;

  return (
    <StyledMenuItem
      onClick={() => onValueChange?.(value)}
      className={className}
      {...props}
    >
      <ListItemIcon>
        <Radio
          checked={checked}
          disableRipple
          size="small"
          sx={{ padding: 0 }}
        />
      </ListItemIcon>
      <ListItemText>{children}</ListItemText>
    </StyledMenuItem>
  );
}

// Label component
interface DropdownMenuLabelProps {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
}

function DropdownMenuLabel({ children, className, inset }: DropdownMenuLabelProps) {
  return (
    <MenuItem
      disabled
      sx={{
        fontSize: '0.875rem',
        fontWeight: 500,
        paddingLeft: inset ? 4 : 2,
        paddingY: 1.5,
        opacity: 1,
        '&.Mui-disabled': {
          opacity: 1,
        },
      }}
      className={className}
    >
      {children}
    </MenuItem>
  );
}

// Separator component
interface DropdownMenuSeparatorProps {
  className?: string;
}

function DropdownMenuSeparator({ className }: DropdownMenuSeparatorProps) {
  return <Divider sx={{ marginY: 1, marginX: -1 }} className={className} />;
}

// Shortcut component
interface DropdownMenuShortcutProps {
  children: React.ReactNode;
  className?: string;
}

function DropdownMenuShortcut({ children, className }: DropdownMenuShortcutProps) {
  return (
    <Typography
      variant="caption"
      sx={{
        marginLeft: 'auto',
        fontSize: '0.75rem',
        letterSpacing: '0.1em',
        opacity: 0.6,
      }}
      className={className}
    >
      {children}
    </Typography>
  );
}

// Sub-menu components (nested menus)
interface DropdownMenuSubProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function DropdownMenuSub({ children, open, onOpenChange }: DropdownMenuSubProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const isOpen = open ?? Boolean(anchorEl);

  const handleOpen = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    onOpenChange?.(true);
  }, [onOpenChange]);

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const value = React.useMemo(
    () => ({ open: isOpen, anchorEl, onClose: handleClose, onOpen: handleOpen }),
    [isOpen, anchorEl, handleClose, handleOpen]
  );

  return (
    <DropdownMenuContext.Provider value={value}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

interface DropdownMenuSubTriggerProps {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
}

function DropdownMenuSubTrigger({ children, className, inset }: DropdownMenuSubTriggerProps) {
  const { onOpen } = useDropdownMenu();

  return (
    <StyledMenuItem
      onMouseEnter={onOpen as any}
      className={className}
      inset={inset}
    >
      {children}
      <ChevronRightIcon style={{ marginLeft: 'auto', width: 16, height: 16 }} />
    </StyledMenuItem>
  );
}

interface DropdownMenuSubContentProps {
  children: React.ReactNode;
  className?: string;
}

function DropdownMenuSubContent({ children, className }: DropdownMenuSubContentProps) {
  const { open, anchorEl, onClose } = useDropdownMenu();

  return (
    <StyledMenu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      className={className}
    >
      {children}
    </StyledMenu>
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
