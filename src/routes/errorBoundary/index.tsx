import { useRouteError } from 'react-router-dom';

import { Render } from '$/utils';

const ErrorBoundary = () => {
  const error = useRouteError() as Error;

  return (
    <div className="mx-auto flex h-full w-full max-w-[80%] flex-col items-center justify-center gap-4">
      <span className="text-red-500">An unexpected error has been occured</span>
      <Render when={error && import.meta.env.DEV}>
        <div>
          <span className="text-red-500">{error.message}</span>
          <Render when={error.stack}>
            {(value) => <span className="overflow-auto text-red-500">{value}</span>}
          </Render>
        </div>
      </Render>
    </div>
  );
};

export { ErrorBoundary };
