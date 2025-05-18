import { Button, GroupButton, Table, TableColumnProps } from '@smartech/ui';
import { useMemo } from 'react';

import { Card } from '@/components';
import Page from '@/layouts/container';

const data: any[] = Array.from({ length: 10 }, (_, index) => ({
  name: `campaign ${index}`,
  type: `type ${index}`,
  status: `status ${index}`,
}));

function Events() {
  const columns = useMemo(
    () =>
      [
        {
          dataIndex: 'name',
          title: 'Campaign name',
        },
        {
          dataIndex: 'type',
          title: 'Type',
        },
        { dataIndex: 'status', title: 'Status' },
      ] satisfies TableColumnProps<any>[],
    [],
  );

  return (
    <Page>
      <Card
        layout="stretch"
        title="Events"
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

        <Table data={data} columns={columns} layout="auto" rowKey={(row: any) => row.name} />
      </Card>
    </Page>
  );
}

export default Events;
