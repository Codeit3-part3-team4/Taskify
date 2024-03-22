import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        '217': '217px',
        '260': '260px',
        '284': '284px',
        '287': '287px',
        '296': '296px',
        '343': '343px',
        '360': '360px',
        '378': '378px',
        '435': '435px',
        '436': '436px',
        '519': '519px',
        '537': '537px',
        '594': '594px',
        '664': '664px',
        '722': '722px',
        '1200': '1200px',
      },
      height: {
        '107': '107px',
        '168': '168px',
        '236': '236px',
        '248': '248px',
        '250': '250px',
        '314': '314px',
        '350': '350px',
        '384': '384px',
        '415': '415px',
        '423': '423px',
        '435': '435px',
        '497': '497px',
        '502': '502px',
        '600': '600px',
        '686': '686px',
        '972': '972px',
      },
      colors: {
        'black-000000': '#000000',
        'black-171717': '#171717',
        'black-333236': '#333236',
        'black-4B4B4B': '#4B4B4B',
        'gray-787486': '#787486',
        'gray-9FA6B2': '#9FA6B2',
        'gray-D9D9D9': '#D9D9D9',
        'gray-EEEEEE': '#EEEEEE',
        'gray-FAFAFA': '#FAFAFA',
        'white-FFFFFF': '#FFFFFF',
        'violet-5534DA': '#5534DA',
        'violet-8%': '#F1EFFD',
        'red-D6173A': '#D6173A',
        'green-7AC555': '#7AC555',
        'orange-FFA500': '#FFA500',
        'blue-76A6EA': '#76A6EA',
        'blue-AFDDFA': '#AFDDFA',
        'blue-87CEFA': '#87CEFA',
        'pink-FFC0CB': '#FFC0CB',
      },
      transitionDuration: {
        '1500': '1500ms',
        '2000': '2000ms',
        '3000': '3000ms',
      },
    },
  },
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: false, // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
  plugins: [daisyui],
};
export default config;
