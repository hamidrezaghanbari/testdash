import { Button, Empty } from '@smartech/ui';
import { NavLink } from 'react-router-dom';

import Page from '$/layouts/container';

import './unauthorized.scss';

const Unauthorized = () => {
  return (
    <Page>
      <div className="unauthorizedContainer">
        <Empty
          title="An unexpected error has been occured"
          description="You have no permissions to see this page"
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

export default Unauthorized;
