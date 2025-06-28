import { cn } from '@/common';

interface ProgressBarProps {
  value: number;
  className?: string;
}

const ProgressBar = ({ value, className }: ProgressBarProps) => {
  return (
    <div className={cn('flex w-full items-center gap-2', className)}>
      <div className="h-2 flex-1 rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-primary-600 transition-all duration-300"
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      <span className="min-w-[3rem] font-medium text-gray-900">{value.toFixed(1)}%</span>
    </div>
  );
};

export { ProgressBar };
