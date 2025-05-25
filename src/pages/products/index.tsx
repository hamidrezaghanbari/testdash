import { Button, GroupButton, Modal, Table, Text } from '@smartech/ui';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { Card } from '@/components';
import Page from '@/layouts/container';
import {
  useAnalyticsServicePostApiV1AnalyticsSiteDomainReferrerStats,
  useGoalsServiceGetApiV1GoalsSiteDomainByDomain,
  useSegmentsServiceGetApiV1Segments,
  useSitesServiceGetApiV1SitesUserByUserId,
} from '@/openapi/queries';
import { Goal, Segment } from '@/openapi/requests/types.gen';

interface Product {
  _domain: string;
}

function Products() {
  const [domain, setDomain] = useState('paneltest3.adtrace.io');

  // Use the goals query
  const {
    data: userProducts,

    isLoading,
    error,
  } = useSitesServiceGetApiV1SitesUserByUserId({
    userId: Cookies.get('userUuid') || '',
  });

  const processedData: Product[] =
    userProducts?.map((product) => ({
      ...product,
      _domain: product?.domain,
    })) || [];

  // Use processed API data if available, otherwise use mock data

  console.log(processedData, 'processedData');

  return (
    <Page>
      <AddProductModal />

      <Card
        layout="stretch"
        title="Events"
        headerElements={
          <Button leading="icon" icons={{ start: 'plus' }} className="ml-auto" variant="primary">
            Add new
          </Button>
        }
      >
        <div className="mb-4">
          <GroupButton>
            <GroupButton.Item>12 months</GroupButton.Item>
            <GroupButton.Item>30 days</GroupButton.Item>
            <GroupButton.Item>7 days</GroupButton.Item>
            <GroupButton.Item>24 hours</GroupButton.Item>
          </GroupButton>
        </div>

        {isLoading ? (
          <div>Loading events...</div>
        ) : error ? (
          <div>Error loading events: {(error as Error).message}</div>
        ) : (
          <Table
            data={processedData}
            columns={
              [
                {
                  dataIndex: '_domain',
                  title: 'Website',
                  render: (item: Product) => item?._domain,
                },
                {
                  dataIndex: 'actions',
                  title: 'Action',
                  render: () => (
                    <div className="flex gap-2">
                      <Button
                        icons={{ start: 'code-01' }}
                        variant="tertiary"
                        size="sm"
                        leading="icon"
                      />
                      <Button
                        icons={{ start: 'trash-01' }}
                        variant="tertiary"
                        size="sm"
                        leading="icon"
                      />
                    </div>
                  ),
                },
              ] as any
            }
            layout="auto"
            rowKey={(row) => row._domain || ''}
          />
        )}
      </Card>
    </Page>
  );
}

const AddProductModal = () => {
  return <div>modal</div>;
};

export default Products;
