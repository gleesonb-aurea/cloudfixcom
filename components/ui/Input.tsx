import * as React from 'react';

import { cn } from '@/lib/utils';

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
          // Base styles
          'flex h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base',
          'placeholder:text-gray-500',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
          'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',

          // Touch targets
          'min-h-[44px] min-w-[44px]',

          // State variants
          error && [
            'border-red-500 text-red-900',
            'focus:ring-red-500/20 focus:border-red-500',
            'placeholder:text-red-300'
          ],

          className
        )}
        ref={ref}
        aria-invalid={error}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };