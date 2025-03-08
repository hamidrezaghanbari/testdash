import { injectThemeConfig } from '@smartech/ui/theme';

import { type Config } from 'tailwindcss';

const config = {
  important: '#app',
  content: ['./src/**/*.{ts,tsx,html}', './index.html'],
  plugins: [],
} satisfies Config;

export default injectThemeConfig(config);
