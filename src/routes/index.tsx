import { LoaderFunction, Navigate, createBrowserRouter, useLoaderData } from 'react-router-dom';

import { Loading } from '$/components/atoms';

import { accountChildren, routerFallbacks } from './routes';
import { Group } from './types';
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
          {
            index: true,
            title: 'dashboard',
            icon: 'dashboard',
            group: Group.DATA_AND_INSIGHT,
            element: <h1>dashboard</h1>,
          },
          {
            path: 'users',
            title: 'user',
            icon: 'user-01',
            group: Group.DATA_AND_INSIGHT,
            element: <h1>users</h1>,
          },
          {
            path: 'analytics',
            title: 'analytics',
            icon: 'bar-chart-square-02',
            group: Group.DATA_AND_INSIGHT,
            children: [
              { index: true, element: <Navigate to="event" replace /> },
              { path: 'event', title: 'event', icon: 'rocket-01', element: <h1>event</h1> },
              {
                path: 'funnel',
                title: 'funnel',
                icon: 'filter-funnel-01',
                element: <h1>funnel</h1>,
              },
              { path: 'cohort', title: 'cohort', icon: 'data', element: <h1>cohort</h1> },
              {
                path: 'uninstall',
                title: 'uninstall',
                icon: 'log-out-01',
                element: <h1>uninstall</h1>,
              },
            ],
          },
          {
            path: 'segment',
            title: 'segment',
            icon: 'pie-chart-02',
            group: Group.DATA_AND_INSIGHT,
            children: [
              { index: true, element: <Navigate to="live" replace /> },
              {
                path: 'live',
                title: 'live segment',
                icon: 'bar-chart-square-02',
                element: <h1>live</h1>,
              },
              {
                path: 'static',
                title: 'static segment',
                icon: 'bar-chart-square-02',
                element: <h1>static</h1>,
              },
            ],
          },
          {
            path: 'dataPlatform',
            title: 'data platform',
            icon: 'database-03',
            group: Group.DATA_AND_INSIGHT,
            children: [
              { index: true, element: <Navigate to="management" replace /> },
              {
                path: 'management',
                title: 'data management',
                icon: 'bar-chart-square-02',
                element: <h1>management</h1>,
              },
              {
                path: 'uploadData',
                title: 'upload data',
                icon: 'upload-cloud-01',
                element: <h1>upload data</h1>,
              },
              { path: 'alert', title: 'alert', icon: 'bell-ringing-03', element: <h1>alert</h1> },
            ],
          },
          {
            path: 'overview',
            title: 'overview',
            icon: 'eye',
            group: Group.CAMPAIGN_MANAGER,
            element: <h1>overview</h1>,
          },
          {
            path: 'journey',
            title: 'journey',
            icon: 'rocket-02',
            group: Group.CAMPAIGN_MANAGER,
            element: <h1>journey</h1>,
          },
          {
            path: 'relays',
            title: 'relays',
            icon: 'announcement-01',
            group: Group.CAMPAIGN_MANAGER,
            element: <h1>relays</h1>,
          },
          {
            path: 'channels',
            title: 'channels',
            icon: 'server-06',
            group: Group.CAMPAIGN_MANAGER,
            children: [
              { index: true, element: <Navigate to="push" replace /> },
              { path: 'push', title: 'push', icon: 'notification-message', element: <h1>push</h1> },
              {
                path: 'webPush',
                title: 'web push',
                icon: 'notification-box',
                element: <h1>web push</h1>,
              },
              { path: 'sms', title: 'sms', icon: 'message-dots-square', element: <h1>sms</h1> },
              { path: 'email', title: 'email', icon: 'mail-01', element: <h1>email</h1> },
              {
                path: 'custom',
                title: 'custom channel',
                icon: 'dataflow-04',
                element: <h1>custom channel</h1>,
              },
              {
                path: 'whatsapp',
                title: 'whatsapp',
                icon: 'whatsapp-line',
                element: <h1>whatsapp</h1>,
              },
              {
                path: 'telegram',
                title: 'telegram',
                icon: 'telegram-line',
                element: <h1>telegram</h1>,
              },
            ],
          },
          {
            path: 'personalization',
            title: 'web personalization',
            icon: 'monitor-01',
            group: Group.PERSONALIZATION,
            children: [
              {
                index: true,
                element: <Navigate to="onSite" replace />,
              },
              {
                path: 'onSite',
                title: 'on site',
                icon: 'monitor-02',
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
                title: 'survey',
                icon: 'bar-chart-square-02',
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
                title: 'in app',
                icon: 'phone-02',
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
            group: Group.SETTINGS,
            children: [
              { index: true, element: <Navigate to="channels" replace /> },
              { path: 'channels', title: 'channel', icon: 'server-06', element: <h1>channels</h1> },
              { path: 'sdk', title: 'sdk', icon: 'layers-three-01', element: <h1>sdk</h1> },
              { path: 'webhook', title: 'webhook', icon: 'Webhook', element: <h1>webhook</h1> },
              {
                path: 'auditLog',
                title: 'audit log',
                icon: 'file-search-02',
                element: <h1>audit log</h1>,
              },
              {
                path: 'restApi',
                title: 'rest api',
                icon: 'file-lock-02',
                element: <h1>rest api</h1>,
              },
              { path: 'team', title: 'team', icon: 'users-01', element: <h1>team</h1> },
              { path: 'billing', title: 'billing', icon: 'receipt', element: <h1>billing</h1> },
              { path: '*', element: <Navigate to="channels" /> },
            ],
          },
          {
            path: 'backOffice',
            group: Group.BACK_OFFICE,
            children: [
              { index: true, element: <Navigate to="financial" replace /> },
              {
                path: 'financial',
                title: 'financial',
                icon: 'bank-note-01',
                element: <h1>financial</h1>,
              },
              { path: 'role', title: 'role', icon: 'image-user-check', element: <h1>role</h1> },
              { path: 'users', title: 'users', icon: 'user-square', element: <h1>users</h1> },
              {
                path: 'manageProducts',
                title: 'manage products',
                icon: 'package-check',
                element: <h1>manage products</h1>,
              },
              {
                path: 'create products',
                title: 'create product',
                icon: 'package-plus',
                element: <h1>rest api</h1>,
              },
              {
                path: 'contracts',
                title: 'contracts',
                icon: 'file-check-02',
                element: <h1>contracts</h1>,
              },
              {
                path: 'fileStorage',
                title: 'file storage',
                icon: 'server-04',
                element: <h1>file storage</h1>,
              },
              {
                path: 'configuration',
                title: 'configuration',
                icon: 'settings-01',
                element: <h1>configuration</h1>,
              },
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
