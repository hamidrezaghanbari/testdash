'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { type ComponentProps, forwardRef, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export const DateRangePicker = forwardRef<
  HTMLDivElement,
  ComponentProps<'div'> & {
    value?: DateRange;
    onValueChange?: (value: DateRange) => void;
  }
>(({ value, onValueChange, className, ...props }, ref) => {
  const [date, setDate] = useState<DateRange | undefined>(value);
  const [pickerDate, setPickerDate] = useState<DateRange | undefined>(date);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setDate(value);
  }, [value]);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setPickerDate(date);
    }
    setOpen(isOpen);
  };

  const handleApply = () => {
    setDate(pickerDate);
    if (pickerDate && onValueChange) {
      onValueChange(pickerDate);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={'outline'}
          className={cn(
            'w-64 justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
              </>
            ) : (
              format(date.from, 'LLL dd, y')
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto bg-background p-0 text-foreground" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={pickerDate?.from}
          selected={pickerDate}
          onSelect={setPickerDate}
          numberOfMonths={2}
          disabled={{ after: new Date() }}
        />
        <div className="flex justify-end gap-2 p-4">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="default"
            className="bg-primary-600 hover:bg-primary-700"
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
});
DateRangePicker.displayName = 'DateRangePicker';
