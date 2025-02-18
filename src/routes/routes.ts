import { RouteBuilder_experimental } from './builder';

/**
 * @experimental
 */
const builder = new RouteBuilder_experimental();

enum GroupTitle {
  DATA_AND_INSIGHT = 'data and insight',
  CAMPAIGN_MANAGER = 'campaign maanger',
  PERSONALIZATION = 'personalization',
  SETTINGS = 'settings',
  BACK_OFFICE = 'back office',
}

const analytics = builder.defineChildren((route) => ({
  event: route.path('event').title('event').icon('rocket-01').create(),
  funnel: route.path('funnel').title('funnel').icon('filter-funnel-01').create(),
  cohort: route.path('cohort').title('cohort').icon('data').create(),
  uninstall: route.path('uninstall').title('uninstall').icon('log-out-01').create(),
}));

const segment = builder.defineChildren((route) => ({
  live: route.path('live').title('live segment').icon('bar-chart-square-02').create(),
  static: route.path('static').title('static segment').icon('bar-chart-square-02').create(),
}));

const dataPlatform = builder.defineChildren((route) => ({
  management: route
    .path('data-management')
    .title('data management')
    .icon('bar-chart-square-02')
    .create(),
  uploadData: route.path('upload-data').title('upload data').icon('upload-cloud-01').create(),
  alert: route.path('alert').title('alert').icon('bell-ringing-03').create(),
}));

const channels = builder.defineChildren((route) => ({
  push: route.path('push').title('push').icon('notification-message').create(),
  webPush: route.path('web-push').title('web push').icon('notification-box').create(),
  sms: route.path('sms').title('SMS').icon('message-dots-square').create(),
  email: route.path('email').title('email').icon('mail-01').create(),
  custom: route.path('custom-channel').title('custom channel').icon('dataflow-04').create(),
  whatsapp: route.path('whatsapp').title('whatsapp').icon('whatsapp-line').create(),
  telegram: route.path('telegram').title('telegram').icon('telegram-line').create(),
}));

const webPersonalization = builder.defineChildren((route) => ({
  onSite: route.path('on-site').title('on site').icon('monitor-02').create(),
  survey: route.path('survey').title('survey').icon('bar-chart-square-02').create(),
}));

const appPersonalization = builder.defineChildren((route) => ({
  inApp: route.path('in-app').title('in app').icon('phone-02').create(),
}));

const root = builder.defineChildren((route) => ({
  ...route.groupBy(GroupTitle.DATA_AND_INSIGHT, (route) => ({
    dashboard: route.path('dashboard').title('dashboard').icon('dashboard').create(),
    user: route.path('user').title('user').icon('user-01').create(),
    overview: route.path('overview').title('overview').icon('eye').create(),
    channels: route
      .path('channels')
      .title('channels')
      .icon('server-06')
      .children(channels)
      .create(),
    journey: route.path('journey').title('journey').icon('rocket-02').create(),
    relays: route.path('relays').title('relays').icon('announcement-01').create(),
    analytics: route
      .path('analytics')
      .title('analytics')
      .icon('bar-chart-square-02')
      .children(analytics)
      .create(),
    segment: route.path('segment').title('segment').icon('pie-chart-02').children(segment).create(),
    dataPlatform: route
      .path('data-platform')
      .title('data platform')
      .icon('database-03')
      .children(dataPlatform)
      .create(),
  })),

  ...route.groupBy(GroupTitle.PERSONALIZATION, (route) => ({
    webPersonalization: route
      .path('web-personalization')
      .title('web personalization')
      .icon('monitor-01')
      .children(webPersonalization)
      .create(),
    appPersonalization: route
      .path('app-personalization')
      .title('app personalization')
      .icon('phone-01')
      .children(appPersonalization)
      .create(),
  })),

  ...route.groupBy(GroupTitle.SETTINGS, (route) => ({
    channel: route.path('channel').title('channel').icon('server-06').create(),
    sdk: route.path('sdk').title('SDK').icon('layers-three-01').create(),
    webhook: route.path('webhook').title('webhook').icon('Webhook').create(),
    auditLog: route.path('audit-log').title('audit log').icon('file-search-02').create(),
    restApi: route.path('rest-api').title('rest api').icon('file-lock-02').create(),
    team: route.path('team').title('team').icon('users-01').create(),
    billing: route.path('billing').title('billing').icon('receipt').create(),
  })),

  ...route.groupBy(GroupTitle.BACK_OFFICE, (route) => ({
    financial: route.path('financial').title('financial').icon('bank-note-01').create(),
    role: route.path('role').title('role').icon('image-user-check').create(),
    users: route.path('users').title('users').icon('user-square').create(),
    contracts: route.path('contracts').title('contracts').icon('file-check-02').create(),
    fileStorage: route.path('file-storage').title('file storage').icon('server-04').create(),
    configuration: route.path('configuration').title('configuration').icon('settings-01').create(),
    manageProducts: route
      .path('manage-products')
      .title('manage products')
      .icon('package-check')
      .create(),
    createProduct: route
      .path('create-product')
      .title('create product')
      .icon('package-plus')
      .create(),
  })),
}));

const account = builder.defineChildren((route) => ({
  login: route.path('login').title('login').create(),
  register: route.path('register').title('register').create(),
}));

const routes = builder.defineRoutes((route) => ({
  root: route.path('/').children(root).create(),
  account: route.path('/account').fallback('/login').children(account).create(),
}));

export { routes };
