/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // File HTML gốc
    "./src/**/*.{js,ts,jsx,tsx}", // Các file trong thư mục src
  ],
  theme: {
    extend: {
      colors: {
        main: "#080A1A",
        subMain: "#F20000",
        dry: "#0B0F29",
        star:"#FFB000",
        text: "#C0C0C0",
        border: "#4b5563",
        dryGray: "#E0D5D5",
      },
      height: {
        header: "560px",
        rate: "400px"
      },
      fontSize:{
        h1: "2.6rem"
      },
      screens:{
        xs:"475px"
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/line-clamp")],
};
