import { MessageResponseType } from 'services/messaging';

export interface MessageType {
  id: number;
  type: MessageResponseType;
  origin: 'incoming' | 'outgoing' | 'system';
  isRead: boolean;
  content: string;
  userId: number;
  time: string;
}
