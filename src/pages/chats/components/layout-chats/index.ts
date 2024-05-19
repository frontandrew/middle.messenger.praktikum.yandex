import { Button, Menu } from 'ui';
import { IconFile, IconLoc, IconMedia } from 'images';
import { Component } from 'core';
import { withRouter } from 'routing';

import { HeaderChat } from 'entities/chat';

import { FormMessage, ListChats, ListMessages } from 'features';

import { ButtonAttach } from '../button-attach';
import { FormSearch } from '../form-search';

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
      listMessages: new ListMessages(),

      formSearch: new FormSearch({}),
      formMessage: new FormMessage(),
      headerChat: new HeaderChat(),

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
    } as LayoutChatsChildren & LayoutChatsProps);
  }

  callMenuAttach() {
    this.children.menuAttach.showMenu();
  }

  render() {
    return template;
  }
}
