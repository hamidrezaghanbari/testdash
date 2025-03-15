import { useRouteLoaderData } from 'react-router-dom';

import { DEFAULT_CAMPAIGN_TAB } from '@/router/loaders';
import { CampaignTabData, Channel } from '@/router/loaders/_staticTypes';

const useCampaignTab = (channel: Channel): CampaignTabData => {
  const data = useRouteLoaderData<CampaignTabData>([channel, 'CAMPAIGN'].join(':'));

  return data ?? DEFAULT_CAMPAIGN_TAB;
};

export { useCampaignTab };
