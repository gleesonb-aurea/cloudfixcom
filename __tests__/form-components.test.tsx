import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Textarea } from '@/components/ui/Textarea';
import { RadioGroup } from '@/components/ui/RadioGroup';

describe('Form Components', () => {
  describe('Input Component', () => {
    it('renders with correct styling and attributes', () => {
      render(<Input placeholder="Enter text" data-testid="input" />);

      const input = screen.getByTestId('input');
      expect(input).toHaveClass('h-11', 'w-full', 'rounded-lg', 'border-gray-300');
      expect(input).not.toHaveAttribute('aria-invalid');
    });

    it('applies error state correctly', () => {
      render(<Input error data-testid="input" />);

      const input = screen.getByTestId('input');
      expect(input).toHaveClass('border-red-500', 'text-red-900');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Checkbox Component', () => {
    it('renders with correct styling', () => {
      render(<Checkbox data-testid="checkbox" />);

      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveClass('h-5', 'w-5', 'rounded-md', 'border-gray-300');
    });

    it('toggles state on click', async () => {
      const user = userEvent.setup();
      render(<Checkbox data-testid="checkbox" />);

      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('applies error state correctly', () => {
      render(<Checkbox error data-testid="checkbox" />);

      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveClass('border-red-500');
      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Textarea Component', () => {
    it('renders with correct styling', () => {
      render(<Textarea placeholder="Enter description" data-testid="textarea" />);

      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveClass('min-h-[100px]', 'rounded-lg', 'border-gray-300');
      expect(textarea).not.toHaveAttribute('aria-invalid');
    });

    it('applies error state correctly', () => {
      render(<Textarea error data-testid="textarea" />);

      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveClass('border-red-500', 'text-red-900');
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('RadioGroup Component', () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];

    it('renders with options', () => {
      render(<RadioGroup options={options} data-testid="radio-group" />);

      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();

      const radioGroup = screen.getByTestId('radio-group');
      expect(radioGroup).toHaveAttribute('role', 'radiogroup');
    });

    it('handles selection changes', async () => {
      const mockOnChange = jest.fn();
      render(<RadioGroup options={options} onValueChange={mockOnChange} />);

      const firstOption = screen.getByText('Option 1');
      await userEvent.click(firstOption);

      expect(mockOnChange).toHaveBeenCalledWith('option1');
    });
  });

  describe('Brand Color Compliance', () => {
    it('uses CloudFix primary color for focus states', () => {
      const { container } = render(<Input data-testid="input" />);
      const input = container.querySelector('input');

      expect(input).toHaveClass('focus:ring-primary/20', 'focus:border-primary');
    });

    it('uses correct error colors', () => {
      const { container } = render(<Input error data-testid="input" />);
      const input = container.querySelector('input');

      expect(input).toHaveClass('border-red-500');
    });
  });

  describe('Accessibility Compliance', () => {
    it('all form controls have proper accessibility attributes', () => {
      const { container } = render(
        <div>
          <Input data-testid="input" />
          <Checkbox data-testid="checkbox" />
          <Textarea data-testid="textarea" />
          <RadioGroup options={[{ value: 'test', label: 'Test' }]} />
        </div>
      );

      const interactiveElements = container.querySelectorAll('input, textarea, [role="radio"]');

      interactiveElements.forEach(element => {
        // Elements should have proper role attributes
        const tagName = element.tagName.toLowerCase();
        if (tagName === 'input') {
          expect(element).toHaveAttribute('type');
        } else if (tagName === 'textarea') {
          expect(element).toHaveAttribute('role', 'textbox');
        } else if (element.getAttribute('role') === 'radio') {
          expect(element).toHaveAttribute('type', 'radio');
        }
      });
    });
  });
});