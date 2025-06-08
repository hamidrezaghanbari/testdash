import React from 'react';

import './tableLoading.scss';

const Shimmer = () => <div className="shimmer" />;

const TableLoading = () => {
  const renderRow = (i: number) => (
    <div className="grid grid-cols-5 gap-4 border-b border-gray-200 px-4 py-5" key={i}>
      <div className="flex items-center gap-2">
        <div className="skeleton h-4 w-4 rounded" />
        <div className="skeleton h-4 w-32 rounded" />
      </div>
      <div className="skeleton h-4 w-20 rounded" />
      <div className="skeleton h-4 w-20 rounded" />
      <div className="skeleton h-4 w-20 rounded" />
      <div className="flex justify-end gap-2">
        <div className="skeleton h-7 w-7 rounded" />
        <div className="skeleton h-7 w-7 rounded" />
      </div>
    </div>
  );

  return (
    <div className="bg-white overflow-hidden rounded-lg border border-gray-200">
      <div className="bg-white grid grid-cols-5 gap-4 border-b border-gray-200 px-4 py-3 font-semibold text-sm text-gray-600">
        <div className="skeleton h-5 w-24 rounded" />
        <div className="skeleton h-5 w-20 rounded" />
        <div className="skeleton h-5 w-24 rounded" />
        <div className="skeleton w-28 h-5 rounded" />
        <div className="skeleton h-5 w-16 rounded" />
      </div>
      <div className="relative">
        {[...Array(5)].map((_, i) => renderRow(i))}
        <Shimmer />
      </div>
    </div>
  );
};

export default TableLoading;
