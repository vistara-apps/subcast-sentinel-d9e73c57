
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg': 'hsl(240 2% 98%)',
        'accent': 'hsl(217 91.2% 62.8%)',
        'primary': 'hsl(240 5.9% 10%)',
        'surface': 'hsl(0 0% 100%)',
        'muted': 'hsl(240 4.8% 95.9%)',
        'border': 'hsl(240 5.9% 90%)',
        'destructive': 'hsl(0 84.2% 60.2%)',
        'warning': 'hsl(38.7 92% 50%)',
        'success': 'hsl(142.1 76.2% 36.3%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '10px',
        'sm': '6px',
      },
      spacing: {
        'lg': '20px',
        'md': '12px',
        'sm': '8px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(0,0%,0%,0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.2s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
