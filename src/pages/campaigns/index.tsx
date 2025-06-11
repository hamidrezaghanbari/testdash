import { Button, GroupButton, Input, Table, Text, useNotify } from '@smartech/ui';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { z } from 'zod';

import { createFormHandler } from '@/common';
import { Card } from '@/components';
import TableLoading from '@/components/tableLoading';
import Page from '@/layouts/container';
import {
  useAnalyticsServicePostApiV1AnalyticsSiteDomainReferrerStats,
  useGoalsServiceGetApiV1GoalsSiteDomainByDomain,
  useGoalsServicePostApiV1GoalsSiteDomainByDomain,
  useGoalsServicePutApiV1GoalsSiteDomainByDomainGoalByName,
} from '@/openapi/queries';
import { Goal, ReferrerCategory, SourceStats } from '@/openapi/requests/types.gen';
import { useDomainStore } from '@/store';
import { useDateRangeStore } from '@/store/date-range';

// Helper function to format time in minutes and seconds
const formatTime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
};

// Extended Referrer interface for referrer data
interface ExtendedReferrer {
  name: string;
  category: string;
  _total_user?: number;
  _new_user?: number;
  _sessions?: number;
  _avg_time?: number;
  sources?: SourceStats[];
}

function Campaigns() {
  const { domain } = useDomainStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ExtendedReferrer | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<ExtendedReferrer | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const {
    mutate,
    data,
    isPending: isLoading,
    error,
  } = useAnalyticsServicePostApiV1AnalyticsSiteDomainReferrerStats();

  // Transform API response data into ExtendedReferrer format
  const processedReferrers: ExtendedReferrer[] = React.useMemo(() => {
    return (
      data?.referrer_stats?.map((referrerCategory: ReferrerCategory) => ({
        name: referrerCategory.category === 'direct' ? 'Direct' : referrerCategory.category,
        category: referrerCategory.category,
        _total_user: referrerCategory.total_user,
        _new_user: referrerCategory.new_user,
        _sessions: referrerCategory.sessions,
        _avg_time: referrerCategory.avg_time,
        sources: referrerCategory.sources || [],
      })) || []
    );
  }, [data?.referrer_stats]);

  const { dateRange } = useDateRangeStore();

  const timeRequest = {
    start_date: dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
    end_date: dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
  };

  const refetch = () => {
    mutate({ requestBody: { domain, ...timeRequest }, userId: Cookies.get('userUuid') || '' });
  };

  useEffect(() => {
    refetch();
  }, [domain, dateRange]);

  // Use processed referrer data
  const displayData = processedReferrers;

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

  const handleEditEvent = (event: ExtendedReferrer) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (event: ExtendedReferrer) => {
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
            Referrer Analytics
          </Text>
        </div>

        {/* <Button
          leading="icon"
          icons={{ start: 'plus' }}
          className="ml-auto"
          variant="primary"
          onClick={handleAddEvent}
        >
          Add new
        </Button> */}
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
        <TableLoading />
      ) : error ? (
        <div>Error loading referrers: {(error as Error).message}</div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 border-b border-gray-200 bg-gray-50 px-4 py-3 font-medium text-sm text-gray-600">
            <div>Category</div>
            <div className="text-right">Total Users</div>
            <div className="text-right">New Users</div>
            <div className="text-right">Sessions</div>
            <div className="text-right">Avg Time</div>
          </div>

          {/* Table Body */}
          {displayData.map((record, index) => {
            const isExpanded = expandedRows.has(record.name || '');
            const hasExpandableContent = record.sources && record.sources.length > 0;

            console.log(record?.sources, 'fuck');

            return (
              <div key={record.name || index}>
                {/* Main Row */}
                <div className="grid grid-cols-5 gap-4 border-b border-gray-200 bg-base-white px-4 py-3 hover:bg-gray-50">
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
                    <span className="flex items-center gap-2 capitalize">
                      {record.name}
                      <span className="rounded-full bg-gray-100 px-2 py-1 font-medium text-xs text-gray-800">
                        {record.category}
                      </span>
                    </span>
                  </div>
                  <div className="text-right font-medium">
                    {record._total_user?.toLocaleString()}
                  </div>
                  <div className="text-right font-medium">{record._new_user?.toLocaleString()}</div>
                  <div className="text-right font-medium">{record._sessions?.toLocaleString()}</div>
                  <div className="text-right font-medium">{formatTime(record._avg_time || 0)}</div>
                </div>

                {/* Expandable Content */}
                {isExpanded && hasExpandableContent && (
                  <div className="border-b border-gray-200 bg-gray-50">
                    <div className="px-4 py-3">
                      <div className="mb-3 grid grid-cols-5 gap-4 px-8 font-medium text-sm text-gray-600">
                        <div>Source</div>
                        <div className="text-right">Total Users</div>
                        <div className="text-right">Sessions</div>
                        <div className="text-right">Avg Time</div>
                      </div>
                      {record?.sources?.map((source, sourceIndex) => (
                        <div
                          key={sourceIndex}
                          className="grid grid-cols-5 gap-4 border-b border-gray-200 px-8 py-2 text-sm last:border-b-0"
                        >
                          <div className="text-gray-700">{source.source}</div>
                          <div className="text-right font-medium text-gray-900">
                            {source.total_user.toLocaleString()}
                          </div>

                          <div className="text-right font-medium text-gray-900">
                            {source.sessions.toLocaleString()}
                          </div>
                          <div className="text-right font-medium text-gray-900">
                            {formatTime(source.avg_time)}
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
            <div className="bg-base-white px-4 py-8 text-center">
              <div className="text-gray-500">There is no referrer data</div>
              <div className="text-sm text-gray-400">
                Data will appear when you have referrer traffic
              </div>
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
  editingEvent?: ExtendedReferrer | null;
}) => {
  const { domain } = useDomainStore();
  const [goalType, setGoalType] = useState<'goal' | 'default'>('goal');
  const notify = useNotify();

  const isEditing = !!editingEvent;

  const useCreateEventForm = createFormHandler<{
    name: string;
    pattern: string;
  }>(
    {
      name: editingEvent?.name || '',
      pattern: editingEvent?.category || '',
    },
    z.object({
      name: z.string().min(1, { message: 'Referrer name is required' }),
      pattern: z.string().min(1, { message: 'Category is required' }),
    }),
  );

  const { handleSubmit, formState, control, reset } = useCreateEventForm();

  const { mutate: createGoal, isPending } = useGoalsServicePostApiV1GoalsSiteDomainByDomain({});

  const { mutate: updateGoal, isPending: isUpdating } =
    useGoalsServicePutApiV1GoalsSiteDomainByDomainGoalByName();

  // Reset form when editingEvent changes
  React.useEffect(() => {
    if (editingEvent) {
      reset({
        name: editingEvent.name || '',
        pattern: editingEvent.category || '',
      });
      setGoalType('goal');
    } else {
      reset({ name: '', pattern: '' });
      setGoalType('goal');
    }
  }, [editingEvent, reset]);

  if (!isOpen) return null;

  const onSubmit = (data: { name: string; pattern: string }) => {
    const onSuccess = () => {
      notify.open({
        title: isEditing ? 'Referrer updated' : 'Referrer added',
        description: isEditing ? 'Referrer updated successfully' : 'Referrer added successfully',
        type: 'success',
      });
      onClose();
      reset();
      refetch();
    };

    const onError = (error: any) => {
      notify.open({
        title: 'Error',
        description: error?.message || `Failed to ${isEditing ? 'update' : 'create'} referrer`,
        type: 'error',
      });
    };

    if (isEditing) {
      updateGoal(
        {
          domain: domain,
          name: editingEvent?.name || '',
          requestBody: {
            name: data.name || '',
          },
          userId: Cookies.get('userUuid') || '',
        },
        {
          onSuccess,
          onError,
        },
      );
    } else {
      createGoal(
        {
          domain: domain || 'paneltest3.adtrace.io',
          requestBody: {
            name: data.name,
            type: 'pageview',
            count_method: 'once_per_page',
            url_pattern: 'equals',
            page_url: data?.pattern,

            category: goalType === 'goal' ? 'goal' : 'default',
          },
          userId: Cookies.get('userUuid') || '',
        },
        {
          onSuccess,
          onError,
        },
      );
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0A0D12]/80">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-50 m-4 w-full max-w-[480px] rounded-lg bg-base-white p-6 shadow-lg"
      >
        <div className="mb-4 flex items-center justify-between">
          <Text size="md" variant="semibold">
            {isEditing ? 'Edit Referrer' : 'Add Referrer'}
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
          {isEditing ? 'Update referrer settings.' : 'Define referrer tracking settings.'}
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
                goalType === 'default'
                  ? 'border-l border-gray-300 bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setGoalType('default')}
            >
              General
            </button>
          </div>
        </div>

        {/* Referrer Name */}
        <div className="mb-6">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                label="Referrer Name"
                placeholder='Enter something like "Google" or "Facebook"'
                required
                error={invalid}
                hint={error?.message}
                {...field}
              />
            )}
          />
        </div>

        {/* Category */}
        {/* <div className="mb-6">
          <label className="mb-2 block font-medium text-sm text-gray-700">Category</label>
          <div className="flex rounded-lg border border-gray-300">
            <span className="flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
              Category
            </span>
            <Controller
              control={control}
              name="pattern"
              render={({ field, fieldState: { invalid, error } }) => (
                <Input
                  placeholder="direct, referral, organic, social"
                  className="rounded-l-none border-0"
                  required
                  error={invalid}
                  hint={error?.message}
                  {...field}
                />
              )}
            />
          </div>
        </div> */}

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isPending || isUpdating}>
            Cancel
          </Button>
          <Button variant="primary" className="px-8" spinning={isPending || isUpdating}>
            {isEditing ? 'Update referrer' : 'Add referrer'}
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
  event: ExtendedReferrer | null;
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
        title: 'Referrer deleted',
        description: `"${event.name}" has been deleted successfully`,
        type: 'success',
      });

      onClose();
      refetch();
    } catch (error) {
      notify.open({
        title: 'Error',
        description: 'Failed to delete referrer',
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
            Delete Referrer
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
            Are you sure you want to delete the referrer
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

export default Campaigns;
