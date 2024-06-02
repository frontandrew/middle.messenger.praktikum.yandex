import { MessageResponseType } from 'services/mssg';

export interface MessageType {
  id: number;
  type: MessageResponseType;
  origin: 'incoming' | 'outgoing' | 'system';
  isRead: boolean;
  content: string;
  userId: number;
  time: string;
}
