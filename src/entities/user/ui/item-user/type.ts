import type { Avatar, Text } from 'ui';
import type { Children, Props } from 'core';
import type { UserType } from 'entities/user/type';

export interface ItemUserProps extends Props, UserType {
  isSelected: boolean;
  onClick?: () => void;
}

export interface ItemUserChildren extends Children {
  avatarUser: Avatar;
  nameUser: Text;
  nickUser: Text;
}

export interface ItemUserKeyAttr { key: { value: string } }
