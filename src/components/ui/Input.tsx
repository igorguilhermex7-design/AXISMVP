import React from 'react';
import { cn } from '@/src/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3.5 text-[#8B91A8] pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'flex h-12 w-full rounded-2xl border border-[#232942] bg-[#111528] px-4 py-2 text-sm text-[#F3F5FC] placeholder:text-[#8B91A8]/60 focus:outline-none focus:border-[#2867F5] focus:ring-1 focus:ring-[#2867F5] transition-all disabled:cursor-not-allowed disabled:opacity-40',
            icon && 'pl-11',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';
