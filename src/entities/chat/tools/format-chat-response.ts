/* eslint-disable camelcase */
import { store } from 'store';

import type { ChatResponse, ChatType } from '../type';

export function formatChatResponse(data: ChatResponse): ChatType {
  const { unread_count, created_by, last_message, id, ...rest } = data;

  const result = {
    isCurrent: id === store.get()?.chat?.id,
    unreadCount: unread_count,
    authorId: created_by,
    id,

    ...rest,
  };

  if (last_message) {
    const { content, time } = last_message;
    return { time, lastMessage: content, ...result };
  }

  return { ...result, lastMessage: null, time: null };
}
