import { keying } from 'tools';
import { store } from 'store';

import type { ListChatsPayload } from 'entities/chat';
import { formatChatResponse } from 'entities/chat';

import { ChatAPI } from './api';

const apiChats = new ChatAPI();

class ChatsController {
  public async getListChats(params: ListChatsPayload = {}) {
    store.set('isLoading', true);

    const list = await apiChats.getChats(params)
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
        this.updeteChatsList(nextChatId, currChatId);
      }

      store.set('isLoading', false);
    }
  }

  private async getChatToken(id: number) {
    const token = await apiChats.getChatToken(id)
      .then(({ response }) => response.token)
      .catch(() => null);

    return token;
  }

  private updeteChatsList(nextId: number, currId: number | null) {
    const chats = store.get()?.chats;
    chats![nextId].isCurrent = true;
    if (currId) chats![currId].isCurrent = false;

    store.set(`chats`, chats);
  }
}

export const chatsController = new ChatsController();
