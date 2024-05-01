import { Component } from 'core';

export type RouteView = new (...args: unknown[]) => InstanceType<typeof Component>

export type RouteProps = {
  [key: string]: unknown;
  rootQuery: string;
}

export interface RouteType {
  pathname: string;
  component: RouteView;
  props: RouteProps;
}
