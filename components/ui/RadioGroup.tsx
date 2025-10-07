'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type Option = { value: string; label: string; disabled?: boolean };

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options?: Option[];
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, options, name, value, defaultValue, onValueChange, children, ...props }, ref) => {
    const [internal, setInternal] = React.useState<string | undefined>(defaultValue);
    const current = value !== undefined ? value : internal;

    const handleChange = (val: string) => {
      if (value === undefined) setInternal(val);
      onValueChange?.(val);
    };

    return (
      <div role="radiogroup" ref={ref} className={cn('grid gap-3', className)} {...props}>
        {options
          ? options.map((option) => (
              <label key={option.value} className={cn('flex items-center gap-2', option.disabled && 'opacity-50 cursor-not-allowed')}>
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  disabled={!!option.disabled}
                  checked={current === option.value}
                  onChange={() => handleChange(option.value)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    'inline-flex h-4 w-4 items-center justify-center rounded-full border border-gray-300',
                    'peer-checked:border-primary peer-checked:bg-primary',
                  )}
                />
                <span className="text-sm leading-none">{option.label}</span>
              </label>
            ))
          : children}
      </div>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
