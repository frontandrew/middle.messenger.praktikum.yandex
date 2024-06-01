import { StoreEvents, store } from 'store';
import { isArray, isValidJSON } from 'tools';
import { MssgAPI } from 'apis/mssg';
import { WS_HOST } from 'config';

import type { CurrentChatState, State } from 'store';
import type { UserType } from 'entities/user';

import { formatMssgResponse, isMessageResponse, sortMssgsByData } from './tools';
import { MessageResponse } from './type';

class MssgService {
  private api: MssgAPI | null = null;
  private token: string | null = null;
  private chatId: number | null = null;
  private userId: number | null = null;
  private host = WS_HOST;
  private offset = 0;

  public getPreviosMssg(offset: number) {
    this.offset += offset;
    this.api?.getMessages(this.offset);
  }

  public async init() {
    store.on(StoreEvents.UPD, async ({ chat, user }: State) => {
      this.userDispatcher(user);
      await this.chatDispatcher(chat);
    });
  }

  private userDispatcher(user: UserType | null) {
    if (user?.id === this.userId) return;
    this.userId = typeof user?.id === 'number' ? user.id : null;
  }

  private async chatDispatcher(chat: CurrentChatState | null) {
    /* On a same chat like ative now do nothing */
    if (chat?.id === this.chatId && chat.token === this.token) return;

    /* On invalid params or on user do chat closing and reset chat params */
    if (typeof chat?.id !== 'number' || typeof chat?.token !== 'string' || !chat?.token.length) {
      this.setChatParams({ id: null, token: null });
      if (this.isConnectionAlive()) await this.stopMessaging();
      return;
    }

    /* Now can accept new chat params. Important do this before async open new connect! */
    this.setChatParams({ id: chat.id, token: chat.token });

    /* On user new chat open */
    if (this.isConnectionAlive()) await this.stopMessaging();
    if (this.userId) await this.startMessaging();
  }

  private async startMessaging() {
    this.api = new MssgAPI({
      url: `${this.host}/${this.userId}/${this.chatId}/${this.token}`,
      errorHandler: this.onError.bind(this),
      messageHandler: this.onMssg.bind(this),
    });

    await this.api?.openConnection();
    if (this.api?.getConnectState() === 1) this.getPreviosMssg(this.offset);
  }

  private async stopMessaging() {
    store.set('messages', []);
    await this.api?.disconnect();
  }

  private collectMessages(data: unknown) {
    /* Collect an messages array */
    if (isArray(data)) {
      const mssgs = data.reduce((res, mssg) => {
        if (!isMessageResponse(mssg)) return res;
        return [...res, mssg];
      }, [] as MessageResponse[]);

      if (mssgs.length) {
        const newMssgs = sortMssgsByData(mssgs);
        const prevMssgs = store.get()?.messages ?? [];
        store.set('messages', [
          ...newMssgs.map(formatMssgResponse),
          ...prevMssgs,
        ]);
      }
    }

    /* Collect a single message */
    if (isMessageResponse(data)) {
      const prevMssgs = store.get()?.messages ?? [];
      store.set('messages', [...prevMssgs, formatMssgResponse(data)]);
    }
  }

  public sendMessage(data: string) {
    // TODO: xss protect
    // TODO: processing files
    if (this.isConnectionAlive()) this.api!.sendMessage(data);
  }

  private onError(event: Event) {
    // TODO: handle error
    return event;
  }

  private onMssg(event: MessageEvent) {
    if (
      typeof event.data === 'string'
      && ['message', 'file'].includes(event.type)
      && isValidJSON(event.data)
    ) {
      this.collectMessages(JSON.parse(event.data));
    }
    return event;
  }

  private isConnectionAlive() {
    return (this.api?.getConnectState() ?? 3) < 2;
  }

  private setChatParams({ id, token }: CurrentChatState) {
    this.chatId = id;
    this.token = token;
    this.offset = 0;
  }
}

export const mssgServ = new MssgService();
