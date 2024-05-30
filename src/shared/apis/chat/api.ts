import { HTTPTransport } from 'network';

import type {
  ChatChangeUsersPayload,
  ChatChangeUsersResponse,
  ChatCreatePayload,
  ChatCreateResponse,
  ChatResponse,
  ChatUsersPayload,
  ChatUsersResponse,
  ListChatsPayload,
  ListChatsResponse,
} from './type';

export class ChatAPI {
  private http = new HTTPTransport();

  public getChats(payload: ListChatsPayload) {
    return this.http.get<ListChatsPayload, ListChatsResponse>('/chats', { data: payload });
  }

  public getChatToken(payload: number) {
    return this.http.post<number, { token: string }>(`/chats/token/${payload}`);
  }

  public getChatUsers({ id, ...rest }: ChatUsersPayload) {
    return this.http.get<ChatUsersPayload, ChatUsersResponse>(`/chats/${id}/users`, { data: rest });
  }

  public addUsers(payload: ChatChangeUsersPayload) {
    return this.http
      .put<ChatChangeUsersPayload, ChatChangeUsersResponse>(`/chats/users`, { data: payload });
  }

  public removeUsers(payload: ChatChangeUsersPayload) {
    return this.http
      .delete<ChatChangeUsersPayload, ChatChangeUsersResponse>(`/chats/users`, { data: payload });
  }

  public setChatAvatar(payload: FormData) {
    return this.http
      .put<FormData, ChatResponse>(`/chats/avatar`, { data: payload });
  }

  public createChat(payload: ChatCreatePayload) {
    return this.http
      .post<ChatCreatePayload, ChatCreateResponse>(`/chats`, { data: payload });
  }
}
