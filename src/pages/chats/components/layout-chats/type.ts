import type { Avatar, Button, ButtonIcon, Menu, Text } from 'ui';
import type { Children, Props } from 'core';

import type { ListChats, ListMessages } from 'features';

import type { ChatType } from 'entities/chat';
import type { MessageType } from 'entities/message';
import type { UserType } from 'entities/user';

import type { ButtonAttach } from '../button-attach';
import type { FormMessage } from '../form-message';
import type { FormSearch } from '../form-search';

export interface LayoutChatsProps extends Props {
  user: UserType,
  chats: ChatType[] | [],
  messages: MessageType[] | [],
  selectedChat: number | null,
}

export interface LayoutChatsChildren extends Children {
  redirect: Button,
  formSearch: FormSearch,
  listChats: ListChats,
  imageChat: Avatar,
  titleChat: Text,
  actionsChat: ButtonIcon,
  listMessages: ListMessages,
  actionAttach: ButtonAttach,
  formMessage: FormMessage,
  menuAttach: Menu,
  menuChat: Menu,
}
