import { RESOURCES } from 'config';

import type { ChatUser, ChatUserType } from 'apis/chat';

export function formatChatUserResponse(data: ChatUser): ChatUserType {
  /* eslint-disable camelcase */
  const { avatar, first_name, second_name, display_name, ...rest } = data;
  return {
    firstName: first_name,
    secondName: second_name,
    nickName: display_name,
    avatar: avatar ? RESOURCES + avatar : '',
    ...rest,
  };
}
