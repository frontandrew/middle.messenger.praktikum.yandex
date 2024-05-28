import { Button, ButtonIcon, Menu } from 'ui';
import { Component } from 'core';
import { withRouter } from 'routing';
import { withStore } from 'store';

import { FormMessage, FormSearch, ListChats, ListMessages, MenuAttach } from 'features';
import { HeaderChat } from 'entities/chat';

import { IconAdd } from 'images';
import { ButtonAttach } from '../button-attach';

import type { LayoutChatsChildren, LayoutChatsProps } from './type';
import template from './template.hbs?raw';
import './style.css';

const ComponentRS = withStore(
  (state) => ({ selectedChat: Boolean(state.chat) }),
)(withRouter(Component));

export class LayoutChats extends ComponentRS<LayoutChatsChildren, LayoutChatsProps> {
  constructor() {
    super({
      selectedChat: null,
      redirect: new Button({
        type: 'button',
        variant: 'text',
        label: 'Profile ❯',
        classes: 'text_light-color',
        onClick: () => this.router.go('/settings'),
        tabindex: 100,
      }),

      listChats: new ListChats(),
      listMessages: new ListMessages(),
      formSearch: new FormSearch(),
      formMessage: new FormMessage(),
      headerChat: new HeaderChat(),
      menuAttach: new MenuAttach(),

      actionAttach: new ButtonAttach({
        onClick: () => {
          this.callMenuAttach();
        },
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
    } as LayoutChatsChildren & LayoutChatsProps);
  }

  callMenuAttach() {
    this.children.menuAttach.showMenu();
  }

  callMenuChat() {
    this.children.menuChat.showMenu();
  }

  render() {
    return template;
  }
}
