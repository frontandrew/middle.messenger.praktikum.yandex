import { StoreEvents, store } from 'store';
import { isArray } from 'tools';
import { MssgAPI } from 'apis/mssg';
import { WS_HOST } from 'config';

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
      const mssgs = data.reduce((res, mssg) => {
        if (!isMessageResponse(mssg)) return res;
        return [...res, mssg];
      }, [] as MessageResponse[]);

      if (mssgs.length) {
        const newMssgs = sortMssgsByData(mssgs);
        const prevMssgs = store.get()?.messages;
        store.set('messages', [
          ...newMssgs.map(formatMssgResponse),
          ...prevMssgs!,
        ]);
      }
    }

    if (isMessageResponse(data)) {
      const prevMssgs = store.get()?.messages;
      store.set('messages', [...prevMssgs!, formatMssgResponse(data)]);
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
      this.api = new MssgAPI(
        {
          url: `${this.host}/${this.userId}/${this.chatId}/${this.token}`,
          errorHandler: this.onError.bind(this),
          messageHandler: this.onMssg.bind(this),
        },
      );
    }
    await this.api?.openConnection();
    this.getPreviosMssg(this.offset);
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

export const mssgServ = new MssgService();
