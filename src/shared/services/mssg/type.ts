export type MessageResponseType = 'message' | 'file';

export interface MessageResponse {
  id: number;
  chat_id: number;
  user_id: number;
  is_read: boolean;
  type: MessageResponseType;
  time: string;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  } | null
}
