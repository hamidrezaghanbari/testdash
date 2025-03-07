import { replace } from 'react-router-dom';

const accountLoader = async () => {
  const user = await Promise.resolve({ login: true });

  if (user && user.login) return replace('/');
};

export { accountLoader };
