import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center rounded-md border px-2 py-0.5",
    "text-xs font-medium",
    "ds-transition",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "border-transparent bg-primary/10 text-primary",
          "hover:bg-primary/15",
        ].join(" "),
        secondary: [
          "border-transparent bg-secondary text-secondary-foreground",
          "hover:bg-secondary/80",
        ].join(" "),
        outline: [
          "border-border text-foreground",
          "hover:bg-accent",
        ].join(" "),
        success: [
          "border-transparent bg-emerald-500/10 text-emerald-700",
          "dark:text-emerald-400",
          "hover:bg-emerald-500/15",
        ].join(" "),
        warning: [
          "border-transparent bg-amber-500/10 text-amber-700",
          "dark:text-amber-400",
          "hover:bg-amber-500/15",
        ].join(" "),
        destructive: [
          "border-transparent bg-destructive/10 text-destructive",
          "hover:bg-destructive/15",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
