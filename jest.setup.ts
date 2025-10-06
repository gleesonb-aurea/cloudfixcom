import '@testing-library/jest-dom'
// Allow using jest in this setup file during type checking without bringing Jest types into Next build
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const jest: any;

// Mocks for browser APIs not present in jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
} as any);

// ResizeObserver stub
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(global as any).ResizeObserver = ResizeObserverMock;

// Mock Radix Checkbox to a simple input for tests to avoid portal/DOM issues
if (typeof jest !== 'undefined') {
  // Radix Checkbox
  jest.mock('@radix-ui/react-checkbox', () => {
    const React = require('react');
    return {
      __esModule: true,
      Root: React.forwardRef(({ children, ...props }: any, ref: any) => {
        // Don't pass children to input element as input is a void element
        const { asChild, ...inputProps } = props;
        return React.createElement('div', { ref, 'data-testid': 'checkbox-root' },
          React.createElement('input', { type: 'checkbox', ...inputProps }),
          children
        );
      }),
      Indicator: (props: any) => React.createElement('span', { ...props }),
    };
  });

  // Radix Select: stub to simple passive wrappers
  jest.mock('@radix-ui/react-select', () => {
    const React = require('react');
    const passthrough = (tag: any = 'div') =>
      React.forwardRef(({ asChild, children, ...props }: any, ref: any) => {
        const Component = asChild ? React.Fragment : tag;
        return React.createElement(Component, { ref, ...props }, children);
      });
    return {
      __esModule: true,
      Root: passthrough('div'),
      Group: passthrough('div'),
      Value: passthrough('span'),
      Trigger: passthrough('button'),
      Content: passthrough('div'),
      Label: passthrough('div'),
      Item: passthrough('div'),
      Separator: passthrough('div'),
      Viewport: passthrough('div'),
      Icon: passthrough('span'),
      ScrollUpButton: passthrough('button'),
      ScrollDownButton: passthrough('button'),
      Portal: ({ children }: any) => React.createElement(React.Fragment, null, children),
      ItemIndicator: passthrough('span'),
      ItemText: passthrough('span'),
    };
  });

  // Radix Label mock
  jest.mock('@radix-ui/react-label', () => {
    const React = require('react');
    const passthrough = (tag: any = 'label') =>
      React.forwardRef(({ asChild, children, ...props }: any, ref: any) => {
        const Component = asChild ? React.Fragment : tag;
        return React.createElement(Component, { ref, ...props }, children);
      });
    return {
      __esModule: true,
      Root: passthrough('label'),
    };
  });

  // Radix Slot mock (used in Button and Form components)
  jest.mock('@radix-ui/react-slot', () => {
    const React = require('react');
    return {
      __esModule: true,
      Root: React.forwardRef(({ asChild, children, ...props }: any, ref: any) => {
        if (asChild) {
          return React.cloneElement(React.Children.only(children), { ...props, ref });
        }
        return React.createElement('div', { ref, ...props }, children);
      }),
      Slot: React.forwardRef(({ asChild, children, ...props }: any, ref: any) => {
        if (asChild) {
          return React.cloneElement(React.Children.only(children), { ...props, ref });
        }
        return React.createElement('div', { ref, ...props }, children);
      }),
    };
  });

  // lucide-react icons stub
  jest.mock('lucide-react', () => {
    const React = require('react');
    return new Proxy({}, {
      get: () => (props: any) => React.createElement('svg', { width: 16, height: 16, ...props }),
    });
  });

  // next/image stub
  jest.mock('next/image', () => {
    const React = require('react');
    // Note: Next/Image props vary; we forward common ones
    return (props: any) => React.createElement('img', { ...props });
  });
}
