import { StoreEvents, store } from 'store';
import { identity, isArray } from 'tools';
import { MessagingAPI } from 'api';
import { WS_HOST } from 'config';

import { MessageType } from 'entities/message';

import { formatMssgResponse, isMessageResponse } from './tools';
import { MessageResponse } from './type';

class MssgControl {
  private api: MessagingAPI | null = null;
  private token: string | null = null;
  private chatId: number | null = null;
  private userId: number | null = null;
  private host = WS_HOST;

  private getListMessages() {
    this.api?.getMessages(10);
  }

  public init() {
    store.on(StoreEvents.UPD, () => {
      const { chat } = (store.get()!);
      const newChatId = chat?.id ? chat.id : null;

      if (!newChatId) return;
      if (newChatId === this.chatId) return;
      if (typeof this.api?.getConnectState === 'number') {
        this.closeConnection();
      }
      this.startMessaging();
    });
  }

  private collectMessages(data: unknown) {
    if (isArray(data)) {
      const newMssgs = data.reduce((res, mssg) => {
        if (isMessageResponse(mssg)) {
          return [...res, formatMssgResponse(identity<MessageResponse>(mssg))];
        }
        return res;
      }, [] as MessageType[]);

      if (newMssgs.length) {
        const { messages: prevMssgs } = store.get();
        store.set('messages', [...prevMssgs, ...newMssgs]);
      }
    }

    if (isMessageResponse(data)) {
      const { messages: prevMssgs } = store.get();
      store.set('messages', [...prevMssgs, formatMssgResponse(data)]);
    }
  }

  public closeConnection() {
    this.api?.disconnect();
    this.api = null;
    this.chatId = null;
    this.token = null;
  }

  public async startMessaging() {
    const { chat } = (store.get()!);
    const { user } = (store.get()!);

    if (chat?.id && chat.token && user?.id) {
      this.userId = user.id;
      this.chatId = chat.id;
      this.token = chat.token;
      this.api = new MessagingAPI(
        {
          url: `${this.host}/${this.userId}/${this.chatId}/${this.token}`,
          errorHandler: this.onError.bind(this),
          messageHandler: this.onMssg.bind(this),
        },
      );
    }
    await this.api?.openConnection();
    this.getListMessages();
  }

  public sendMessage(data: string) {
    // TODO: xss protect
    // TODO: processing files
    this.api?.sendMessage(data);
  }

  private onError(event: Event) {
    // TODO: handle error
    return event;
  }

  private onMssg(event: MessageEvent) {
    if (typeof event.data === 'string' && ['message', 'file'].includes(event.type)) {
      this.collectMessages(JSON.parse(event.data));
    }
    return event;
  }
}

export const mssgControl = new MssgControl();
