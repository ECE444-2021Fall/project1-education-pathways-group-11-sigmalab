module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      roboto: 'Roboto',
    },
    extend: {
      colors: {
        'blue-uoft': '#002A5C',
        'gray-light': '#ECECEC',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
