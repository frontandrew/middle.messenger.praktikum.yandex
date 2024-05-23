import { Component } from 'core';

import type { DialogChildren, DialogProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Dialog<C extends DialogChildren, P extends DialogProps> extends Component<C, P> {
  constructor({ isOpen = false, onClick }: DialogProps) {
    super({
      isOpen,
      onClick: () => {
        if (onClick) onClick();
        this.close();
      },
    } as C & P);
  }

  public setVisibility(state: boolean) {
    this.setProps({ isOpen: state } as P);
  }

  public close() {
    this.setProps({ isOpen: false } as P);
  }

  public open() {
    this.setProps({ isOpen: true } as P);
  }

  render() {
    return template;
  }
}
