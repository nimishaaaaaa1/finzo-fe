import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>>(
  ({ children, ...props }, ref) => (
    <DropdownMenuPrimitive.Content
      ref={ref}
      {...props}
      className="bg-white shadow-md rounded-md p-2"
    >
      {children}
    </DropdownMenuPrimitive.Content>
  )
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

export const DropdownMenuItem = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>>(
  ({ children, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      {...props}
      className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
    >
      {children}
    </DropdownMenuPrimitive.Item>
  )
);
DropdownMenuItem.displayName = 'DropdownMenuItem'; 