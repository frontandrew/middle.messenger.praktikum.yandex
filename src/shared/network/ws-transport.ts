import { PING_INTERVAL } from 'config';

export type CloseHandler = (error: CloseEvent) => void;
export type ConnectHandler = (event: Event) => void;
export type ErrorHandler = (error: Event) => void;
export type MessageHandler = (message: string) => void;

export class WSTransport {
  private url: string;
  private socket: WebSocket | null = null;
  private connectHandler: ConnectHandler | null = null;
  private messageHandler: MessageHandler | null = null;
  private errorHandler: ErrorHandler | null = null;
  private closeHandler: CloseHandler | null = null;
  private pingInterval: number = PING_INTERVAL ?? 180000;
  private pingTimer: number | null = null;

  constructor(url: string) {
    this.url = url;
  }

  public connect(): void {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = (event) => {
      if (this.connectHandler) this.connectHandler(event);
      this.startPing();
    };

    this.socket.onmessage = (event: MessageEvent) => {
      if (this.messageHandler) this.messageHandler(event.data);
    };

    this.socket.onerror = (event: Event) => {
      if (this.errorHandler) this.errorHandler(event);
    };

    this.socket.onclose = (event) => {
      const { code, reason, wasClean } = event;
      if (!wasClean) console.error(`Connection was broken with code: ${code}`);
      else console.warn(`Connection was closed by reason: ${reason}, code: ${code}`);
      if (this.closeHandler) this.closeHandler(event);
      this.stopPing();
    };
  }

  public disconnect(): void {
    if (this.socket) this.socket.close();
  }

  public sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket is not open. Ready state: ', this.socket?.readyState);
    }
  }

  public onError(handler: ErrorHandler): void {
    this.errorHandler = handler;
  }

  public onConnect(handler: ConnectHandler): void {
    this.connectHandler = handler;
  }

  public onClose(handler: CloseHandler): void {
    this.closeHandler = handler;
  }

  public onMessage(handler: MessageHandler): void {
    this.messageHandler = handler;
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
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send('ping');
    }
  }
}
