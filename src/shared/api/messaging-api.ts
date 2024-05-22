import { WSTransport } from 'network';

import type { WSTransportArgs } from 'network';

export type MessagePayload = { type: 'file' | 'message' | 'get old'; content: string | number }

export class MessagingAPI {
  private transport: WSTransport | null = null;

  constructor(args: WSTransportArgs) {
    this.transport = new WSTransport({ ...args });
  }

  public async openConnection(): Promise<void> {
    await this.transport?.connect();
  }

  public disconnect(): void {
    this.transport?.disconnect();
  }

  public getConnectState() {
    return this.transport?.connectionState();
  }

  public sendMessage({ content, type }: MessagePayload): void {
    if (content && type) this.transport?.sendMessage(JSON.stringify({ content, type }));
  }
}
