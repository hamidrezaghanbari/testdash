import { LoaderFunction, generatePath, redirect } from 'react-router-dom';

type Missmatcher = (path: string) => LoaderFunction;

const missmatch: Missmatcher = function (path) {
  return ({ params }) => {
    const { productId } = params;

    if (!productId) return redirect('/');

    if (!path.startsWith('/')) path = `/${path}`;

    return redirect(generatePath(`/product/:productId` + path, { productId }));
  };
};

export { missmatch };
