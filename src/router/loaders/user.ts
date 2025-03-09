import { z } from 'zod';

const userSchema = z.object({ login: z.boolean() }).refine(({ login }) => login);

async function tryGetUser() {
  const user = await Promise.resolve({ login: true });

  const { success, data } = await userSchema.safeParseAsync(user);

  if (success) return data;

  return null;
}

export { tryGetUser };
