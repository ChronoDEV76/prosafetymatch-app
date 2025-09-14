const forms = require('@tailwindcss/forms');
    const typography = require('@tailwindcss/typography');

    /** @type {import('tailwindcss').Config} */
    module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
    container: {
    center: true,
    padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem', xl: '2rem', '2xl': '2.5rem' },
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1440px' },
    },
    extend: {
    fontFamily: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    },
    colors: { brand: { DEFAULT: '#4F46E5', dark: '#4338CA', light: '#6366F1' } },
    borderRadius: { xl: '0.75rem', '2xl': '1rem' },
    boxShadow: {
    soft: '0 1px 2px rgba(0,0,0,.06), 0 4px 20px rgba(0,0,0,.06)',
    lift: '0 6px 28px rgba(0,0,0,.10)',
    glass: '0 8px 30px rgba(2,6,23,.12)',
    },
    backgroundImage: {
    'hero-dim': 'linear-gradient(180deg, rgba(2,6,23,0.70) 0%, rgba(2,6,23,0.35) 55%, rgba(2,6,23,0.0) 100%)',
    },
    transitionTimingFunction: { expo: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
    },
    plugins: [forms({ strategy: 'class' }), typography()],
    };
