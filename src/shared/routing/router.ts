import { deepEqual } from 'tools';

import type { RouteView } from './route';
import { Route } from './route';

class Router {
  private currentRoute: Route | null = null;
  private rootQuery: string | undefined = '.main';
  private authState: boolean = false;
  public routes: Route[] = [];
  public history: History = window.history;

  public setAuthState(state: boolean) {
    this.authState = state;
  }

  public use({ pathname, component, needAuth }: {
    pathname: string,
    component: RouteView,
    needAuth: boolean
  }) {
    const route = new Route({
      pathname,
      needAuth,
      component,
      props: { rootQuery: this.rootQuery! },
    });
    this.routes.push(route);
    return this;
  }

  public start() {
    window.onpopstate = ({ currentTarget }) => {
      if (
        currentTarget
        && 'location' in currentTarget
        && currentTarget.location instanceof Location
      ) this.onRoute(currentTarget.location.pathname as string);
    };

    this.onRoute(window.location.pathname as string);
  }

  private onRoute(pathname: string) {
    const nextRoute = this.getRoute(pathname);

    if (nextRoute === null) {
      this.go('/messenger');
      return;
    }
    if (nextRoute?.needAuth && !this.authState) {
      this.go('/');
      return;
    }
    if (!nextRoute?.needAuth && this.authState) {
      this.go('/messenger');
      return;
    }

    if (deepEqual(this.currentRoute, nextRoute)) return;

    this.history.pushState({}, '', pathname);
    if (this.currentRoute) this.currentRoute.leave();
    this.currentRoute = nextRoute;
    this.currentRoute!.render();
  }

  public go(pathname: string) {
    this.onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname: string): Route | null {
    return this.routes.find((route) => route.match(pathname)) ?? null;
  }
}

export const router = new Router();
