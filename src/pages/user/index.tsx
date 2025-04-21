import { Tabs } from '@smartech/ui';
import { lazy } from 'react';

import { Card, Loading } from '@/components';
import { useTabQuery, useUsersTab } from '@/hooks';
import Page from '@/layouts/container';

const Overview = lazy(() => import('./sections/overview'));
const Analyze = lazy(() => import('./sections/analyze'));
const Search = lazy(() => import('./sections/search'));

function User() {
  const { tab } = useUsersTab();

  const { handler } = useTabQuery();

  return (
    <Page headerTitle="Users">
      <Card layout="stretch" noStyle>
        <Tabs fallback={<Loading />} appearance="minimal" activeTabId={tab} onTabChange={handler}>
          <Tabs.Item id="overview" title="Overview">
            <Overview />
          </Tabs.Item>
          <Tabs.Item id="analyze" title="Analyze">
            <Analyze />
          </Tabs.Item>
          <Tabs.Item id="search" title="Search Users">
            <Search />
          </Tabs.Item>
        </Tabs>
      </Card>
    </Page>
  );
}

export default User;
