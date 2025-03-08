import { LoaderFunction } from 'react-router-dom';
import { z } from 'zod';

const channelSchema = z.object({
  productId: z.string().nonempty(),
  campaignId: z.string().nonempty(),
  step: z.string().optional().default('audience'),
});

type ChannelData = z.infer<typeof channelSchema>;

type ChannelResult = ChannelData & { stepIndex: number };

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

const channelLoader: LoaderFunction = async ({ params }) => {
  const { success, data, error } = await channelSchema.safeParseAsync(params);

  if (success) return data;

  throw new Error(error.message);
};

export type { ChannelData, Channel, ChannelResult };

export { channelLoader };
