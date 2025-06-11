'use client';

import { type ComponentProps, type HTMLAttributes, forwardRef, useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export const DateInput = forwardRef<
  HTMLInputElement,
  ComponentProps<'input'> & {
    value: string;
    onValueChange: (value: string) => void;
  }
>(({ className, value, onValueChange, ...props }, ref) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setInputValue(value);
    value = value.replace(/[^0-9]/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length > 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }
    onValueChange(value);
  };

  return (
    <Input
      ref={ref}
      className={cn('w-[110px] text-center', className)}
      value={inputValue}
      onChange={handleInputChange}
      {...props}
    />
  );
});
DateInput.displayName = 'DateInput';
