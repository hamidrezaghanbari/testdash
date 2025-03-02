import { useRouteLoaderData } from 'react-router-dom';

interface User {
  login: boolean;
  permissions: string[];
}

/**
 * only works in react router children
 */
const useCurrentUser = () => {
  return useRouteLoaderData<User>('root');
};

export { useCurrentUser };
