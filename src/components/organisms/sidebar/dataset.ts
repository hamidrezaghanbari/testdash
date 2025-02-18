import { groupByEntries } from '$/common';
import { routes } from '$/routes/routes';

const SIDEBAR_DATA = groupByEntries(Object.values(routes.root.children), 'group');

export { SIDEBAR_DATA };
