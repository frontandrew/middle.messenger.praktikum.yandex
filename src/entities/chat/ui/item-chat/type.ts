import type { Children, Props } from 'core';
import type { Avatar } from 'ui';

import type { ChatType } from '../../type';

export interface ItemChatProps extends Props, ChatType {
  active: boolean,
}

export interface ItemChatChildren extends Children {
  avatar: Avatar,
}
