import { Params, redirect } from 'react-router-dom';

import { Product, UserResponseResult } from '@/services/auth/user/user.schema';
import { useApplicationStore } from '@/store';

async function storeProduct(products: Product[] = [], productId?: number) {
  const product = products.find((p) => p.id === productId) ?? products[0];

  useApplicationStore.setState((state) => ({ ...state, product }));

  return product;
}

async function getCurrentProduct(params: Params<string>, _user: UserResponseResult) {
  const { product, user = _user } = useApplicationStore.getState();

  if (!user) throw redirect('/account/login');

  if (params.productId) {
    const productId = parseInt(params.productId);

    if (product && product.id === productId) return product;

    return await storeProduct(user.products, productId);
  }

  if (product) return product;

  return await storeProduct(user.products, user.lastProduct);
}

export { getCurrentProduct };
