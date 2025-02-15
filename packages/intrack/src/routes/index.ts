import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { default: Component } = await import('../pages/home');
      return { Component };
    },
  },
]);

export default router;
