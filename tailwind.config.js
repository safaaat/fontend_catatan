/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'color-primary': '#a855f7'
            },
            screens: {
                '360': '360px',
                '500': '500px',
            },
        },
    },
    plugins: [],
}