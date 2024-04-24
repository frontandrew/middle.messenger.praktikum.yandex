import { Avatar, Button, ButtonIcon, Text } from 'ui';
import { Component } from 'core';

import { ButtonAttach } from '../button-attach';
import { FormMessage } from '../form-message';
import { FormSearch } from '../form-search';
import { ListChats } from '../list-chats';
import { ListMessages } from '../list-messages';

import type { LayoutChatsChildren, LayoutChatsProps } from './type';
import template from './template.hbs?raw';
import './style.css';

export { LayoutChatsProps };

export class LayoutChats extends Component<LayoutChatsChildren, LayoutChatsProps> {
  constructor({ user, chats, messages }: LayoutChatsProps) {
    super({
      redirect: new Button({
        type: 'button',
        variant: 'text',
        page: 'user',
        label: 'Profile ❯',
        classes: 'text_light-color',
      }),
      formSearch: new FormSearch({}),
      listChats: new ListChats(chats),
      imageChat: new Avatar({
        pic: user.image,
        size: 'small',
      }),
      titleChat: new Text({
        tag: 'h1',
        text: user.nickName,
        classes: 'messages__title text_title',
      }),
      actionsChat: new ButtonIcon({ variant: 'transparent' }),
      listMessages: new ListMessages(messages),
      actionAttach: new ButtonAttach({ onClick: () => {} }),
      formMessage: new FormMessage(),
    } as LayoutChatsChildren & LayoutChatsProps);
  }

  render() {
    return template;
  }
}
