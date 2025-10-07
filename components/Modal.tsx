'use client';

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  ReactNode,
  useId,
  KeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalContextValue {
  titleId: string;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('Modal components must be used within Modal');
  return ctx;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, children, className = '' }: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusElRef = useRef<HTMLElement | null>(null);

  // Track and restore focus (layout phase for immediate focus)
  useLayoutEffect(() => {
    if (open) {
      restoreFocusElRef.current = (document.activeElement as HTMLElement) || null;
      // Lock body scroll
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Focus dialog immediately so tests can assert
      dialogRef.current?.focus();
      return () => {
        document.body.style.overflow = prevOverflow;
        if (restoreFocusElRef.current) {
          restoreFocusElRef.current.focus();
        }
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent | any) => {
      if ((e as KeyboardEvent).key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onKey as any);
    return () => document.removeEventListener('keydown', onKey as any);
  }, [open, onClose]);

  // Focus trap handler
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    const root = dialogRef.current;
    if (!root) return;
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

    if (focusables.length === 0) {
      e.preventDefault();
      root.focus();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const current = document.activeElement as HTMLElement | null;
    const goingBackward = e.shiftKey;

    if (!goingBackward && current === last) {
      e.preventDefault();
      (first as HTMLElement).focus();
    } else if (goingBackward && current === first) {
      e.preventDefault();
      (last as HTMLElement).focus();
    }
  };

  if (!open) return null;

  return createPortal(
    <ModalContext.Provider value={{ titleId, onClose }}>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          ref={dialogRef}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className={`relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto focus:outline-none ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body
  );
}

interface ModalHeaderProps {
  children: ReactNode;
  className?: string;
}

export function ModalHeader({ children, className = '' }: ModalHeaderProps) {
  const { titleId, onClose } = useModalContext();
  return (
    <div className={`flex items-start justify-between p-6 border-b border-gray-200 ${className}`}>
      <h2 id={titleId} className="text-2xl font-bold text-gray-900 pr-8">
        {children}
      </h2>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Close modal"
      >
        <X className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}

interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

export function ModalContent({ children, className = '' }: ModalContentProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export function ModalFooter({ children, className = '' }: ModalFooterProps) {
  return (
    <div className={`flex items-center justify-end gap-3 p-6 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export default Modal;
