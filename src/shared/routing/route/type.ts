import { Component } from 'core';

export type RoutePaths = '/login' | '/registration' | '/settings' | '/chats' | '/error';

export type RouteView = new (...args: unknown[]) => InstanceType<typeof Component>

export type RouteProps = {
  [key: string]: unknown;
  rootQuery: string;
}

export interface RouteType {
  pathname: RoutePaths;
  component: RouteView;
  props: RouteProps;
}
