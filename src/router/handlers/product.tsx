import { Navigate } from 'react-router-dom';

import { useCurrentProduct } from '@/hooks';

const ProductRedirection = () => {
  const product = useCurrentProduct();

  if (!product) return <Navigate to="/notFound" state="NO_PRODUCT" replace />;

  return <Navigate to={product.id.toString()} replace />;
};

export { ProductRedirection };
