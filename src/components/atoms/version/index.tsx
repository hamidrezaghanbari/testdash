import { Avatar, Button, Icon, Menu, Text } from '@smartech/ui';
import { Link } from 'react-router-dom';

import { cn } from '@/common';

import { Card } from '../card';

interface VersionProps {
  className?: string;
}

const Version = ({ className }: VersionProps) => {
  return (
    <div className={cn('flex justify-center', className)}>
      <Card>
        <Avatar size="md" />

        <div className="flex flex-col gap-1">
          <Text size="sm" variant="semibold" color="primary-900">
            Alpha Wave
          </Text>

          <Text size="sm" variant="regular" color="tertiary-500">
            https://alphawave.com
          </Text>
        </div>
        <Menu
          title={
            <Button variant="tertiary" size="sm">
              <Icon name="chevron-selector-vertical" />
            </Button>
          }
        >
          <Menu.Item id="fuck1" title="fdas" icon="airplay" />
          <Menu.Item id="fuck2" title="sss" icon="airplay" />

          <Link to="/products">
            <Button variant="secondary" size="sm">
              Product Management
            </Button>
          </Link>
        </Menu>
      </Card>
    </div>
  );
};

export { Version };
