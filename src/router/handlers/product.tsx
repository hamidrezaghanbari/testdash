import { Navigate, useRouteLoaderData } from 'react-router-dom';

/**
 * TODO ProductResponse: replace later
 */
type ProductResponse = {
  id: string;
};

const ProductRedirection = () => {
  const product = useRouteLoaderData<ProductResponse>('product');

  if (!product) return <Navigate to="/notFound" state="NO_PRODUCT" replace />;

  return <Navigate to={product.id} replace />;
};

export { ProductRedirection };
