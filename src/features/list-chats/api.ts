import { HTTPTransport } from 'network';

import type { ListChatsPayload, ListChatsResponse } from 'entities/chat';

const chatTransport = new HTTPTransport();

export class ChatAPI {
  public getChats(payload: ListChatsPayload) {
    return chatTransport.get<ListChatsPayload, ListChatsResponse>('/chats', { data: payload });
  }

  public getChatToken(payload: number) {
    return chatTransport.post<number, { token: string }>(`/chats/token/${payload}`);
  }
}
