const colors = require('tailwindcss/colors')
const { withMaterialColors } = require('tailwind-material-colors')

delete colors['lightBlue']
delete colors['warmGray']
delete colors['trueGray']
delete colors['coolGray']
delete colors['blueGray']
      
module.exports = withMaterialColors(
  {
    darkMode: 'class',
    content: [
      './*/*.html',
      './index.html', 
      './src/**/*.{js,jsx}',
      '*.{html,js,jsx}',
      './node_modules/actify/dist/**/*.{js,jsx}'
    ],
    theme: {
      extend: {
        colors: {
          ...colors,
        }
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
   
    plugins: [
      function ({ addComponents }) {
        addComponents({
          '.container': {
            maxWidth: '100%',
            '@screen sm': {
              maxWidth: '600px',
            },
            '@screen md': {
              maxWidth: '720px',
            },
            '@screen lg': {
              maxWidth: '990px',
            },
            '@screen xl': {
              maxWidth: '1200px',
            },
            '@screen 2xl': {
              maxWidth: '1350px',
            },
          }
        })
      }
    ],
  },

  {
    primary: '#006a6a'
  }
)