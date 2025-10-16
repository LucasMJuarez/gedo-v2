import * as React from "react";
import MuiRadioGroup, { RadioGroupProps as MuiRadioGroupProps } from "@mui/material/RadioGroup";
import MuiRadio, { RadioProps as MuiRadioProps } from "@mui/material/Radio";
import { styled } from "@mui/material/styles";
import { CircleIcon } from "lucide-react";
import { cn } from "./utils";

const StyledRadioGroup = styled(MuiRadioGroup)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
}));

const StyledRadio = styled(MuiRadio)(({ theme }) => ({
  padding: 0,
  width: 16,
  height: 16,
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
  '&.Mui-disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 16,
  },
}));

interface RadioGroupProps extends MuiRadioGroupProps {
  className?: string;
}

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <StyledRadioGroup
      data-slot="radio-group"
      className={className}
      {...props}
    />
  );
}

interface RadioGroupItemProps extends MuiRadioProps {
  className?: string;
}

function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  return (
    <StyledRadio
      data-slot="radio-group-item"
      className={cn("shrink-0", className)}
      icon={
        <span style={{
          width: 16,
          height: 16,
          border: '1px solid currentColor',
          borderRadius: '50%',
          display: 'block',
        }} />
      }
      checkedIcon={
        <span style={{
          width: 16,
          height: 16,
          border: '1px solid currentColor',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <CircleIcon style={{
            width: 8,
            height: 8,
            fill: 'currentColor',
            position: 'absolute',
          }} />
        </span>
      }
      {...props}
    />
  );
}

export { RadioGroup, RadioGroupItem };
