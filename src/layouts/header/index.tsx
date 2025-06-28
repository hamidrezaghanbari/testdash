import { memo } from 'react';
import { useLocation } from 'react-router-dom';

import { DateRangePicker } from '@/components/ui/date-range-picker';
import { useDateRangeStore } from '@/store/date-range';

import { data } from '../sidebar/data';

const getTitleFromPath = (pathname: string) => {
  let bestMatchHref = '';
  let title = '';

  for (const [, items] of data) {
    for (const item of items) {
      if (pathname.startsWith(item.href) && item.href.length > bestMatchHref.length) {
        bestMatchHref = item.href;
        title = item.title;
      }
    }
  }

  return title;
};

const Header = () => {
  const { dateRange, setDateRange } = useDateRangeStore();
  const { pathname } = useLocation();
  const title = getTitleFromPath(pathname);

  return (
    <div className="flex w-full items-center justify-between p-4 pb-0">
      <span className="base-text size-md variant-semibold">{title}</span>

      <DateRangePicker value={dateRange} onValueChange={setDateRange} />
    </div>
  );
};

const MemoizedHeader = memo(Header);

export { MemoizedHeader as Header };
