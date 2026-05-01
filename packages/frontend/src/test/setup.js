import {afterAll, afterEach, beforeAll, vi} from 'vitest';
import {resetClients} from '@/api/httpClient';
import {server} from './msw/server';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

beforeAll(() => {
  server.listen({onUnhandledRequest: 'error'});
});

afterEach(() => {
  server.resetHandlers();
  resetClients();
  localStorage.clear();
  sessionStorage.clear();
  document.body.innerHTML = '';
  vi.restoreAllMocks();
  vi.clearAllTimers();
  vi.useRealTimers();
});

afterAll(() => {
  server.close();
});

if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = ResizeObserverMock;
}

if (!globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = IntersectionObserverMock;
}

if (!globalThis.requestAnimationFrame) {
  globalThis.requestAnimationFrame = (callback) => setTimeout(callback, 0);
}

if (!globalThis.cancelAnimationFrame) {
  globalThis.cancelAnimationFrame = (handle) => clearTimeout(handle);
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(window.HTMLElement.prototype, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});
