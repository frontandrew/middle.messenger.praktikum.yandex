import { Route } from '../route';

import type { RouteView } from '../route';

export class Router {
  private static instance: Router;
  private currentRoute: Route | null = null;
  private rootQuery: string | undefined = 'main';
  public routes: Route[] = [];
  public history: History = window.history;

  constructor(rootQuery?: string) {
    if (Router.instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.instance;
    }

    this.rootQuery = rootQuery;
    Router.instance = this;
  }

  use({ pathname, component }: { pathname: string, component: RouteView }) {
    const route = new Route({ pathname, component, props: { rootQuery: this.rootQuery! } });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = ({ currentTarget }) => {
      if (
        currentTarget
        && 'location' in currentTarget
        && currentTarget.location instanceof Location
      ) this.onRoute(currentTarget.location.pathname);
    };

    this.onRoute(window.location.pathname);
  }

  onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) return;

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.go(1);
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}