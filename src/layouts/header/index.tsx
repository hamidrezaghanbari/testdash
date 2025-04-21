import { Button, Popover } from '@smartech/ui';
import { memo, useState } from 'react';

import {
  useCurrentProduct,
  useCurrentUser,
  useDocumentTitle,
  useTriggerAfterLogout,
} from '@/hooks';
import { useLogout } from '@/services/auth/hooks';
import { Render } from '@/utils';

import classes from './header.module.scss';

// TODO: popover z-index in package

const Header = () => {
  useDocumentTitle();

  const [isOpenProduct, setIsOpenProduct] = useState(false);

  const afterLogout = useTriggerAfterLogout();

  const { mutate, isPending } = useLogout({
    onSuccess() {
      afterLogout();
    },
  });

  const { presentation } = useCurrentUser();

  const product = useCurrentProduct();

  return (
    <header className={classes.mainHeader}>
      <Render when={product}>
        {({ name }) => (
          <Popover
            open={isOpenProduct}
            onOpenChange={setIsOpenProduct}
            title={
              <Button variant="link" leading="icon" icons={{ end: 'chevron-down' }}>
                {name}
              </Button>
            }
          >
            <div className="min-w-[200px] bg-base-white p-4">
              <span>gholi</span>
            </div>
          </Popover>
        )}
      </Render>
      <Button variant="link" leading="icon" icons={{ end: 'chevron-down' }}>
        {presentation}
      </Button>
      <Button variant="primary" onClick={() => mutate()} spinning={isPending}>
        Logout
      </Button>
    </header>
  );
};

const MemoizedHeader = memo(Header);

export { MemoizedHeader as Header };
