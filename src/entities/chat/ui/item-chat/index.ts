import { Avatar } from 'ui';
import { Component } from 'core';
import { RESOURCES } from 'config';

import type { ChatType } from 'entities/chat';

import { chatsController as control } from '../../controller';

import type { ItemChatChildren, ItemChatProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class ItemChat extends Component<ItemChatChildren, ItemChatProps> {
  constructor(chat: ChatType) {
    super({
      ...chat,
      currChat: null,
      isActive: false,
      onClick: () => {
        control.storeSelectedtedChatParams(this.props.id);
      },

      avatarChat: new Avatar({ pic: chat.avatar ? RESOURCES + chat.avatar : '' }),
    } as ItemChatChildren & ItemChatProps);
  }

  toggleActive() {
    this.setProps({ isActive: !this.props.isActive });
  }

  render() {
    return template;
  }
}
