import { redirect, useRouteLoaderData } from 'react-router-dom';

type RootLoaderInfo = {
  product: { id: string };
  user: { login: boolean; permissions: string[] };
};

/**
 * only works in react router children
 */
const useCurrentUser = () => {
  const data = useRouteLoaderData<RootLoaderInfo>('root');

  if (!data) return redirect('/account/login');

  return data.user;
};

export { useCurrentUser };
