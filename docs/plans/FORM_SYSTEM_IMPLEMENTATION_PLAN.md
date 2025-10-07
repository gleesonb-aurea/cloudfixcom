# Form System Components Implementation Plan

**Created**: October 7, 2025
**Status**: Ready for Implementation
**Priority**: 🔴 CRITICAL (Phase 1 - Blocks Assessment Page)
**Estimated Effort**: 14-18 hours
**Complexity**: Medium-High

---

## 🎯 Implementation Goals

Build a comprehensive form system that powers the Assessment page and future forms across the CloudFix website. This system must deliver:

- **Professional Enterprise Feel**: Match CloudFix's B2B SaaS brand standards
- **Accessibility Excellence**: WCAG 2.1 AA compliant with comprehensive keyboard and screen reader support
- **Developer Experience**: Consistent patterns, TypeScript types, and reusable components
- **Validation Robustness**: Real-time validation with clear error messaging
- **Mobile Optimization**: Touch-friendly inputs with proper sizing and spacing

---

## 📋 Current State Analysis

**Existing Form Infrastructure:**
```tsx
// ✅ Already Implemented
- `/lib/validations/assessment.ts` - Zod schemas for Assessment form
- `/lib/assessment-api.ts` - Webhook submission logic
- `/components/assessment/AssessmentForm.tsx` - Complete Assessment form
- `/app/assessment/page.tsx` - Assessment page layout

// ❌ Missing Core Form Components
- Input.tsx - Text, email, password inputs
- Select.tsx - Dropdown selection component
- Checkbox.tsx - Single checkbox component
- Radio.tsx - Radio button group component
- Textarea.tsx - Multi-line text input
- FormField.tsx - Wrapper with labels and error states
```

**Critical Dependencies:**
- Assessment page references missing form components
- Future pages (Contact, Resources, etc.) will need forms
- Newsletter component already uses basic patterns (can be upgraded)
- No standardized form field styling or validation display

**Business Impact:**
- Assessment page is **BLOCKING ALL CTAs** - every "Get Free Assessment" button leads here
- Form quality directly affects lead conversion rates
- Professional forms reinforce enterprise credibility
- Accessibility compliance required for B2B customers

**Current Assessment Form Status:**
- ✅ **Assessment form already looks strong** - complete multi-step implementation
- ✅ All form steps implemented (Company Info, AWS Usage, Contact Info)
- ✅ State management and validation logic in place
- ❌ **Missing**: Core form components (Input, Select, etc.) that the form references

**Webhook Integration:**
- All forms must submit to: `https://automate.billgleeson.com/webhook/cloudfix-website-forms`
- `form_type` field determines backend processing logic

**Required Form Types:**
- `contact` - Contact form submissions
- `rightspend` - RightSpend product inquiries
- `partner_opportunity` - Partnership opportunities
- `referral_partner` - Referral partner submissions
- `newsletter` - Newsletter signups
- `assessment` - Assessment form submissions (backend will add this)

---

## 🏗️ Target Architecture

### Component Hierarchy

```
FormField (wrapper)
├── Label
├── Input/Select/Textarea/Checkbox/Radio
├── ErrorMessage (conditional)
└── Hint (optional)
```

### Form Component Structure

```tsx
// Core Input Components
Input.tsx           - text, email, password, search, tel, url
Textarea.tsx        - multi-line text with auto-resize
Select.tsx          - dropdown with search (optional)
Checkbox.tsx        - single checkbox with label
RadioGroup.tsx      - radio button group

// Wrapper Components
FormField.tsx       - label + input + error + hint container
FormSection.tsx     - grouping of related fields
FormSummary.tsx     - read-only display of submitted data

// Utility Components
FormError.tsx       - styled error messages
FormHint.tsx        - helper text below inputs
FormLegend.tsx      - fieldset/section titles
```

### Integration Pattern

```tsx
// Usage in AssessmentForm (existing)
<FormField name="company" label="Company Name" required>
  <Input placeholder="Enter your company name" />
</FormField>

<FormField name="industry" label="Industry" required>
  <Select>
    <option value="">Select your industry</option>
    <option value="technology">Technology</option>
    <option value="healthcare">Healthcare</option>
    // ... more options
  </Select>
</FormField>
```

---

## 🎨 Design Specifications

### Brand Colors & Styling

**Input Fields:**
```tsx
Default State:
- Border: border border-gray-300
- Background: bg-white
- Text: text-gray-900
- Padding: px-3 py-2 (desktop), px-4 py-3 (mobile)
- Border Radius: rounded-md
- Font Size: text-sm (desktop), text-base (mobile)

Focus State:
- Border: border-2 border-primary
- Ring: ring-2 ring-primary/20
- Shadow: shadow-sm

Error State:
- Border: border-2 border-red-500
- Ring: ring-2 ring-red-500/20
- Text: text-red-900

Disabled State:
- Background: bg-gray-50
- Border: border-gray-200
- Text: text-gray-500
```

**Labels:**
```tsx
Default:
- Text: text-sm font-medium text-gray-700
- Margin Bottom: mb-1.5
- Required Indicator: text-red-500 ml-1

Error State:
- Text: text-sm font-medium text-red-700
```

**Error Messages:**
```tsx
- Text: text-sm text-red-600 mt-1
- Icon: Error icon (optional)
- Animation: Fade in appearance
```

### Responsive Design

```tsx
// Mobile-first approach
Input Padding:
- Mobile: px-4 py-3 (44px min-height for touch targets)
- Desktop: px-3 py-2 (36px height)

Font Sizes:
- Mobile: text-base (16px - prevents zoom on iOS)
- Desktop: text-sm (14px)

Spacing:
- Form Fields: mb-6 (mobile), mb-4 (desktop)
- Form Sections: mb-8 (mobile), mb-6 (desktop)
```

### Accessibility Requirements

**Keyboard Navigation:**
- Tab order: Label → Input → Error message → Next field
- Focus indicators: 2px border with ring
- Skip links for long forms
- Form submission with Enter key

**Screen Reader Support:**
- Proper labeling with `htmlFor` and `id` connection
- `aria-describedby` for error messages and hints
- `aria-required` for required fields
- `aria-invalid` for validation errors
- Live regions for dynamic error messages

**Touch Targets:**
- Minimum 44px height for all interactive elements
- Adequate spacing between touch targets
- No hover-only interactions on mobile

---

## 🔧 Implementation Tasks

### Task 1: Project Foundation & Setup (45 minutes)

**Install additional dependencies:**

```bash
npm install class-variance-authority clsx tailwind-merge
```

**Create utility functions for class merging:**

```tsx
// /lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Create form component types:**

```tsx
// /types/form.ts
export interface FormFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  fullWidth?: boolean;
  autoResize?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  fullWidth?: boolean;
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
}

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
}

export interface RadioGroupProps {
  name: string;
  label?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string;
  onChange: (value: string) => void;
  error?: boolean;
  required?: boolean;
}
```

**Commit Message:**
```
feat(forms): add foundation types and utilities

- Install class-variance-authority and class merging utilities
- Create cn() utility for conditional styling
- Define TypeScript interfaces for all form components
- Set up type safety for form development
```

---

### Task 2: Core Input Component (2 hours)

**Build Input component with variants:**

```tsx
// /components/forms/Input.tsx
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { InputProps } from '@/types/form';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, fullWidth = true, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2',
          'text-sm text-gray-900 placeholder:text-gray-500',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
          'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',

          // Size variants
          'min-h-[44px] min-w-[44px]', // Touch targets

          // State variants
          error && [
            'border-red-500 text-red-900',
            'focus:ring-red-500/20 focus:border-red-500',
            'placeholder:text-red-300'
          ],

          // Width
          fullWidth && 'w-full',

          className
        )}
        ref={ref}
        aria-invalid={error}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
```

**Add specialized input types:**

```tsx
// Email input with validation
const EmailInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  (props, ref) => <Input type="email" ref={ref} {...props} />
);

// Password input with show/hide toggle
const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-10', className)}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>
    );
  }
);
```

**Commit Message:**
```
feat(forms): create Input component with variants

- Implement base Input with full TypeScript support
- Add error states with red border and focus rings
- Include accessibility attributes (aria-invalid)
- Create EmailInput and PasswordInput variants
- Ensure 44px minimum touch targets
- Use brand cyan for focus states
```

---

### Task 3: Textarea Component (1.5 hours)

**Build Textarea with auto-resize:**

```tsx
// /components/forms/Textarea.tsx
import React, { forwardRef, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { TextareaProps } from '@/types/form';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    error,
    fullWidth = true,
    autoResize = false,
    rows = 3,
    ...props
  }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    // Auto-resize functionality
    useEffect(() => {
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
          'flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2',
          'text-sm text-gray-900 placeholder:text-gray-500',
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

          // Width
          fullWidth && 'w-full',

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
```

**Commit Message:**
```
feat(forms): create Textarea component with auto-resize

- Implement flexible Textarea with minimum 44px height
- Add auto-resize functionality for dynamic content
- Include error states matching Input component
- Support custom rows and disabled states
- Maintain consistent focus states and accessibility
```

---

### Task 4: Select Component (2 hours)

**Build Select component with search functionality:**

```tsx
// /components/forms/Select.tsx
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { SelectProps } from '@/types/form';

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    className,
    children,
    error,
    fullWidth = true,
    options,
    ...props
  }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          // Base styles
          'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2',
          'text-sm text-gray-900',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
          'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',

          // Custom select styling
          'appearance-none bg-[url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")] bg-[length:1.5em_1.5em] bg-[right_0.5rem_center] bg-no-repeat pr-10',

          // Touch targets
          'min-h-[44px]',

          // State variants
          error && [
            'border-red-500 text-red-900',
            'focus:ring-red-500/20 focus:border-red-500',
            'placeholder:text-red-300'
          ],

          fullWidth && 'w-full',

          className
        )}
        aria-invalid={error}
        {...props}
      >
        {options ? (
          <>
            <option value="" disabled>
              {props.placeholder || 'Select an option...'}
            </option>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </>
        ) : (
          children
        )}
      </select>
    );
  }
);

Select.displayName = 'Select';

export { Select };
```

**Commit Message:**
```
feat(forms): create Select component with custom styling

- Implement Select with custom dropdown arrow styling
- Support both children and options array props
- Add error states and accessibility attributes
- Include placeholder functionality
- Ensure consistent styling with Input component
- Add 44px minimum height for touch targets
```

---

### Task 5: Checkbox Component (1.5 hours)

**Build Checkbox with proper label association:**

```tsx
// /components/forms/Checkbox.tsx
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { CheckboxProps } from '@/types/form';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-start">
        <input
          type="checkbox"
          ref={ref}
          id={checkboxId}
          className={cn(
            // Base checkbox styling
            'h-4 w-4 rounded border-gray-300 bg-white',
            'text-primary focus:ring-primary/20 focus:ring-2',
            'transition-colors duration-200',
            'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:border-gray-200',

            // State variants
            error && [
              'border-red-500 text-red-600',
              'focus:ring-red-500/20'
            ],

            className
          )}
          aria-invalid={error}
          {...props}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className={cn(
              'ml-2 text-sm text-gray-700 leading-5',
              'cursor-pointer select-none',
              'hover:text-gray-900',
              error && 'text-red-700',
              props.disabled && 'cursor-not-allowed text-gray-500'
            )}
          >
            {label}
            {props.required && (
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
```

**Commit Message:**
```
feat(forms): create Checkbox component with label integration

- Implement Checkbox with automatic label association
- Add proper htmlFor/id connection for accessibility
- Include required indicator and error states
- Support disabled state with visual feedback
- Ensure adequate touch targets and keyboard access
```

---

### Task 6: RadioGroup Component (2 hours)

**Build Radio button group with flexible layout:**

```tsx
// /components/forms/RadioGroup.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import type { RadioGroupProps } from '@/types/form';

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  error,
  required = false,
  className,
}) => {
  const groupId = `radio-group-${name}`;

  return (
    <fieldset className={cn('space-y-3', className)} aria-invalid={error}>
      {label && (
        <legend className="text-sm font-medium text-gray-700 mb-3">
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </legend>
      )}

      <div role="radiogroup" aria-labelledby={label ? groupId : undefined}>
        {options.map((option) => {
          const optionId = `${name}-${option.value}`;
          const isChecked = value === option.value;

          return (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={optionId}
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={(e) => onChange(e.target.value)}
                disabled={option.disabled}
                className={cn(
                  // Base radio styling
                  'h-4 w-4 border-gray-300 bg-white',
                  'text-primary focus:ring-primary/20 focus:ring-2',
                  'transition-colors duration-200',

                  // State variants
                  error && [
                    'border-red-500 text-red-600',
                    'focus:ring-red-500/20'
                  ],

                  'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:border-gray-200'
                )}
              />
              <label
                htmlFor={optionId}
                className={cn(
                  'ml-2 text-sm text-gray-700 leading-5 cursor-pointer select-none',
                  'hover:text-gray-900',
                  option.disabled && 'cursor-not-allowed text-gray-500',
                  isChecked && 'font-medium text-gray-900'
                )}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};

export { RadioGroup };
```

**Commit Message:**
```
feat(forms): create RadioGroup component with fieldset structure

- Implement RadioGroup with proper fieldset/legend structure
- Add role="radiogroup" for screen reader context
- Support disabled states and required indicators
- Include error states and visual feedback
- Ensure keyboard navigation and accessibility compliance
```

---

### Task 7: FormField Wrapper Component (2 hours)

**Build FormField that connects labels, inputs, and errors:**

```tsx
// /components/forms/FormField.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import type { FormFieldProps } from '@/types/form';

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  required = false,
  hint,
  children,
  className,
}) => {
  // Generate unique ID for label/input connection
  const fieldId = `field-${name}`;

  // Check if child component has error
  const childProps = React.isValidElement(children) ? children.props : {};
  const hasError = childProps.error;

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label
          htmlFor={fieldId}
          className={cn(
            'text-sm font-medium leading-5',
            hasError ? 'text-red-700' : 'text-gray-700'
          )}
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      {/* Clone child with proper ID and aria-describedby */}
      {React.isValidElement(children) &&
        React.cloneElement(children as React.ReactElement<any>, {
          id: fieldId,
          'aria-describedby': hint ? `${fieldId}-hint` : undefined,
          ...childProps,
        })}

      {hint && (
        <p
          id={`${fieldId}-hint`}
          className={cn(
            'text-sm',
            hasError ? 'text-red-600' : 'text-gray-500'
          )}
        >
          {hint}
        </p>
      )}

      {/* Error message slot - child components can render errors */}
      {hasError && childProps.error && (
        <p
          id={`${fieldId}-error`}
          className="text-sm text-red-600 flex items-center gap-1"
          role="alert"
          aria-live="polite"
        >
          <span className="text-red-500" aria-hidden="true">
            ⚠️
          </span>
          {typeof childProps.error === 'string' ? childProps.error : 'This field is required'}
        </p>
      )}
    </div>
  );
};

export { FormField };
```

**Create FormError component for standalone error display:**

```tsx
// /components/forms/FormError.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface FormErrorProps {
  message: string;
  className?: string;
}

const FormError: React.FC<FormErrorProps> = ({ message, className }) => {
  return (
    <p
      role="alert"
      aria-live="polite"
      className={cn(
        'text-sm text-red-600 flex items-center gap-1 mt-1',
        className
      )}
    >
      <span className="text-red-500" aria-hidden="true">
        ⚠️
      </span>
      {message}
    </p>
  );
};

export { FormError };
```

**Commit Message:**
```
feat(forms): create FormField wrapper and FormError components

- Implement FormField with automatic label/input association
- Add proper aria-describedby for hint text
- Include required indicators and error display
- Create FormError component for standalone error messages
- Ensure accessibility compliance with ARIA attributes
```

---

### Task 8: Form Components Index (30 minutes)

**Create comprehensive export file:**

```tsx
// /components/forms/index.ts
// Core Input Components
export { Input } from './Input';
export { Textarea } from './Textarea';
export { Select } from './Select';
export { Checkbox } from './Checkbox';
export { RadioGroup } from './RadioGroup';

// Wrapper Components
export { FormField } from './FormField';
export { FormError } from './FormError';

// Utility Types
export type {
  FormFieldProps,
  InputProps,
  TextareaProps,
  SelectProps,
  CheckboxProps,
  RadioGroupProps,
} from '@/types/form';
```

**Update main components index:**

```tsx
// /components/index.ts
export * from './forms';
export * from './Header';
export * from './Footer';
export * from './Hero';
// ... other existing exports
```

**Commit Message:**
```
feat(forms): create comprehensive component exports

- Add forms/index.ts with all form component exports
- Update main components index to include forms
- Ensure clean import statements for consumers
- Export all TypeScript types for developer experience
```

---

### Task 9: Testing & Quality Assurance (2 hours)

**Create test file for form components:**

```tsx
// /__tests__/form-components.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormField, Input, Checkbox, RadioGroup } from '@/components/forms';

describe('Form Components', () => {
  describe('FormField', () => {
    it('associates label with input', () => {
      render(
        <FormField name="test" label="Test Label">
          <Input />
        </FormField>
      );

      const input = screen.getByLabelText('Test Label');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('id', 'field-test');
    });

    it('shows required indicator', () => {
      render(
        <FormField name="test" label="Test Label" required>
          <Input />
        </FormField>
      );

      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('displays hint text', () => {
      render(
        <FormField name="test" label="Test Label" hint="Helper text">
          <Input />
        </FormField>
      );

      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });
  });

  describe('Input', () => {
    it('applies error styles', () => {
      render(<Input error />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveClass('border-red-500');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('handles focus events', async () => {
      const user = userEvent.setup();
      render(<Input />);

      const input = screen.getByRole('textbox');
      await user.click(input);

      expect(input).toHaveFocus();
      expect(input).toHaveClass('focus:border-primary');
    });
  });

  describe('Checkbox', () => {
    it('toggles state on click', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Accept terms" />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('associates label with checkbox', () => {
      render(<Checkbox label="Accept terms" />);

      const label = screen.getByText('Accept terms');
      const checkbox = screen.getByRole('checkbox');

      expect(label).toHaveAttribute('for', checkbox.id);
    });
  });

  describe('RadioGroup', () => {
    it('selects correct option', async () => {
      const user = userEvent.setup();
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ];

      render(
        <RadioGroup
          name="test"
          options={options}
          value="option1"
          onChange={() => {}}
        />
      );

      const option1 = screen.getByLabelText('Option 1');
      const option2 = screen.getByLabelText('Option 2');

      expect(option1).toBeChecked();
      expect(option2).not.toBeChecked();

      await user.click(option2);
      expect(option2).toBeChecked();
    });
  });
});
```

**Manual testing checklist:**
```tsx
// Visual Testing
- [ ] All components render consistently in light mode
- [ ] Focus states show cyan border and ring
- [ ] Error states show red border and text
- [ ] Disabled states are visually clear
- [ ] Hover states provide feedback

// Accessibility Testing
- [ ] All form controls have proper labels
- [ ] Keyboard navigation works (Tab, Shift+Tab, Enter, Space)
- [ ] Screen reader announces labels and errors
- [ ] Touch targets meet 44px minimum
- [ ] Color contrast meets WCAG AA (4.5:1)

// Mobile Testing
- [ ] Inputs don't trigger zoom on iOS
- [ ] Touch targets are adequately spaced
- [ ] Select dropdown works on mobile
- [ ] Form fields are properly sized for thumbs

// Browser Testing
- [ ] Chrome/Edge (Blink engine)
- [ ] Firefox (Gecko engine)
- [ ] Safari (WebKit engine)
```

**Commit Message:**
```
test(forms): add comprehensive test suite for form components

- Create React Testing Library tests for all components
- Test label association and accessibility features
- Verify error states and keyboard interactions
- Add manual testing checklist for QA process
- Ensure cross-browser and mobile compatibility
```

---

## 🚀 Implementation Order

**Recommended sequence:**

1. ✅ **Task 1**: Foundation setup (45 min) - Dependencies and types
2. ✅ **Task 2**: Input component (2 hrs) - Core input with variants
3. ✅ **Task 3**: Textarea component (1.5 hrs) - Multi-line input
4. ✅ **Task 4**: Select component (2 hrs) - Dropdown selection
5. ✅ **Task 5**: Checkbox component (1.5 hrs) - Single checkbox
6. ✅ **Task 6**: RadioGroup component (2 hrs) - Radio button groups
7. ✅ **Task 7**: FormField wrapper (2 hrs) - Integration component
8. ✅ **Task 8**: Component exports (30 min) - Clean imports
9. ✅ **Task 9**: Testing & QA (2 hrs) - Quality assurance

**Total Estimated Time**: 14-18 hours

---

## 📊 Success Criteria

### Functional Requirements
- ✅ All form components render consistently
- ✅ FormField automatically connects labels and inputs
- ✅ Error states display with red borders and messages
- ✅ Focus states show brand cyan colors
- ✅ Disabled states are visually apparent
- ✅ Components work with React Hook Form
- ✅ TypeScript types provide full IntelliSense

### Design Requirements
- ✅ Consistent spacing and sizing across components
- ✅ Brand colors (cyan primary, yellow accent) used correctly
- ✅ 44px minimum touch targets on mobile
- ✅ Responsive typography (16px mobile, 14px desktop)
- ✅ Smooth transitions and hover states

### Accessibility Requirements
- ✅ WCAG 2.1 AA compliant
- ✅ All interactive elements have proper labels
- ✅ Keyboard navigation works without mouse
- ✅ Screen reader compatibility verified
- ✅ Color contrast meets 4.5:1 minimum
- ✅ ARIA attributes correctly implemented

### Developer Experience
- ✅ Clean, readable component API
- ✅ Comprehensive TypeScript support
- ✅ Consistent naming conventions
- ✅ Single source of truth for styling
- ✅ Easy to extend and customize

---

## 🔍 Testing Strategy

### Unit Testing
- Component rendering with different props
- State changes and user interactions
- Accessibility attribute verification
- Error state handling

### Integration Testing
- FormField with nested components
- Form submission with validation
- Cross-component interactions
- Real-world form scenarios

### Manual QA
- Visual inspection across browsers
- Screen reader testing (NVDA, VoiceOver)
- Mobile device touch testing
- Performance impact assessment

### Automated Accessibility Testing
- axe-core integration for automated checks
- Color contrast verification
- Keyboard navigation flow testing
- ARIA attribute validation

---

## 📚 Related Documentation

**Reference Files:**
- `/components/assessment/AssessmentForm.tsx` - Existing form implementation
- `/lib/validations/assessment.ts` - Validation patterns
- `/docs/BRAND_CONSISTENCY_AUDIT.md` - Color specifications
- `/docs/ROADMAP.md` - Phase 1 requirements (lines 113-130)

**Design System References:**
- Tailwind CSS configuration for brand colors
- Component library patterns for consistency
- Accessibility guidelines for form design

**Technical Standards:**
- React Hook Form integration patterns
- Zod validation schema usage
- TypeScript best practices
- Testing with React Testing Library

---

## 🎯 Post-Implementation

**After completing this plan:**

1. **Update Assessment Form**: Refactor existing AssessmentForm to use new components
2. **Update Newsletter Component**: Upgrade Newsletter.tsx to use new Input component
3. **Component Documentation**: Add usage examples to docs/ directory
4. **Design System Integration**: Add form components to design system documentation

**Immediate Benefits:**
- Assessment page becomes fully functional with professional forms
- Consistent form experience across entire website
- Improved accessibility compliance
- Better developer experience for future form development
- Enterprise-grade form quality matching B2B SaaS standards

**Next Phase 1 Task**: Complete Assessment page integration and testing

---

## 🔄 Future Enhancements

**Phase 2 considerations:**
- Form validation animations
- Multi-step form wizard component
- File upload component
- Rich text editor integration
- Form analytics and tracking
- Advanced input masking

**Phase 3 considerations:**
- Dynamic form generation from JSON schema
- Conditional field logic
- Form progress indicators
- Auto-save functionality
- Form A/B testing framework

---

**Ready to implement?** Start with Task 1 and follow the sequence. The form system will provide the foundation for all user interactions across the CloudFix website. Each component is designed for enterprise quality with accessibility and developer experience as top priorities. 🚀