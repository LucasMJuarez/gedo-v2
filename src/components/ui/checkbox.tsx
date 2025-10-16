import * as React from "react";
import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import { CheckIcon } from "lucide-react";
import { cn } from "./utils";

const StyledCheckbox = styled(MuiCheckbox)(({ theme }) => ({
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

interface CheckboxProps extends Omit<MuiCheckboxProps, 'size'> {
  className?: string;
}

function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <StyledCheckbox
      data-slot="checkbox"
      className={cn("peer", className)}
      icon={<span style={{ width: 16, height: 16, border: '1px solid currentColor', borderRadius: 4, display: 'block' }} />}
      checkedIcon={
        <span style={{ 
          width: 16, 
          height: 16, 
          border: '1px solid currentColor', 
          borderRadius: 4, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'currentColor',
          color: 'white'
        }}>
          <CheckIcon style={{ width: 14, height: 14 }} />
        </span>
      }
      {...props}
    />
  );
}

export { Checkbox };
