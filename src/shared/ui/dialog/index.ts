import { Component } from 'core';

import type { DialogChildren, DialogProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class Dialog<C extends DialogChildren, P extends DialogProps> extends Component<C, P> {
  constructor({ isOpen = false, onClick, ...rest }: DialogProps) {
    super({
      isOpen,
      onClick: () => {
        if (onClick) onClick();
        this.close();
      },
      ...rest,
    } as C & P);
  }

  public setVisibility(state: boolean) {
    this.setProps({ isOpen: state } as P);
  }

  public close() {
    if (this.props.closeHandler) this.props.closeHandler();
    this.setProps({ isOpen: false } as P);
  }

  public open() {
    if (this.props.openHandler) this.props.openHandler();
    this.setProps({ isOpen: true } as P);
  }

  render() {
    return template;
  }
}
