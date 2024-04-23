import { Component } from 'core';

import type { ItemMessageChildren, ItemMessageProps } from './type';
import type { MessageType } from '../../type';

import template from './template.hbs?raw';
import './style.css';

export class ItemMessage extends Component<ItemMessageChildren, ItemMessageProps> {
  constructor(props: MessageType) {
    super({ ...props } as ItemMessageChildren & ItemMessageProps);
  }

  render() {
    return template;
  }
}
