import { Avatar } from 'ui';
import { Component } from 'core';

import type { ChatType } from 'entities/chat';

import type { ItemChatChildren, ItemChatProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class ItemChat extends Component<ItemChatChildren, ItemChatProps> {
  constructor(chat: ChatType) {
    super({
      ...chat,
      avatarChat: new Avatar({ pic: chat.avatar || null }),
    } as ItemChatChildren & ItemChatProps);
  }

  toggleActive() {
    this.setProps({ isCurrent: !this.props.isCurrent });
  }

  render() {
    return template;
  }
}
