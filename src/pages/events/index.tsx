import { Button, GroupButton, Input, Table, Text, useNotify } from '@smartech/ui';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { z } from 'zod';

import { createFormHandler } from '@/common';
import { Card } from '@/components';
import Page from '@/layouts/container';
import {
  useGoalsServiceGetApiV1GoalsSiteDomainByDomain,
  useGoalsServicePostApiV1GoalsSiteDomainByDomain,
} from '@/openapi/queries';
import { Goal } from '@/openapi/requests/types.gen';
import { useDomainStore } from '@/store';

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

function Events() {
  const { domain } = useDomainStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use the goals query
  const {
    data: goals,
    isLoading,
    error,
    refetch,
  } = useGoalsServiceGetApiV1GoalsSiteDomainByDomain({
    domain: domain || 'paneltest3.adtrace.io',
    limit: 50,
  });

  // Prepare mock data that matches the image in case API returns no data
  const mockEvents: ExtendedGoal[] = [
    {
      name: 'Checkout Start',
      count_method: 'event',
      type: 'event',
      goal_type: 'conversion',
      site_uuid: domain,
      created_at: new Date().toISOString(),
      _count: 10697,
      _total_user: 2487,
      _event_per_user: 4.8,
    },
    {
      name: 'Add to Cart',
      count_method: 'event',
      type: 'event',
      goal_type: 'goal',
      site_uuid: domain,
      created_at: new Date().toISOString(),
      _count: 7103,
      _total_user: 1634,
      _event_per_user: 6.4,
    },
    {
      name: 'Remove From Cart',
      count_method: 'event',
      type: 'event',
      goal_type: 'conversion',
      site_uuid: domain,
      created_at: new Date().toISOString(),
      _count: 1337,
      _total_user: 254,
      _event_per_user: 5.3,
    },
    {
      name: 'Purchase',
      count_method: 'event',
      type: 'event',
      goal_type: 'goal',
      site_uuid: domain,
      created_at: new Date().toISOString(),
      _count: 3258,
      _total_user: 509,
      _event_per_user: 6.1,
    },
    {
      name: 'Book Demo',
      count_method: 'event',
      type: 'event',
      goal_type: 'conversion',
      site_uuid: domain,
      created_at: new Date().toISOString(),
      _count: 382,
      _total_user: 297,
      _event_per_user: 1.2,
    },
  ];

  // Process API response data to add mock statistics
  const processedData: ExtendedGoal[] =
    goals?.map((goal) => ({
      ...goal,
      _count: Math.floor(Math.random() * 10000) + 100,
      _total_user: Math.floor(Math.random() * 2000) + 50,
      _event_per_user: parseFloat((Math.random() * 6 + 1).toFixed(1)),
    })) || [];

  // Use processed API data if available, otherwise use mock data
  const displayData = processedData;

  // Mock source data for the collapsible sections
  const mockSourceData: SourceData[] = [
    {
      utm_source: 'Tapcell',
      count: 6387,
      total_user: 1383,
      event_per_user: 5.9,
    },
    {
      utm_source: 'Yektanet',
      count: 4310,
      total_user: 1104,
      event_per_user: 4.3,
    },
  ];

  return (
    <Page>
      <AddEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} refetch={refetch} />

      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-1 pt-8">
          <Text size="md" variant="semibold">
            Event Tracking
          </Text>
        </div>

        <Button
          leading="icon"
          icons={{ start: 'plus' }}
          className="ml-auto"
          variant="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add new
        </Button>
      </div>

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
          emptyText="There is no event"
          emptyDescription="Click 'Add new' to begin"
        />
      )}
    </Page>
  );
}

const AddEventModal = ({
  isOpen,
  onClose,
  refetch,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}) => {
  const { domain } = useDomainStore();
  const [goalType, setGoalType] = useState<'goal' | 'general'>('goal');
  const notify = useNotify();

  const useCreateEventForm = createFormHandler<{
    name: string;
    pattern: string;
  }>(
    { name: '', pattern: '' },
    z.object({
      name: z.string().min(1, { message: 'Event name is required' }),
      pattern: z.string().min(1, { message: 'Pattern is required' }),
    }),
  );

  const { handleSubmit, formState, control, reset } = useCreateEventForm();

  const { mutate: createGoal, isPending } = useGoalsServicePostApiV1GoalsSiteDomainByDomain({});

  if (!isOpen) return null;

  const onSubmit = (data: { name: string; pattern: string }) => {
    createGoal(
      {
        domain: domain || 'paneltest3.adtrace.io',
        requestBody: {
          name: data.name,
          // type: goalType === 'goal' ? 'pageview' : 'event',
          type: 'pageview',
          count_method: 'once_per_page',
          // site_uuid: domain || 'paneltest3.adtrace.io',
          // url_pattern: data.pattern,
          url_pattern: 'equals',
          page_url: data?.pattern,
        },
      },
      {
        onSuccess: () => {
          notify.open({
            title: 'Event added',
            description: 'Event added successfully',
            type: 'success',
          });
          onClose();
          reset();
          refetch();
        },
        onError: (error: any) => {
          notify.open({
            title: 'Error',
            description: error?.message || 'Failed to create event',
            type: 'error',
          });
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0A0D12]/80">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-50 m-4 w-full max-w-[480px] rounded-lg bg-base-white p-6 shadow-lg"
      >
        <div className="mb-4 flex items-center justify-between">
          <Text size="md" variant="semibold">
            Add Event
          </Text>
          <Button
            variant="tertiary"
            size="sm"
            icons={{ start: 'x-close' }}
            onClick={onClose}
            leading="icon"
          />
        </div>

        <Text size="sm" variant="regular" className="mb-6 text-gray-600">
          Define events based on pageviews.
        </Text>

        {/* Goal Type Toggle */}
        <div className="mb-6">
          <div className="flex rounded-lg border border-gray-300">
            <button
              type="button"
              className={`flex-1 rounded-l-lg px-4 py-2 font-medium text-sm ${
                goalType === 'goal'
                  ? 'border-r border-gray-300 bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setGoalType('goal')}
            >
              Goal
            </button>
            <button
              type="button"
              className={`flex-1 rounded-r-lg px-4 py-2 font-medium text-sm ${
                goalType === 'general'
                  ? 'border-l border-gray-300 bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setGoalType('general')}
            >
              General
            </button>
          </div>
        </div>

        {/* Event Name */}
        <div className="mb-6">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                label="Event Name"
                placeholder='Enter something like "Purchase"'
                required
                error={invalid}
                hint={error?.message}
                {...field}
              />
            )}
          />
        </div>

        {/* Pattern */}
        <div className="mb-6">
          <label className="mb-2 block font-medium text-sm text-gray-700">Pattern</label>
          <div className="flex rounded-lg border border-gray-300">
            <span className="flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
              Equals
            </span>
            <Controller
              control={control}
              name="pattern"
              render={({ field, fieldState: { invalid, error } }) => (
                <Input
                  placeholder="URL"
                  className="rounded-l-none border-0"
                  required
                  error={invalid}
                  hint={error?.message}
                  {...field}
                />
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="primary" className="px-8" spinning={isPending}>
            Add event
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Events;
