import { Component } from 'core';

import { LoaderChildren, LoaderProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export type { LoaderChildren, LoaderProps };

export class Loader extends Component<LoaderChildren, LoaderProps> {
  constructor();
  constructor(args: LoaderProps = {}) {
    super(args as LoaderChildren & LoaderProps);
  }

  render() {
    return template;
  }
}
