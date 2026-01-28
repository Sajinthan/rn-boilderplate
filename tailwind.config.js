/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./src/app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        // Custom type scale from design system
        title: ['32px', { lineHeight: '1.2', fontWeight: '500', letterSpacing: '-0.02em' }],
        heading: ['18px', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '-0.02em' }],
        body: ['15px', { lineHeight: '1.5', fontWeight: '400' }],
        button: ['15px', { lineHeight: '1', fontWeight: '500' }],
        helper: ['13px', { lineHeight: '1.4', fontWeight: '400', letterSpacing: '0.01em' }],
        timer: ['48px', { lineHeight: '1', fontWeight: '500' }],
      },
      borderRadius: {
        DEFAULT: '12px',
        sm: '8px',
        md: '10px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        full: '9999px',
      },
      spacing: {
        'nav-height': '80px',
        'screen-padding': '16px',
      },
      maxWidth: {
        content: '480px',
      },
    },
  },
  plugins: [],
};
