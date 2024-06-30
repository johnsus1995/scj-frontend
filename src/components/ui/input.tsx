import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    label?:string;
    requiredField?:boolean;
    error?:string;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, requiredField, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 bg-inherit">
        {label && (
          <label className='font-medium text-sm text-black bg-inherit'>
            {label}
            {requiredField && <span className='text-red-600 bg-inherit'>*</span>}
          </label>
        )}
        <input
          type={type}
          className={cn(
            `flex h-10 w-full rounded-md border border-gray-300 
          bg-[#F7F7F5] px-3 py-2 text-sm ring-offset-background 
          file:border-0 file:bg-transparent file:text-sm file:font-medium 
          placeholder:text-muted-foreground focus-visible:outline-none 
          focus-visible:ring-2 focus-visible:ring-ring 
          focus-visible:ring-offset-2 disabled:cursor-not-allowed 
          disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className='text-red-600 text-xs bg-inherit'>{error}</p>}

      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
