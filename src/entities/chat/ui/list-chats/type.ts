import type { ChatType, ItemChat } from 'entities/chat';
import type { Children, Props } from 'core';

export interface ListChatsChildren extends Children {
  [key: string]: ItemChat;
}

export interface ListChatsProps extends Props {
  chatItems: ChatType[] | [],
  chatKeys: string;
  onClick: ({}: MouseEvent) => MouseEvent;
  hasItems: boolean;
  hasActive: number | null;
}
