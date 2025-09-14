import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use default React runtime resolution; do not alias dev runtime
  // Avoid loading external PostCSS config during tests
  css: {
    postcss: {
      plugins: [],
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './vitest.setup.js',   // zorg dat dit bestand bestaat
    css: false,                        // zet op true als je écht CSS wilt testen
    singleThread: true,
    pool: 'forks',
    coverage: {
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      thresholds: { lines: 70, functions: 70, branches: 60, statements: 70 }
    },
    include: ['src/**/*.test.{js,jsx,ts,tsx}', 'src/**/__tests__/**/*.{js,jsx,ts,tsx}'],
    exclude: ['node_modules', 'dist']
  }
})
