import { Tabs } from '@smartech/ui';
import { useSearchParams } from 'react-router-dom';

import { Card, Loading } from '@/components';
import Page from '@/layouts/container';

import ProjectContracts from './projectContracts';

function Financial() {
  const [searchParams, setSearchParams] = useSearchParams();

  const onTabChange = (tab: string) => {
    const params = new URLSearchParams();

    params.set('tab', tab);

    setSearchParams(params, { replace: true, viewTransition: true });
  };

  return (
    <Page headerTitle="Financial">
      <Card layout="fill">
        <Tabs
          fallback={<Loading />}
          activeTabId={searchParams.get('tab') ?? 'contracts'}
          onTabChange={onTabChange}
        >
          <Tabs.Item id="contracts" title="Project Contracts">
            <ProjectContracts />
          </Tabs.Item>
          <Tabs.Item id="invoices" title="Proforma Invoices">
            <h1>Proforma Invoices</h1>
          </Tabs.Item>
        </Tabs>
      </Card>
    </Page>
  );
}

export default Financial;
