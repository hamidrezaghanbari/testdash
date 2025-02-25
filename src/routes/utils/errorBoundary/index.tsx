import { Empty } from '@smartech/ui';
import { useRouteError } from 'react-router-dom';

import { Render } from '$/utils';

const ErrorBoundary = () => {
  const error = useRouteError() as Error;

  return (
    <div className="mx-auto flex h-full w-full max-w-[80%] flex-col items-center justify-center gap-4">
      <Render when={error}>
        <Empty
          title="An unexpected error has been occured"
          description={import.meta.env.DEV ? error.message : ''}
          useImage
        >
          {/* <NavLink to="/" replace>
            <Button variant="primary">Return to dashboard</Button>
          </NavLink> */}
        </Empty>
      </Render>
    </div>
  );
};

export { ErrorBoundary };
