import { Avatar, Button, ButtonIcon, Menu, Text } from 'ui';
import { IconAdd, IconFile, IconLoc, IconMedia } from 'images';
import { Component } from 'core';
import { withRouter } from 'routing';

import { ListChats } from 'entities/chat';

import { ButtonAttach } from '../button-attach';
import { FormMessage } from '../form-message';
import { FormSearch } from '../form-search';
import { ListMessages } from '../list-messages';

import type { LayoutChatsChildren, LayoutChatsProps } from './type';
import template from './template.hbs?raw';
import './style.css';

const ComponentWithRouter = withRouter(Component);

export class LayoutChats extends ComponentWithRouter<LayoutChatsChildren, LayoutChatsProps> {
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
      listMessages: new ListMessages([]),

      formSearch: new FormSearch({}),
      formMessage: new FormMessage(),

      imageChat: new Avatar({
        pic: '',
        size: 'small',
      }),

      titleChat: new Text({
        tag: 'h1',
        text: '',
        classes: 'messages__title text_title',
      }),

      actionsChat: new ButtonIcon({
        variant: 'transparent',
        onClick: () => {
          this.callMenuChat();
        },
      }),
      actionAttach: new ButtonAttach({
        onClick: () => {
          this.callMenuAttach();
        },
      }),

      menuAttach: new Menu({
        position: { left: 20, bottom: 4 },
        itemsProps: [
          {
            label: 'Photo or Video',
            icon: IconMedia,
            onClick: () => {},
          },
          {
            label: 'File',
            icon: IconFile,
            onClick: () => {},
          },
          {
            label: 'Location',
            icon: IconLoc,
            onClick: () => {},
          },
        ],
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
