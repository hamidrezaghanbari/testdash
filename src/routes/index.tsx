import { LoaderFunction, Navigate, createBrowserRouter, useLoaderData } from 'react-router-dom';

import { Loading } from '$/components/atoms';

import { accountChildren, routerFallbacks } from './routes';
import { Account, ErrorBoundary, Root, accountLoader, rootLoader } from './utils';

export const productLoader: LoaderFunction = async () => {
  return '2';
};

const ProductRedirect = () => {
  const productId = useLoaderData<string>();

  return <Navigate to={productId} replace />;
};

const routes = [
  {
    path: 'product',
    children: [
      { index: true, loader: productLoader, Component: ProductRedirect },
      {
        path: ':id',
        children: [
          { index: true, element: <h1>dashboard</h1> },
          { path: 'users', element: <h1>users</h1> },
          {
            path: 'analytics',
            title: 'analytics',
            icon: '',
            group: 'data and insight',
            children: [
              { index: true, element: <Navigate to="event" replace /> },
              { path: 'event', element: <h1>event</h1> },
              { path: 'funnel', element: <h1>funnel</h1> },
              { path: 'cohort', element: <h1>cohort</h1> },
              { path: 'uninstall', element: <h1>uninstall</h1> },
            ],
          },
          {
            path: 'segment',
            children: [
              { index: true, element: <Navigate to="live" replace /> },
              { path: 'live', element: <h1>live</h1> },
              { path: 'static', element: <h1>static</h1> },
            ],
          },
          {
            path: 'dataPlatform',
            children: [
              { index: true, element: <Navigate to="management" replace /> },
              { path: 'management', element: <h1>management</h1> },
              { path: 'uploadData', element: <h1>upload data</h1> },
              { path: 'alert', element: <h1>alert</h1> },
            ],
          },
          { path: 'overview', element: <h1>overview</h1> },
          { path: 'journey', element: <h1>journey</h1> },
          { path: 'relays', element: <h1>relays</h1> },
          {
            path: 'channels',
            children: [
              { index: true, element: <Navigate to="push" replace /> },
              { path: 'push', element: <h1>push</h1> },
              { path: 'webPush', element: <h1>web push</h1> },
              { path: 'sms', element: <h1>sms</h1> },
              { path: 'email', element: <h1>email</h1> },
              { path: 'custom', element: <h1>custom channel</h1> },
              { path: 'whatsapp', element: <h1>whatsapp</h1> },
              { path: 'telegram', element: <h1>telegram</h1> },
            ],
          },
          {
            path: 'personalization',
            children: [
              {
                index: true,
                element: <Navigate to="onSite" replace />,
              },
              {
                path: 'onSite',
                children: [
                  {
                    index: true,
                    element: <Navigate to="campaign" replace />,
                  },
                  {
                    path: ':id',
                    children: [
                      { index: true, element: <Navigate to="audience" replace /> },
                      { path: 'audience', element: <h1>audience</h1> },
                      { path: 'when', element: <h1>when</h1> },
                      { path: 'message', element: <h1>message</h1> },
                      { path: 'tracking', element: <h1>tracking</h1> },
                      { path: 'testCampaign', element: <h1>test campaign</h1> },
                      { path: 'preview', element: <h1>preview</h1> },
                    ],
                  },
                  { path: 'campaign', element: <h1>campaign</h1> },
                ],
              },
              {
                path: 'survey',
                children: [
                  {
                    index: true,
                    element: <Navigate to="campaign" replace />,
                  },
                  {
                    path: ':id',
                    children: [
                      { index: true, element: <Navigate to="audience" replace /> },
                      { path: 'audience', element: <h1>audience</h1> },
                      { path: 'when', element: <h1>when</h1> },
                      { path: 'message', element: <h1>message</h1> },
                      { path: 'tracking', element: <h1>tracking</h1> },
                      { path: 'testCampaign', element: <h1>test campaign</h1> },
                      { path: 'preview', element: <h1>preview</h1> },
                    ],
                  },
                  { path: 'campaign', element: <h1>campaign</h1> },
                ],
              },
              {
                path: 'inApp',
                children: [
                  {
                    index: true,
                    element: <Navigate to="campaign" replace />,
                  },
                  {
                    path: ':id',
                    children: [
                      { index: true, element: <Navigate to="audience" replace /> },
                      { path: 'audience', element: <h1>audience</h1> },
                      { path: 'when', element: <h1>when</h1> },
                      { path: 'message', element: <h1>message</h1> },
                      { path: 'tracking', element: <h1>tracking</h1> },
                      { path: 'testCampaign', element: <h1>test campaign</h1> },
                      { path: 'preview', element: <h1>preview</h1> },
                    ],
                  },
                  { path: 'campaign', element: <h1>campaign</h1> },
                ],
              },
            ],
          },
          {
            path: 'settings',
            children: [
              { index: true, element: <Navigate to="channels" replace /> },
              { path: 'channels', element: <h1>channels</h1> },
              { path: 'sdk', element: <h1>sdk</h1> },
              { path: 'webhook', element: <h1>webhook</h1> },
              { path: 'auditLog', element: <h1>audit log</h1> },
              { path: 'restApi', element: <h1>rest api</h1> },
              { path: 'team', element: <h1>team</h1> },
              { path: 'billing', element: <h1>billing</h1> },
              { path: '*', element: <Navigate to="channels" /> },
            ],
          },
          {
            path: 'backOffice',
            children: [
              { index: true, element: <Navigate to="financial" replace /> },
              { path: 'financial', element: <h1>financial</h1> },
              { path: 'role', element: <h1>role</h1> },
              { path: 'users', element: <h1>users</h1> },
              { path: 'manageProducts', element: <h1>manage products</h1> },
              { path: 'create products', element: <h1>rest api</h1> },
              { path: 'contracts', element: <h1>contracts</h1> },
              { path: 'fileStorage', element: <h1>file storage</h1> },
              { path: 'configuration', element: <h1>configuration</h1> },
              { path: '*', element: <Navigate to="financial" /> },
            ],
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    Component: Root,
    loader: rootLoader,
    ErrorBoundary,
    HydrateFallback: Loading,
    hasErrorBoundary: true,
    children: routes,
  },
  {
    path: '/account',
    id: 'account',
    Component: Account,
    loader: accountLoader,
    ErrorBoundary,
    HydrateFallback: Loading,
    hasErrorBoundary: true,
    children: accountChildren,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
  {
    path: '/account',
    element: <Navigate to="/account/login" />,
    index: true,
  },
  ...routerFallbacks,
]);

export { router };
