import { Button, Text } from 'ui';
import { Component } from 'core';

import { FormSearch } from '../form-search';
import { ListChats } from '../list-chats';

import type { LayoutChatsChildren, LayoutChatsData, LayoutChatsProps } from './type';

import template from './template.hbs?raw';
import './style.css';

export class LayoutChats extends Component<LayoutChatsChildren, LayoutChatsProps> {
  constructor({ user, chats, messages }: LayoutChatsData) {
    super({
      redirect: new Button({
        type: 'button',
        variant: 'text',
        page: 'user',
        label: 'Profile ❯',
        classes: 'text text_light-color',
      }),
      formSearch: new FormSearch({}),
      listChats: new ListChats(chats)
    //   chatInfo: new ChatItem(user),
    //   chatAction: new Button(),
    //   listMessage: new List(messages),
    //   attacment: new Button(),
    //   formMessage: new FormMessage(),
    // } as LayoutChatsChildren);
    });
  }

  render() {
    return template;
  }
}
