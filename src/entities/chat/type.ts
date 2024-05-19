export interface ChatType {
  id: number;
  title: string;
  avatar: string | null;
  unreadCount: number;
  authorId: number
  lastMessage: string | null;
  time: string | null;
}

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
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    },
    time: string;
    content: string;
  } | null;
}
