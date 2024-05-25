import { MssgTypes, WSTransport } from 'network';
import type { WSTransportArgs } from 'network';

export class MssgAPI {
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

  public getMessages(count: number) {
    return this.transport?.sendMessage({ content: String(count), type: MssgTypes.OLD });
  }
  public getConnectState() {
    return this.transport?.connectionState();
  }

  public sendMessage(content: string): void {
    if (content) this.transport?.sendMessage({ content, type: MssgTypes.MSSG });
  }
}
