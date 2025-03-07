import { LoaderFunction, useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';

const channelSchema = z.union([
  z.literal('ONSITE'),
  z.literal('INAPP'),
  z.literal('SURVEY'),
  z.literal('PUSH'),
  z.literal('WEBPUSH'),
  z.literal('EMAIL'),
  z.literal('CUSTOM'),
  z.literal('SMS'),
  z.literal('TELEGRAM'),
  z.literal('WHATSAPP'),
]);

const channelDataSchema = z.object({
  productId: z.string().nonempty(),
  campaignId: z.string().nonempty(),
  step: z.string().optional().default('audience'),
});

type Channel = z.infer<typeof channelSchema>;

type ChannelData = z.infer<typeof channelDataSchema>;

const channelLoader: LoaderFunction = async ({ params }) => {
  const { success, data, error } = await channelDataSchema.safeParseAsync(params);

  if (success) return data;

  throw new Error(error.message);
};

const useChannelData = (channel: Uppercase<Channel>) => {
  return useRouteLoaderData<ChannelData>(channelSchema.parse(channel));
};

export type { Channel };

export { channelLoader, useChannelData };
