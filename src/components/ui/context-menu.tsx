"use client";"use client";



import * as React from "react";import * as React from "react";

import {import * as ContextMenuPrimitive from "@radix-ui/react-context-menu@2.2.6";

  Menu as MuiMenu,import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react@0.487.0";

  MenuItem as MuiMenuItem,

  Divider,import { cn } from "./utils";

  ListItemIcon,

  Typography,function ContextMenu({

  styled,  ...props

} from "@mui/material";}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {

import { CheckIcon, ChevronRight, Circle } from "lucide-react";  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;

}

import { cn } from "./utils";

function ContextMenuTrigger({

// Context para el menú contextual  ...props

type ContextMenuContextValue = {}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {

  contextMenu: { mouseX: number; mouseY: number } | null;  return (

  handleContextMenu: (event: React.MouseEvent) => void;    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />

  handleClose: () => void;  );

};}



const ContextMenuContext = React.createContext<ContextMenuContextValue | null>(null);function ContextMenuGroup({

  ...props

function useContextMenu() {}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {

  const context = React.useContext(ContextMenuContext);  return (

  if (!context) {    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />

    throw new Error("ContextMenu components must be used within ContextMenu");  );

  }}

  return context;

}function ContextMenuPortal({

  ...props

const StyledMenu = styled(MuiMenu)(({ theme }) => ({}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {

  '& .MuiPaper-root': {  return (

    minWidth: '8rem',    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />

    borderRadius: theme.shape.borderRadius,  );

    backgroundColor: 'var(--popover)',}

    color: 'var(--popover-foreground)',

    border: '1px solid var(--border)',function ContextMenuSub({

    boxShadow: theme.shadows[4],  ...props

    padding: theme.spacing(0.5),}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {

  },  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;

}));}



const StyledMenuItem = styled(MuiMenuItem, {function ContextMenuRadioGroup({

  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'inset',  ...props

})<{ variant?: 'default' | 'destructive'; inset?: boolean }>(({ theme, variant, inset }) => ({}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {

  borderRadius: theme.shape.borderRadius / 2,  return (

  padding: theme.spacing(1, 2),    <ContextMenuPrimitive.RadioGroup

  fontSize: '0.875rem',      data-slot="context-menu-radio-group"

  gap: theme.spacing(1),      {...props}

  paddingLeft: inset ? theme.spacing(4) : theme.spacing(2),    />

    );

  ...(variant === 'destructive' && {}

    color: 'var(--destructive)',

    '&:focus, &:hover': {function ContextMenuSubTrigger({

      backgroundColor: 'var(--destructive)',  className,

      opacity: 0.1,  inset,

    },  children,

  }),  ...props

  }: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {

  '&:focus, &:hover': {  inset?: boolean;

    backgroundColor: 'var(--accent)',}) {

    color: 'var(--accent-foreground)',  return (

  },    <ContextMenuPrimitive.SubTrigger

}));      data-slot="context-menu-sub-trigger"

      data-inset={inset}

interface ContextMenuProps {      className={cn(

  children: React.ReactNode;        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

}        className,

      )}

function ContextMenu({ children }: ContextMenuProps) {      {...props}

  const [contextMenu, setContextMenu] = React.useState<{ mouseX: number; mouseY: number } | null>(null);    >

      {children}

  const handleContextMenu = (event: React.MouseEvent) => {      <ChevronRightIcon className="ml-auto" />

    event.preventDefault();    </ContextMenuPrimitive.SubTrigger>

    setContextMenu(  );

      contextMenu === null}

        ? { mouseX: event.clientX + 2, mouseY: event.clientY - 6 }

        : nullfunction ContextMenuSubContent({

    );  className,

  };  ...props

}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {

  const handleClose = () => {  return (

    setContextMenu(null);    <ContextMenuPrimitive.SubContent

  };      data-slot="context-menu-sub-content"

      className={cn(

  return (        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",

    <ContextMenuContext.Provider value={{ contextMenu, handleContextMenu, handleClose }}>        className,

      <div data-slot="context-menu">{children}</div>      )}

    </ContextMenuContext.Provider>      {...props}

  );    />

}  );

}

interface ContextMenuTriggerProps {

  children: React.ReactElement;function ContextMenuContent({

}  className,

  ...props

function ContextMenuTrigger({ children }: ContextMenuTriggerProps) {}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {

  const { handleContextMenu } = useContextMenu();  return (

    <ContextMenuPrimitive.Portal>

  if (React.isValidElement(children)) {      <ContextMenuPrimitive.Content

    const child = children as React.ReactElement<{ onContextMenu?: (e: React.MouseEvent) => void }>;        data-slot="context-menu-content"

    return React.cloneElement(child, {        className={cn(

      onContextMenu: (e: React.MouseEvent) => {          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",

        child.props.onContextMenu?.(e);          className,

        handleContextMenu(e);        )}

      },        {...props}

    });      />

  }    </ContextMenuPrimitive.Portal>

  );

  return <div onContextMenu={handleContextMenu}>{children}</div>;}

}

function ContextMenuItem({

interface ContextMenuContentProps {  className,

  children: React.ReactNode;  inset,

  className?: string;  variant = "default",

}  ...props

}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {

function ContextMenuContent({ children, className }: ContextMenuContentProps) {  inset?: boolean;

  const { contextMenu, handleClose } = useContextMenu();  variant?: "default" | "destructive";

}) {

  return (  return (

    <StyledMenu    <ContextMenuPrimitive.Item

      open={contextMenu !== null}      data-slot="context-menu-item"

      onClose={handleClose}      data-inset={inset}

      anchorReference="anchorPosition"      data-variant={variant}

      anchorPosition={      className={cn(

        contextMenu !== null        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }        className,

          : undefined      )}

      }      {...props}

      data-slot="context-menu-content"    />

      className={className}  );

    >}

      {children}

    </StyledMenu>function ContextMenuCheckboxItem({

  );  className,

}  children,

  checked,

interface ContextMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {  ...props

  inset?: boolean;}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {

  variant?: 'default' | 'destructive';  return (

  disabled?: boolean;    <ContextMenuPrimitive.CheckboxItem

  children: React.ReactNode;      data-slot="context-menu-checkbox-item"

}      className={cn(

        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

function ContextMenuItem({ className, inset, variant = 'default', disabled, children, onClick, ...props }: ContextMenuItemProps) {        className,

  const { handleClose } = useContextMenu();      )}

      checked={checked}

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {      {...props}

    onClick?.(e as any);    >

    handleClose();      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">

  };        <ContextMenuPrimitive.ItemIndicator>

          <CheckIcon className="size-4" />

  return (        </ContextMenuPrimitive.ItemIndicator>

    <StyledMenuItem      </span>

      onClick={handleClick}      {children}

      disabled={disabled}    </ContextMenuPrimitive.CheckboxItem>

      variant={variant}  );

      inset={inset}}

      data-slot="context-menu-item"

      className={className}function ContextMenuRadioItem({

      {...props}  className,

    >  children,

      {children}  ...props

    </StyledMenuItem>}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {

  );  return (

}    <ContextMenuPrimitive.RadioItem

      data-slot="context-menu-radio-item"

interface ContextMenuCheckboxItemProps extends React.HTMLAttributes<HTMLLIElement> {      className={cn(

  checked?: boolean;        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

  children: React.ReactNode;        className,

  disabled?: boolean;      )}

}      {...props}

    >

function ContextMenuCheckboxItem({ className, children, checked, disabled, onClick, ...props }: ContextMenuCheckboxItemProps) {      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">

  return (        <ContextMenuPrimitive.ItemIndicator>

    <StyledMenuItem          <CircleIcon className="size-2 fill-current" />

      onClick={onClick}        </ContextMenuPrimitive.ItemIndicator>

      disabled={disabled}      </span>

      data-slot="context-menu-checkbox-item"      {children}

      className={cn("pl-8", className)}    </ContextMenuPrimitive.RadioItem>

      {...props}  );

    >}

      <ListItemIcon sx={{ minWidth: '24px', position: 'absolute', left: 8 }}>

        {checked && <CheckIcon className="size-4" />}function ContextMenuLabel({

      </ListItemIcon>  className,

      {children}  inset,

    </StyledMenuItem>  ...props

  );}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {

}  inset?: boolean;

}) {

interface ContextMenuRadioItemProps extends React.HTMLAttributes<HTMLLIElement> {  return (

  value: string;    <ContextMenuPrimitive.Label

  children: React.ReactNode;      data-slot="context-menu-label"

  disabled?: boolean;      data-inset={inset}

}      className={cn(

        "text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",

function ContextMenuRadioItem({ className, children, disabled, onClick, ...props }: ContextMenuRadioItemProps) {        className,

  return (      )}

    <StyledMenuItem      {...props}

      onClick={onClick}    />

      disabled={disabled}  );

      data-slot="context-menu-radio-item"}

      className={cn("pl-8", className)}

      {...props}function ContextMenuSeparator({

    >  className,

      <ListItemIcon sx={{ minWidth: '24px', position: 'absolute', left: 8 }}>  ...props

        <Circle className="size-2 fill-current" />}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {

      </ListItemIcon>  return (

      {children}    <ContextMenuPrimitive.Separator

    </StyledMenuItem>      data-slot="context-menu-separator"

  );      className={cn("bg-border -mx-1 my-1 h-px", className)}

}      {...props}

    />

interface ContextMenuLabelProps {  );

  inset?: boolean;}

  children: React.ReactNode;

  className?: string;function ContextMenuShortcut({

}  className,

  ...props

function ContextMenuLabel({ className, inset, children }: ContextMenuLabelProps) {}: React.ComponentProps<"span">) {

  return (  return (

    <Typography    <span

      component="div"      data-slot="context-menu-shortcut"

      data-slot="context-menu-label"      className={cn(

      className={cn("px-2 py-1.5 text-sm font-medium text-foreground", inset && "pl-8", className)}        "text-muted-foreground ml-auto text-xs tracking-widest",

    >        className,

      {children}      )}

    </Typography>      {...props}

  );    />

}  );

}

function ContextMenuSeparator({ className }: { className?: string }) {

  return (export {

    <Divider  ContextMenu,

      data-slot="context-menu-separator"  ContextMenuTrigger,

      className={cn("my-1 -mx-1", className)}  ContextMenuContent,

    />  ContextMenuItem,

  );  ContextMenuCheckboxItem,

}  ContextMenuRadioItem,

  ContextMenuLabel,

interface ContextMenuShortcutProps {  ContextMenuSeparator,

  children: React.ReactNode;  ContextMenuShortcut,

  className?: string;  ContextMenuGroup,

}  ContextMenuPortal,

  ContextMenuSub,

function ContextMenuShortcut({ className, children }: ContextMenuShortcutProps) {  ContextMenuSubContent,

  return (  ContextMenuSubTrigger,

    <span  ContextMenuRadioGroup,

      data-slot="context-menu-shortcut"};

      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
    >
      {children}
    </span>
  );
}

// Componentes simplificados para compatibilidad
function ContextMenuGroup({ children }: { children: React.ReactNode }) {
  return <div data-slot="context-menu-group">{children}</div>;
}

function ContextMenuPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function ContextMenuSub({ children }: { children: React.ReactNode }) {
  return <div data-slot="context-menu-sub">{children}</div>;
}

function ContextMenuSubContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div data-slot="context-menu-sub-content" className={className}>{children}</div>;
}

interface ContextMenuSubTriggerProps {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
}

function ContextMenuSubTrigger({ children, className, inset }: ContextMenuSubTriggerProps) {
  return (
    <StyledMenuItem data-slot="context-menu-sub-trigger" className={className} inset={inset}>
      {children}
      <ChevronRight className="ml-auto size-4" />
    </StyledMenuItem>
  );
}

function ContextMenuRadioGroup({ children }: { children: React.ReactNode }) {
  return <div data-slot="context-menu-radio-group">{children}</div>;
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
