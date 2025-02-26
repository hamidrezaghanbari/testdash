import { Spinner } from '@smartech/ui';

import './loading.scss';

const Loading = () => {
  return (
    <div className="layout-loading">
      <Spinner spinning size="md" />
    </div>
  );
};

export { Loading };
