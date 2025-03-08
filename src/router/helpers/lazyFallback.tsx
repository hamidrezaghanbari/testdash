import { Navigate } from 'react-router-dom';

function LazyFallback() {
  return <Navigate to="/notFound" state="NO_MODULE" replace />;
}

export { LazyFallback };
