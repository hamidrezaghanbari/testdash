import { create } from 'zustand/react';

import { CONSTANTS } from '@/constants';
import { Product, UserResponseResult } from '@/services/auth/user/user.schema';

type ApplicationStore = {
  user: UserResponseResult | null;
  product: Product | null;
  clear: () => void;
};

const useApplicationStore = create<ApplicationStore>((set) => ({
  user: null,
  product: null,
  clear: () => {
    sessionStorage.removeItem(CONSTANTS.USER);
    return set(() => ({ product: null, user: null }));
  },
}));

type RootApplicationStore = Pick<ApplicationStore, 'product' | 'user'>;

export { useApplicationStore };
export type { RootApplicationStore };
