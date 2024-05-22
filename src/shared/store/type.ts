import { ChatType, MessageType, UserType } from 'entities';

export interface CurrentChatState {
  id: number | null;
  token: string | null;
}

export interface State {
  isLoading: boolean;
  user: Nullable<UserType>;
  chats: Nullable<Record<string, ChatType>>;
  messages: MessageType[] | [];
  chat: CurrentChatState | null;
}
