import { Component } from 'core';

export type RouteProps = {
  [key: string]: unknown;
  rootQuery: string;
}

export interface RouteType {
  pathname: string;
  view: new (...args: unknown[]) => InstanceType<typeof Component>;
  props: RouteProps;
}
