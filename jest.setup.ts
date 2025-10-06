import '@testing-library/jest-dom'

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
jest.mock('@radix-ui/react-checkbox', () => {
  const React = require('react');
  return {
    __esModule: true,
    Root: React.forwardRef((props: any, ref: any) => (
      <input type="checkbox" ref={ref} {...props} />
    )),
    Indicator: (props: any) => <span {...props} />,
  };
});

