import { create } from 'zustand/react';

type Product = { id: string };

type ApplicationStore = {
  product: Product | null;
};

const useApplicationStore = create<ApplicationStore>(() => ({
  product: null,
}));

export { useApplicationStore };
