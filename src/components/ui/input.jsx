import * as React from 'react';

import { cn } from '@/lib/utils';


const Input = React.forwardRef(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="text-sm font-semibold">
          {label}
        </label>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        <p className="text-red-600 text-xs">{error}</p>
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };