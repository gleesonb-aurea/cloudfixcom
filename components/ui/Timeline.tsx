'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TimelineProps {
  className?: string;
  children: React.ReactNode;
}

export function Timeline({ className, children }: TimelineProps) {
  return (
    <ol role="list" className={cn('relative border-l border-gray-200 pl-6', className)}>
      {children}
    </ol>
  );
}

interface TimelineItemProps {
  title?: string;
  date?: string;
  current?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function TimelineItem({ title, date, current = false, className, children }: TimelineItemProps) {
  const [id] = React.useState(() => Math.random().toString(36).slice(2));
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const currentBtn = buttonRef.current;
    if (!currentBtn) return;
    const buttons = Array.from(
      currentBtn.closest('ol')?.querySelectorAll<HTMLButtonElement>('button[data-timeline-item]') || []
    );
    const idx = buttons.indexOf(currentBtn);
    const focus = (i: number) => buttons[i]?.focus();
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        focus(Math.min(idx + 1, buttons.length - 1));
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
        focus(buttons.length - 1);
        break;
    }
  };

  return (
    <li
      role="listitem"
      aria-current={current ? 'step' : undefined}
      className={cn('mb-10 ml-4', className)}
    >
      <span className="absolute -left-1.5 mt-1.5 flex h-3 w-3 items-center justify-center">
        <span className={cn('h-3 w-3 rounded-full border-2 border-primary', current && 'bg-primary')}></span>
      </span>

      <button
        ref={buttonRef}
        data-timeline-item
        type="button"
        aria-describedby={date ? `tl-date-${id}` : undefined}
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
        onKeyDown={onKeyDown}
      >
        {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
        {date && (
          <time id={`tl-date-${id}`} className="block text-sm text-gray-500">
            {date}
          </time>
        )}
        {children}
      </button>
    </li>
  );
}

interface TimelineContentProps {
  className?: string;
  children: React.ReactNode;
}

export function TimelineContent({ className, children }: TimelineContentProps) {
  return <div className={cn('mt-2 text-gray-700', className)}>{children}</div>;
}

export default Timeline;

