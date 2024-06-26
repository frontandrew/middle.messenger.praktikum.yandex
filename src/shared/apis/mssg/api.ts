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

  public async disconnect(): Promise<void> {
    await this.ws?.disconnect();
  }

  public getMessages(offset: number) {
    return this.ws?.sendMessage({ content: String(offset), type: MssgTypes.OLD });
  }
  public getConnectState() {
    return this.ws?.connectionState();
  }

  public sendMessage(content: string): void {
    if (content) this.ws?.sendMessage({ content, type: MssgTypes.MSSG });
  }
}
