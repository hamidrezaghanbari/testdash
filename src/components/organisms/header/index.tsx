import { Button } from '@smartech/ui';
import { memo } from 'react';

import { useDocumentTitle, useTriggerAfterLogout } from '@/hooks';
import { useLogout } from '@/services/auth/hooks';

import classes from './header.module.scss';

const Header = () => {
  useDocumentTitle();

  const afterLogout = useTriggerAfterLogout();

  const { mutate, isPending } = useLogout({
    onSuccess() {
      afterLogout();
    },
  });

  return (
    <header className={classes.mainHeader}>
      <Button variant="primary" onClick={() => mutate()} spinning={isPending}>
        Logout
      </Button>
    </header>
  );
};

const MemoizedHeader = memo(Header);

export { MemoizedHeader as Header };
