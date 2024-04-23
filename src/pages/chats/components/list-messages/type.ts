import type { Children, Props } from 'core';
import type { ItemChat } from 'entities/chat';

export interface ListMessagesData {}

export interface ListMessagesChildren extends Children {
  [key: string]: ItemChat,
}

export interface ListMessagesProps extends Props {
  itemKeys: string,
  onClick: ({}: Event) => Event,
  active: string | number | null,
}
