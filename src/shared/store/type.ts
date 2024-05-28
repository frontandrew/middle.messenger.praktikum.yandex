import type { ChatType } from 'entities/chat';
import type { MessageType } from 'entities/message';
import type { UserType } from 'entities/user';

export interface CurrentChatState {
  id: number | null;
  token: string | null;
}

export interface State {
  isLoading: boolean;
  user: UserType | null;
  chats: Record<string, ChatType> | null;
  messages: MessageType[] | [];
  chat: CurrentChatState | null;
}
