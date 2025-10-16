import * as React from "react";
import { Breadcrumbs as MuiBreadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "./utils";

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

interface BreadcrumbListProps {
  children: React.ReactNode;
  className?: string;
}

function BreadcrumbList({ className, children }: BreadcrumbListProps) {
  return (
    <MuiBreadcrumbs
      separator={<ChevronRight className="size-3.5" />}
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className,
      )}
    >
      {children}
    </MuiBreadcrumbs>
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

interface BreadcrumbLinkProps {
  asChild?: boolean;
  children: React.ReactNode;
  href?: string;
  className?: string;
}

function BreadcrumbLink({
  asChild,
  className,
  children,
  href,
}: BreadcrumbLinkProps) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn("hover:text-foreground transition-colors", className),
      'data-slot': 'breadcrumb-link',
    } as any);
  }

  return (
    <MuiLink
      href={href}
      underline="hover"
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      sx={{ color: 'inherit' }}
    >
      {children}
    </MuiLink>
  );
}

interface BreadcrumbPageProps {
  className?: string;
  children: React.ReactNode;
}

function BreadcrumbPage({ className, children }: BreadcrumbPageProps) {
  return (
    <Typography
      component="span"
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      sx={{ color: 'inherit' }}
    >
      {children}
    </Typography>
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
