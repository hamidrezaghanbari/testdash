import np from 'nprogress';
import { useLayoutEffect } from 'react';
import { useNavigation } from 'react-router-dom';

const progress = np.configure({ showSpinner: false });

const useRouteProgress = () => {
  const { state } = useNavigation();

  useLayoutEffect(() => {
    if (state === 'loading') progress.start();
    else progress.done();

    return () => progress.remove();
  }, [state]);
};

export { useRouteProgress };
