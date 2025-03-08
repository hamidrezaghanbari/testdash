import { useRouteLoaderData } from 'react-router-dom';

import { ChannelData } from '@/router/loaders';

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

const useChannel = (channel: Channel) => {
  return useRouteLoaderData<ChannelData>(channel);
};

export { useChannel };
