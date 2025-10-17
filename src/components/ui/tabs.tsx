import * as React from "react";
import MuiTabs, { TabsProps as MuiTabsProps } from "@mui/material/Tabs";
import MuiTab, { TabProps as MuiTabProps } from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { cn } from "./utils";

// Context para compartir el valor seleccionado
const TabsContext = React.createContext<string>('');

const StyledTabs = styled(MuiTabs)({
  minHeight: 36,
  '& .MuiTabs-indicator': {
    display: 'none',
  },
});

const StyledTab = styled(MuiTab)({
  minHeight: 30,
  fontSize: '0.875rem',
  fontWeight: 500,
  textTransform: 'none',
  minWidth: 'auto',
  transition: 'all 0.2s',
});

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

  console.log('🔵 Tabs - currentValue:', currentValue, 'value prop:', value, 'defaultValue:', defaultValue);

  const handleChange = React.useCallback((_event: React.SyntheticEvent, newValue: string) => {
    console.log('🟢 Tab cambiado a:', newValue);
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  }, [value, onValueChange]);

  return (
    <TabsContext.Provider value={currentValue}>
      <Box data-slot="tabs" className={cn("w-full", className)}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Check if it's a TabsList by checking its props or displayName
            const childType = (child.type as any);
            if (childType?.displayName === 'TabsList' || child.props?.['data-tabs-list'] !== undefined) {
              return React.cloneElement(child as React.ReactElement<any>, {
                value: currentValue,
                onChange: handleChange,
              });
            }
            return child;
          }
          return child;
        })}
      </Box>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
  value?: string;
  onChange?: (event: React.SyntheticEvent, value: string) => void;
  'data-tabs-list'?: boolean;
}

function TabsList({ className, children, value, onChange, ...props }: TabsListProps) {
  console.log('🔴 TabsList - value:', value);
  
  return (
    <StyledTabs
      value={value || false}
      onChange={onChange}
      variant="scrollable"
      scrollButtons="auto"
      className={className}
      {...props}
    >
      {children}
    </StyledTabs>
  );
}

TabsList.displayName = 'TabsList';

interface TabsTriggerProps {
  className?: string;
  value: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

function TabsTrigger({ className, value, children, ...props }: TabsTriggerProps) {
  return (
    <StyledTab
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
  const currentValue = React.useContext(TabsContext);
  
  console.log(`🟡 TabsContent - value prop: "${value}", context value: "${currentValue}", match: ${currentValue === value}`);
  
  // Solo mostrar el contenido si el value coincide con el valor activo
  if (currentValue !== value) {
    return null;
  }
  
  console.log(`✅ Renderizando contenido del tab: ${value}`);
  
  return (
    <Box
      role="tabpanel"
      className={cn("mt-6", className)}
    >
      {children}
    </Box>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
