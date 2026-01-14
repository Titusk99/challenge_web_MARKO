/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Brand Colors
                'gl-black': '#000000',
                'gl-red': '#E2001A',
                'gl-gray': '#F4F4F4',
                'gl-dark-gray': '#333333',
                // Luxury Utility Colors
                'gl-white-glass': 'rgba(255, 255, 255, 0.9)', // More opaque for premium feel
                'gl-black-glass': 'rgba(0, 0, 0, 0.9)',
            },
            fontFamily: {
                sans: ['"Inter"', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
            },
            container: {
                center: true,
                padding: '2rem',
                screens: {
                    '2xl': '1400px',
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out',
                'slide-up': 'slideUp 0.8s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
                'zoom-subtle': 'zoomSubtle 20s linear infinite', // Renamed from zoom-slow
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(15px)' }, // Subtle movement
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-15px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                zoomSubtle: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.05)' }, // Very subtle zoom
                },
            },
        },
    },
    plugins: [],
}
