import * as React from "react";
import MuiLinearProgress, { LinearProgressProps as MuiLinearProgressProps } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { cn } from "./utils";

const StyledLinearProgress = styled(MuiLinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 9999,
  backgroundColor: theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.2)'
    : 'rgba(0, 0, 0, 0.2)',
  '& .MuiLinearProgress-bar': {
    borderRadius: 9999,
    backgroundColor: theme.palette.primary.main,
  },
}));

interface ProgressProps extends Omit<MuiLinearProgressProps, 'value'> {
  className?: string;
  value?: number;
}

function Progress({
  className,
  value,
  ...props
}: ProgressProps) {
  return (
    <StyledLinearProgress
      data-slot="progress"
      className={cn("w-full", className)}
      variant={value !== undefined ? "determinate" : "indeterminate"}
      value={value}
      {...props}
    />
  );
}

export { Progress };
