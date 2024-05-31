import { RESOURCES, UNREAD_TIMEOUT } from 'config';
import { keying } from 'tools';
import { store } from 'store';

import type { ListChatsPayload, ChatUsersPayload, ChatCreatePayload } from 'apis/chat';
import { ChatAPI } from 'apis/chat';

import { formatChatResponse, formatChatUserResponse, updeteChatsList } from './tools';

class ChatsService {
  private api = new ChatAPI();
  private lastSearch: ListChatsPayload | null = null;

  public async getListChats(params: ListChatsPayload = {}) {
    this.lastSearch = params;
    store.set('isLoading', true);

    const list = await this.api.getChats(params)
      .then(({ response }) => response.map(formatChatResponse))
      .catch(() => []);

    store.set('chats', keying(list, 'id'));
    store.set('isLoading', false);
  }

  public async createNewChat(data: ChatCreatePayload) {
    store.set('isLoading', true);

    const result = await this.api.createChat(data)
      .then(({ response }) => response.id)
      .catch(() => null);

    if (!result) {
      store.set('isLoading', false);
      return Boolean(result);
    }

    await this.getListChats(this.lastSearch ?? {});
    await this.handleChatSelection(result);
    return Boolean(result);
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

  public async changeAvatar(file: File) {
    const chatId = store.get()?.chat?.id;
    if (typeof chatId !== 'number') return false;

    store.set('isLoading', true);
    const data = new FormData();
    data.append('avatar', file, file.name);
    data.append('chatId', chatId.toString());

    const image = await this.api.setChatAvatar(data)
      .then(({ response }) => response.avatar)
      .catch(() => null);

    if (typeof image === 'string') store.set(`chats.${chatId}.avatar`, RESOURCES + image);
    store.set('isLoading', false);
    return typeof image === 'string';
  }

  /* TODO: load more users thene by default */
  public async getChatUsers(data: Omit<ChatUsersPayload, 'id'>) {
    const chatId = store.get()?.chat?.id;
    if (!chatId) return [];

    store.set('isLoading', true);

    const chatUsers = await this.api.getChatUsers({ id: chatId, ...data })
      .then(({ response }) => response.map(formatChatUserResponse))
      .catch(() => []);

    store.set('isLoading', false);
    return chatUsers;
  }

  private async getChatToken(id: number) {
    const token = await this.api.getChatToken(id)
      .then(({ response }) => response.token)
      .catch(() => null);

    return token;
  }

  public async getUreadCount() {
    /* TODO: ITS NOT WORK propprly, need to debug */
    // const chats = store.get()?.chats;

    // console.log(`CALL`);
    // if (chats && Object.values(chats).length) {
    //   const updatedChats = await Object.entries(chats).reduce(async (updated, [id, chat]) => {
    //     const count = await this.api.getUnreadCount(Number(id))
    //       .then(({ response }) => response.unread_count);
    //       // TODO: error handling
    //     return { ...updated, [id]: { ...chat, unreadCount: count } };
    //   }, {});

    //   store.set('chats', updatedChats);
    // }

    /* TODO: TEMPORARY SOLUTION! need to rework!! */
    const list = await this.api.getChats(this.lastSearch ?? {})
      .then(({ response }) => response.map(formatChatResponse))
      .catch(() => []);

    store.set('chats', keying(list, 'id'));
    window.setTimeout(() => this.getUreadCount(), UNREAD_TIMEOUT);
  }
}

export const chatsServ = new ChatsService();
