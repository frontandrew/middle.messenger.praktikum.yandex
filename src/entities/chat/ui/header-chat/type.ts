import type { Avatar, Text } from 'ui';
import type { Children, Props } from 'core';

import type { ChatType } from '../../type';

export interface HeaderChatProps extends Props, ChatType {
  chat: ChatType | null;
}

export interface HeaderChatChildren extends Children {
  avatarChat: Avatar;
  titleChat: Text;
}
