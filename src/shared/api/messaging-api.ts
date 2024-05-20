import { WSTransport } from 'network';

import type {
  CloseHandler,
  ConnectHandler,
  ErrorHandler,
  MessageHandler,
} from 'network';

export class MessagingAPI {
  private transport: WSTransport;
  public onClose: CloseHandler | null = null;
  public onConnect: ConnectHandler | null = null;
  public onError: ErrorHandler | null = null;
  public onMessage: MessageHandler | null = null;

  constructor(url: string) {
    this.transport = new WSTransport(url);
    this.transport.onMessage((message: string) => JSON.parse(message));
    this.transport.onError((error: Event) => error);
  }

  public connect(): void {
    this.transport.connect();
  }

  public disconnect(): void {
    this.transport.disconnect();
  }

  public sendMessage(payload: { type: 'file' | 'message'; content: string | number }): void {
    if (payload.content) this.transport.sendMessage(JSON.stringify(payload));
  }
}
