import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="text-sm font-semibold">
          {label}
        </label>
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <p className="text-red-600 text-xs">{error}</p>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
