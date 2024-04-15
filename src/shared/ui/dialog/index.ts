import { Component } from 'core';

import type { DialogArgs, DialogChildren, DialogProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Dialog extends Component<DialogChildren, DialogProps> {
  constructor({ isOpen = false, ...rest }: DialogArgs) {
    super({
      isOpen,
      onClick: () => this.close(),
      ...rest,
    } as DialogArgs);
  }

  public setVisibility(state: boolean) {
    this.setProps({ isOpen: state });
  }

  public close() {
    this.setProps({ isOpen: false });
  }

  public open() {
    this.setProps({ isOpen: true });
  }

  render() {
    return template;
  }
}
