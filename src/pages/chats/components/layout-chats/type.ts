import { Button, Text } from 'ui';

import type { ChatType, MessageType, UserType } from 'entities';
import type { Children, Props } from 'core';

import type { FormSearch } from '../form-search';
import type { ListChats } from '../list-chats';

export interface LayoutChatsData {
  user: Pick<UserType, 'id' | 'image' | 'name'>,
  chats: ChatType[],
  messages: MessageType[],
}

export interface LayoutChatsChildren extends Children {
  redirect: Button,
  formSearchge: FormSearch,
  chatsList: ListChats,
  chatInfo: ChatItem,
  chatActions: Button,
  messagesList: List,
  attacment: Button,
  formMessage: Form
}

export interface LayoutChatsProps extends Props {}
