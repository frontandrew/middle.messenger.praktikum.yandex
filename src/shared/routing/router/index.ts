import { deepEqual } from 'tools';

import { Route } from '../route';

import type { RoutePaths, RouteView } from '../route';

export class Router {
  private static instance: Router;
  private currentRoute: Route | null = null;
  private rootQuery: string | undefined = '.main';
  private authState: boolean = true; // TODO: false
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

  private onRoute(pathname: RoutePaths) {
    let nextPath = pathname;
    let nextRoute = this.getRoute(pathname);

    if (!nextRoute) nextPath = '/error';
    if (!this.authState) nextPath = '/';

    nextRoute = this.getRoute(nextPath);
    if (deepEqual(this.currentRoute, nextRoute)) return;

    if (this.currentRoute) this.currentRoute.leave();
    this.currentRoute = nextRoute;
    this.currentRoute!.render();
    this.history.pushState({}, '', nextPath);
  }

  go(pathname: RoutePaths) {
    this.onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.go(1);
  }

  getRoute(pathname: RoutePaths): Route | null {
    return this.routes.find((route) => route.match(pathname)) ?? null;
  }
}
