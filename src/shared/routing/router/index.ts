import { Route } from '../route';

import type { RoutePaths, RouteView } from '../route';

export class Router {
  private static instance: Router;
  private currentRoute: Route | null = null;
  private rootQuery: string | undefined = '.main';
  private authState: boolean = false;
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

  setAuthState(state: boolean) {
    this.authState = state;
  }

  use({ pathname, component }: { pathname: RoutePaths, component: RouteView }) {
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
      ) this.onRoute(currentTarget.location.pathname as RoutePaths);
    };

    this.onRoute(window.location.pathname as RoutePaths);
  }

  onRoute(pathname: RoutePaths) {
    if (!pathname || !this.authState) {
      this.go('/');
      return;
    }

    const route = this.getRoute(pathname);
    if (!route) {
      // TODO: need error page context
      this.go('/error');
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  go(pathname: RoutePaths) {
    this.history.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.go(1);
  }

  getRoute(pathname: RoutePaths): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}
