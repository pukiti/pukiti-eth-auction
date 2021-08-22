module.exports = {
  purge: [
    "./components/**/*.{tsx}",
    "./pages/**/*.{tsx}",
    "./containers/**/*.{tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
