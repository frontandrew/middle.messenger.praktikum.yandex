import { MessagePayload, MessagingAPI } from 'api';
import { StoreEvents, store } from 'store';
import { WS_HOST } from 'config';

class MessagingController {
  private api: MessagingAPI | null = null;
  private token: string | null = null;
  private chatId: number | null = null;
  private userId: number | null = null;
  private host = WS_HOST;

  private getListMessages() {
    this.api?.sendMessage({ type: 'get old', content: '10' });
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

  public sendMessage(payload: MessagePayload) {
    this.api?.sendMessage(payload);
  }

  private onError(event: Event) {
    console.log('ws:err', event);
    return event;
  }

  private onMssg(event: MessageEvent) {
    console.log('ws:mssg', event);
    return event;
    // this.collectMessages();
  }
}

export const messagingController = new MessagingController();
