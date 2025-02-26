import { Text } from '@smartech/ui';

import { cn } from '$/common';

interface VersionProps {
  className?: string;
}

const Version = ({ className }: VersionProps) => {
  return (
    <div className={cn('flex justify-center', className)}>
      <Text className="text-gray-300" size="xs" variant="regular">
        v{VERSION}
      </Text>
    </div>
  );
};

export { Version };
