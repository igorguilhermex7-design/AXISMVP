import React from 'react';
import { cn } from '@/src/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'inverted' | 'positive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2867F5] disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]',
          {
            // Primary electric blue
            'bg-[#2867F5] text-white hover:bg-[#1D54DB] shadow-md shadow-[#2867F5]/25': variant === 'primary',
            // Elevated surface button
            'bg-[#191D32] text-[#F3F5FC] hover:bg-[#232942] border border-[#232942] shadow-sm': variant === 'secondary',
            // Inverted soft white button
            'bg-[#F3F5FC] text-[#050713] hover:bg-[#E3E7F3] font-semibold shadow-md': variant === 'inverted',
            // Outline button with subtle dark border
            'border border-[#232942] text-[#F3F5FC] hover:bg-[#111528] hover:border-[#2867F5]/50': variant === 'outline',
            // Ghost button
            'text-[#8B91A8] hover:text-[#F3F5FC] hover:bg-[#111528]': variant === 'ghost',
            // Positive green button
            'bg-[#27C875] text-[#050713] hover:bg-[#20A862] font-semibold shadow-md shadow-[#27C875]/20': variant === 'positive',
            
            // Sizes
            'h-9 px-3.5 text-xs rounded-xl gap-1.5': size === 'sm',
            'h-11 px-5 text-sm rounded-2xl gap-2': size === 'md',
            'h-13 px-6 text-base rounded-2xl gap-2.5': size === 'lg',
            'h-10 w-10 p-0 rounded-2xl flex items-center justify-center': size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
