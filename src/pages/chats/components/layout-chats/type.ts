import { Button, Text } from 'ui';

import type { ChatType, MessageType, UserType } from 'entities';
import type { Children, Props } from 'core';

export interface LayoutChatsData {
  user: Pick<UserType, 'id' | 'image' | 'name'>,
  chats: ChatType[],
  messages: MessageType[],
}

export interface LayoutChatsArgs extends LayoutChatsProps, MakeOptional<LayoutChatsChildren> {
    data: LayoutChatsData,
  }

export interface LayoutChatsChildren extends Children {
  redirect: Button,
  formSearchge: Text,
  chatsList: List,
  chatInfo: ChatItem,
  chatActions: Button,
  messagesList: List,
  attacment: Button,
  formMessage: Form
}

export interface LayoutChatsProps extends Props {}
