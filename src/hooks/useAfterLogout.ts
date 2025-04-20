import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { CONSTANTS } from '@/constants';
import { useApplicationStore } from '@/store';

export function useTriggerAfterLogout() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { clear } = useApplicationStore();

  return async () => {
    clear();

    sessionStorage.removeItem(CONSTANTS.CAPTCHA_ENABLED);

    await queryClient.cancelQueries();

    queryClient.clear();

    navigate('/account/login', { viewTransition: true });
  };
}
