import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{ts,tsx}',
        './src/components/**/*.{ts,tsx}',
        './src/app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            animation: {
                grid: 'grid 20s linear infinite',
            },
            keyframes: {
                grid: {
                    '0%': { transform: 'translateY(-80%)' },
                    '100%': { transform: 'translateY(0)' },
                },
            },
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
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        function ({ addUtilities }: any) {
            addUtilities({
                '.no-scrollbar': {
                    '-ms-overflow-style': 'none',  /* IE and Edge */
                    'scrollbar-width': 'none'  /* Firefox */
                },
                '.no-scrollbar::-webkit-scrollbar': {
                    'display': 'none'  /* Safari and Chrome */
                },
            })
        }
    ],
} satisfies Config;

export default config;
