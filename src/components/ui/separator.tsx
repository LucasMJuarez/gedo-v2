import * as React from "react";
import MuiDivider, { DividerProps as MuiDividerProps } from "@mui/material/Divider";
import { cn } from "./utils";

interface SeparatorProps extends Omit<MuiDividerProps, 'orientation'> {
  className?: string;
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <MuiDivider
      data-slot="separator-root"
      orientation={orientation}
      className={cn("shrink-0", className)}
      role={decorative ? "presentation" : "separator"}
      aria-orientation={orientation}
      {...props}
    />
  );
}

export { Separator };
