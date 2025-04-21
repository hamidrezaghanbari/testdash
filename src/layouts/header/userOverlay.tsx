import { Button, Text } from '@smartech/ui';

import { useTriggerAfterLogout } from '@/hooks';
import { useLogout } from '@/services/auth/hooks';

import classes from './header.module.scss';

interface HeaderUserContentProps {
  onClose: () => void;
}

interface HeaderUserTitleProps {
  presentation: string;
  open: boolean;
}

export const HeaderUserTitle = ({ presentation, open }: HeaderUserTitleProps) => {
  return (
    <Button
      variant="tertiary"
      leading="icon"
      icons={{ end: 'chevron-down' }}
      iconClassNames={{
        end: `rotate-${open ? 180 : 0} transition-transform`,
      }}
    >
      {presentation}
    </Button>
  );
};

export const HeaderUserContent = ({ onClose }: HeaderUserContentProps) => {
  const afterLogout = useTriggerAfterLogout();

  const { mutate } = useLogout({
    onSuccess() {
      afterLogout();

      onClose();
    },
  });

  return (
    <div className={classes.headerProductSelector}>
      <div className={classes.headerProductItem} onClick={() => mutate()}>
        <Text className="text-sm text-error-500">Logout</Text>
      </div>
    </div>
  );
};
