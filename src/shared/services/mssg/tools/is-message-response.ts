import { isPlainObject } from 'tools';

import { MessageResponse } from '../type';

export function isMessageResponse(value: unknown): value is MessageResponse {
  return (
    isPlainObject(value)
    && typeof value.id === 'number'
    && typeof value.user_id === 'number'
    && typeof value.content === 'string'
  );
}
