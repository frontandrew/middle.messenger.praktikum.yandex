import type { Children, Props } from 'core';
import type { Button, ButtonIcon, Menu } from 'ui';

import type { FormMessage, FormSearch, ListChats, ListMessages, MenuAttach } from 'features';

import type { ChatType, HeaderChat } from 'entities/chat';
import type { MessageType } from 'entities/message';
import type { UserType } from 'entities/user';

import type { ButtonAttach } from '../button-attach';

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
  headerChat: HeaderChat,
  listMessages: ListMessages,
  actionAttach: ButtonAttach,
  formMessage: FormMessage,
  actionsChat: ButtonIcon;
  menuAttach: MenuAttach,
  menuChat: Menu;
}
