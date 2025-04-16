import { produce } from 'immer';
import { create } from 'zustand/react';

import { CONSTANTS } from '@/constants';
import { Product, UserResponseResult } from '@/services/auth/user/user.schema';

type ApplicationState = {
  user: UserResponseResult | null;
  product: Product | null;
};

type ApplicationActions = {
  updateUser: (user: UserResponseResult) => void;
  updateProduct: (product: Product) => void;
  clear: () => void;
};

type ApplicationStore = ApplicationState & ApplicationActions;

const useApplicationStore = create<ApplicationStore>((set) => ({
  user: null,
  product: null,
  updateUser: (user: UserResponseResult) => {
    sessionStorage.setItem(CONSTANTS.USER, JSON.stringify(user));
    return set(
      produce((state: ApplicationState) => {
        state.user = user;
      }),
    );
  },
  updateProduct: (product: Product) => {
    return set(
      produce((state: ApplicationState) => {
        state.product = product;
      }),
    );
  },
  clear: () => {
    sessionStorage.removeItem(CONSTANTS.USER);
    return set(
      produce((state: ApplicationState) => {
        state.product = null;
        state.user = null;
      }),
    );
  },
}));

export { useApplicationStore };
export type { ApplicationState };
