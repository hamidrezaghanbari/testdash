import { replace } from 'react-router-dom';

const rootLoader = async () => {
  try {
    const user = await Promise.resolve({ login: false });

    if (!user || !user.login) return replace('/account/login');

    return user;
  } catch (error) {
    throw replace('/account/login');
  }
};

export { rootLoader };
