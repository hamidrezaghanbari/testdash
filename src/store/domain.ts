import { produce } from 'immer';
import { create } from 'zustand/react';

type DomainState = {
  domain: string;
};

type DomainActions = {
  setDomain: (domain: string) => void;
  removeDomain: () => void;
};

type ApplicationStore = DomainState & DomainActions;

const useDomainStore = create<ApplicationStore>((set) => ({
  domain: '',
  setDomain: (domain: string) => {
    return set(
      produce((state: DomainState) => {
        state.domain = domain;
      }),
    );
  },
  removeDomain: () => {
    return set(
      produce((state: DomainState) => {
        state.domain = '';
      }),
    );
  },
}));

export { useDomainStore };
export type { DomainState };
