import { HTTPTransport } from 'network';

import type { ListChatsPayload, ListChatsResponse } from './type';

const chatTransport = new HTTPTransport();

export class ChatAPI {
  public getChats(payload: ListChatsPayload) {
    return chatTransport.get<ListChatsPayload, ListChatsResponse>('/chats', { data: payload });
  }
}
