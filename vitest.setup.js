// Vitest setup: DOM matchers and sane defaults
import '@testing-library/jest-dom/vitest';

// Minimal global fetch mock to avoid unexpected network calls during tests.
// Individual tests can override this as needed.
globalThis.fetch = async () => ({
  ok: false,
  status: 501,
  json: async () => ({}),
  text: async () => ''
});
