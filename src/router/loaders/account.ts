import { replace } from 'react-router-dom';

const accountLoader = async () => {
  const user = await Promise.resolve({ login: false });

  if (user && user.login) return replace('/');
};

export { accountLoader };
