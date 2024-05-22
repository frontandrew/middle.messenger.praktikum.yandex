import { Button } from 'ui';
import { Component } from 'core';
import { withRouter } from 'routing';
import { withStore } from 'store';

import { FormMessage, FormSearch, ListChats, ListMessages, MenuAttach } from 'features';
import { HeaderChat } from 'entities/chat';

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
    } as LayoutChatsChildren & LayoutChatsProps);
  }

  callMenuAttach() {
    this.children.menuAttach.showMenu();
  }

  render() {
    return template;
  }
}
