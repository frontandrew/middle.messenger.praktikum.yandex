import { ChatType, MessageType, UserType } from 'entities';

export interface CurrentChatState {
  id: number | null;
  token: string | null;
}

export interface State {
  isLoading: boolean;
  user: Nullable<UserType>;
  chats: Nullable<ChatType[]>;
  messages: Nullable<MessageType[]>;
  chat: Nullable<CurrentChatState>;
}
