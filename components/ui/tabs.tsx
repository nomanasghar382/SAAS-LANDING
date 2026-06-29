"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

type TabsVariant = "default" | "pills" | "underline";

const TabsVariantContext = React.createContext<TabsVariant>("default");

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: TabsVariant;
  }
>(({ className, variant = "default", ...props }, ref) => (
  <TabsVariantContext.Provider value={variant}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex items-center text-muted-foreground",
        variant === "default" && [
          "h-9 rounded-lg bg-muted/60 p-1",
          "w-full sm:w-auto",
        ],
        variant === "pills" && "gap-1",
        variant === "underline" && [
          "h-10 gap-4 border-b border-border",
          "w-full overflow-x-auto",
        ],
        className
      )}
      {...props}
    />
  </TabsVariantContext.Provider>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(TabsVariantContext);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        [
          "inline-flex items-center justify-center whitespace-nowrap",
          "text-sm font-medium",
          "ds-transition",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
        ].join(" "),
        variant === "default" && [
          "rounded-md px-3 py-1",
          "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
          "hover:text-foreground",
        ],
        variant === "pills" && [
          "rounded-md px-3 py-1.5",
          "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
          "hover:bg-accent hover:text-accent-foreground",
        ],
        variant === "underline" && [
          "relative px-1 pb-3 pt-1",
          "data-[state=active]:text-foreground",
          "hover:text-foreground",
          "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5",
          "after:scale-x-0 after:bg-primary after:transition-transform",
          "data-[state=active]:after:scale-x-100",
        ],
        className
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      [
        "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2",
        "data-[state=active]:animate-[ds-fade-in_200ms_ease-out,ds-slide-up_200ms_ease-out]",
      ].join(" "),
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
