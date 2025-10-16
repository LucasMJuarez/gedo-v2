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

function Accordion({ 
  children, 
  type = "single",
  defaultValue,
  value,
  onValueChange,
  className 
}: AccordionProps) {
  return (
    <div data-slot="accordion" className={className}>
      {children}
    </div>
  );
}

interface AccordionItemProps {
  children: React.ReactElement | React.ReactElement[];
  value: string;
  className?: string;
  disabled?: boolean;
}

function AccordionItem({ children, value, className, disabled }: AccordionItemProps) {
  return (
    <StyledAccordion
      data-slot="accordion-item"
      className={className}
      disabled={disabled}
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
