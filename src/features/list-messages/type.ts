import type { Children, Props } from 'core';
import type { ItemMessage, MessageType } from 'entities/message';

export interface ListMessagesChildren extends Children {
  [key: string]: ItemMessage;
}

export interface ListMessagesProps extends Props {
  keys: string;
  items: MessageType[] | [];
  hasItems: boolean;
}
