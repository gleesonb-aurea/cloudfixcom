'use client';

import React, { createContext, useContext, useId, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

type AccordionContextValue = {
  openValues: Set<string>;
  toggle: (v: string) => void;
  isOpen: (v: string) => boolean;
  baseId: string;
  multiple: boolean;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);
function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion components must be used within <Accordion>');
  return ctx;
}

interface AccordionProps {
  multiple?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Accordion({ multiple = false, className, children }: AccordionProps) {
  const [openValues, setOpenValues] = useState<Set<string>>(new Set());
  const baseId = useId();

  const api: AccordionContextValue = useMemo(
    () => ({
      openValues,
      multiple,
      baseId,
      toggle: (v) => {
        setOpenValues((prev) => {
          const next = new Set(prev);
          const isOpen = next.has(v);
          if (multiple) {
            if (isOpen) next.delete(v);
            else next.add(v);
          } else {
            next.clear();
            if (!isOpen) next.add(v);
          }
          return next;
        });
      },
      isOpen: (v) => openValues.has(v),
    }),
    [openValues, multiple, baseId]
  );

  return (
    <AccordionContext.Provider value={api}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export function AccordionItem({ value, className, children }: AccordionItemProps) {
  return <div className={cn('border-b border-gray-200', className)} data-value={value}>{children}</div>;
}

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function AccordionTrigger({ children, className, ...props }: AccordionTriggerProps) {
  const { toggle, isOpen, baseId } = useAccordion();
  // Find the nearest item to read its value
  const [val, setVal] = React.useState<string>('');
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const el = ref.current?.closest('[data-value]') as HTMLElement | null;
    if (el) setVal(el.getAttribute('data-value') || '');
  }, []);

  const open = isOpen(val);
  const triggerId = `${baseId}-trigger-${val}`;
  const panelId = `${baseId}-panel-${val}`;

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const current = ref.current;
    if (!current) return;
    const triggers = Array.from(current.parentElement?.parentElement?.querySelectorAll<HTMLButtonElement>('button[role="button"], button') || []);
    const idx = triggers.indexOf(current);
    if (idx === -1) return;
    const focus = (i: number) => triggers[i]?.focus();
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        focus(Math.min(idx + 1, triggers.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        focus(Math.max(idx - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        focus(0);
        break;
      case 'End':
        e.preventDefault();
        focus(triggers.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        toggle(val);
        break;
    }
  };

  return (
    <button
      ref={ref}
      id={triggerId}
      type="button"
      aria-expanded={open}
      aria-controls={panelId}
      className={cn(
        'w-full flex items-center justify-between px-4 py-4 text-left text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      onClick={() => toggle(val)}
      onKeyDown={onKeyDown}
      {...props}
    >
      <span className="font-medium">{children}</span>
      <svg
        className={cn('w-5 h-5 transition-transform duration-200', open && 'rotate-180')}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AccordionContent({ children, className, ...props }: AccordionContentProps) {
  const { isOpen, baseId } = useAccordion();
  const [val, setVal] = React.useState<string>('');

  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = ref.current?.closest('[data-value]') as HTMLElement | null;
    if (el) setVal(el.getAttribute('data-value') || '');
  }, []);

  const open = isOpen(val);
  const panelId = `${baseId}-panel-${val}`;
  const triggerId = `${baseId}-trigger-${val}`;

  return (
    <div
      ref={ref}
      id={panelId}
      role="region"
      aria-labelledby={triggerId}
      hidden={!open}
      className={cn(open ? 'block' : 'hidden', 'px-4 pb-4 text-gray-700', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Accordion;

