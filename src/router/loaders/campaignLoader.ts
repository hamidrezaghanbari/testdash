import qs from 'qs';
import { LoaderFunction, replace } from 'react-router-dom';
import { z } from 'zod';

import { CampaignTabData } from './_staticTypes';

const campaignSchema = z.object({
  tab: z.string().refine((value) => ['overview', 'list', 'archive'].includes(value)),
});

const DEFAULT_CAMPAIGN_TAB: CampaignTabData = { tab: 'list' };

const campaignLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const queries = qs.parse(url.search, { ignoreQueryPrefix: true });

  const { data, success } = await campaignSchema.safeParseAsync(queries);

  if (success) return data;

  const search = qs.stringify(DEFAULT_CAMPAIGN_TAB, { addQueryPrefix: true });

  const target = url.origin + url.pathname + search;

  return replace(target);
};

export { campaignLoader, DEFAULT_CAMPAIGN_TAB };
