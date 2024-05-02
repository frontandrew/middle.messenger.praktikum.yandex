import type { Avatar, Button, ButtonIcon, Menu, Text } from 'ui';

import type { ChatType, MessageType, UserType } from 'entities/index';
import type { Children, Props } from 'core';

import type { ButtonAttach } from '../button-attach';
import type { FormMessage } from '../form-message';
import type { FormSearch } from '../form-search';
import type { ListChats } from '../list-chats';
import type { ListMessages } from '../list-messages';

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
