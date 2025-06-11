import { memo } from 'react';

import { DateRangePicker } from '@/components/ui/date-range-picker';
import { useDateRangeStore } from '@/store/date-range';

const Header = () => {
  const { dateRange, setDateRange } = useDateRangeStore();
  return (
    <div className="flex justify-end p-4 pb-0">
      <DateRangePicker value={dateRange} onValueChange={setDateRange} />
    </div>
  );
};

const MemoizedHeader = memo(Header);

export { MemoizedHeader as Header };
