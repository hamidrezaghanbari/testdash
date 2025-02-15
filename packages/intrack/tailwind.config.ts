import { injectThemeConfig } from '@smartech/ui/theme';

import { type Config } from 'tailwindcss';

const config = {
  content: ['./src/**/*.{ts,tsx,html}'],
  plugins: [],
} satisfies Config;

export default injectThemeConfig(config);
