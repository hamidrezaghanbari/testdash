import { injectThemeConfig } from '@smartech/ui/theme';

import { type Config } from 'tailwindcss';

const config = {
  important: '#app',
  content: ['./src/**/*.{ts,tsx,html}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;

export default injectThemeConfig(config);
