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
  jest.mock('@radix-ui/react-checkbox', () => {
    const React = require('react');
    return {
      __esModule: true,
      Root: React.forwardRef((props: any, ref: any) =>
        React.createElement('input', { type: 'checkbox', ref, ...props })
      ),
      Indicator: (props: any) => React.createElement('span', { ...props }),
    };
  });
}
