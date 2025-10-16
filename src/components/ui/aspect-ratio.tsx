"use client";

import * as React from "react";
import { Box, styled } from "@mui/material";

const StyledAspectRatioBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'ratio',
})<{ ratio?: number }>(({ ratio = 1 }) => ({
  position: 'relative',
  width: '100%',
  paddingBottom: `${(1 / ratio) * 100}%`,
  '& > *': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
  children?: React.ReactNode;
}

function AspectRatio({ ratio = 1, children, ...props }: AspectRatioProps) {
  return (
    <StyledAspectRatioBox ratio={ratio} data-slot="aspect-ratio" {...props}>
      {children}
    </StyledAspectRatioBox>
  );
}

export { AspectRatio };
