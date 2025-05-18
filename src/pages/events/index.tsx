import { Button, GroupButton, Table, TableColumnProps } from '@smartech/ui';
import { useMemo, useState } from 'react';

import { Card } from '@/components';
import Page from '@/layouts/container';
import { useGoalsServiceGetApiV1GoalsSiteDomainByDomain } from '@/openapi/queries';
import { Goal } from '@/openapi/requests/types.gen';

function Events() {
  const [domain, setDomain] = useState('paneltest3.adtrace.io'); // Replace with actual domain or use from context/props

  // Use the goals query
  const {
    data: goals,
    isLoading,
    error,
  } = useGoalsServiceGetApiV1GoalsSiteDomainByDomain({
    domain,
    limit: 50, // Optional: limit the number of results
  });

  const columns = useMemo(
    () =>
      [
        {
          dataIndex: 'name',
          title: 'Goal name',
        },
        {
          dataIndex: 'type',
          title: 'Type',
        },
        {
          dataIndex: 'goal_type',
          title: 'Goal Type',
        },
        {
          dataIndex: 'created_at',
          title: 'Created At',
          render: (row: Goal) =>
            row.created_at ? new Date(row.created_at).toLocaleDateString() : 'N/A',
        },
      ] satisfies TableColumnProps<Goal>[],
    [],
  );

  return (
    <Page>
      <Card
        layout="stretch"
        title="Goals"
        headerElements={
          <Button
            leading="icon"
            icons={{ start: 'download-cloud-02' }}
            className="ml-auto"
            variant="secondary"
          >
            Export
          </Button>
        }
      >
        {/* <GroupButton>
          <GroupButton.Item>12 months</GroupButton.Item>
          <GroupButton.Item>30 days</GroupButton.Item>
          <GroupButton.Item>7 days</GroupButton.Item>
          <GroupButton.Item>24 hours</GroupButton.Item>
        </GroupButton> */}

        {isLoading ? (
          <div>Loading goals...</div>
        ) : error ? (
          <div>Error loading goals: {(error as Error).message}</div>
        ) : (
          <Table
            data={goals || []}
            columns={columns}
            layout="auto"
            rowKey={(row: Goal) => row.name || ''}
          />
        )}
      </Card>
    </Page>
  );
}

export default Events;
