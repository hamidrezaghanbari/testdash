import { useLocation, useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';

import type { ChannelData, ChannelResult } from '@/router/loaders';
import { Channel } from '@/router/loaders/_staticTypes';

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

  const { step = 'audience' } = useParams();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  if (!data) throw new Error('[useChannel] must be used in channel pages');

  const stepIndex = STEPS.get(step) ?? StepIndex.AUDIENCE;

  function next() {
    const nextStep = Array.from(STEPS.keys())[stepIndex + 1];

    if (nextStep) {
      const path = pathname.replace(new RegExp(`${step}$`), nextStep);

      navigate(path, { viewTransition: true });
    }
  }

  function back() {
    const prevStep = Array.from(STEPS.keys())[stepIndex - 1];

    if (prevStep) {
      const path = pathname.replace(new RegExp(`${step}$`), prevStep);

      navigate(path, { viewTransition: true });
    }
  }

  return { ...data, stepIndex, back, next };
};

export { useChannel };
