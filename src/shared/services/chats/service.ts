import { keying } from 'tools';
import { store } from 'store';

import { ChatAPI } from 'apis/chat';
import type { ListChatsPayload, ChatUsersPayload } from 'apis/chat';

import { formatChatResponse, formatChatUserResponse, updeteChatsList } from './tools';

class ChatsService {
  private api = new ChatAPI();

  public async getListChats(params: ListChatsPayload = {}) {
    store.set('isLoading', true);

    const list = await this.api.getChats(params)
      .then(({ response }) => response.map(formatChatResponse))
      .catch(() => []);

    store.set('chats', keying(list, 'id'));
    store.set('isLoading', false);
  }

  public async handleChatSelection(nextChatId: number) {
    const currChatId = store.get()?.chat?.id ?? null;

    if (nextChatId !== currChatId) {
      store.set('isLoading', true);
      const token = await this.getChatToken(nextChatId);

      if (token?.length) {
        store.set('chat', { id: nextChatId, token });
        updeteChatsList(nextChatId, currChatId);
      }

      store.set('isLoading', false);
    }
  }

  public async addUsersToChat(data: number[]): Promise<boolean> {
    const chatId = store.get()?.chat?.id;
    if (!chatId || !data.length) return false;

    store.set('isLoading', true);

    const result = await this.api
      .addUsers({ chatId, users: data })
      .then(({ response }) => response === 'OK')
      .catch(() => false);

    store.set('isLoading', false);
    return result;
  }

  public async removeUsersFromChat(data: number[]): Promise<boolean> {
    const chatId = store.get()?.chat?.id;
    if (!chatId || !data.length) return false;

    store.set('isLoading', true);

    const result = await this.api
      .removeUsers({ chatId, users: data })
      .then(({ response }) => response === 'OK')
      .catch(() => false);

    store.set('isLoading', false);
    return result;
  }

  public async getChatUsers(data: Omit<ChatUsersPayload, 'id'>) {
    const chatId = store.get()?.chat?.id;
    if (!chatId) return null;

    store.set('isLoading', false);

    const chatUsers = await this.api.getChatUsers({ id: chatId, ...data })
      .then(({ response }) => response.map(formatChatUserResponse))
      .catch(() => []);

    store.set('isLoading', true);
    return chatUsers;
  }

  private async getChatToken(id: number) {
    const token = await this.api.getChatToken(id)
      .then(({ response }) => response.token)
      .catch(() => null);

    return token;
  }
}

export const chatsServ = new ChatsService();
