import { Component } from 'core';
import { deepEqual } from 'tools';

type RouteProps = {
  [key: string]: unknown;
  rootQuery: string;
}

interface RouteType {
  pathname: string;
  component: RouteView;
  props: RouteProps;
  needAuth: boolean;
}

export type RouteView = new (...args: unknown[]) => InstanceType<typeof Component>

export class Route {
  private pathname: string;
  private component: RouteView;
  private instance: InstanceType<typeof Component> | null = null;
  private props: RouteProps;
  public needAuth: boolean;

  constructor({ pathname, component, props, needAuth }: RouteType) {
    this.pathname = pathname;
    this.component = component;
    this.props = props;
    this.needAuth = needAuth;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this.instance) {
      this.instance.hide();
    }
  }

  match(pathname: string) {
    return deepEqual(pathname, this.pathname);
  }

  render() {
    const { rootQuery, ...props } = this.props;
    if (!this.instance) {
      // eslint-disable-next-line new-cap
      this.instance = new this.component({ ...props });

      const root = document.querySelector(rootQuery);
      root?.appendChild(this.instance.getContent() as Node);

      return;
    }

    this.instance.show();
  }
}
