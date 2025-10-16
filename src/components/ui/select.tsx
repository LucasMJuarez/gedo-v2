import * as React from "react";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "./utils";

const StyledSelect = styled(MuiSelect)(({ theme }) => ({
  fontSize: '0.875rem',
  borderRadius: 6,
}));

const StyledMenuItem = styled(MenuItem)({
  fontSize: '0.875rem',
  padding: '6px 32px 6px 8px',
  position: 'relative',
});

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const SelectContext = React.createContext<SelectContextValue>({});

function Select({ 
  children, 
  value, 
  defaultValue,
  onValueChange,
}: {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <SelectContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      {children}
    </SelectContext.Provider>
  );
}

function SelectTrigger({ className, children, size = "default" }: {
  className?: string;
  children: React.ReactNode;
  size?: "sm" | "default";
}) {
  const { value, onValueChange } = React.useContext(SelectContext);

  return (
    <FormControl fullWidth size={size === "sm" ? "small" : "medium"}>
      <StyledSelect
        value={value || ''}
        onChange={(e) => onValueChange?.(e.target.value as string)}
        className={className}
        IconComponent={ChevronDownIcon}
        displayEmpty
        renderValue={() => children}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === SelectContent) {
            return child.props.children;
          }
          return null;
        })}
      </StyledSelect>
    </FormControl>
  );
}

function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = React.useContext(SelectContext);
  return <span>{value || placeholder}</span>;
}

function SelectItem({ children, value }: {
  children: React.ReactNode;
  value: string;
}) {
  const { value: selectedValue } = React.useContext(SelectContext);
  
  return (
    <StyledMenuItem value={value}>
      {children}
      {value === selectedValue && <CheckIcon className="size-4 absolute right-2" />}
    </StyledMenuItem>
  );
}

function SelectLabel({ children }: { children: React.ReactNode }) {
  return <ListSubheader>{children}</ListSubheader>;
}

function SelectSeparator() {
  return <Divider />;
}

function SelectGroup({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function SelectScrollUpButton() {
  return null;
}

function SelectScrollDownButton() {
  return null;
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
