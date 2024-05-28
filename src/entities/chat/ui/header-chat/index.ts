import { Avatar, Text } from 'ui';
import { State, withStore } from 'store';
import { Component } from 'core';

import { ChatType } from 'entities/chat';

import type { HeaderChatChildren, HeaderChatProps } from './type';
import template from './template.hbs?raw';
import './style.css';

function getChat({ chat, chats }: State): ChatType | null {
  if (chats && chat?.id) return chats[chat.id];
  return null;
}

const HeaderWithState = withStore((state) => ({ chat: getChat(state) }))(Component);
const AvatarWithState = withStore((state) => ({ pic: getChat(state)?.avatar }))(Avatar);
const TextWithState = withStore((state) => ({ text: getChat(state)?.title }))(Text);

export class HeaderChat extends HeaderWithState<HeaderChatChildren, HeaderChatProps> {
  constructor() {
    super({
      chat: null,
      avatarChat: new AvatarWithState({ pic: '', size: 'small' }),
      titleChat: new TextWithState({
        tag: 'h1',
        text: '',
        classes: 'header-chat__title text_title',
      }),
    } as HeaderChatChildren & HeaderChatProps);
  }

  render() {
    return template;
  }
}
