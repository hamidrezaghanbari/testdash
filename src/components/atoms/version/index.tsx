import { Avatar, Button, Icon, Menu, Radio, Text } from '@smartech/ui';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

import { cn } from '@/common';
import { useSitesServiceGetApiV1SitesUserByUserId } from '@/openapi/queries';
import { useDomainStore } from '@/store';

import { Card } from '../card';

interface VersionProps {
  className?: string;
}

const Version = ({ className }: VersionProps) => {
  const { domain, setDomain } = useDomainStore();

  const { data: domainsList } = useSitesServiceGetApiV1SitesUserByUserId({
    userId: Cookies.get('userUuid') || '',
  });

  console.log(domainsList, 'fff');

  return (
    <div className={cn('flex justify-center pb-5', className)}>
      <Card className="flex max-w-full gap-2">
        <Avatar size="md" />

        <div className="flex flex-col gap-1">
          <Text size="sm" variant="semibold" color="primary-900" className="max-w-24 truncate">
            {Cookies.get('username')}
          </Text>

          <Text size="sm" variant="regular" color="tertiary-500" className="max-w-24 truncate">
            {domain ? domain : 'No Product'}
          </Text>
        </div>

        <div className="ml-auto">
          <Menu
            title={
              <Button variant="tertiary" size="sm">
                <Icon name="chevron-selector-vertical" />
              </Button>
            }
          >
            <div className="flex flex-col bg-gray-50">
              <div className="flex flex-col rounded-b-lg border-b border-gray-100 bg-base-white">
                <div className="flex h-10 items-center gap-2 border-b border-gray-300 px-3">
                  <Icon name="user-01" />

                  <Link to="/profile">
                    <Text size="xs" variant="semibold" className="text-gray-700">
                      View Profile
                    </Text>
                  </Link>
                </div>

                <Text size="xs" variant="semibold" className="px-3 py-2 text-gray-600">
                  Switch Product (web)
                </Text>

                <div className="flex flex-col gap-1">
                  {domainsList?.map((domainItem) => (
                    <div
                      key={domainItem?.domain}
                      className="flex items-center gap-1 rounded-sm px-2 py-1 hover:cursor-pointer hover:bg-gray-100"
                    >
                      <Avatar size="md" />

                      <div className="gap-0.5 flex flex-col pr-4">
                        <Text size="xs" variant="semibold" className="text-gray-900">
                          {domainItem?.domain}
                        </Text>

                        <Text size="xs" variant="regular" className="text-gray-600">
                          https://{domainItem?.domain}
                        </Text>
                      </div>

                      <div className="ml-auto">
                        {/* @ts-ignore */}
                        <Radio.Group value="45 Degrees" label="">
                          <Radio label="" value="fd" />
                        </Radio.Group>
                      </div>
                    </div>
                  ))}
                </div>

                <Link to="/products" className="mx-2 my-2">
                  <Button variant="secondary" size="sm" className="w-full">
                    Product Management
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-2 px-3 py-2">
                <Icon name="log-out-01" className="text-gray-600" />
                <Link to="/sign-out" className="text-gray-700">
                  <Text size="sm" variant="semibold">
                    Sign out
                  </Text>
                </Link>
              </div>
            </div>

            <></>
          </Menu>
        </div>
      </Card>
    </div>
  );
};

export { Version };
