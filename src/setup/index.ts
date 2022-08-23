import type { App } from 'vue';
import { setupAntDesign } from './setupAntdesign';
import { setupGlobalComponents } from './setupGlobalComponents';
import { setupPinia } from './setupPinia';
import { setupRoute } from './setupRoute';
import { setupVxeTable } from './setupVxeTable';
import { setupDirective } from './setupDirective';

export function setupThirdLib(app) {}
export function setup(app: App<Element>) {
  setupAntDesign(app);
  setupRoute(app);
  setupPinia(app);
  setupVxeTable(app);
  setupGlobalComponents(app);
  setupThirdLib(app);
  setupDirective(app);
}
