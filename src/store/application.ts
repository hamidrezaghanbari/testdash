import { create } from 'zustand/react';

type ApplicationStore = {};

const useApplicationStore = create<ApplicationStore>(() => ({}));

export { useApplicationStore };
