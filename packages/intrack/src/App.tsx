import { Suspense } from 'react';
import { RouterProvider } from 'react-router';

import router from './routes';

function App() {
  return (
    <div className="flex size-full">
      <div className="bg-error-200 flex w-[300px] items-center justify-center">sidebar</div>
      <main className="bg-primary-200 flex flex-1 overflow-auto">
        <Suspense fallback={<h1>Loading...</h1>}>
          <RouterProvider router={router} />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
