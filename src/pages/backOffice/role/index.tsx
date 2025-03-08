import { Button, Icon, Input, Menu, Table, TableColumnProps } from '@smartech/ui';
import { useMemo } from 'react';

import { Card } from '@/components';
import Page from '@/layouts/container';

type RoleResponse = {
  id: string;
  name: string;
};

const ROLES: RoleResponse[] = [
  {
    id: '1',
    name: 'admin',
  },
  {
    id: '2',
    name: 'manager',
  },
];

function Role() {
  const columns = useMemo(
    () =>
      [
        {
          dataIndex: 'name',
          title: 'Name',
        },
        {
          dataIndex: 'id',
          title: 'Operation',
          render() {
            return (
              <Menu title={<Icon name="dots-vertical" />} closeOnSelect>
                <Menu.Item id="profile" icon="user-01" title="View Profile" />
                <Menu.Item id="settings" icon="settings-01" title="Settings" />
                <Menu.Item id="shortcuts" icon="zap" title="Keyboard shortcuts" />
                <Menu.Item id="company" icon="home-line" title="Company profile" />
              </Menu>
            );
          },
        },
      ] satisfies TableColumnProps<RoleResponse>[],
    [],
  );

  return (
    <Page
      headerTitle="Roles"
      headerElements={
        <div className="ms-auto">
          <Button variant="primary">Add Role</Button>
        </div>
      }
    >
      <Card
        layout="fill"
        headerElements={
          <div className="w-full max-w-[500px]">
            <Input placeholder="Search..." />
          </div>
        }
      >
        <Table data={ROLES} columns={columns} rowKey={(row) => row.id} />
      </Card>
    </Page>
  );
}

export default Role;
