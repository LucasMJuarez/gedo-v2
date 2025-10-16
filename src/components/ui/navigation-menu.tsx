"use client";

import * as React from "react";
import { Tabs as MuiTabs, Tab as MuiTab, Box, Popover, styled } from "@mui/material";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "./utils";

const StyledTabs = styled(MuiTabs)(({ theme }) => ({
  minHeight: '2.25rem',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
}));

const StyledTab = styled(MuiTab)(({ theme }) => ({
  textTransform: 'none',
  minHeight: '2.25rem',
  padding: theme.spacing(1, 2),
  fontSize: '0.875rem',
  fontWeight: 500,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'var(--background)',
  color: 'inherit',
  '&:hover': {
    backgroundColor: 'var(--accent)',
    color: 'var(--accent-foreground)',
  },
  '&.Mui-selected': {
    backgroundColor: 'hsl(var(--accent) / 0.5)',
    color: 'var(--accent-foreground)',
  },
  '&:focus': {
    backgroundColor: 'var(--accent)',
    color: 'var(--accent-foreground)',
  },
}));

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1",
);

interface NavigationMenuProps {
  children: React.ReactNode;
  className?: string;
  viewport?: boolean;
}

function NavigationMenu({ className, children, viewport = true }: NavigationMenuProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <nav
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
    >
      {children}
    </nav>
  );
}

interface NavigationMenuListProps {
  children: React.ReactNode;
  className?: string;
}

function NavigationMenuList({ className, children }: NavigationMenuListProps) {
  return (
    <ul
      data-slot="navigation-menu-list"
      className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
    >
      {children}
    </ul>
  );
}

interface NavigationMenuItemProps {
  children: React.ReactNode;
  className?: string;
}

function NavigationMenuItem({ className, children }: NavigationMenuItemProps) {
  return (
    <li data-slot="navigation-menu-item" className={cn("relative", className)}>
      {children}
    </li>
  );
}

interface NavigationMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
}

function NavigationMenuTrigger({ className, children }: NavigationMenuTriggerProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <button
        data-slot="navigation-menu-trigger"
        data-state={open ? "open" : "closed"}
        className={cn(navigationMenuTriggerStyle(), "group", className)}
        onClick={handleClick}
        aria-expanded={open}
      >
        {children}{" "}
        <ChevronDown
          className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </button>
      {/* Content would be rendered by NavigationMenuContent */}
    </>
  );
}

interface NavigationMenuContentProps {
  children: React.ReactNode;
  className?: string;
}

function NavigationMenuContent({ className, children }: NavigationMenuContentProps) {
  return (
    <div
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

interface NavigationMenuLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
}

const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        data-slot="navigation-menu-link"
        className={cn(navigationMenuTriggerStyle(), className)}
        {...props}
      >
        {children}
      </a>
    );
  }
);
NavigationMenuLink.displayName = "NavigationMenuLink";

interface NavigationMenuIndicatorProps {
  children?: React.ReactNode;
  className?: string;
}

function NavigationMenuIndicator({ className }: NavigationMenuIndicatorProps) {
  return (
    <div
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className
      )}
    >
      <div className="bg-border relative top-[60%] size-2 rotate-45 rounded-tl-sm shadow-md" />
    </div>
  );
}

interface NavigationMenuViewportProps {
  children?: React.ReactNode;
  className?: string;
}

function NavigationMenuViewport({ className }: NavigationMenuViewportProps) {
  return (
    <div
      data-slot="navigation-menu-viewport"
      className={cn(
        "origin-top-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
    />
  );
}

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
