type SidebarDataset = {
  id: string;
  title: string;
  iconName: string;
  children: Array<SidebarDataset>;
};

const SIDEBAR_DATASET: Array<SidebarDataset> = [
  {
    id: '1',
    title: 'dashboard',
    iconName: 'dashboard',
    children: [],
  },
  {
    id: '2',
    title: 'user',
    iconName: 'user-01',
    children: [],
  },
  {
    id: '3',
    title: 'analytics',
    iconName: 'bar-chart-square-02',
    children: [
      {
        id: '4',
        title: 'event',
        iconName: 'rocket-02',
        children: [],
      },
      {
        id: '5',
        title: 'funnel',
        iconName: 'filter-funnel-01',
        children: [],
      },
      {
        id: '6',
        title: 'cohort',
        iconName: 'data',
        children: [],
      },
      {
        id: '7',
        title: 'uninstall',
        iconName: 'log-out-01',
        children: [],
      },
    ],
  },
  {
    id: '8',
    title: 'segment',
    iconName: 'pie-chart-02',
    children: [
      {
        id: '9',
        title: 'live segment',
        iconName: 'bar-chart-square-02',
        children: [],
      },
      {
        id: '10',
        title: 'static segment',
        iconName: 'bar-chart-square-02',
        children: [],
      },
    ],
  },
  {
    id: '11',
    title: 'data platform',
    iconName: 'database-03',
    children: [
      {
        id: '12',
        title: 'data management',
        iconName: 'bar-chart-square-02',
        children: [],
      },
      {
        id: '13',
        title: 'upload data',
        iconName: 'upload-cloud-01',
        children: [],
      },
      {
        id: '14',
        title: 'alert',
        iconName: 'bell-ringing-03',
        children: [],
      },
    ],
  },
];

export type { SidebarDataset };

export { SIDEBAR_DATASET };
