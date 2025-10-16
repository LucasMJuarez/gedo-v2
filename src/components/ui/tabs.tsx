import * as React from "react";
import MuiTabs, { TabsProps as MuiTabsProps } from "@mui/material/Tabs";
import MuiTab, { TabProps as MuiTabProps } from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { cn } from "./utils";

const StyledTabs = styled(MuiTabs)(({ theme }) => ({
  minHeight: 36,
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  '& .MuiTabs-flexContainer': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    padding: 3,
    gap: 2,
    display: 'inline-flex',
    width: 'fit-content',
  },
}));

const StyledTab = styled(MuiTab)(({ theme }) => ({
  minHeight: 30,
  fontSize: '0.875rem',
  fontWeight: 500,
  padding: '4px 8px',
  borderRadius: 12,
  textTransform: 'none',
  minWidth: 'auto',
  border: '1px solid transparent',
  transition: 'all 0.2s',
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: theme.palette.mode === 'dark' 
      ? `1px solid ${theme.palette.divider}` 
      : '1px solid transparent',
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-disabled': {
    opacity: 0.5,
    pointerEvents: 'none',
  },
}));

interface TabsProps extends Omit<MuiTabsProps, 'value' | 'onChange'> {
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  children: React.ReactNode;
}

function Tabs({ className, value, onValueChange, defaultValue, children, ...props }: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <Box data-slot="tabs" className={cn("flex flex-col gap-2", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            value: currentValue,
            onChange: handleChange,
          });
        }
        return child;
      })}
    </Box>
  );
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
  value?: string;
  onChange?: (event: React.SyntheticEvent, value: string) => void;
}

function TabsList({ className, children, value, onChange, ...props }: TabsListProps) {
  return (
    <StyledTabs
      data-slot="tabs-list"
      value={value || false}
      onChange={onChange}
      className={className}
      {...props}
    >
      {children}
    </StyledTabs>
  );
}

interface TabsTriggerProps {
  className?: string;
  value: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

function TabsTrigger({ className, value, children, ...props }: TabsTriggerProps) {
  return (
    <StyledTab
      data-slot="tabs-trigger"
      value={value}
      label={children}
      className={className}
      {...props}
    />
  );
}

interface TabsContentProps {
  className?: string;
  value: string;
  children: React.ReactNode;
}

function TabsContent({ className, value, children }: TabsContentProps) {
  return (
    <Box
      data-slot="tabs-content"
      role="tabpanel"
      className={cn("flex-1 outline-none", className)}
    >
      {children}
    </Box>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
