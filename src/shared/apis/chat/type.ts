import { UserResponse } from 'apis/user';
import { UserType } from 'entities/user';

export interface ListChatsPayload {
  offset?: number;
  limit?: number;
  title?: string;
}

export type ListChatsResponse = ChatResponse[];

export interface ChatResponse {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number
  last_message: {
    user: Omit<UserResponse, 'id' | 'display_name'>,
    time: string;
    content: string;
  } | null;
}

export interface ChatAddUsersPayload {
  users: number[];
  chatId: number;
}

export type ChatAddUsersResponse = 'OK'

export interface ChatUser extends Omit<UserResponse, 'email' | 'phone'> {
  role: string;
}

export interface ChatUserType extends Omit<UserType, 'email' | 'phone'> {
  role: string;
}

export interface ChatUsersPayload {
  id: number;
  offset?: number;
  limit?: number;
  name?: number;
  email?: number;
}

export type ChatUsersResponse = ChatUser[]
