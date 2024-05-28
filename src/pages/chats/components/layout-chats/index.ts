import { Button, ButtonIcon, Dialog, Menu } from 'ui';
import { Component } from 'core';
import { withRouter } from 'routing';
import { withStore } from 'store';

import { SearchUsers } from 'widgets/search-users';
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
      formSearch: new FormSearch({ fieldName: 'chats-search' }),
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
            onClick: () => this.callUserSearch(),
          },
          {
            classes: 'menu-item__icon',
            label: 'Remove user',
            icon: IconAdd,
            onClick: () => {},
          },
        ],
      }),
      usersSearch: new Dialog({
        closeHandler: (): void => this.resetUsersSearch(),
        isOpen: false,
        content: new SearchUsers(),
      }),
    } as LayoutChatsChildren & LayoutChatsProps);
  }

  resetUsersSearch() {
    this.children.usersSearch.children.content.reset();
  }

  callMenuAttach() {
    this.children.menuAttach.showMenu();
  }

  callMenuChat() {
    this.children.menuChat.showMenu();
  }

  callUserSearch() {
    this.children.usersSearch.open();
  }

  render() {
    return template;
  }
}
