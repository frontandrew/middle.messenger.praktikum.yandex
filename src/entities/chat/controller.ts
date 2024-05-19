import { store } from 'store';

import { ChatAPI } from './api';

import type { ListChatsPayload } from './type';
import { formatChatResponse } from './tools';

const apiChats = new ChatAPI();

class ChatsController {
  async getListChats(params: ListChatsPayload = {}) {
    store.set('isLoading', true);

    const list = await apiChats.getChats(params)
      .then(({ response }) => response.map(formatChatResponse))
      .catch(() => []);

    store.set('chats', list);
    store.set('isLoading', false);
  }
}

export const chatsController = new ChatsController();
