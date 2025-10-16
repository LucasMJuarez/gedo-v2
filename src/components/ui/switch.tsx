import * as React from "react";
import MuiSwitch, { SwitchProps as MuiSwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { cn } from "./utils";

const StyledSwitch = styled(MuiSwitch)(({ theme }) => ({
  width: 32,
  height: 18.4,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 18,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(11px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(14px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
      },
    },
    '&.Mui-disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 16,
    height: 16,
    borderRadius: 8,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 18.4 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255,255,255,.35)'
      : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

interface SwitchProps extends MuiSwitchProps {
  className?: string;
}

function Switch({ className, ...props }: SwitchProps) {
  return (
    <StyledSwitch
      data-slot="switch"
      className={cn("peer", className)}
      focusVisibleClassName="focus-visible:ring-ring/50 focus-visible:ring-[3px]"
      {...props}
    />
  );
}

export { Switch };
