import * as React from "react";
import MuiAvatar, { AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";
import { cn } from "./utils";

interface AvatarProps extends MuiAvatarProps {
  className?: string;
  children?: React.ReactNode;
}

function Avatar({ className, children, ...props }: AvatarProps) {
  return (
    <MuiAvatar
      data-slot="avatar"
      className={cn("size-10", className)}
      {...props}
    >
      {children}
    </MuiAvatar>
  );
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  src: string;
  alt?: string;
}

function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <img
      data-slot="avatar-image"
      className={cn("aspect-square size-full rounded-full object-cover", className)}
      {...props}
    />
  );
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

function AvatarFallback({ className, children, ...props }: AvatarFallbackProps) {
  return (
    <div
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
