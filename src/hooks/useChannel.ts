import { useRouteLoaderData } from 'react-router-dom';

import type { Channel, ChannelData, ChannelResult } from '@/router/loaders';

enum StepIndex {
  AUDIENCE,
  WHEN,
  MESSAGE,
  TRACKING,
  TEST_CAMPAIGN,
  PREVIEW,
}

const STEPS = new Map([
  ['audience', StepIndex.AUDIENCE],
  ['when', StepIndex.WHEN],
  ['message', StepIndex.MESSAGE],
  ['tracking', StepIndex.TRACKING],
  ['testCampaign', StepIndex.TEST_CAMPAIGN],
  ['preview', StepIndex.PREVIEW],
]);

const useChannel = (channel: Channel): ChannelResult => {
  const data = useRouteLoaderData<ChannelData>(channel);

  if (!data) throw new Error('[useChannel] must be used in channel pages');

  const stepIndex = STEPS.get(data.step) ?? StepIndex.AUDIENCE;

  return Object.assign(data, { stepIndex });
};

export { useChannel };
