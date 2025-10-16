"use client";

import * as React from "react";
import { Box, styled } from "@mui/material";

import { cn } from "./utils";

const StyledScrollArea = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '10px',
    height: '10px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
    borderLeft: '1px solid transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'var(--border)',
    borderRadius: '9999px',
    '&:hover': {
      backgroundColor: 'var(--border)',
      opacity: 0.8,
    },
  },
  '&:focus-visible': {
    outline: 'none',
    boxShadow: '0 0 0 3px var(--ring)',
  },
}));

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <StyledScrollArea
      data-slot="scroll-area"
      className={cn(className)}
      {...props}
    >
      {children}
    </StyledScrollArea>
  );
}

interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
}

function ScrollBar({ className, orientation = "vertical", ...props }: ScrollBarProps) {
  // MUI Box handles scrollbars via CSS, so this is just for API compatibility
  return null;
}

export { ScrollArea, ScrollBar };
