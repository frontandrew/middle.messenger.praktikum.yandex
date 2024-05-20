import { PING_INTERVAL } from 'config';

type MessageHandler = (message: string) => void;
type ErrorHandler = (error: Event) => void;

const { setInterval } = window;

export class WSTransport {
  private url: string;
  private websocket: WebSocket | null = null;
  private messageHandler: MessageHandler | null = null;
  private errorHandler: ErrorHandler | null = null;
  private pingInterval: number = PING_INTERVAL ?? 180000;
  private pingTimer: number | null = null;

  constructor(url: string) {
    this.url = url;
  }

  public connect(): void {
    this.websocket = new WebSocket(this.url);

    this.websocket.onopen = () => {
      // console.log('Connected to the websocket server.');
      this.startPing();
    };

    this.websocket.onmessage = (event: MessageEvent) => {
      if (this.messageHandler) this.messageHandler(event.data);
    };

    this.websocket.onerror = (event: Event) => {
      if (this.errorHandler) this.errorHandler(event);
    };

    this.websocket.onclose = () => {
      // console.log('Disconnected from the websocket server.');
      this.stopPing();
    };
  }

  public disconnect(): void {
    if (this.websocket) this.websocket.close();
  }

  public sendMessage(message: string): void {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(message);
    } else {
      console.error('WebSocket is not open. Ready state: ', this.websocket?.readyState);
    }
  }

  public onMessage(handler: MessageHandler): void {
    this.messageHandler = handler;
  }

  public onError(handler: ErrorHandler): void {
    this.errorHandler = handler;
  }

  private startPing(): void {
    this.pingTimer = setInterval(() => { this.sendPing(); }, this.pingInterval);
  }

  private stopPing(): void {
    if (this.pingTimer !== null) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }

  private sendPing(): void {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send('ping');
    }
  }
}
