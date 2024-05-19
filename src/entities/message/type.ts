export interface MessageType {
  id: number,
  type: 'text' | 'media',
  origin: 'incoming' | 'outgoing' | 'system',

  content?: string | null,
  userId?: number,
  time?: string,
}

export interface MessageResponse {
  chat_id: number,
  time: string,
  type: 'message' | 'file',
  user_id: number,
  content: null | string,
  file: null | {
    id: number,
    user_id: number,
    path: string,
    filename: string,
    content_type: string,
    content_size: number,
    upload_date: string,
  }
}
