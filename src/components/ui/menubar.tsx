"use client";

import * as React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  Divider,
  ListItemIcon,
  styled,
} from "@mui/material";
import { CheckIcon, ChevronRight, Circle } from "lucide-react";

import { cn } from "./utils";

const StyledMenubar = styled(AppBar)(({ theme }) => ({
  position: 'static',
  backgroundColor: 'var(--background)',
  color: 'var(--foreground)',
  boxShadow: 'none',
  border: '1px solid var(--border)',
  borderRadius: theme.shape.borderRadius,
  height: '2.25rem',
  minHeight: '2.25rem',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: '2.25rem',
  height: '2.25rem',
  padding: theme.spacing(0.5),
  gap: theme.spacing(0.5),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '0.875rem',
  fontWeight: 500,
  padding: theme.spacing(0.5, 1),
  minWidth: 'auto',
  borderRadius: theme.shape.borderRadius / 2,
  color: 'inherit',
  '&:hover': {
    backgroundColor: 'var(--accent)',
    color: 'var(--accent-foreground)',
  },
  '&[aria-expanded="true"]': {
    backgroundColor: 'var(--accent)',
    color: 'var(--accent-foreground)',
  },
}));

const StyledMenu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiPaper-root': {
    minWidth: '12rem',
    marginTop: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'var(--popover)',
    color: 'var(--popover-foreground)',
    border: '1px solid var(--border)',
    boxShadow: theme.shadows[4],
    padding: theme.spacing(0.5),
  },
}));

const StyledMenuItem = styled(MuiMenuItem, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'inset',
})<{ variant?: 'default' | 'destructive'; inset?: boolean }>(({ theme, variant, inset }) => ({
  borderRadius: theme.shape.borderRadius / 2,
  padding: theme.spacing(1, 2),
  fontSize: '0.875rem',
  gap: theme.spacing(1),
  paddingLeft: inset ? theme.spacing(4) : theme.spacing(2),
  
  ...(variant === 'destructive' && {
    color: 'var(--destructive)',
    '&:focus, &:hover': {
      backgroundColor: 'var(--destructive)',
      opacity: 0.1,
    },
  }),
  
  '&:focus, &:hover': {
    backgroundColor: 'var(--accent)',
    color: 'var(--accent-foreground)',
  },
}));

interface MenubarProps {
  children: React.ReactNode;
  className?: string;
}

function Menubar({ className, children }: MenubarProps) {
  return (
    <StyledMenubar data-slot="menubar" className={className}>
      <StyledToolbar>{children}</StyledToolbar>
    </StyledMenubar>
  );
}

interface MenubarMenuProps {
  children: React.ReactNode;
}

function MenubarMenu({ children }: MenubarMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Separar el trigger del contenido
  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === MenubarTrigger
  );
  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === MenubarContent
  );

  return (
    <div data-slot="menubar-menu">
      {React.isValidElement(trigger) &&
        React.cloneElement(trigger as React.ReactElement<any>, {
          onClick: handleClick,
          'aria-expanded': open,
        })}
      {React.isValidElement(content) &&
        React.cloneElement(content as React.ReactElement<any>, {
          anchorEl,
          open,
          onClose: handleClose,
        })}
    </div>
  );
}

interface MenubarTriggerProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

function MenubarTrigger({ className, children, onClick }: MenubarTriggerProps) {
  return (
    <StyledButton onClick={onClick} className={className} data-slot="menubar-trigger">
      {children}
    </StyledButton>
  );
}

interface MenubarContentProps {
  children: React.ReactNode;
  className?: string;
  anchorEl?: null | HTMLElement;
  open?: boolean;
  onClose?: () => void;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
  sideOffset?: number;
}

function MenubarContent({
  children,
  className,
  anchorEl,
  open = false,
  onClose,
  align = 'start',
}: MenubarContentProps) {
  return (
    <StyledMenu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: align === 'start' ? 'left' : align === 'end' ? 'right' : 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: align === 'start' ? 'left' : align === 'end' ? 'right' : 'center',
      }}
      data-slot="menubar-content"
      className={className}
    >
      {children}
    </StyledMenu>
  );
}

interface MenubarItemProps extends React.HTMLAttributes<HTMLLIElement> {
  inset?: boolean;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
  children: React.ReactNode;
}

function MenubarItem({ className, inset, variant = 'default', disabled, children, onClick, ...props }: MenubarItemProps) {
  return (
    <StyledMenuItem
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      inset={inset}
      data-slot="menubar-item"
      className={className}
      {...props}
    >
      {children}
    </StyledMenuItem>
  );
}

interface MenubarCheckboxItemProps extends React.HTMLAttributes<HTMLLIElement> {
  checked?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

function MenubarCheckboxItem({ className, children, checked, disabled, onClick, ...props }: MenubarCheckboxItemProps) {
  return (
    <StyledMenuItem
      onClick={onClick}
      disabled={disabled}
      data-slot="menubar-checkbox-item"
      className={cn("pl-8", className)}
      {...props}
    >
      <ListItemIcon sx={{ minWidth: '24px', position: 'absolute', left: 8 }}>
        {checked && <CheckIcon className="size-4" />}
      </ListItemIcon>
      {children}
    </StyledMenuItem>
  );
}

interface MenubarRadioItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

function MenubarRadioItem({ className, children, disabled, onClick, ...props }: MenubarRadioItemProps) {
  return (
    <StyledMenuItem
      onClick={onClick}
      disabled={disabled}
      data-slot="menubar-radio-item"
      className={cn("pl-8", className)}
      {...props}
    >
      <ListItemIcon sx={{ minWidth: '24px', position: 'absolute', left: 8 }}>
        <Circle className="size-2 fill-current" />
      </ListItemIcon>
      {children}
    </StyledMenuItem>
  );
}

function MenubarLabel({ className, inset, children }: { className?: string; inset?: boolean; children: React.ReactNode }) {
  return (
    <div
      data-slot="menubar-label"
      className={cn("px-2 py-1.5 text-sm font-medium text-foreground", inset && "pl-8", className)}
    >
      {children}
    </div>
  );
}

function MenubarSeparator({ className }: { className?: string }) {
  return <Divider data-slot="menubar-separator" className={cn("my-1 -mx-1", className)} />;
}

function MenubarShortcut({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span data-slot="menubar-shortcut" className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}>
      {children}
    </span>
  );
}

// Componentes simplificados para compatibilidad
function MenubarGroup({ children }: { children: React.ReactNode }) {
  return <div data-slot="menubar-group">{children}</div>;
}

function MenubarPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function MenubarSub({ children }: { children: React.ReactNode }) {
  return <div data-slot="menubar-sub">{children}</div>;
}

function MenubarSubContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div data-slot="menubar-sub-content" className={className}>{children}</div>;
}

function MenubarSubTrigger({ children, className, inset }: { children: React.ReactNode; className?: string; inset?: boolean }) {
  return (
    <StyledMenuItem data-slot="menubar-sub-trigger" className={className} inset={inset}>
      {children}
      <ChevronRight className="ml-auto size-4" />
    </StyledMenuItem>
  );
}

function MenubarRadioGroup({ children }: { children: React.ReactNode }) {
  return <div data-slot="menubar-radio-group">{children}</div>;
}

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarGroup,
  MenubarPortal,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarRadioGroup,
};
