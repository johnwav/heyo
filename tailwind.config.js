/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f1f1f1",
        white: "#fefefe",
        blue: "#7a98f9",
        grey: "#d4d4d4",
        green: "#49c4bc",
        black: "#2d2d2d",
        lightgrey: "#828181",
        darkgrey: "#676666",
      },
      backgroundImage: {
        appTexture: "url(/assets/app-texture.png)",
        leftSvg: "url(/assets/left-svg.png)",
        Smask: "url(/assets/signintexture.png)"
      }
    },
  },
  plugins: [],
};
