import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, autoResize = false, rows = 3, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null);
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    // Auto-resize functionality
    React.useEffect(() => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current;

        const resizeTextarea = () => {
          textarea.style.height = 'auto';
          textarea.style.height = `${textarea.scrollHeight}px`;
        };

        resizeTextarea();

        // Resize on content change
        textarea.addEventListener('input', resizeTextarea);
        return () => textarea.removeEventListener('input', resizeTextarea);
      }
    }, [autoResize]);

    return (
      <textarea
        ref={textareaRef}
        rows={rows}
        className={cn(
          // Base styles
          'flex min-h-[100px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2',
          'text-base text-gray-900 placeholder:text-gray-500',
          'transition-colors duration-200 resize-none',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
          'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',

          // Touch targets
          'min-h-[44px]',

          // State variants
          error && [
            'border-red-500 text-red-900',
            'focus:ring-red-500/20 focus:border-red-500',
            'placeholder:text-red-300'
          ],

          // Auto resize
          autoResize && 'overflow-hidden',

          className
        )}
        aria-invalid={error}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };