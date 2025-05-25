import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useDomainStore } from '@/store';

interface DomainGuardProps {
  children: ReactNode;
  fallbackPath?: string;
}

const DomainGuard = ({ children, fallbackPath = '/products' }: DomainGuardProps) => {
  const { domain } = useDomainStore();
  const location = useLocation();

  // If no domain is set and user is not already on the products page, redirect to products
  if (!domain && location.pathname !== '/products') {
    return <Navigate to={fallbackPath} replace />;
  }

  // If domain is set or user is on products page, render children
  return <>{children}</>;
};

export { DomainGuard };
