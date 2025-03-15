import { Button, Tabs } from '@smartech/ui';
import { lazy } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Card, Loading } from '@/components';
import { useCampaignTab } from '@/hooks';
import Page from '@/layouts/container';

const List = lazy(() => import('@/components/templates/campaign/list'));
const Archive = lazy(() => import('@/components/templates/campaign/archive'));
const Overview = lazy(() => import('@/components/templates/campaign/overview'));

function Campaigns() {
  const campaign = useCampaignTab('ONSITE');

  const [, setSearchParams] = useSearchParams();

  const onTabChange = (tab: string) => {
    const params = new URLSearchParams();

    params.set('tab', tab);

    setSearchParams(params, { replace: true, viewTransition: true });
  };

  return (
    <Page
      headerTitle="On Site Notifications"
      headerElements={
        <div className="ms-auto">
          <Button variant="primary">New Campaign</Button>
        </div>
      }
    >
      <Card layout="fill">
        <Tabs fallback={<Loading />} activeTabId={campaign.tab} onTabChange={onTabChange}>
          <Tabs.Item id="list" title="List">
            <List />
          </Tabs.Item>
          <Tabs.Item id="overview" title="Overview">
            <Overview />
          </Tabs.Item>
          <Tabs.Item id="archive" title="Archive">
            <Archive />
          </Tabs.Item>
        </Tabs>
      </Card>
    </Page>
  );
}

export default Campaigns;
