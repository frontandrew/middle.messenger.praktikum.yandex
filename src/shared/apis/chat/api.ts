import { HTTPTransport } from 'network';

import type { ListChatsPayload, ListChatsResponse } from './type';

export class ChatAPI {
  private http = new HTTPTransport();

  public getChats(payload: ListChatsPayload) {
    return this.http.get<ListChatsPayload, ListChatsResponse>('/chats', { data: payload });
  }

  public getChatToken(payload: number) {
    return this.http.post<number, { token: string }>(`/chats/token/${payload}`);
  }
}
