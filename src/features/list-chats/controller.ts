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

  public async storeSelectedtedChatParams(chatId: number) {
    store.set('isLoading', true);

    const currentChat = store.get()?.chats?.[chatId];
    if (currentChat?.id === chatId) {
      const token = await this.getChatToken(currentChat.id);
      if (token?.length) {
        store.set('chat', { id: chatId, token });
        store.set(`chats.${chatId}.isCurrent`, true);
      }
    }

    store.set('isLoading', false);
  }

  private async getChatToken(id: number) {
    const token = await apiChats.getChatToken(id)
      .then(({ response }) => response.token)
      .catch(() => null);

    return token;
  }
}

export const chatsController = new ChatsController();
