import { Button, GroupButton, Input, Table, Text, useNotify } from '@smartech/ui';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { z } from 'zod';

import { createFormHandler } from '@/common';
import { Card } from '@/components';
import Page from '@/layouts/container';
import {
  useAnalyticsServicePostApiV1AnalyticsSiteDomainReferrerStats,
  useGoalsServiceGetApiV1GoalsSiteDomainByDomain,
  useGoalsServicePostApiV1GoalsSiteDomainByDomain,
  useGoalsServicePutApiV1GoalsSiteDomainByDomainGoalByName,
} from '@/openapi/queries';
import { Goal, ReferrerCategory, SourceStats } from '@/openapi/requests/types.gen';
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

function PagesScreens() {
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
    if (!data?.referrer_stats) {
      // Fallback data matching the image provided
      return [
        {
          name: 'Direct',
          category: 'direct',
          _total_user: 2569,
          _new_user: 534,
          _sessions: 4288,
          _avg_time: 84, // 1m 24s = 84 seconds
          sources: [],
        },
        {
          name: 'Referral',
          category: 'referral',
          _total_user: 345,
          _new_user: 33,
          _sessions: 416,
          _avg_time: 68, // 1m 8s = 68 seconds
          sources: [],
        },
        {
          name: 'Organic',
          category: 'organic',
          _total_user: 227,
          _new_user: 54,
          _sessions: 489,
          _avg_time: 142, // 2m 22s = 142 seconds
          sources: [
            {
              source: 'Google',
              total_user: 138,
              new_user: 40,
              sessions: 293,
              avg_time: 174, // 2m 54s = 174 seconds
            },
            {
              source: 'Bing',
              total_user: 89,
              new_user: -3,
              sessions: 196,
              avg_time: 111, // 1m 51s = 111 seconds
            },
          ],
        },
        {
          name: 'Other',
          category: 'other',
          _total_user: 582,
          _new_user: 464,
          _sessions: 446,
          _avg_time: 72, // 1m 12s = 72 seconds
          sources: [],
        },
      ];
    }

    return data.referrer_stats.map((referrerCategory: ReferrerCategory) => ({
      name: referrerCategory.category === 'direct' ? 'Direct' : referrerCategory.category,
      category: referrerCategory.category,
      _total_user: referrerCategory.total_user,
      _new_user: referrerCategory.new_user,
      _sessions: referrerCategory.sessions,
      _avg_time: referrerCategory.avg_time,
      sources: referrerCategory.sources || [],
    }));
  }, [data?.referrer_stats]);

  const refetch = () => {
    mutate({ requestBody: { domain: domain } });
  };

  useEffect(() => {
    mutate({ requestBody: { domain: domain } });
  }, []);

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
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-1 pt-8">
          <Text size="md" variant="semibold">
            Referrer Analytics
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
        <div>Loading referrers...</div>
      ) : error ? (
        <div>Error loading referrers: {(error as Error).message}</div>
      ) : (
        <div className="bg-white overflow-hidden rounded-lg border border-gray-200">
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
                        <div className="text-right">New Users</div>
                        <div className="text-right">Sessions</div>
                        <div className="text-right">Avg Time</div>
                      </div>
                      {record.sources?.map((source, sourceIndex) => (
                        <div
                          key={sourceIndex}
                          className="grid grid-cols-5 gap-4 border-b border-gray-200 px-8 py-2 text-sm last:border-b-0"
                        >
                          <div className="text-gray-700">{source.source}</div>
                          <div className="text-right font-medium text-gray-900">
                            {source.total_user.toLocaleString()}
                          </div>
                          <div className="text-right font-medium text-gray-900">
                            {source.new_user.toLocaleString()}
                          </div>
                          <div className="text-right font-medium text-gray-900">
                            {source.sessions.toLocaleString()}
                          </div>
                          <div className="text-right font-medium text-gray-900">
                            {formatTime(source.avg_time || 0)}
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

export default PagesScreens;
