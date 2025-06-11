import { IconButton, Input, Table, TableColumnProps } from '@smartech/ui';
import { useMemo } from 'react';

type CampaignResponse = {
  name: string;
  type: string;
  status: string;
};

const data: CampaignResponse[] = Array.from({ length: 10 }, (_, index) => ({
  name: `campaign ${index}`,
  type: `type ${index}`,
  status: `status ${index}`,
}));

const CampaignArchive = () => {
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
      ] satisfies TableColumnProps<CampaignResponse>[],
    [],
  );

  return (
    <div className="flex flex-col gap-4 pb-2">
      <div className="flex w-full items-center justify-between gap-4">
        <Input placeholder="Campaign name" fieldClassName="max-w-[400px]" />
        <IconButton icon="filter-lines" variant="secondary" size="md" />
      </div>
      <Table data={data} columns={columns} layout="auto" rowKey={(row) => row.name} />
    </div>
  );
};

export default CampaignArchive;
