
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        'image': '0px 0px 7px 1px rgba(96,165,250,0.7)', 
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Adding Roboto font-family
      },
      keyframes:{
        fromDown:{
          '0%':{transform:'translateY(10%)',opacity:'20%'},
          '50%':{transform:'translateY(5%)',opacity:'50%'},
          '100%':{transform:'translateY(0%)',opacity:'100%'},
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation:{
        fromDown:'fromDown 0.4s ease-out',
        fadeIn: 'fadeIn 0.3s ease-in-out forwards'
      }
    },
    
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
