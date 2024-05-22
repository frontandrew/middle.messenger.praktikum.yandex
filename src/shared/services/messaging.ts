import { StoreEvents, store } from 'store';
import { identity, isArray, isPlainObject } from 'tools';
import { MessagingAPI } from 'api';
import { WS_HOST } from 'config';

import { MessageType } from 'entities/message';

// TODO: separate to type and tools

export type MessageResponseType = 'message' | 'file';
export interface MessageResponse {
  chat_id: number;
  time: string;
  type: MessageResponseType;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  }
}

export function isMessageResponse(value: unknown): value is MessageResponse {
  return (
    isPlainObject(value)
    && typeof value.chat_id === 'number'
    && typeof value.user_id === 'number'
    && typeof value.content === 'string'
    && Boolean(value.type)
  );
}

export function formatMssgResponse(data: MessageResponse): MessageType {
  const { user_id, time, content, type } = data;
  const date = new Date(time);
  const hour = date.getHours();
  const minute = date.getMinutes();

  const { user } = store.get();

  return {
    type,
    content,
    userId: user_id,
    time: `${hour}:${minute}`,
    origin: user?.id === user_id ? 'outgoing' : 'incoming',
  };
}

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

  collectMessages(event: MessageEvent) {
    const { data/* , type */ } = event;

    if (isArray(data)) {
      const newMssgs = data.reduceRight((res, mssg) => {
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
          errorHandler: this.onError,
          messageHandler: this.onMssg,
        },
      );
    }
    await this.api?.openConnection();
    this.getListMessages();
    console.log('ws:controller', { chat, user, api: this.api });
  }

  public sendMessage(data: string) {
    // TODO: xss protect
    // TODO: processing files
    this.api?.sendMessage(data);
  }

  private onError(event: Event) {
    // TODO: handle error
    console.log('ws:err', event);
    return event;
  }

  private onMssg(event: MessageEvent) {
    console.log('ws:mssg', event);
    this.collectMessages(event);
    return event;
  }
}

export const mssgControl = new MssgControl();
