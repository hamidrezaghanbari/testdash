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
  useAnalyticsServicePostApiV1AnalyticsAnalytics,
  useAnalyticsServicePostApiV1AnalyticsPages,
  useAnalyticsServicePostApiV1AnalyticsSiteDomainReferrerStats,
} from '@/openapi/queries';
import { Goal, ReferrerCategory, SourceStats } from '@/openapi/requests/types.gen';
import { useDomainStore } from '@/store';
import { useDateRangeStore } from '@/store/date-range';

// Helper function to format time in minutes and seconds
const formatTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
};

// Interface for page analytics data
interface PageAnalytics {
  page: string;
  sessions: number;
  avg_time: number;
  percentage: number;
}

function PagesScreens() {
  const { domain } = useDomainStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<PageAnalytics | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<PageAnalytics | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Get userId from cookies
  const userId = Cookies.get('userId') || '';

  const { dateRange } = useDateRangeStore();

  const timeRequest = {
    start_date: dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
    end_date: dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
  };

  const {
    mutate,
    data,
    isPending: isLoading,
    error,
  } = useAnalyticsServicePostApiV1AnalyticsPages();

  // Transform API response data into PageAnalytics format
  const processedPages: PageAnalytics[] = React.useMemo(() => {
    if (!data?.data) {
      return [];
    }

    // Calculate total sessions for percentage calculation
    const totalSessions = data.data.reduce((sum: number, page) => sum + (page.sessions || 0), 0);

    return data.data.map((page) => ({
      page: page.pathname || '',
      sessions: page.sessions || 0,
      avg_time: page.avg_engagement_time || 0,
      percentage: totalSessions > 0 ? ((page.sessions || 0) / totalSessions) * 100 : 0,
    }));
  }, [data?.data]);

  const refetch = () => {
    if (userId) {
      mutate({
        requestBody: { domain, ...timeRequest },
        userId: userId,
      });
    }
  };

  useEffect(() => {
    if (userId) {
      mutate({
        requestBody: { domain, ...timeRequest },
        userId: userId,
      });
    }
  }, [userId, domain, timeRequest]);

  // Pagination logic
  const totalPages = Math.ceil(processedPages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = processedPages.slice(startIndex, endIndex);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: PageAnalytics) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (event: PageAnalytics) => {
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

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Page>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-1 pt-8">
          <Text size="md" variant="semibold">
            Pages & Screens
          </Text>
        </div>
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
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-base-white p-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-red-500">Failed to load page analytics</div>
            <div className="text-sm text-gray-500">{(error as Error).message}</div>
            <Button variant="secondary" onClick={refetch} className="mt-2">
              Try Again
            </Button>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 border-b border-gray-200 bg-gray-50 px-4 py-3 font-medium text-sm text-gray-600">
            <div>Pages</div>
            <div className="text-right">Sessions</div>
            <div className="text-right">Avg time</div>
            <div className="text-right">% of total</div>
          </div>

          {/* Table Body */}
          {currentData.map((record, index) => (
            <div
              key={record.page || index}
              className="grid grid-cols-4 gap-4 border-b border-gray-200 bg-base-white px-4 py-3 hover:bg-gray-50"
            >
              <div className="flex items-center">
                <span className="font-medium text-gray-900">{record.page}</span>
              </div>
              <div className="text-right font-medium text-gray-900">
                {record.sessions.toLocaleString()}
              </div>
              <div className="text-right font-medium text-gray-900">
                {formatTime(record.avg_time)}
              </div>
              <div className="flex items-center justify-end gap-2 text-right">
                <div className="flex w-full items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-gray-200">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(record.percentage, 100)}%` }}
                    ></div>
                  </div>
                  <span className="min-w-[3rem] font-medium text-gray-900">
                    {record.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}

          {currentData.length === 0 && (
            <div className="bg-base-white px-4 py-8 text-center">
              <div className="text-gray-500">There is no page data</div>
              <div className="text-sm text-gray-400">
                Data will appear when you have page traffic
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between px-4">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2"
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Page>
  );
}

export default PagesScreens;
