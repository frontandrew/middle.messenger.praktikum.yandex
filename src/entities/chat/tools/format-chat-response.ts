/* eslint-disable camelcase */

import type { ChatResponse, ChatType } from '../type';

export function formatChatResponse(data: ChatResponse): ChatType {
  const { unread_count, created_by, last_message, ...rest } = data;

  const result = { unreadCount: unread_count, authorId: created_by, ...rest };

  if (last_message) {
    const { content, time } = last_message;
    return { time, lastMessage: content, ...result };
  }

  return { ...result, lastMessage: null, time: null };
}
