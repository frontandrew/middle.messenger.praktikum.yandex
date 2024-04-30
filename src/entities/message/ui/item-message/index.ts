import { Component } from 'core';

import type { ItemMessageChildren, ItemMessageProps } from './type';
import type { MessageType } from '../../type';

import template from './template.hbs?raw';
import './style.css';

export class ItemMessage extends Component<ItemMessageChildren, ItemMessageProps> {
  constructor({ type, ...props }: MessageType) {
    const isMediaType = type === 'media';

    super({ type, isMediaType, ...props } as ItemMessageChildren & ItemMessageProps);
  }

  render() {
    return template;
  }
}
