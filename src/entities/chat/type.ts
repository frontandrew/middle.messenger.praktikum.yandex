export interface ChatType {
  id: number;
  title: string;
  avatar: string | null;
  unreadCount: number;
  authorId: number
  lastMessage: string | null;
  time: string | null;
  isCurrent: boolean;
}
