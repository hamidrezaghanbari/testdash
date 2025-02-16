import { Suspense } from 'react';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="flex size-full">
      <div className="bg-error-200 flex w-[300px] items-center justify-center">sidebar</div>
      <main className="bg-primary-200 flex flex-1">
        <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>
      </main>
    </div>
  );
};

export { RootLayout };
