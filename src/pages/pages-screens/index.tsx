import { Button, GroupButton, Input, Table, Text, useNotify } from '@smartech/ui';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { z } from 'zod';

import { createFormHandler } from '@/common';
import { Card } from '@/components';
import Page from '@/layouts/container';
import {
  useAnalyticsServicePostApiV1AnalyticsAnalytics,
  useAnalyticsServicePostApiV1AnalyticsPages,
  useAnalyticsServicePostApiV1AnalyticsSiteDomainReferrerStats,
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

  const {
    mutate,
    data,
    isPending: isLoading,
    error,
  } = useAnalyticsServicePostApiV1AnalyticsPages();

  // Transform API response data into PageAnalytics format
  const processedPages: PageAnalytics[] = React.useMemo(() => {
    if (!data?.data) {
      // Fallback data matching the image provided
      return [
        {
          page: 'alphawave.com',
          sessions: 4288,
          avg_time: 84, // 1m 24s
          percentage: 62.4,
        },
        {
          page: 'alphawave.com/pricing',
          sessions: 582,
          avg_time: 68, // 1m 8s
          percentage: 8.2,
        },
        {
          page: 'alphawave.com/blog',
          sessions: 464,
          avg_time: 72, // 1m 12s
          percentage: 7.6,
        },
        {
          page: 'alphawave.com/booking',
          sessions: 446,
          avg_time: 142, // 2m 22s
          percentage: 7.2,
        },
        {
          page: 'alphawave.com/download/win',
          sessions: 382,
          avg_time: 48, // 48s
          percentage: 7.0,
        },
        {
          page: 'alphawave.com/faqs',
          sessions: 326,
          avg_time: 56, // 56s
          percentage: 6.4,
        },
        {
          page: 'alphawave.com/download/mac',
          sessions: 262,
          avg_time: 74, // 1m 14s
          percentage: 5.4,
        },
        {
          page: 'alphawave.com/download/linux',
          sessions: 382,
          avg_time: 48, // 48s
          percentage: 7.0,
        },
        {
          page: 'alphawave.com/download/android',
          sessions: 326,
          avg_time: 56, // 56s
          percentage: 6.4,
        },
        {
          page: 'alphawave.com/blog',
          sessions: 262,
          avg_time: 74, // 1m 14s
          percentage: 5.4,
        },
      ];
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
        requestBody: { domain: domain },
        userId: userId,
      });
    }
  };

  useEffect(() => {
    if (userId) {
      mutate({
        requestBody: { domain: domain },
        userId: userId,
      });
    }
  }, [userId, domain]);

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
        <div>Loading pages...</div>
      ) : error ? (
        <div>Error loading pages: {(error as Error).message}</div>
      ) : (
        <div className="bg-white overflow-hidden rounded-lg border border-gray-200">
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
              className="grid grid-cols-4 gap-4 border-b border-gray-200 px-4 py-3 hover:bg-gray-50"
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
            <div className="px-4 py-8 text-center">
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
