import type { App } from 'vue';
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import '../constrant/tableConfig';

export function setupVxeTable(app: App<Element>) {
  app.use(VXETable);
}
