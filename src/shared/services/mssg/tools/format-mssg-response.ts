/* eslint-disable camelcase */
import { store } from 'store';

import { MessageType } from 'entities/message';

import { MessageResponse } from '../type';

export function formatMssgResponse(data: MessageResponse): MessageType {
  const { id, is_read, user_id, time, content, type } = data;
  const date = new Date(time);
  let hour = date.getHours().toString();
  let minute = date.getMinutes().toString();

  hour = hour.length < 2 ? 0 + hour : hour;
  minute = minute.length < 2 ? 0 + minute : minute;

  const { user } = store.get();

  return {
    id,
    type,
    content,
    isRead: is_read,
    userId: user_id,
    time: `${hour}:${minute}`,
    origin: user?.id === user_id ? 'outgoing' : 'incoming',
  };
}
