'use client';

import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  requiredField?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, disabled, error, requiredField, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
      <div className='flex flex-col gap-2 w-full bg-inherit'>
        <label className='font-medium text-sm text-black bg-inherit'>
          {label}
          {requiredField && <span className='text-red-600 text-xs bg-inherit'>*</span>}
        </label>
        <input
          type={isVisible ? 'text' : 'password'}
          className={cn(
            `flex h-10 w-full rounded-md border border-gray-300 
            bg-[#F7F7F5] px-3 py-2 text-sm ring-offset-background 
            file:border-0 file:bg-transparent file:text-sm file:font-medium 
            placeholder:text-muted-foreground focus-visible:outline-none 
            focus-visible:ring-2 focus-visible:ring-ring 
            focus-visible:ring-offset-2 disabled:cursor-not-allowed 
            disabled:opacity-50`,
            className,
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <div
          role='button'
          className='relative  hover:bg-transparent'
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {isVisible ? (
            <Eye
              className='absolute right-[8px] bottom-[18px]  h-5 w-5 '
              aria-hidden='true'
            />
          ) : (
            <EyeOff
              className='absolute  right-[8px] bottom-[18px] h-5 w-5 '
              aria-hidden='true'
            />
          )}
        </div>
        {error && <p className='text-red-600 text-xs bg-inherit'>{error}</p>}
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
