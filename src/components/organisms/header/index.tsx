import { Button } from '@smartech/ui';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDocumentTitle } from '@/hooks';
import { useLogout } from '@/services/auth/hooks';
import { useApplicationStore } from '@/store';

import classes from './header.module.scss';

const Header = () => {
  useDocumentTitle();

  const navigate = useNavigate();

  const { mutate } = useLogout({
    onSuccess() {
      const { clear } = useApplicationStore.getState();

      clear();

      navigate('/account/login', { viewTransition: true });
    },
  });

  return (
    <header className={classes.mainHeader}>
      <Button variant="primary" onClick={() => mutate()}>
        Logout
      </Button>
    </header>
  );
};

const MemoizedHeader = memo(Header);

export { MemoizedHeader as Header };
