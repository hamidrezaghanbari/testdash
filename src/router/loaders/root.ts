import { LoaderFunction, replace } from 'react-router-dom';

import { CONSTANTS } from '@/constants';
import { getCurrentUser } from '@/services/auth/handlers';
import { Product, UserResponseResult } from '@/services/auth/types';
import { useApplicationStore } from '@/store';

import { getCurrentProduct } from './product';

const rootLoader: LoaderFunction = async ({ params }) => {
  const { updateUser, updateProduct } = useApplicationStore.getState();

  // TEMPORARY: Mock user and product for development
  const mockProduct: Product = {
    id: 1,
    name: 'Demo Product',
    adsEnabled: false,
    apiCallEndpoints: '',
    dedicatedDomainUrl: '',
    features: [],
    isDemo: false,
    isMerchantBased: false,
    isSendify: false,
    restAuthType: '',
    restrictionConstraint: '',
    thirdPartyOption: '',
    webPushConfigs: {
      setupCompleted: false,
      webPushKeyType: '',
    },
  };

  const mockUser: UserResponseResult = {
    login: true,
    email: 'dev@example.com',
    userId: 1,
    presentation: 'Developer User',
    emailVerified: true,
    enableTwoFactorAuthentication: false,
    serverForcedTwoFactorAuthentication: false,
    lastProduct: 1,
    otpId: '',
    products: [mockProduct],
    roles: [
      {
        permissions: ['ADMIN'],
        productId: 1,
        productName: 'Demo Product',
      },
    ],
    lastReleaseNote: {
      description: '',
      releaseDate: '',
      releaseNoteNumber: '',
    },
  };

  // Update store with mock data
  updateUser(mockUser);
  updateProduct(mockProduct);

  return { user: mockUser, product: mockProduct };

  /* Original authentication code (commented out temporarily)
  const { user, updateUser, clear } = useApplicationStore.getState();
  try {
    let currentUser: UserResponseResult | null = user;

    if (!currentUser) {
      const userAsString = sessionStorage.getItem(CONSTANTS.USER);

      if (!userAsString) currentUser = await getCurrentUser();
      else currentUser = JSON.parse(userAsString) as UserResponseResult;

      updateUser(currentUser);
    }

    if (!currentUser?.login) {
      clear();
      throw replace('/account/login');
    }

    const product = await getCurrentProduct(params, currentUser);

    return { user: currentUser, product };
  } catch (error) {
    clear();
    throw replace('/account/login');
  }
  */
};

export { rootLoader };
