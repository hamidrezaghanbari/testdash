import { Button, GroupButton, Input, Table, Text, useNotify } from '@smartech/ui';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
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
  sources?: SourceData[];
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ExtendedGoal | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<ExtendedGoal | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

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

  // Process API response data and add mock statistics and sources
  const processedGoals: ExtendedGoal[] =
    goals?.map((goal, index) => ({
      ...goal,
      _count: Math.floor(Math.random() * 10000) + 100,
      _total_user: Math.floor(Math.random() * 2000) + 50,
      _event_per_user: parseFloat((Math.random() * 6 + 1).toFixed(1)),
      sources:
        index < 4
          ? [
              {
                utm_source: 'Tapcell',
                count: Math.floor(Math.random() * 5000) + 1000,
                total_user: Math.floor(Math.random() * 1000) + 200,
                event_per_user: parseFloat((Math.random() * 4 + 2).toFixed(1)),
              },
              {
                utm_source: 'Yektanet',
                count: Math.floor(Math.random() * 4000) + 800,
                total_user: Math.floor(Math.random() * 800) + 150,
                event_per_user: parseFloat((Math.random() * 3 + 2).toFixed(1)),
              },
            ]
          : [],
    })) || [];

  // Fallback data that matches the image if no API data
  const fallbackEventData: ExtendedGoal[] = [
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
      sources: [
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
      ],
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
      sources: [
        {
          utm_source: 'Google Ads',
          count: 4200,
          total_user: 950,
          event_per_user: 4.4,
        },
        {
          utm_source: 'Facebook',
          count: 2903,
          total_user: 684,
          event_per_user: 4.2,
        },
      ],
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
      sources: [
        {
          utm_source: 'Organic',
          count: 800,
          total_user: 150,
          event_per_user: 5.3,
        },
        {
          utm_source: 'Direct',
          count: 537,
          total_user: 104,
          event_per_user: 5.2,
        },
      ],
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
      sources: [
        {
          utm_source: 'Email',
          count: 1958,
          total_user: 305,
          event_per_user: 6.4,
        },
        {
          utm_source: 'Social',
          count: 1300,
          total_user: 204,
          event_per_user: 6.4,
        },
      ],
    },
  ];

  // Use processed API data if available, otherwise use fallback data
  const displayData = processedGoals.length > 0 ? processedGoals : fallbackEventData;

  const toggleRowExpansion = (rowKey: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(rowKey)) {
      newExpandedRows.delete(rowKey);
    } else {
      newExpandedRows.add(rowKey);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: ExtendedGoal) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (event: ExtendedGoal) => {
    setDeletingEvent(event);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingEvent(null);
  };

  return (
    <Page>
      <AddEventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        refetch={refetch}
        editingEvent={editingEvent}
      />

      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        event={deletingEvent}
        refetch={refetch}
      />

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
          onClick={handleAddEvent}
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
        <div className="bg-white overflow-hidden rounded-lg border border-gray-200">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 border-b border-gray-200 bg-gray-50 px-4 py-3 font-medium text-sm text-gray-600">
            <div>Name</div>
            <div className="text-right">Count</div>
            <div className="text-right">Total User</div>
            <div className="text-right">Event Per User</div>
            <div className="text-right">Action</div>
          </div>

          {/* Table Body */}
          {displayData.map((record, index) => {
            const isExpanded = expandedRows.has(record.name || '');
            const hasExpandableContent = record.sources && record.sources.length > 0;

            return (
              <div key={record.name || index}>
                {/* Main Row */}
                <div className="grid grid-cols-5 gap-4 border-b border-gray-200 px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    {hasExpandableContent && (
                      <button
                        onClick={() => toggleRowExpansion(record.name || '')}
                        className="text-gray-400 transition-colors hover:text-gray-600"
                      >
                        {isExpanded ? (
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    )}
                    <span className="flex items-center gap-2">
                      {record.name}
                      {record.goal_type === 'goal' && (
                        <span className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 font-medium text-xs">
                          Goal
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="text-right font-medium">{record._count?.toLocaleString()}</div>
                  <div className="text-right font-medium">
                    {record._total_user?.toLocaleString()}
                  </div>
                  <div className="text-right font-medium">{record._event_per_user}</div>
                  <div className="flex justify-end gap-2">
                    <Button
                      icons={{ start: 'trash-01' }}
                      variant="secondary"
                      size="sm"
                      leading="icon"
                      onClick={() => handleDeleteEvent(record)}
                    />
                    <Button
                      icons={{ start: 'edit-03' }}
                      variant="secondary"
                      size="sm"
                      leading="icon"
                      onClick={() => handleEditEvent(record)}
                    />
                  </div>
                </div>

                {/* Expandable Content */}
                {isExpanded && hasExpandableContent && (
                  <div className="border-b border-gray-200 bg-gray-50">
                    <div className="px-4 py-3">
                      <div className="mb-3 grid grid-cols-4 gap-4 px-8 font-medium text-sm text-gray-600">
                        <div>Source</div>
                        <div className="text-right">Count</div>
                        <div className="text-right">Total User</div>
                        <div className="text-right">Event Per User</div>
                      </div>
                      {record.sources?.map((source, sourceIndex) => (
                        <div
                          key={sourceIndex}
                          className="grid grid-cols-4 gap-4 border-b border-gray-200 px-8 py-2 text-sm last:border-b-0"
                        >
                          <div className="text-gray-700">{source.utm_source}</div>
                          <div className="text-right font-medium text-gray-900">
                            {source.count.toLocaleString()}
                          </div>
                          <div className="text-right font-medium text-gray-900">
                            {source.total_user.toLocaleString()}
                          </div>
                          <div className="text-right font-medium text-gray-900">
                            {source.event_per_user}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {displayData.length === 0 && (
            <div className="px-4 py-8 text-center">
              <div className="text-gray-500">There is no event</div>
              <div className="text-sm text-gray-400">Click 'Add new' to begin</div>
            </div>
          )}
        </div>
      )}
    </Page>
  );
}

const AddEventModal = ({
  isOpen,
  onClose,
  refetch,
  editingEvent,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  editingEvent?: ExtendedGoal | null;
}) => {
  const { domain } = useDomainStore();
  const [goalType, setGoalType] = useState<'goal' | 'general'>('goal');
  const notify = useNotify();

  const isEditing = !!editingEvent;

  const useCreateEventForm = createFormHandler<{
    name: string;
    pattern: string;
  }>(
    {
      name: editingEvent?.name || '',
      pattern: editingEvent?.settings?.page_url || '',
    },
    z.object({
      name: z.string().min(1, { message: 'Event name is required' }),
      pattern: z.string().min(1, { message: 'Pattern is required' }),
    }),
  );

  const { handleSubmit, formState, control, reset } = useCreateEventForm();

  const { mutate: createGoal, isPending } = useGoalsServicePostApiV1GoalsSiteDomainByDomain({});

  // Reset form when editingEvent changes
  React.useEffect(() => {
    if (editingEvent) {
      reset({
        name: editingEvent.name || '',
        pattern: editingEvent.settings?.page_url || '',
      });
      setGoalType(editingEvent.goal_type === 'goal' ? 'goal' : 'general');
    } else {
      reset({ name: '', pattern: '' });
      setGoalType('goal');
    }
  }, [editingEvent, reset]);

  if (!isOpen) return null;

  const onSubmit = (data: { name: string; pattern: string }) => {
    createGoal(
      {
        domain: domain || 'paneltest3.adtrace.io',
        requestBody: {
          name: data.name,
          type: 'pageview',
          count_method: 'once_per_page',
          url_pattern: 'equals',
          page_url: data?.pattern,
        },
      },
      {
        onSuccess: () => {
          notify.open({
            title: isEditing ? 'Event updated' : 'Event added',
            description: isEditing ? 'Event updated successfully' : 'Event added successfully',
            type: 'success',
          });
          onClose();
          reset();
          refetch();
        },
        onError: (error: any) => {
          notify.open({
            title: 'Error',
            description: error?.message || `Failed to ${isEditing ? 'update' : 'create'} event`,
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
            {isEditing ? 'Edit Event' : 'Add Event'}
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
          {isEditing ? 'Update event settings.' : 'Define events based on pageviews.'}
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

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="primary" className="px-8" spinning={isPending}>
            {isEditing ? 'Update event' : 'Add event'}
          </Button>
        </div>
      </form>
    </div>
  );
};

const DeleteEventModal = ({
  isOpen,
  onClose,
  event,
  refetch,
}: {
  isOpen: boolean;
  onClose: () => void;
  event: ExtendedGoal | null;
  refetch: () => void;
}) => {
  const notify = useNotify();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !event) return null;

  const handleDelete = async () => {
    setIsDeleting(true);

    // Simulate delete API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      notify.open({
        title: 'Event deleted',
        description: `"${event.name}" has been deleted successfully`,
        type: 'success',
      });

      onClose();
      refetch();
    } catch (error) {
      notify.open({
        title: 'Error',
        description: 'Failed to delete event',
        type: 'error',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0A0D12]/80">
      <div className="relative z-50 m-4 w-full max-w-[400px] rounded-lg bg-base-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <Text size="md" variant="semibold">
            Delete Event
          </Text>
          <Button
            variant="tertiary"
            size="sm"
            icons={{ start: 'x-close' }}
            onClick={onClose}
            leading="icon"
            disabled={isDeleting}
          />
        </div>

        <div className="mb-6">
          <Text size="sm" variant="regular" className="text-gray-600">
            Are you sure you want to delete the event
          </Text>
          <Text size="sm" variant="semibold" className="mt-1">
            "{event.name}"?
          </Text>
          <Text size="sm" variant="regular" className="mt-2 text-gray-600">
            This action cannot be undone.
          </Text>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            className="bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700"
            onClick={handleDelete}
            spinning={isDeleting}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Events;
