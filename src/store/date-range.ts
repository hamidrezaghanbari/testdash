import { subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { create } from 'zustand';

interface DateRangeState {
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
}

const initialDateRange: DateRange = {
  from: subDays(new Date(), 7),
  to: new Date(),
};

export const useDateRangeStore = create<DateRangeState>()((set) => ({
  dateRange: initialDateRange,
  setDateRange: (dateRange) => set({ dateRange }),
}));
