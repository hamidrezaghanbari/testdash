import { loadEnv } from 'vite';

const ENV_PREFIX = 'INTRACK_';

function defineEnvVariables(mode: string) {
  const variables = loadEnv(mode, process.cwd(), ENV_PREFIX);

  const PATTERN = new RegExp(`^${ENV_PREFIX}(.*)$`);

  const definableVariables: Record<string, string> = {};

  for (const variable in variables) {
    const newVariable = variable.replace(PATTERN, '__$1__');

    definableVariables[newVariable] = JSON.stringify(variables[variable]);
  }

  return definableVariables;
}

export { ENV_PREFIX, defineEnvVariables };