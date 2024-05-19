import { Avatar, ButtonIcon, Menu, Text } from 'ui';
import { Component } from 'core';

import { IconAdd } from 'images';

import type { HeaderChatChildren, HeaderChatProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export class HeaderChat extends Component<HeaderChatChildren, HeaderChatProps> {
  constructor() {
    super({
      chat: null,
      avatarChat: new Avatar({ pic: '', size: 'small' }),
      titleChat: new Text({
        tag: 'h1',
        text: '',
        classes: 'header-chat__title text_title',
      }),
      actionsChat: new ButtonIcon({
        variant: 'transparent',
        onClick: () => this.callMenuChat(),
      }),
      menuChat: new Menu({
        position: { right: 0.5, top: 4 },
        itemsProps: [
          {
            label: 'Add user',
            icon: IconAdd,
            onClick: () => {},
          },
          {
            classes: 'menu-item__icon',
            label: 'Remove user',
            icon: IconAdd,
            onClick: () => {},
          },
        ],
      }),
    } as HeaderChatChildren & HeaderChatProps);
  }

  callMenuChat() {
    this.children.menuChat.showMenu();
  }

  render() {
    return template;
  }
}
