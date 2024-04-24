import type { Children, Props } from 'core';
import type { ItemMessage } from 'entities/message';

export interface ListMessagesData {}

export interface ListMessagesChildren extends Children {
  [key: string]: ItemMessage,
}

export interface ListMessagesProps extends Props {
  itemKeys: string,
}
