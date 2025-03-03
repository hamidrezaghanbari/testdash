import { Spinner } from '@smartech/ui';

import './loading.scss';

const Loading = () => {
  return (
    <div className="layoutLoading">
      <Spinner spinning size="md" />
    </div>
  );
};

export { Loading };
