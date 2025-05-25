import { Button, GroupButton, Table } from '@smartech/ui';
import { useEffect, useState } from 'react';

import { Card } from '@/components';
import Page from '@/layouts/container';
import {
  useAnalyticsServicePostApiV1AnalyticsSiteDomainReferrerStats,
  useGoalsServiceGetApiV1GoalsSiteDomainByDomain,
  useSegmentsServiceGetApiV1Segments,
} from '@/openapi/queries';
import { Goal } from '@/openapi/requests/types.gen';

// Extended Goal interface with settings field
interface ExtendedGoal extends Goal {
  settings?: {
    page_url?: string;
    url_pattern?: string;
    count_method?: string;
    referrer?: string;
    [key: string]: any;
  } | null;
  _count?: number;
  _total_user?: number;
  _event_per_user?: number;
}

// Source data interface
interface SourceData {
  utm_source: string;
  count: number;
  total_user: number;
  event_per_user: number;
}

function Segment() {
  const [domain, setDomain] = useState('paneltest3.adtrace.io');

  // Use the goals query
  const {
    data: segmentData,

    isLoading,
    error,
  } = useSegmentsServiceGetApiV1Segments({
    domain,
  });

  console.log(segmentData, 'segment');

  // Prepare mock data that matches the image in case API returns no data
  // const mockEvents: ExtendedGoal[] = [
  //   {
  //     name: 'Checkout Start',
  //     count_method: 'event',
  //     type: 'event',
  //     goal_type: 'conversion',
  //     site_uuid: domain,
  //     created_at: new Date().toISOString(),
  //     _count: 10697,
  //     _total_user: 2487,
  //     _event_per_user: 4.8,
  //   },
  //   {
  //     name: 'Add to Cart',
  //     count_method: 'event',
  //     type: 'event',
  //     goal_type: 'goal',
  //     site_uuid: domain,
  //     created_at: new Date().toISOString(),
  //     _count: 7103,
  //     _total_user: 1634,
  //     _event_per_user: 6.4,
  //   },
  //   {
  //     name: 'Remove From Cart',
  //     count_method: 'event',
  //     type: 'event',
  //     goal_type: 'conversion',
  //     site_uuid: domain,
  //     created_at: new Date().toISOString(),
  //     _count: 1337,
  //     _total_user: 254,
  //     _event_per_user: 5.3,
  //   },
  //   {
  //     name: 'Purchase',
  //     count_method: 'event',
  //     type: 'event',
  //     goal_type: 'goal',
  //     site_uuid: domain,
  //     created_at: new Date().toISOString(),
  //     _count: 3258,
  //     _total_user: 509,
  //     _event_per_user: 6.1,
  //   },
  //   {
  //     name: 'Book Demo',
  //     count_method: 'event',
  //     type: 'event',
  //     goal_type: 'conversion',
  //     site_uuid: domain,
  //     created_at: new Date().toISOString(),
  //     _count: 382,
  //     _total_user: 297,
  //     _event_per_user: 1.2,
  //   },
  // ];

  // Process API response data to add mock statistics
  // const processedData: ExtendedGoal[] =
  //   referrerStats?.map((goal) => ({
  //     ...goal,
  //     _count: Math.floor(Math.random() * 10000) + 100,
  //     _total_user: Math.floor(Math.random() * 2000) + 50,
  //     _event_per_user: parseFloat((Math.random() * 6 + 1).toFixed(1)),
  //   })) || [];

  // // Use processed API data if available, otherwise use mock data
  // const displayData = processedData;

  // // Mock source data for the collapsible sections
  // const mockSourceData: SourceData[] = [
  //   {
  //     utm_source: 'Tapcell',
  //     count: 6387,
  //     total_user: 1383,
  //     event_per_user: 5.9,
  //   },
  //   {
  //     utm_source: 'Yektanet',
  //     count: 4310,
  //     total_user: 1104,
  //     event_per_user: 4.3,
  //   },
  // ];

  return (
    <Page>
      {' '}
      segment hamidreza
      {/* <Card
        layout="stretch"
        title="Events"
        headerElements={
          <Button leading="icon" icons={{ start: 'plus' }} className="ml-auto" variant="primary">
            Record
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

        {isPending ? (
          <div>Loading events...</div>
        ) : error ? (
          <div>Error loading events: {(error as Error).message}</div>
        ) : (
          <Table
            data={displayData}
            columns={
              [
                {
                  dataIndex: 'name',
                  title: 'Name',
                  render: (value: string, record: ExtendedGoal) => (
                    <span>
                      {value}
                      {record.goal_type && (
                        <span className="bg-blue-100 text-blue-800 ml-2 rounded-full px-2 py-1 text-xs">
                          {record.goal_type.charAt(0).toUpperCase() + record.goal_type.slice(1)}
                        </span>
                      )}
                      {record.type === 'pageview' && (
                        <span className="bg-green-100 text-green-800 ml-2 rounded-full px-2 py-1 text-xs">
                          Pageview
                        </span>
                      )}
                    </span>
                  ),
                },
                {
                  dataIndex: 'type',
                  title: 'Type',
                  render: (value: string) => value || '-',
                },
                {
                  dataIndex: 'count_method',
                  title: 'Count Method',
                  render: (value: string) => value || '-',
                },
                {
                  dataIndex: 'settings',
                  title: 'URL',
                  render: (_: any, record: ExtendedGoal) => record.settings?.page_url || '-',
                },
                {
                  dataIndex: '_count',
                  title: 'Count',
                  render: (_: any, record: ExtendedGoal) => record._count || 0,
                },
                {
                  dataIndex: '_total_user',
                  title: 'Total User',
                  render: (_: any, record: ExtendedGoal) => record._total_user || 0,
                },
                {
                  dataIndex: '_event_per_user',
                  title: 'Event Per User',
                  render: (_: any, record: ExtendedGoal) => record._event_per_user || 0,
                },
                {
                  dataIndex: 'actions',
                  title: 'Action',
                  render: () => (
                    <div className="flex justify-end gap-2">
                      <Button
                        icons={{ start: 'trash-01' }}
                        variant="secondary"
                        size="sm"
                        leading="icon"
                      />
                      <Button
                        icons={{ start: 'edit-03' }}
                        variant="secondary"
                        size="sm"
                        leading="icon"
                      />
                    </div>
                  ),
                },
              ] as any
            }
            layout="auto"
            rowKey={(row) => row.name || ''}
          />
        )}
      </Card> */}
    </Page>
  );
}

export default Segment;
