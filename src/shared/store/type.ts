import { ChatType, MessageType, UserType } from 'entities';

export interface State {
  isLoading: boolean;
  user: Nullable<UserType>;
  chats: Nullable<ChatType[]>;
  messages: Nullable<MessageType[]>;
}
