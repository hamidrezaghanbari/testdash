import { replace } from 'react-router-dom';

const rootLoader = async () =>
  //{ request }: LoaderFunctionArgs
  {
    try {
      // const url = new URL(request.url);

      // const pathname = url.pathname;

      // console.info(routesPermissionMap, pathname);

      const user = await Promise.resolve({ login: true });

      if (!user || !user.login) return replace('/account/login');

      return user;
    } catch (error) {
      throw replace('/account/login');
    }
  };

export { rootLoader };
