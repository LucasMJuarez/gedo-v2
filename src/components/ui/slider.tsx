import * as React from "react";
import MuiSlider, { SliderProps as MuiSliderProps } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { cn } from "./utils";

const StyledSlider = styled(MuiSlider)(({ theme }) => ({
  color: theme.palette.primary.main,
  height: 16,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 16,
    width: 16,
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0 0 0 4px ${theme.palette.primary.main}20`,
    },
    '&.Mui-active': {
      boxShadow: `0 0 0 4px ${theme.palette.primary.main}30`,
    },
  },
  '& .MuiSlider-track': {
    height: 16,
    border: 'none',
    borderRadius: 9999,
  },
  '& .MuiSlider-rail': {
    height: 16,
    borderRadius: 9999,
    opacity: 0.3,
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255,255,255,0.3)' 
      : 'rgba(0,0,0,0.3)',
  },
  '&.Mui-disabled': {
    opacity: 0.5,
    pointerEvents: 'none',
  },
}));

interface SliderProps extends Omit<MuiSliderProps, 'defaultValue' | 'value'> {
  className?: string;
  defaultValue?: number | number[];
  value?: number | number[];
  min?: number;
  max?: number;
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderProps) {
  return (
    <StyledSlider
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn("w-full", className)}
      {...props}
    />
  );
}

export { Slider };
