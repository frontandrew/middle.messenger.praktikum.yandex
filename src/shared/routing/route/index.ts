import { Component } from 'core';
import { deepEqual } from 'tools';

import { RouteProps, RouteType } from './type';

export type { RouteProps, RouteType };

export class Route {
  private pathname: string;
  private component: new (...args: unknown[]) => InstanceType<typeof Component>;
  private instance: InstanceType<typeof Component> | null;
  private props: RouteProps;

  constructor({ pathname, view, props }: RouteType) {
    this.pathname = pathname;
    this.component = view;
    this.instance = null;
    this.props = props;
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
    if (!this.instance) {
      // eslint-disable-next-line new-cap
      this.instance = new this.component();

      const root = document.querySelector(this.props.rootQuery);
      root?.appendChild(this.instance.getContent() as Node);

      return;
    }

    this.instance.show();
  }
}
