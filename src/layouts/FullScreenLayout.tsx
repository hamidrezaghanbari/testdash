import { type ReactNode } from 'react';

interface FullScreenLayoutProps {
  children: ReactNode;
}

export const FullScreenLayout = ({ children }: FullScreenLayoutProps) => {
  return <div className="h-dvh w-full">{children}</div>;
};
