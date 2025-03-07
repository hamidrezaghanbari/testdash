import { Button, Empty } from '@smartech/ui';
import { NavLink, useLocation } from 'react-router-dom';

import Page from '$/layouts/container';

import './notFound.scss';

type Reason = 'NO_PRODUCT';

const messageMap: Record<Reason, string> = {
  NO_PRODUCT: 'No product can be found',
};

const NotFound = () => {
  const { state } = useLocation();

  return (
    <Page>
      <div className="notFoundContainer">
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

export default NotFound;
