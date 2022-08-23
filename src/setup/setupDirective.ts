import { ContextmenuDirective } from '@/directives/Contextmenu';
import { LoadingDirective } from '@/directives/Loading';
import type { App } from 'vue';

export function setupDirective(app: App<Element>) {
  app.directive('contextmenu', ContextmenuDirective);
  app.directive('loading', LoadingDirective);
}
