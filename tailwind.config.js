const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        // ButtonAsync border animations
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(100%)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(-100%)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-100%)' },
        },
        // Bounce variants
        slideRightBounce: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '50%': { opacity: '1', transform: 'translateX(10%)' },
          '60%': { transform: 'translateX(-5%)' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
        slideDownBounce: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '50%': { opacity: '1', transform: 'translateY(10%)' },
          '60%': { transform: 'translateY(-5%)' },
          '100%': { opacity: '0', transform: 'translateY(100%)' },
        },
        slideLeftBounce: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '50%': { opacity: '1', transform: 'translateX(-10%)' },
          '60%': { transform: 'translateX(5%)' },
          '100%': { opacity: '0', transform: 'translateX(-100%)' },
        },
        slideUpBounce: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '50%': { opacity: '1', transform: 'translateY(-10%)' },
          '60%': { transform: 'translateY(5%)' },
          '100%': { opacity: '0', transform: 'translateY(-100%)' },
        },
        // Elastic variants
        slideRightElastic: {
          '0%': { opacity: '0', transform: 'translateX(-100%) scale(1)' },
          '30%': { opacity: '1', transform: 'translateX(5%) scale(1.1)' },
          '40%': { transform: 'translateX(-2%) scale(0.95)' },
          '50%': { transform: 'translateX(0%) scale(1)' },
          '100%': { opacity: '0', transform: 'translateX(100%) scale(1)' },
        },
        slideDownElastic: {
          '0%': { opacity: '0', transform: 'translateY(-100%) scale(1)' },
          '30%': { opacity: '1', transform: 'translateY(5%) scale(1.1)' },
          '40%': { transform: 'translateY(-2%) scale(0.95)' },
          '50%': { transform: 'translateY(0%) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(100%) scale(1)' },
        },
        slideLeftElastic: {
          '0%': { opacity: '0', transform: 'translateX(100%) scale(1)' },
          '30%': { opacity: '1', transform: 'translateX(-5%) scale(1.1)' },
          '40%': { transform: 'translateX(2%) scale(0.95)' },
          '50%': { transform: 'translateX(0%) scale(1)' },
          '100%': { opacity: '0', transform: 'translateX(-100%) scale(1)' },
        },
        slideUpElastic: {
          '0%': { opacity: '0', transform: 'translateY(100%) scale(1)' },
          '30%': { opacity: '1', transform: 'translateY(-5%) scale(1.1)' },
          '40%': { transform: 'translateY(2%) scale(0.95)' },
          '50%': { transform: 'translateY(0%) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-100%) scale(1)' },
        },
        // Counter-clockwise variants
        slideRightCounterClockwise: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
        slideUpCounterClockwise: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-100%)' },
        },
        slideLeftCounterClockwise: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(-100%)' },
        },
        slideDownCounterClockwise: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // ButtonAsync animations - these will be used with dynamic durations in the component
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
