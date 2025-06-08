import { Button, GroupButton, Icon, Input, Table, Text, useNotify } from '@smartech/ui';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { z } from 'zod';

import { createFormHandler } from '@/common';
import { Card } from '@/components';
import TableLoading from '@/components/tableLoading';
import Page from '@/layouts/container';
import {
  useAnalyticsServicePostApiV1AnalyticsAnalytics,
  useGoalsServiceGetApiV1GoalsSiteDomainByDomain,
  useGoalsServicePostApiV1GoalsSiteDomainByDomain,
  useGoalsServicePutApiV1GoalsSiteDomainByDomainGoalByName,
  useSegmentsServicePostApiV1Segments,
} from '@/openapi/queries';
import { Goal, SegmentCondition } from '@/openapi/requests/types.gen';
import { useDomainStore } from '@/store';

// Helper function to format time in minutes and seconds
const formatTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
};

// Extended Segment interface for segment data
interface ExtendedSegment {
  name: string;
  _total_user?: number;
  _sessions?: number;
  _avg_time?: number;
  subSegments?: ExtendedSegment[];
  isExpandable?: boolean;
}

function Campaigns() {
  const { domain } = useDomainStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ExtendedSegment | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<ExtendedSegment | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const {
    mutate,
    data,
    isPending: isLoading,
    error,
  } = useAnalyticsServicePostApiV1AnalyticsAnalytics();

  // Transform API response data into ExtendedSegment format
  const processedSegments: ExtendedSegment[] = React.useMemo(() => {
    const transform = (items: any[]): ExtendedSegment[] => {
      return items.map((item) => {
        const hasSubSegments = Array.isArray(item.subSegments) && item.subSegments.length > 0;
        return {
          name: item.name,
          _total_user: item.analytics?.total_users,
          _sessions: item.analytics?.total_sessions,
          _avg_time: item.analytics?.avg_time,
          isExpandable: hasSubSegments,
          subSegments: hasSubSegments ? transform(item.subSegments) : undefined,
        };
      });
    };

    if (data && Array.isArray((data as any).segments)) {
      return transform((data as any).segments);
    }
    return [];
  }, [data]);

  const refetch = () => {
    mutate({ requestBody: { domain: domain }, userId: Cookies.get('userUuid') || '' });
  };

  useEffect(() => {
    mutate({ requestBody: { domain: domain }, userId: Cookies.get('userUuid') || '' });
  }, []);

  // Use processed segment data
  const displayData = processedSegments;

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

  const handleEditEvent = (event: ExtendedSegment) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (event: ExtendedSegment) => {
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
            Segment Analytics
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
        <TableLoading />
      ) : error ? (
        <div>Error loading segments: {(error as Error).message}</div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-base-white">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 border-b border-gray-200 bg-gray-50 px-4 py-3 font-medium text-sm text-gray-600">
            <div>Name</div>
            <div className="text-right">Total Users</div>
            <div className="text-right">Sessions</div>
            <div className="text-right">Avg time</div>
            <div className="text-right">Action</div>
          </div>

          {/* Table Body */}
          {displayData.map((record, index) => {
            const isExpanded = expandedRows.has(record.name || '');
            const hasExpandableContent =
              record.isExpandable && record.subSegments && record.subSegments.length > 0;

            return (
              <div key={record.name || index}>
                {/* Main Row */}
                <div className="bg-white grid grid-cols-5 gap-4 border-b border-gray-200 px-4 py-3 hover:bg-gray-50">
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
                    <span className="flex items-center gap-2">{record.name}</span>
                  </div>
                  <div className="text-right font-medium">
                    {record.name === 'Source' ? '' : record._total_user?.toLocaleString()}
                  </div>
                  <div className="text-right font-medium">
                    {record.name === 'Source' ? '' : record._sessions?.toLocaleString()}
                  </div>
                  <div className="text-right font-medium">
                    {record.name === 'Source' ? '' : formatTime(record._avg_time || 0)}
                  </div>
                  <div className="text-right">
                    {record.name !== 'Source' && (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleDeleteEvent(record)}
                          className="hover:text-red-600 text-gray-400 transition-colors"
                        >
                          <Icon name="trash-01" />
                        </button>
                        <button
                          onClick={() => handleEditEvent(record)}
                          className="hover:text-blue-600 text-gray-400 transition-colors"
                        >
                          <Icon name="edit-01" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expandable Content */}
                {isExpanded && hasExpandableContent && (
                  <div className="border-b border-gray-200 bg-base-white">
                    <div className="px-4 py-3">
                      <div className="mb-3 grid grid-cols-5 gap-4 px-8 font-medium text-sm text-gray-600">
                        <div>Name</div>
                        <div className="text-right">Total Users</div>
                        <div className="text-right">Sessions</div>
                        <div className="text-right">Avg time</div>
                        <div className="text-right">Action</div>
                      </div>
                      {record.subSegments?.map((subSegment, subIndex) => (
                        <div
                          key={subIndex}
                          className="grid grid-cols-5 gap-4 border-b border-gray-200 px-8 py-2 text-sm last:border-b-0"
                        >
                          <div className="text-gray-700">{subSegment.name}</div>
                          <div className="text-right font-medium text-gray-900">
                            {subSegment._total_user?.toLocaleString()}
                          </div>
                          <div className="text-right font-medium text-gray-900">
                            {subSegment._sessions?.toLocaleString()}
                          </div>
                          <div className="text-right font-medium text-gray-900">
                            {formatTime(subSegment._avg_time || 0)}
                          </div>
                          <div className="text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleDeleteEvent(subSegment)}
                                className="hover:text-red-600 text-gray-400 transition-colors"
                              >
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM6 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleEditEvent(subSegment)}
                                className="hover:text-blue-600 text-gray-400 transition-colors"
                              >
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                              </button>
                            </div>
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
              <div className="text-gray-500">There is no segment data</div>
              <div className="text-sm text-gray-400">
                Data will appear when you have user segments defined
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
  editingEvent?: ExtendedSegment | null;
}) => {
  const { domain } = useDomainStore();
  const notify = useNotify();
  const [conditions, setConditions] = useState<SegmentCondition[]>([
    { data_type: '', condition: '' },
  ]);

  const isEditing = !!editingEvent;

  const useCreateEventForm = createFormHandler<{
    name: string;
  }>(
    {
      name: editingEvent?.name || '',
    },
    z.object({
      name: z.string().min(1, { message: 'Segment name is required' }),
    }),
  );

  const { handleSubmit, formState, control, reset } = useCreateEventForm();

  const { mutate: createSegment, isPending } = useSegmentsServicePostApiV1Segments({});

  // Reset form when editingEvent changes
  React.useEffect(() => {
    if (editingEvent) {
      reset({
        name: editingEvent.name || '',
      });
      setConditions([{ data_type: '', condition: '' }]);
    } else {
      reset({ name: '' });
      setConditions([{ data_type: '', condition: '' }]);
    }
  }, [editingEvent, reset]);

  if (!isOpen) return null;

  const addCondition = () => {
    setConditions([...conditions, { data_type: '', condition: '' }]);
  };

  const updateCondition = (index: number, field: 'data_type' | 'condition', value: string) => {
    const newConditions = [...conditions];
    newConditions[index][field] = value;
    setConditions(newConditions);
  };

  const removeCondition = (index: number) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter((_, i) => i !== index));
    }
  };

  const onSubmit = (data: { name: string }) => {
    const onSuccess = () => {
      notify.open({
        title: isEditing ? 'Segment updated' : 'Segment added',
        description: isEditing ? 'Segment updated successfully' : 'Segment added successfully',
        type: 'success',
      });
      onClose();
      reset();
      setConditions([{ data_type: '', condition: '' }]);
      refetch();
    };

    const onError = (error: any) => {
      notify.open({
        title: 'Error',
        description: error?.message || `Failed to ${isEditing ? 'update' : 'create'} segment`,
        type: 'error',
      });
    };

    if (isEditing) {
      // Logic for updating a segment would go here
    } else {
      createSegment(
        {
          requestBody: {
            name: data.name,
            conditions: conditions,
            domain: domain,
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
            {isEditing ? 'Edit Segment' : 'Add Segment'}
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
          Define segment based on events.
        </Text>

        {/* Segment Name */}
        <div className="mb-6">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                label="Segment Name"
                placeholder='Enter something like "Buyer"'
                required
                error={invalid}
                hint={error?.message}
                {...field}
              />
            )}
          />
        </div>

        {/* Condition */}
        <div className="mb-6">
          <label className="mb-3 block font-medium text-sm text-gray-700">Condition</label>

          {conditions.map((condition, index) => (
            <div key={index} className="mb-3">
              <div className="flex rounded-lg border border-gray-300">
                <select
                  value={condition.data_type}
                  onChange={(e) => updateCondition(index, 'data_type', e.target.value)}
                  className="focus:border-blue-500 focus:ring-blue-500 flex-none rounded-l-lg border-0 border-r border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:ring-1"
                >
                  <option value="">Data Type</option>
                  <option value="does">Does</option>
                  <option value="does_not">Does not</option>
                  {/* <option value="time">Time</option> */}
                  {/* <option value="event">Event</option>
                  <option value="page_url">Page URL</option>
                  <option value="user_property">User Property</option>
                  <option value="device_type">Device Type</option>
                  <option value="location">Location</option> */}
                </select>

                <input
                  type="text"
                  value={condition.condition}
                  onChange={(e) => updateCondition(index, 'condition', e.target.value)}
                  placeholder="Value"
                  className="focus:border-blue-500 focus:ring-blue-500 flex-1 rounded-r-lg border-0 px-3 py-2 text-sm focus:ring-1"
                />

                {conditions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCondition(index)}
                    className="hover:text-red-600 ml-2 text-gray-400 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add Condition Button */}
          <button
            type="button"
            onClick={addCondition}
            className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-300 text-gray-400 transition-colors hover:border-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="primary" className="px-8" spinning={isPending}>
            {isEditing ? 'Update segment' : 'Add segment'}
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
  event: ExtendedSegment | null;
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
        title: 'Segment deleted',
        description: `"${event.name}" has been deleted successfully`,
        type: 'success',
      });

      onClose();
      refetch();
    } catch (error) {
      notify.open({
        title: 'Error',
        description: 'Failed to delete segment',
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
            Delete Segment
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
            Are you sure you want to delete the segment
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
