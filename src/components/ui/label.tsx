import * as React from "react";
import { styled } from "@mui/material/styles";
import { cn } from "./utils";

const StyledLabel = styled('label')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  fontSize: '0.875rem',
  lineHeight: 1,
  fontWeight: 500,
  userSelect: 'none',
  '&[data-disabled="true"]': {
    pointerEvents: 'none',
    opacity: 0.5,
  },
  '& + *:disabled, & ~ *:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
}));

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  children?: React.ReactNode;
}

function Label({ className, ...props }: LabelProps) {
  return (
    <StyledLabel
      data-slot="label"
      className={className}
      {...props}
    />
  );
}

export { Label };
