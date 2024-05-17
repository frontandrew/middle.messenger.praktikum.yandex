import { Component } from 'core';
import { Loader } from 'ui';
import { withStore } from 'store';

import type { AppChildren, AppProps } from './type';
import template from './template.hbs?raw';
import './style.css';

const AppWithState = withStore<AppChildren, AppProps>(
  (state) => ({ isLoading: state.isLoading }),
)(Component);

export class App extends AppWithState<AppChildren, AppProps> {
  constructor() {
    super({
      isLoading: true,
      loader: new Loader(),
      // TODO: error component
      // TODO: notification component
    } as AppChildren & AppProps);
  }
  render() {
    return template;
  }
}
