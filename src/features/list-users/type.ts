import type { Children, Props } from 'core';
import type { ItemUser, ItemUserProps } from 'entities/user';

export interface ListUsersChildren extends Children {
  [key: string]: ItemUser;
}

export interface ItemsUsers {
  [k: string]: ItemUserProps
}

export interface ListUsersProps extends Props {
  items: ItemsUsers | null;
  keys: string;
  onClick: ({}: MouseEvent) => MouseEvent;
  hasItems: boolean;
  hasSelectedItems: boolean;
}
