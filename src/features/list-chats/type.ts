import type { ChatType, ItemChat } from 'entities/chat';
import type { Children, Props } from 'core';

export interface ListChatsChildren extends Children {
  [key: string]: ItemChat;
}

export interface ListChatsProps extends Props {
  chatItems: Record<string, ChatType> | null,
  chatKeys: string;
  onClick: ({}: MouseEvent) => MouseEvent;
  hasItems: boolean;
  hasActive: number | null;
}
