'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { type ComponentProps, forwardRef, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { DateInput } from './date-input';

export const DateRangePicker = forwardRef<
  HTMLDivElement,
  ComponentProps<'div'> & {
    value?: DateRange;
    onValueChange?: (value: DateRange) => void;
  }
>(({ value, onValueChange, className, ...props }, ref) => {
  const [date, setDate] = useState<DateRange | undefined>(value);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setDate(value);
  }, [value]);

  const handleUpdate = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (newDate && onValueChange) {
      onValueChange(newDate);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
      <PopoverContent className="bg-background text-foreground w-auto p-0" align="start">
        <div className="flex">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleUpdate}
            numberOfMonths={2}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
});
DateRangePicker.displayName = 'DateRangePicker';
