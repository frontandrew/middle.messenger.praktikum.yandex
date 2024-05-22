import { ChatType, MessageType, UserType } from 'entities';

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
