import { Button, Empty } from '@smartech/ui';
import { NavLink, useLocation } from 'react-router-dom';

import Page from '@/layouts/container';

import classes from './notFound.module.scss';

type Reason = 'NO_PRODUCT' | 'NO_MODULE';

const messageMap: Record<Reason, string> = {
  NO_MODULE: 'No module is found',
  NO_PRODUCT: 'No product is found',
};

const NotFound = () => {
  const { state } = useLocation();

  return (
    <Page>
      <div className={classes.notFoundContainer}>
        <Empty
          title="An unexpected error has been occured"
          description={messageMap[state as Reason]}
          useImage
        >
          <NavLink to="/">
            <Button variant="primary">Back to dashboard</Button>
          </NavLink>
        </Empty>
      </div>
    </Page>
  );
};

export { NotFound };
