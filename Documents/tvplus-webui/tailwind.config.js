/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",

  darkMode: false, // or 'media' or 'class'

  theme: {

    screens: {
      'xs': '200px',
      
      'sm': '240px',
      // => @media (min-width: 240px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        background: {
          DEFAULT: "var(--background-color)",
        },
        typography: {
          DEFAULT: "var(--typography-color)",
        },
      },
      fontFamily: {
        netflix: ["Netflix", "Helvetica", "Arial", "sans-serif"],
        netflix_medium: ["Netflix_Medium", "Helvetica", "Arial", "sans-serif"],
        body: ["Open Sans"],
        apple: ["-apple-system"],

      },
      animation: {
        "card-hover": "card-hover 300ms forwards",
        "card-unhover": "card-unhover 300ms forwards",
        "z-hover": "z-hover 300ms forwards",
        "z-unhover": "z-unhover 300ms forwards",
        fadeIn: "fadeIn 300ms forwards",
        fadeOut: "fadeOut 300ms forwards",
        slideInLeft: "slideInLeft 300ms forwards",
        slideInRight: "slideInRight 300ms forwards",
      },
      keyframes: {
        "z-hover": {
          from: { zIndex: 10 },
          to: { zIndex: 10 },
        },

        "z-unhover": {
          from: { zIndex: 10 },
          to: { zIndex: 0 },
        },

        "card-hover": {
          from: { transform: "scale(1)", zIndex: 10 },
          to: { transform: "scale(1.8)", zIndex: 10 },
        },

        "card-unhover": {
          from: { transform: "scale(1.8)", zIndex: 10 },
          to: { transform: "scale(1)", zIndex: 0 },
        },

        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },

        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },

        slideInRight: {
          from: {
            transform: "translateX(0px)",
          },

          to: {
            transform: "translateX(-100%)",
          },
        },

        slideInLeft: {
          from: {
            transform: "translateX(-100%)",
          },

          to: {
            transform: "translateX(0px)",
          },
        },
      },
    },
  },

  variants: {
    extend: {},
  },

  content: [
    "./src/**/*.{vue,js,ts,jsx;tsx}",
    './node_modules/tw-elements/js/**/*.js',
    './nuxt.config.{js,ts}',  
  ],

  plugins: [    
    require("tw-elements/plugin.cjs")
  ]
}
