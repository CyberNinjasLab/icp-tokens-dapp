/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/components/**/*.{js,ts,jsx,tsx,mdx}'
    // Or if using `src` directory:
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem', // default padding for all breakpoints
      screens: {
        'lg': '1024px', // Default container width for 'lg' breakpoint
        'xl': '1370px', // Increased container width for 'xl' (desktop) breakpoint
        '2xl': '1536px', // Default container width for '2xl' breakpoint
      },
    },
    screens: {
      'xs': '540px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {
      screens: {
        'xl': '1370px' // Increased container width for 'xl' (desktop) breakpoint
      },
      colors: {
        'primary': '#28abe5',
        'mobile-menu': '#565D6DFF',
        'background-hover-menu': '#F5F5F5'
      },

      keyframes: {
        fadeInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0px)' },
        },
        fadeInRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        fadeInLeft: 'fadeInLeft 0.3s ease-in-out',
        fadeInRight: 'fadeInRight 0.3s ease-in-out',
      }
    },
  },
  safelist: [
    'text-{left,center,right}', // Example of using pattern to safelist
  ],
  plugins: []
};
