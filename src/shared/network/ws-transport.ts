import { PING_INTERVAL } from 'config';

export type CloseHandler = (event: CloseEvent) => CloseEvent;
export type ConnectHandler = (event: Event) => Event;
export type ErrorHandler = (event: Event) => Event;
export type MessageHandler = (event: MessageEvent) => MessageEvent;

export type WSTransportArgs = {
  url: string;
  closeHandler?: CloseHandler;
  connectHandler?: ConnectHandler;
  errorHandler?: ErrorHandler;
  messageHandler?: MessageHandler;
}
export enum MssgTypes {
  FILE = 'file',
  MSSG = 'message',
  OLD = 'get old'
}
export type SendPayload = {
  type: MssgTypes;
  content: string | number;
}

export class WSTransport {
  private url: string;

  private socket: WebSocket | null = null;
  private pingTimer: number | null = null;
  private pingInterval = PING_INTERVAL;

  public connectHandler?: ConnectHandler;
  public messageHandler?: MessageHandler;
  public errorHandler?: ErrorHandler;
  public closeHandler?: CloseHandler;

  constructor(args: WSTransportArgs) {
    this.url = args.url;
    this.closeHandler = args.closeHandler;
    this.connectHandler = args.connectHandler;
    this.errorHandler = args.errorHandler;
    this.messageHandler = args.messageHandler;
  }

  public async connect(): Promise<void> {
    const socket = await new Promise<WebSocket>((resolve, reject) => {
      const ws = new WebSocket(this.url);
      ws.onopen = (event) => {
        this.onOpen(event);
        resolve(ws);
      };

      ws.onerror = (event: Event) => {
        console.error(`Connection error.`, event);
        reject(event);
      };
    })
      .then((result) => result)
      .catch(() => null);

    if (socket) {
      this.socket = socket;
      this.socket.onmessage = (event: MessageEvent) => {
        if (this.messageHandler) this.messageHandler(event);
      };

      this.socket.onerror = (event: Event) => {
        console.error(`Service was return error.`, event);
        if (this.errorHandler) this.errorHandler(event);
      };

      this.socket.onclose = (event) => {
        const { code, reason, wasClean } = event;
        if (!wasClean) console.error(`Connection was closed by reason: ${reason}, code: ${code}`);
        else console.warn(`Connection was closed by reason: ${reason}, code: ${code}`);
        this.onClose(event);
      };
    }
  }

  public disconnect(): void {
    if (this.socket) this.socket.close();
  }

  public sendMessage(payload: SendPayload): void {
    console.log('ws:onsend', payload);
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(payload));
    } else {
      console.error('WebSocket is not open. Ready state: ', this.socket?.readyState);
    }
  }

  public onError(event: Event): void {
    console.log('ws:onerror', { ...event });
    if (this.errorHandler) this.errorHandler(event);
  }

  public onOpen(event: Event): void {
    console.log('ws:onopen', { ...event });
    if (this.connectHandler) this.connectHandler(event);
    this.startPing();
  }

  public onClose(event: CloseEvent): void {
    console.log('ws:onclose', { ...event });
    if (this.closeHandler) this.closeHandler(event);
    this.stopPing();
  }

  public onMessage(event: MessageEvent): void {
    console.log('ws:onmessage', { ...event });
    if (this.messageHandler) this.messageHandler(event);
  }

  public connectionState() {
    return this.socket?.readyState;
  }

  private startPing(): void {
    this.pingTimer = window.setInterval(() => { this.sendPing(); }, this.pingInterval);
  }

  private stopPing(): void {
    if (this.pingTimer !== null) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }

  private sendPing(): void {
    console.log('SendPing', this);
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'ping' }));
    }
  }
}
