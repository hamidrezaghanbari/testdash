import { Empty } from '@smartech/ui';
import { useRouteError } from 'react-router-dom';

import { Render } from '$/utils';

import './errorBoundary.scss';

const ErrorBoundary = () => {
  const error = useRouteError() as Error;

  return (
    <div className="errorBoundary">
      <Render when={error}>
        <Empty
          title="An unexpected error has been occured"
          description={import.meta.env.DEV ? error.message : ''}
          useImage
        ></Empty>
      </Render>
    </div>
  );
};

export { ErrorBoundary };
