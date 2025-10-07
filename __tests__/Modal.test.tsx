import { render, screen, fireEvent } from '@testing-library/react';
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

      const backdrop = screen.getByRole('dialog').parentElement!;
      fireEvent.click(backdrop);

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

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveFocus();

      await user.tab();
      expect(firstButton).toHaveFocus();

      await user.tab();
      expect(buttons[1]).toHaveFocus();

      lastButton.focus();
      await user.tab();
      expect(firstButton).toHaveFocus();

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

      rerender(
        <>
          <button data-testid="trigger">Open Modal</button>
          <Modal open={true} onClose={jest.fn()}>
            <ModalContent>Content</ModalContent>
          </Modal>
        </>
      );

      expect(screen.getByRole('dialog')).toHaveFocus();

      rerender(
        <>
          <button data-testid="trigger">Open Modal</button>
          <Modal open={false} onClose={jest.fn()}>
            <ModalContent>Content</ModalContent>
          </Modal>
        </>
      );

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
      render(
        <div data-testid="parent">
          <Modal open={true} onClose={jest.fn()}>
            <ModalContent>Content</ModalContent>
          </Modal>
        </div>
      );

      const parent = screen.getByTestId('parent');
      const modal = screen.getByRole('dialog');

      expect(parent).not.toContainElement(modal);
      expect(document.body).toContainElement(modal);
    });
  });
});

