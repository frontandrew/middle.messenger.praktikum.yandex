import { Component } from 'core';

import { LoaderChildren, LoaderProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export type { LoaderChildren, LoaderProps };

export class Loader extends Component<LoaderChildren, LoaderProps> {
  constructor() {
    super({ classes: '' } as LoaderChildren & LoaderProps);
  }

  render() {
    return template;
  }
}
