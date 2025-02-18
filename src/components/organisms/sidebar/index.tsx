import { Text } from '@smartech/ui';

import './sidebar.scss';

import { SIDEBAR_DATASET } from './dataset';
import SidebarMenu from './menu';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <SidebarMenu data={SIDEBAR_DATASET} />
    </div>
  );
};

export { Sidebar };
