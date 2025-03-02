import { LoaderFunctionArgs, replace } from 'react-router-dom';

const rootLoader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const url = new URL(request.url);

    const pathname = url.pathname;

    console.info(pathname);

    const user = await Promise.resolve({ login: false });

    if (!user || !user.login) return replace('/account/login');

    // TODO check product availablitiy
    // TODO check user permissions

    return user;
  } catch (error) {
    throw replace('/account/login');
  }
};

export { rootLoader };
