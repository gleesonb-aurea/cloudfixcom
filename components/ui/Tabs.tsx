'use client';

import React, { createContext, useContext, useEffect, useId, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

type TabsContextValue = {
  value: string;
  setValue: (v: string) => void;
  baseId: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);
function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs components must be used within <Tabs>');
  return ctx;
}

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

export function Tabs({ defaultValue, value: controlled, onValueChange, className, children }: TabsProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '');
  const isControlled = controlled !== undefined;
  const value = isControlled ? (controlled as string) : uncontrolled;

  const baseId = useId();

  const api: TabsContextValue = useMemo(
    () => ({
      value,
      setValue: (v) => {
        if (isControlled) {
          onValueChange?.(v);
        } else {
          setUncontrolled(v);
          onValueChange?.(v);
        }
      },
      baseId,
    }),
    [value, isControlled, onValueChange, baseId]
  );

  // No implicit initialization needed if defaultValue not provided

  return (
    <TabsContext.Provider value={api}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

export function TabsList({ className, children }: TabsListProps) {
  return (
    <div role="tablist" className={cn('inline-flex items-center gap-2', className)}>
      {children}
    </div>
  );
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({ value: val, className, children, ...props }: TabsTriggerProps) {
  const { value, setValue, baseId } = useTabs();
  const id = `${baseId}-tab-${val}`;
  const selected = value === val;
  const ref = React.useRef<HTMLButtonElement>(null);

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const current = ref.current;
    if (!current) return;
    const tabs = Array.from(current.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]') || []);
    const idx = tabs.indexOf(current);
    if (idx === -1) return;

    const focusTab = (nextIdx: number) => {
      tabs[nextIdx]?.focus();
    };

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        focusTab((idx + 1) % tabs.length);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        focusTab((idx - 1 + tabs.length) % tabs.length);
        break;
      case 'Home':
        e.preventDefault();
        focusTab(0);
        break;
      case 'End':
        e.preventDefault();
        focusTab(tabs.length - 1);
        break;
      case 'Enter':
      case ' ': // Space
        e.preventDefault();
        setValue(val);
        break;
    }
  };

  return (
    <button
      ref={ref}
      role="tab"
      id={id}
      type="button"
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${val}`}
      tabIndex={selected ? 0 : -1}
      className={cn(
        'px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:text-primary hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        selected && 'bg-primary text-white border-primary',
        className
      )}
      onClick={() => setValue(val)}
      onKeyDown={onKeyDown}
      {...props}
    >
      {children}
    </button>
  );
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ value: val, className, children, ...props }: TabsContentProps) {
  const { value, baseId } = useTabs();
  const id = `${baseId}-panel-${val}`;
  const selected = value === val;

  return (
    <div
      role="tabpanel"
      id={id}
      aria-labelledby={`${baseId}-tab-${val}`}
      hidden={!selected}
      className={cn(selected ? 'block' : 'hidden', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Tabs;
