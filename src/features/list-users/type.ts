import type { Children, Props } from 'core';
import type { ItemUser, UserType } from 'entities/user';

export interface ListUsersChildren extends Children {
  [key: string]: ItemUser;
}

export type ItemsUser = Record<string, UserType> | null;

export interface ListUsersProps extends Props {
  items: ItemsUser;
  keys: string;
  onClick: ({}: MouseEvent) => MouseEvent;
  hasItems: boolean;
  hasSelectedItems: boolean;
}
