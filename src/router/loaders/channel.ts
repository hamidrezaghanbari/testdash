import { LoaderFunction, useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';

type Channel =
  | 'ONSITE'
  | 'INAPP'
  | 'SURVEY'
  | 'PUSH'
  | 'WEBPUSH'
  | 'EMAIL'
  | 'CUSTOM'
  | 'SMS'
  | 'TELEGRAM'
  | 'WHATSAPP';

const channelSchema = z.object({
  productId: z.string().nonempty(),
  campaignId: z.string().nonempty(),
  step: z.string().optional().default('audience'),
});

type ChannelData = z.infer<typeof channelSchema>;

const channelLoader: LoaderFunction = async ({ params }) => {
  const { success, data, error } = await channelSchema.safeParseAsync(params);

  if (success) return data;

  throw new Error(error.message);
};

const useChannelData = (channel: Channel) => {
  return useRouteLoaderData<ChannelData>(channel);
};

export type { Channel };

export { channelLoader, useChannelData };
