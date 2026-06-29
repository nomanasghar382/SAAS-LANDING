import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          [
            "flex h-9 w-full rounded-md border bg-background px-3 py-1",
            "text-sm shadow-xs",
            "ds-transition",
            "placeholder:text-muted-foreground/60",
            "hover:border-border/80",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:border-ring/50",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-input",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          ].join(" "),
          error
            ? "border-destructive focus-visible:ring-destructive/30 focus-visible:border-destructive"
            : "border-input",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
