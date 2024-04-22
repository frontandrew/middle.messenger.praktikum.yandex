import type { Children, Props } from 'core';
import type { ItemChat } from 'entities/chat';

export interface ListChatsData {}

export interface ListChatsChildren extends Children {
  [key: string]: ItemChat,
}

export interface ListChatsProps extends Props, ListChatsChildren {
  itemKeys: string,
}
