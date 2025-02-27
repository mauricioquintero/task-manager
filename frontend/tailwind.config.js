/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        colors: {
            'draculaBackground': '#282A36',
            'draculaCurrentLine': '#44475A',
            'draculaForeGround': '#F8F8F2',
            'draculaComment': '#6272A4',
            'draculaCyan': '#8BE9FD',
            'draculaGreen': '#50FA7B',
            'draculaOrange': '#FFB86C',
            'draculaPink': '#FF79C6',
            'draculaRed': '#FF5555',
            'draculaYellow': '#F1FA8C',
            'draculaPurple': '#BD93F9',
        },
        extend: {},
    },
    plugins: [],
}
