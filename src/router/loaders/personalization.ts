import { LoaderFunction, useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';

type PersonalizationScope = 'onSite' | 'inApp' | 'survey';

const personalizationSchema = z.object({
  productId: z.string().nonempty(),
  campaignId: z.string().nonempty(),
  step: z.string().optional().default('audience'),
});

type PersonalizationData = z.infer<typeof personalizationSchema>;

const personalizationLoader: LoaderFunction = async ({ params }) => {
  const { success, data, error } = await personalizationSchema.safeParseAsync(params);

  if (success) return data;

  throw new Error(error.message);
};

const usePersonalizationData = (scope: PersonalizationScope) => {
  return useRouteLoaderData<PersonalizationData>(scope);
};

export { personalizationLoader, usePersonalizationData };
