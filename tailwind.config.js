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
      '*.{html,js,jsx}',
      './node_modules/actify/dist/**/*.{js,jsx}'
    ],
    theme: {
      extend: {
        colors: {
          ...colors
        }
      }
    }
  },
  {
    primary: '#006a6a'
  }
)