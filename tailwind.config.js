module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'hd-theme-color': 'var(--hd-theme-color)',
        'hd-white': 'var(--hd-white)',
        'hd-black1': 'var(--hd-black1)',
        'hd-black2': 'var(--hd-black2)',
        'hd-bg-white': 'var(--hd-bg-white)',
        'hd-bg-black': 'var(--hd-bg-black)',
      },
    },
  },
  plugins: [],
}
