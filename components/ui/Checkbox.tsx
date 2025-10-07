'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Base checkbox styling
      'peer h-5 w-5 shrink-0 rounded-md border-2 border-gray-300 bg-white',
      'focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus-visible:outline-none',
      'transition-colors duration-200',
      'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:border-gray-200 disabled:opacity-50',

      // State variants
      error && [
        'border-red-500 text-red-600',
        'focus:ring-red-500/20'
      ],

      // Checked state
      'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white',

      className
    )}
    aria-invalid={error}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="h-3.5 w-3.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };