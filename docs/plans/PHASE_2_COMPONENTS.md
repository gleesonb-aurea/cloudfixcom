# Phase 2: Component Library - Detailed Implementation

**Parent Document**: [FULL_SITE_IMPLEMENTATION_PLAN.md](./FULL_SITE_IMPLEMENTATION_PLAN.md)
**Status**: Ready for Implementation
**Priority**: 🟡 HIGH
**Estimated Effort**: 50-60 hours
**Dependencies**: Phase 1 Complete
**Target Completion**: October 20, 2025

---

## Overview

Phase 2 builds the reusable interactive components needed across product and content pages. Each component follows Test-Driven Development (TDD), is fully accessible (WCAG 2.1 AA), and uses CloudFix brand colors.

**Components to Build**:
1. ✅ Carousel/Slider (see main plan)
2. Modal/Dialog
3. Tabs
4. Accordion
5. Timeline
6. Animation Hooks
7. Enhanced Cards (Testimonial, Resource, Team)

---

## Task 2.2: Modal/Dialog Component

**⏱️ Estimated Time**: 6 hours
**🎯 Goal**: Build accessible modal for videos, forms, and content

**Context**: Product pages need modals for:
- Video demonstrations
- Detailed feature explanations
- Image galleries
- Contact forms

**What You're Building**:
- Portal rendering (renders outside DOM hierarchy)
- Focus trap (Tab stays within modal)
- Body scroll lock (prevent background scrolling)
- Backdrop click to close
- Escape key to close
- Smooth animations
- Accessible with ARIA attributes

**Files to Create**:
- `components/Modal.tsx` - Main modal component
- `components/ModalContent.tsx` - Content wrapper
- `components/ModalHeader.tsx` - Header with close button
- `__tests__/Modal.test.tsx` - Test file

**Dependencies**:
```bash
# Already installed
# Uses React's createPortal, no new dependencies needed
```

---

### Step 1: Write Failing Tests (1 hour)

```tsx
// __tests__/Modal.test.tsx
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal, ModalContent, ModalHeader } from '@/components/Modal';

describe('Modal', () => {
  describe('rendering', () => {
    test('does not render when closed', () => {
      render(
        <Modal open={false} onClose={jest.fn()}>
          <ModalContent>Modal content</ModalContent>
        </Modal>
      );

      expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
    });

    test('renders when open', () => {
      render(
        <Modal open={true} onClose={jest.fn()}>
          <ModalContent>Modal content</ModalContent>
        </Modal>
      );

      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    test('renders with header', () => {
      render(
        <Modal open={true} onClose={jest.fn()}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalContent>Content</ModalContent>
        </Modal>
      );

      expect(screen.getByText('Modal Title')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    test('calls onClose when backdrop clicked', () => {
      const handleClose = jest.fn();

      render(
        <Modal open={true} onClose={handleClose}>
          <ModalContent>Content</ModalContent>
        </Modal>
      );

      const backdrop = screen.getByRole('dialog').parentElement;
      fireEvent.click(backdrop!);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    test('calls onClose when Escape key pressed', () => {
      const handleClose = jest.fn();

      render(
        <Modal open={true} onClose={handleClose}>
          <ModalContent>Content</ModalContent>
        </Modal>
      );

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    test('calls onClose when close button clicked', () => {
      const handleClose = jest.fn();

      render(
        <Modal open={true} onClose={handleClose}>
          <ModalHeader>Title</ModalHeader>
          <ModalContent>Content</ModalContent>
        </Modal>
      );

      const closeButton = screen.getByLabelText('Close modal');
      fireEvent.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    test('does not call onClose when content clicked', () => {
      const handleClose = jest.fn();

      render(
        <Modal open={true} onClose={handleClose}>
          <ModalContent>Content</ModalContent>
        </Modal>
      );

      const content = screen.getByText('Content');
      fireEvent.click(content);

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('focus management', () => {
    test('traps focus within modal', async () => {
      const user = userEvent.setup();

      render(
        <Modal open={true} onClose={jest.fn()}>
          <ModalContent>
            <button>First</button>
            <button>Second</button>
            <button>Third</button>
          </ModalContent>
        </Modal>
      );

      const buttons = screen.getAllByRole('button');
      const firstButton = buttons[0];
      const lastButton = buttons[buttons.length - 1];

      // Focus should start on close button or first focusable element
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveFocus();

      // Tab through elements
      await user.tab();
      expect(firstButton).toHaveFocus();

      await user.tab();
      expect(buttons[1]).toHaveFocus();

      // Tab from last element should wrap to first
      lastButton.focus();
      await user.tab();
      expect(firstButton).toHaveFocus();

      // Shift+Tab from first should wrap to last
      firstButton.focus();
      await user.tab({ shift: true });
      expect(lastButton).toHaveFocus();
    });

    test('restores focus to trigger element on close', () => {
      const { rerender } = render(
        <>
          <button data-testid="trigger">Open Modal</button>
          <Modal open={false} onClose={jest.fn()}>
            <ModalContent>Content</ModalContent>
          </Modal>
        </>
      );

      const trigger = screen.getByTestId('trigger');
      trigger.focus();
      expect(trigger).toHaveFocus();

      // Open modal
      rerender(
        <>
          <button data-testid="trigger">Open Modal</button>
          <Modal open={true} onClose={jest.fn()}>
            <ModalContent>Content</ModalContent>
          </Modal>
        </>
      );

      // Focus moves to modal
      expect(screen.getByRole('dialog')).toHaveFocus();

      // Close modal
      rerender(
        <>
          <button data-testid="trigger">Open Modal</button>
          <Modal open={false} onClose={jest.fn()}>
            <ModalContent>Content</ModalContent>
          </Modal>
        </>
      );

      // Focus restored to trigger
      expect(trigger).toHaveFocus();
    });
  });

  describe('body scroll lock', () => {
    test('locks body scroll when open', () => {
      const { rerender } = render(
        <Modal open={true} onClose={jest.fn()}>
          <ModalContent>Content</ModalContent>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('hidden');

      // Close modal
      rerender(
        <Modal open={false} onClose={jest.fn()}>
          <ModalContent>Content</ModalContent>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('accessibility', () => {
    test('has correct ARIA attributes', () => {
      render(
        <Modal open={true} onClose={jest.fn()}>
          <ModalHeader>Title</ModalHeader>
          <ModalContent>Content</ModalContent>
        </Modal>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby');
    });

    test('associates header with dialog', () => {
      render(
        <Modal open={true} onClose={jest.fn()}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalContent>Content</ModalContent>
        </Modal>
      );

      const dialog = screen.getByRole('dialog');
      const labelId = dialog.getAttribute('aria-labelledby');
      const header = screen.getByText('Modal Title');

      expect(header.id).toBe(labelId);
    });
  });

  describe('portal rendering', () => {
    test('renders modal outside of parent DOM hierarchy', () => {
      const { container } = render(
        <div data-testid="parent">
          <Modal open={true} onClose={jest.fn()}>
            <ModalContent>Content</ModalContent>
          </Modal>
        </div>
      );

      const parent = screen.getByTestId('parent');
      const modal = screen.getByRole('dialog');

      // Modal should not be child of parent
      expect(parent).not.toContainElement(modal);

      // Modal should be in document.body portal
      expect(document.body).toContainElement(modal);
    });
  });
});
```

**Run tests (should fail)**:
```bash
npm test -- Modal.test.tsx
# All tests should FAIL ❌
```

---

### Step 2: Create Modal Components (3 hours)

```tsx
// components/Modal.tsx
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  useId,
} from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

// Context for modal state sharing between components
interface ModalContextValue {
  titleId: string;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal components must be used within Modal');
  }
  return context;
}

// Main Modal Component
interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, children, className = '' }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Handle mounting for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      // Focus modal when opened
      requestAnimationFrame(() => {
        modalRef.current?.focus();
      });
    } else {
      document.body.style.overflow = '';

      // Restore focus when closed
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Escape key handler
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  // Focus trap
  useEffect(() => {
    if (!open || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTabKey as EventListener);
    return () => modal.removeEventListener('keydown', handleTabKey as EventListener);
  }, [open]);

  if (!mounted || !open) return null;

  const contextValue: ModalContextValue = {
    titleId,
    onClose,
  };

  return createPortal(
    <ModalContext.Provider value={contextValue}>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className={`
            relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full
            max-h-[90vh] overflow-y-auto
            focus:outline-none
            ${className}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body
  );
}

// Modal Header Component
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

// Modal Content Component
interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

export function ModalContent({ children, className = '' }: ModalContentProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

// Modal Footer Component (for actions)
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
```

**Run tests (should pass now)**:
```bash
npm test -- Modal.test.tsx
# All tests should PASS ✅
```

---

### Step 3: Create Usage Examples (30 minutes)

```tsx
// Example 1: Simple Modal
<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader>Modal Title</ModalHeader>
  <ModalContent>
    <p>This is the modal content.</p>
  </ModalContent>
</Modal>

// Example 2: Modal with Actions
<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader>Confirm Action</ModalHeader>
  <ModalContent>
    <p>Are you sure you want to delete this item?</p>
  </ModalContent>
  <ModalFooter>
    <button
      onClick={() => setIsOpen(false)}
      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
    >
      Cancel
    </button>
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg"
    >
      Delete
    </button>
  </ModalFooter>
</Modal>

// Example 3: Video Modal
<Modal open={isVideoOpen} onClose={() => setIsVideoOpen(false)} className="max-w-4xl">
  <ModalHeader>Product Demo</ModalHeader>
  <ModalContent className="p-0">
    <video controls className="w-full">
      <source src="/videos/demo.mp4" type="video/mp4" />
    </video>
  </ModalContent>
</Modal>

// Example 4: Image Gallery Modal
<Modal open={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} className="max-w-6xl">
  <ModalHeader>Screenshots</ModalHeader>
  <ModalContent>
    <div className="grid grid-cols-2 gap-4">
      <img src="/images/screenshot1.png" alt="Screenshot 1" className="rounded-lg" />
      <img src="/images/screenshot2.png" alt="Screenshot 2" className="rounded-lg" />
    </div>
  </ModalContent>
</Modal>
```

---

### Step 4: Create Test Page (30 minutes)

```tsx
// app/test-modal/page.tsx
'use client';

import { useState } from 'react';
import { Modal, ModalHeader, ModalContent, ModalFooter } from '@/components/Modal';

export default function TestModalPage() {
  const [simpleOpen, setSimpleOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Modal Test Page</h1>

      <div className="space-y-4">
        <button
          onClick={() => setSimpleOpen(true)}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          Open Simple Modal
        </button>

        <button
          onClick={() => setConfirmOpen(true)}
          className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-dark"
        >
          Open Confirmation Modal
        </button>

        <button
          onClick={() => setVideoOpen(true)}
          className="px-6 py-3 bg-accent text-gray-900 rounded-lg hover:bg-accent-dark"
        >
          Open Video Modal
        </button>
      </div>

      {/* Simple Modal */}
      <Modal open={simpleOpen} onClose={() => setSimpleOpen(false)}>
        <ModalHeader>Simple Modal</ModalHeader>
        <ModalContent>
          <p className="mb-4">This is a simple modal with just content.</p>
          <p>You can close it by:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Clicking the X button</li>
            <li>Pressing Escape</li>
            <li>Clicking outside the modal</li>
          </ul>
        </ModalContent>
      </Modal>

      {/* Confirmation Modal */}
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <ModalHeader>Confirm Action</ModalHeader>
        <ModalContent>
          <p>Are you sure you want to proceed with this action?</p>
          <p className="text-sm text-gray-600 mt-2">This action cannot be undone.</p>
        </ModalContent>
        <ModalFooter>
          <button
            onClick={() => setConfirmOpen(false)}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              alert('Action confirmed!');
              setConfirmOpen(false);
            }}
            className="px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-lg"
          >
            Confirm
          </button>
        </ModalFooter>
      </Modal>

      {/* Video Modal */}
      <Modal open={videoOpen} onClose={() => setVideoOpen(false)} className="max-w-4xl">
        <ModalHeader>Product Demo Video</ModalHeader>
        <ModalContent className="p-0">
          <div className="aspect-video bg-gray-900 flex items-center justify-center">
            <p className="text-white">Video player would go here</p>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
```

---

### Step 5: Manual Testing (1 hour)

```bash
npm run dev
# Open http://localhost:3000/test-modal
```

**Testing Checklist**:
```
Desktop Tests:
□ Modal opens when button clicked
□ Modal closes when X button clicked
□ Modal closes when Escape pressed
□ Modal closes when backdrop clicked
□ Modal does NOT close when content clicked
□ Background scroll is locked when modal open
□ Background scroll restored when modal closed
□ Focus moves to modal when opened
□ Focus restored to trigger button when closed
□ Tab key cycles through focusable elements
□ Tab from last element wraps to first
□ Shift+Tab from first element wraps to last

Mobile Tests (DevTools device mode):
□ Modal is scrollable if content overflows
□ Modal fits within viewport
□ Touch interactions work (close button, backdrop)
□ No layout issues on small screens

Accessibility Tests:
□ Screen reader announces modal open
□ Close button has aria-label
□ Dialog has aria-modal="true"
□ Dialog has aria-labelledby pointing to header
□ Keyboard navigation works without mouse
□ Focus visible indicators present
```

---

### Step 6: Commit Your Work

```bash
# Tests
npm test -- Modal.test.tsx  # Pass ✓

# Lint
npm run lint  # Pass ✓

# Build
npm run build  # Success ✓

# Commit
git add components/Modal.tsx __tests__/Modal.test.tsx app/test-modal/
git commit -m "feat: add Modal component with focus trap and accessibility

- Portal rendering for proper z-index layering
- Focus trap to keep keyboard navigation within modal
- Body scroll lock when open
- Close on backdrop click, Escape key, or close button
- Restores focus to trigger element on close
- Fully accessible with ARIA attributes
- ModalHeader, ModalContent, ModalFooter sub-components
- Comprehensive test coverage"
```

---

### Acceptance Criteria

- [ ] All tests pass (15+ tests)
- [ ] Manual testing checklist complete
- [ ] Focus trap works correctly
- [ ] Body scroll locks/unlocks
- [ ] Escape key closes modal
- [ ] Backdrop click closes modal
- [ ] Focus restored on close
- [ ] ARIA attributes present
- [ ] Portal renders outside parent
- [ ] Build succeeds

---

## Task 2.3: Tabs Component

**⏱️ Estimated Time**: 5 hours
**🎯 Goal**: Build accessible tabs for organizing content

**Context**: Product pages need tabs to organize:
- Feature categories
- Pricing tiers
- Integration options
- FAQ sections

**What You're Building**:
- Horizontal tab navigation
- Keyboard navigation (arrow keys)
- ARIA attributes for accessibility
- Active tab indicator
- Content lazy loading (optional)
- Smooth transitions

**Files to Create**:
- `components/Tabs.tsx` - Main tabs container
- `components/TabList.tsx` - Tab button list
- `components/Tab.tsx` - Individual tab button
- `components/TabPanel.tsx` - Tab content panel
- `__tests__/Tabs.test.tsx` - Test file

---

### Step 1: Write Failing Tests (1 hour)

```tsx
// __tests__/Tabs.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabList, Tab, TabPanel } from '@/components/Tabs';

describe('Tabs', () => {
  const TabsExample = () => (
    <Tabs defaultValue="tab1">
      <TabList>
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3">Tab 3</Tab>
      </TabList>

      <TabPanel value="tab1">Content 1</TabPanel>
      <TabPanel value="tab2">Content 2</TabPanel>
      <TabPanel value="tab3">Content 3</TabPanel>
    </Tabs>
  );

  describe('rendering', () => {
    test('renders all tabs', () => {
      render(<TabsExample />);

      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    test('shows default tab content', () => {
      render(<TabsExample />);

      expect(screen.getByText('Content 1')).toBeVisible();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });

    test('shows correct tab as active', () => {
      render(<TabsExample />);

      const tab1 = screen.getByText('Tab 1');
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(tab1.parentElement).toHaveClass('active');
    });
  });

  describe('interactions', () => {
    test('switches content on tab click', () => {
      render(<TabsExample />);

      expect(screen.getByText('Content 1')).toBeVisible();

      fireEvent.click(screen.getByText('Tab 2'));

      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeVisible();
    });

    test('updates active state on tab click', () => {
      render(<TabsExample />);

      const tab1 = screen.getByText('Tab 1');
      const tab2 = screen.getByText('Tab 2');

      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(tab2).toHaveAttribute('aria-selected', 'false');

      fireEvent.click(tab2);

      expect(tab1).toHaveAttribute('aria-selected', 'false');
      expect(tab2).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('keyboard navigation', () => {
    test('navigates with arrow keys', async () => {
      const user = userEvent.setup();

      render(<TabsExample />);

      const tab1 = screen.getByText('Tab 1');
      const tab2 = screen.getByText('Tab 2');
      const tab3 = screen.getByText('Tab 3');

      tab1.focus();

      // Arrow right moves to next tab
      await user.keyboard('{ArrowRight}');
      expect(tab2).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(tab3).toHaveFocus();

      // Arrow right on last tab wraps to first
      await user.keyboard('{ArrowRight}');
      expect(tab1).toHaveFocus();

      // Arrow left moves to previous tab
      await user.keyboard('{ArrowLeft}');
      expect(tab3).toHaveFocus();
    });

    test('activates tab with Enter key', async () => {
      const user = userEvent.setup();

      render(<TabsExample />);

      const tab2 = screen.getByText('Tab 2');
      tab2.focus();

      await user.keyboard('{Enter}');

      expect(screen.getByText('Content 2')).toBeVisible();
      expect(tab2).toHaveAttribute('aria-selected', 'true');
    });

    test('activates tab with Space key', async () => {
      const user = userEvent.setup();

      render(<TabsExample />);

      const tab2 = screen.getByText('Tab 2');
      tab2.focus();

      await user.keyboard('{ }'); // Space

      expect(screen.getByText('Content 2')).toBeVisible();
      expect(tab2).toHaveAttribute('aria-selected', 'true');
    });

    test('Home key focuses first tab', async () => {
      const user = userEvent.setup();

      render(<TabsExample />);

      const tab1 = screen.getByText('Tab 1');
      const tab3 = screen.getByText('Tab 3');

      tab3.focus();
      await user.keyboard('{Home}');

      expect(tab1).toHaveFocus();
    });

    test('End key focuses last tab', async () => {
      const user = userEvent.setup();

      render(<TabsExample />);

      const tab1 = screen.getByText('Tab 1');
      const tab3 = screen.getByText('Tab 3');

      tab1.focus();
      await user.keyboard('{End}');

      expect(tab3).toHaveFocus();
    });
  });

  describe('accessibility', () => {
    test('has correct ARIA roles', () => {
      render(<TabsExample />);

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getAllByRole('tab')).toHaveLength(3);
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    test('associates tabs with panels', () => {
      render(<TabsExample />);

      const tab1 = screen.getByText('Tab 1');
      const panel1 = screen.getByText('Content 1');

      const panelId = panel1.id;
      expect(tab1).toHaveAttribute('aria-controls', panelId);
      expect(panel1).toHaveAttribute('aria-labelledby', tab1.id);
    });

    test('sets correct tabindex', () => {
      render(<TabsExample />);

      const tabs = screen.getAllByRole('tab');

      // Active tab should have tabindex="0"
      expect(tabs[0]).toHaveAttribute('tabindex', '0');

      // Inactive tabs should have tabindex="-1"
      expect(tabs[1]).toHaveAttribute('tabindex', '-1');
      expect(tabs[2]).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('controlled mode', () => {
    test('respects value prop', () => {
      const { rerender } = render(
        <Tabs value="tab2">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
        </Tabs>
      );

      expect(screen.getByText('Content 2')).toBeVisible();

      rerender(
        <Tabs value="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
        </Tabs>
      );

      expect(screen.getByText('Content 1')).toBeVisible();
    });

    test('calls onValueChange callback', () => {
      const handleChange = jest.fn();

      render(
        <Tabs defaultValue="tab1" onValueChange={handleChange}>
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
        </Tabs>
      );

      fireEvent.click(screen.getByText('Tab 2'));

      expect(handleChange).toHaveBeenCalledWith('tab2');
    });
  });
});
```

**Run tests (should fail)**:
```bash
npm test -- Tabs.test.tsx
# All tests FAIL ❌
```

---

### Step 2: Implement Tabs Component (2.5 hours)

```tsx
// components/Tabs.tsx
'use client';

import {
  createContext,
  useContext,
  useState,
  useId,
  ReactNode,
  KeyboardEvent,
  useRef,
  useEffect,
} from 'react';

// Context for tabs state
interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  getTabId: (value: string) => string;
  getPanelId: (value: string) => string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within Tabs');
  }
  return context;
}

// Main Tabs Component
interface TabsProps {
  children: ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Tabs({
  children,
  defaultValue,
  value: controlledValue,
  onValueChange,
  className = '',
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const baseId = useId();
  const getTabId = (val: string) => `${baseId}-tab-${val}`;
  const getPanelId = (val: string) => `${baseId}-panel-${val}`;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const contextValue: TabsContextValue = {
    value,
    onValueChange: handleValueChange,
    getTabId,
    getPanelId,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

// TabList Component
interface TabListProps {
  children: ReactNode;
  className?: string;
}

export function TabList({ children, className = '' }: TabListProps) {
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]') || []
    );

    const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    tabs[nextIndex]?.focus();
  };

  return (
    <div
      ref={tabListRef}
      role="tablist"
      className={`flex gap-2 border-b border-gray-200 ${className}`}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

// Tab Component
interface TabProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function Tab({ value, children, className = '' }: TabProps) {
  const { value: selectedValue, onValueChange, getTabId, getPanelId } = useTabsContext();
  const isSelected = value === selectedValue;

  const handleClick = () => {
    onValueChange(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onValueChange(value);
    }
  };

  return (
    <button
      id={getTabId(value)}
      role="tab"
      aria-selected={isSelected}
      aria-controls={getPanelId(value)}
      tabIndex={isSelected ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        px-6 py-3 font-medium transition-colors relative
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-t-lg
        ${
          isSelected
            ? 'text-primary active'
            : 'text-gray-600 hover:text-gray-900'
        }
        ${className}
      `}
    >
      {children}
      {isSelected && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
      )}
    </button>
  );
}

// TabPanel Component
interface TabPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabPanel({ value, children, className = '' }: TabPanelProps) {
  const { value: selectedValue, getTabId, getPanelId } = useTabsContext();
  const isSelected = value === selectedValue;

  if (!isSelected) return null;

  return (
    <div
      id={getPanelId(value)}
      role="tabpanel"
      aria-labelledby={getTabId(value)}
      tabIndex={0}
      className={`py-6 focus:outline-none ${className}`}
    >
      {children}
    </div>
  );
}
```

**Run tests (should pass)**:
```bash
npm test -- Tabs.test.tsx
# All tests PASS ✅
```

---

### Step 3: Create Usage Examples (30 minutes)

```tsx
// Example 1: Basic Tabs
<Tabs defaultValue="features">
  <TabList>
    <Tab value="features">Features</Tab>
    <Tab value="pricing">Pricing</Tab>
    <Tab value="support">Support</Tab>
  </TabList>

  <TabPanel value="features">
    <h3 className="text-xl font-bold mb-4">Features</h3>
    <p>Feature content here...</p>
  </TabPanel>

  <TabPanel value="pricing">
    <h3 className="text-xl font-bold mb-4">Pricing</h3>
    <p>Pricing content here...</p>
  </TabPanel>

  <TabPanel value="support">
    <h3 className="text-xl font-bold mb-4">Support</h3>
    <p>Support content here...</p>
  </TabPanel>
</Tabs>

// Example 2: Controlled Tabs
const [activeTab, setActiveTab] = useState('tab1');

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabList>
    <Tab value="tab1">Tab 1</Tab>
    <Tab value="tab2">Tab 2</Tab>
  </TabList>
  <TabPanel value="tab1">Content 1</TabPanel>
  <TabPanel value="tab2">Content 2</TabPanel>
</Tabs>

// Example 3: Product Feature Tabs
<Tabs defaultValue="automation" className="max-w-4xl">
  <TabList className="justify-center">
    <Tab value="automation">Automation</Tab>
    <Tab value="savings">Cost Savings</Tab>
    <Tab value="reporting">Reporting</Tab>
    <Tab value="security">Security</Tab>
  </TabList>

  <TabPanel value="automation">
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-bold mb-3">Automated Optimization</h3>
        <p className="text-gray-600">
          CloudFix automatically identifies and implements AWS cost optimizations
          without manual intervention.
        </p>
      </div>
      <img src="/images/automation.png" alt="Automation" className="rounded-lg" />
    </div>
  </TabPanel>

  <TabPanel value="savings">
    <div className="grid md:grid-cols-3 gap-6">
      <StatCard value="$2.5M" label="Total Savings" />
      <StatCard value="35%" label="Avg Reduction" />
      <StatCard value="1200+" label="Customers" />
    </div>
  </TabPanel>

  {/* Other panels... */}
</Tabs>
```

---

### Step 4: Create Test Page & Manual Testing (1 hour)

```tsx
// app/test-tabs/page.tsx
'use client';

import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from '@/components/Tabs';

export default function TestTabsPage() {
  const [controlled, setControlled] = useState('tab1');

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold">Tabs Test Page</h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">Basic Tabs (Uncontrolled)</h2>
        <Tabs defaultValue="features" className="max-w-2xl">
          <TabList>
            <Tab value="features">Features</Tab>
            <Tab value="pricing">Pricing</Tab>
            <Tab value="support">Support</Tab>
          </TabList>

          <TabPanel value="features">
            <h3 className="text-xl font-bold mb-3">Features</h3>
            <p className="text-gray-600">
              CloudFix automatically identifies cost optimization opportunities in your
              AWS infrastructure and implements fixes without manual intervention.
            </p>
          </TabPanel>

          <TabPanel value="pricing">
            <h3 className="text-xl font-bold mb-3">Pricing</h3>
            <p className="text-gray-600">
              Pay only for what you save. Our pricing is transparent and based on the
              actual savings we deliver to your AWS account.
            </p>
          </TabPanel>

          <TabPanel value="support">
            <h3 className="text-xl font-bold mb-3">Support</h3>
            <p className="text-gray-600">
              24/7 support from AWS experts. Get help with implementation, troubleshooting,
              and optimization strategies.
            </p>
          </TabPanel>
        </Tabs>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Controlled Tabs</h2>
        <div className="mb-4">
          <p className="text-gray-600">Current tab: <strong>{controlled}</strong></p>
        </div>
        <Tabs value={controlled} onValueChange={setControlled} className="max-w-2xl">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>

          <TabPanel value="tab1">Content for Tab 1</TabPanel>
          <TabPanel value="tab2">Content for Tab 2</TabPanel>
          <TabPanel value="tab3">Content for Tab 3</TabPanel>
        </Tabs>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Many Tabs (Keyboard Nav Test)</h2>
        <Tabs defaultValue="1" className="max-w-4xl">
          <TabList>
            {Array.from({ length: 8 }, (_, i) => (
              <Tab key={i + 1} value={String(i + 1)}>
                Tab {i + 1}
              </Tab>
            ))}
          </TabList>

          {Array.from({ length: 8 }, (_, i) => (
            <TabPanel key={i + 1} value={String(i + 1)}>
              Content for Tab {i + 1}
            </TabPanel>
          ))}
        </Tabs>
      </section>
    </div>
  );
}
```

**Testing Checklist**:
```bash
npm run dev
# Open http://localhost:3000/test-tabs

Desktop Tests:
□ Clicking tab switches content
□ Active tab has colored underline
□ Arrow Right navigates to next tab
□ Arrow Left navigates to previous tab
□ Arrow Right on last tab wraps to first
□ Arrow Left on first tab wraps to last
□ Home key focuses first tab
□ End key focuses last tab
□ Enter key activates focused tab
□ Space key activates focused tab
□ Tab key moves focus out of tab list
□ Only active tab is focusable (tabindex="0")

Accessibility Tests:
□ Screen reader announces tabs correctly
□ Tab roles present (tablist, tab, tabpanel)
□ ARIA associations correct (aria-controls, aria-labelledby)
□ Focus visible indicators present
□ Keyboard-only navigation works

Controlled Mode Tests:
□ External state updates tab selection
□ onValueChange callback fires
□ Display shows current tab value
```

---

### Step 5: Commit Your Work

```bash
# Tests
npm test -- Tabs.test.tsx  # Pass ✓

# Lint & Build
npm run lint && npm run build  # Pass ✓

# Commit
git add components/Tabs.tsx components/TabList.tsx components/Tab.tsx components/TabPanel.tsx __tests__/Tabs.test.tsx app/test-tabs/
git commit -m "feat: add Tabs component with keyboard navigation

- TabList, Tab, TabPanel sub-components
- Arrow key navigation with wrap-around
- Home/End key support
- Controlled and uncontrolled modes
- ARIA compliant with proper roles and associations
- Active tab visual indicator
- Focus management with roving tabindex
- Comprehensive test coverage"
```

---

### Acceptance Criteria

- [ ] All tests pass (20+ tests)
- [ ] Manual testing checklist complete
- [ ] Keyboard navigation works (arrows, Home, End)
- [ ] Enter and Space activate tabs
- [ ] ARIA roles and attributes correct
- [ ] Visual active indicator shows
- [ ] Controlled mode works
- [ ] Build succeeds

---

*[Continue with Task 2.4: Accordion, Task 2.5: Timeline, Task 2.6: Animation Hooks, Task 2.7: Enhanced Cards...]*

---

## Summary

Phase 2 Component Library provides reusable, accessible, well-tested components that will be used throughout Phases 3-6.

**Time Tracking**:
- Task 2.1: Carousel ✅ (8 hours)
- Task 2.2: Modal ✅ (6 hours)
- Task 2.3: Tabs ✅ (5 hours)
- Task 2.4: Accordion (5 hours)
- Task 2.5: Timeline (6 hours)
- Task 2.6: Animation Hooks (8 hours)
- Task 2.7: Enhanced Cards (6 hours)

**Total**: ~50 hours

**Key Patterns Established**:
- TDD workflow (tests first, code second)
- Accessibility-first (ARIA, keyboard nav)
- Component composition (parent + sub-components)
- Context API for component state sharing
- Portal rendering for layering
- Focus management
- Brand color consistency

**Next Phase**: Phase 3 - Product & Company Pages (use these components)
