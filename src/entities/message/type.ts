export interface MessageType {
  id: number,
  type: 'text' | 'media',
  origin: 'incoming' | 'outgoing' | 'system',

  content?: string | null,
  userId?: number,
  date?: string,
}
