import { Avatar } from 'ui';
import { Component } from 'core';

import type { ItemChatChildren, ItemChatProps } from './type';
import type { ChatType } from '../../type';

import template from './template.hbs?raw';
import './style.css';

export class ItemChat extends Component<ItemChatChildren, ItemChatProps> {
  constructor(chat: ChatType) {
    super({
      avatar: new Avatar({ pic: chat.avatar }),

      name: chat.name,
      active: false,
    } as ItemChatChildren & ItemChatProps);
  }

  toggleActive() {
    this.setProps({ active: this.props.active });
  }

  render() {
    return template;
  }
}
