import { ChatType, MessageType, UserType } from 'entities';

export interface State extends PlainObject {
  isAuth: boolean;
  isLoading: boolean;
  user: Nullable<UserType>;
  chats: Nullable<ChatType[]>;
  messages: Nullable<MessageType[]>;
}
