import { MssgTypes, WSTransport } from 'network';
import type { WSTransportArgs } from 'network';

export class MssgAPI {
  private ws: WSTransport | null = null;

  constructor(args: WSTransportArgs) {
    this.ws = new WSTransport({ ...args });
  }

  public async openConnection(): Promise<void> {
    await this.ws?.connect();
  }

  public disconnect(): void {
    this.ws?.disconnect();
  }

  public getMessages(count: number) {
    return this.ws?.sendMessage({ content: String(count), type: MssgTypes.OLD });
  }
  public getConnectState() {
    return this.ws?.connectionState();
  }

  public sendMessage(content: string): void {
    if (content) this.ws?.sendMessage({ content, type: MssgTypes.MSSG });
  }
}
