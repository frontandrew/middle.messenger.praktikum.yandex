import type { Children, Props } from 'core';
import type { Avatar } from 'ui';

import type { ChatType } from '../../type';

export interface ItemChatProps extends Props, ChatType {
  onClick: () => void;
}

export interface ItemChatChildren extends Children {
  avatarChat: Avatar;
}

export interface ItemChatKeyAttr { key: { value: string } }
