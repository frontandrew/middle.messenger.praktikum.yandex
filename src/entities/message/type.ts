import { MessageResponseType } from 'services/messaging';

export interface MessageType {
  type: MessageResponseType,
  origin: 'incoming' | 'outgoing' | 'system',

  content: string,
  userId: number,
  time: string,
}
