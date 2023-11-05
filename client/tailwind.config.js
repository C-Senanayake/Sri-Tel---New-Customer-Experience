/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      height: {
        'custom-8%': '8%',
        'custom-95%': '95%',
        'custom-90%': '90%',
        'custom-94%': '94%',
      },
      colors: {
        'custom-blue': '#3443C9',
        'custom-blue-main': '#4457FF',
        'custom-blue-2': '#00ADEF',
        'custom-blue-3': '#191854',
        'custom-gray-1': '#EDEDED',
        'background' : '#F3F5FF',
      },
    },
  },
  plugins: [],
}

