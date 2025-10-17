import * as React from "react";
import MuiAccordion, { AccordionProps as MuiAccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import { ChevronDownIcon } from "lucide-react";

const StyledAccordion = styled(MuiAccordion)(({ theme }) => ({
  border: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  '&:last-of-type': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const StyledAccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  padding: '16px 24px',
  minHeight: 'auto',
  '& .MuiAccordionSummary-content': {
    margin: 0,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 1,
    gap: theme.spacing(2),
  },
  '&:hover': {
    textDecoration: 'underline',
  },
  '&.Mui-focusVisible': {
    outline: `3px solid ${theme.palette.primary.main}20`,
    borderRadius: 6,
  },
  '&.Mui-disabled': {
    opacity: 0.5,
    pointerEvents: 'none',
  },
}));

const StyledAccordionDetails = styled(MuiAccordionDetails)({
  fontSize: '0.875rem',
  paddingTop: 0,
  paddingBottom: 16,
});

interface AccordionProps {
  children: React.ReactNode;
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  className?: string;
}

// Add context for accordion state
const AccordionContext = React.createContext<{
  expandedItems: string | string[];
  onItemChange: (value: string) => void;
  type: "single" | "multiple";
  collapsible: boolean;
}>({
  expandedItems: "",
  onItemChange: () => {},
  type: "single",
  collapsible: false,
});

function Accordion({ 
  children, 
  type = "single",
  collapsible = false,
  defaultValue,
  value,
  onValueChange,
  className 
}: AccordionProps) {
  const [expandedItems, setExpandedItems] = React.useState<string | string[]>(() => {
    if (value !== undefined) return value;
    if (defaultValue !== undefined) return defaultValue;
    return type === "multiple" ? [] : "";
  });

  const currentValue = value !== undefined ? value : expandedItems;

  const handleItemChange = React.useCallback((itemValue: string) => {
    let newValue: string | string[];

    if (type === "single") {
      // For single type, toggle the item or set it
      newValue = currentValue === itemValue && collapsible ? "" : itemValue;
    } else {
      // For multiple type
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      if (currentArray.includes(itemValue)) {
        newValue = currentArray.filter(v => v !== itemValue);
      } else {
        newValue = [...currentArray, itemValue];
      }
    }

    if (value === undefined) {
      setExpandedItems(newValue);
    }
    onValueChange?.(newValue);
  }, [currentValue, type, collapsible, value, onValueChange]);

  const contextValue = React.useMemo(() => ({
    expandedItems: currentValue,
    onItemChange: handleItemChange,
    type,
    collapsible,
  }), [currentValue, handleItemChange, type, collapsible]);

  return (
    <AccordionContext.Provider value={contextValue}>
      <div data-slot="accordion" className={className} >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  children: React.ReactElement | React.ReactElement[];
  value: string;
  className?: string;
  disabled?: boolean;
}

function AccordionItem({ children, value, className, disabled }: AccordionItemProps) {
  const { expandedItems, onItemChange } = React.useContext(AccordionContext);
  
  const isExpanded = Array.isArray(expandedItems) 
    ? expandedItems.includes(value)
    : expandedItems === value;

  const handleChange = React.useCallback((_: React.SyntheticEvent, expanded: boolean) => {
    if (!disabled) {
      onItemChange(value);
    }
  }, [onItemChange, value, disabled]);

  return (
    <StyledAccordion
      data-slot="accordion-item"
      className={className}
      disabled={disabled}
      expanded={isExpanded}
      onChange={handleChange}
    >
      {children}
    </StyledAccordion>
  );
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  return (
    <StyledAccordionSummary
      data-slot="accordion-trigger"
      expandIcon={
        <ChevronDownIcon 
          className="text-muted-foreground size-4 shrink-0 transition-transform duration-200" 
        />
      }
      className={className}
    >
      {children}
    </StyledAccordionSummary>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

function AccordionContent({ children, className }: AccordionContentProps) {
  return (
    <StyledAccordionDetails
      data-slot="accordion-content"
      className={className}
    >
      {children}
    </StyledAccordionDetails>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
