import { deepEqual } from 'tools';

import { Route } from '../route';

import type { RoutePaths, RouteView } from '../route';

class Router {
  private currentRoute: Route | null = null;
  private rootQuery: string | undefined = '.main__container';
  private authState: boolean = true; // TODO: false
  public routes: Route[] = [];
  public history: History = window.history;

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

export const router = new Router();

// TODO: remove after debug
// @ts-expect-error-next-line
window.router = router;
